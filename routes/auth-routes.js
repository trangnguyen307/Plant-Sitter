const express    = require('express');
const authRoutes = express.Router();

const bcrypt     = require('bcryptjs');

// require the user model !!!!
const User       = require('../models/user-model');


authRoutes.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.passwordHash;
  const avatar = req.body.avatar;
  
  if (!username || !email || !password) {
    res.status(400).json({ message: 'Vous devez remplir les champs Nom, Email et Mot de passe' });
    return;
  }

  if (password.length < 7) {
    res.status(400).json({ message: 'Votre mot de passe doit contenir au minimum 7 caractères' });
    return;
  }
  
  User.findOne({ username, email })
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
        avatar:avatar,
        password: hashPass
      });
    
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
  const {username,email, avatar, password} = req.body

  User.findOne({username}).then(user => {
    if (!user) {
      return next(new Error("Il n'y a pas d'utilisateur avec ce nom là"))
    }
    

    //reprendre là demain !!
    // compareSync
    if (bcrypt.compareSync(password, user.password) !== true) {
      return next(new Error('Wrong credentials'))
    } else {
      req.session.currentUser = user
      res.json(user)
    }
  }).catch(next)
});

authRoutes.post('/logout', (req, res, next) => {
  req.session.destroy()
  res.json({message: 'Your are now logged out.'})
});

authRoutes.get('/loggedin', (req, res, next) => {
  // req.isAuthenticated() is defined by passport
  if (req.session.currentUser) {
      res.status(200).json(req.session.currentUser);
      return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});

module.exports = authRoutes;