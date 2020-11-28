const express    = require('express');
const authRoutes = express.Router();
const bcrypt     = require('bcryptjs');
const uploader = require('../configs/cloudinary-setup.config');
const mongoose = require('mongoose');

// require the user model !!!!
const User       = require('../models/user-model');


authRoutes.post('/signup', (req, res, next) => {
  console.log(req.body, req.file)
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const imageUrl = req.body.imageUrl;
  
  if (!username || !email || !password) {
    res.status(400).json({ message: 'Vous devez remplir les champs Nom, Email et Mot de passe' });
    return;
  }

  if (password.length < 7) {
    res.status(400).json({ message: 'Votre mot de passe doit contenir au minimum 7 caractères' });
    return;
  }
  
  User.findOne({ username })
    .then(foundUser => {
      if (foundUser) {
        res.status(400).json({ message: 'Le Nom est déjà pris. Tu dois en choisir un autre' });
        return;
      }
    
      const salt     = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);
    
      const aNewUser = new User({
        username:username,
        email:email,
        imageUrl:imageUrl,
        passwordHash: hashPass
      });
    
      console.log('newUser', aNewUser)
      aNewUser.save()
        .then(() => {
          // Persist our new user into session
          req.session.currentUser = aNewUser

         res.status(200).json(aNewUser);
        })
        .catch(err => {
          res.status(400).json({ message: 'L’enregistrement de l’utilisateur dans la base de données s’est mal déroulé.' });
        })
      ;
    })
    .catch(err => {
      res.status(500).json({message: "La vérification du nom d’utilisateur a mal tourné."});
    })
  ;
});

authRoutes.post('/login', (req, res, next) => {

  //login by username
  const {username, password} = req.body

  User.findOne({username}).then(user => {
    if (!user) {
      return next(new Error("Il n'y a pas d'utilisateur avec ce nom là"))
    }
    

    // compareSync
    if (bcrypt.compareSync(password, user.passwordHash) !== true) {
      return next(new Error("Le mot de passe n'est pas correcte"))
    } else {
      req.session.currentUser = user
      res.json(user)
    }
  }).catch(next)
});

authRoutes.post('/logout', (req, res, next) => {
  req.session.destroy()
  res.json({message: "Tu n'es plus loggé"})
});

authRoutes.get('/loggedin', (req, res, next) => {
  // req.isAuthenticated() is defined by passport
  if (req.session.currentUser) {
      res.status(200).json(req.session.currentUser);
      return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});

/* GET /profile/:id afficher le detail d'un profile */

authRoutes.get('/profile/:id', (req,res,next) => {

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "L'identifiant spécifié n'est pas valide"});
    return;
  }

  const id = req.params.id;

  User.findOne({_id: id})
    .then (user => {
      console.log(user)
      res.json(user)
    })
    .catch(err => {
      res.json(err);
    })
})

module.exports = authRoutes;