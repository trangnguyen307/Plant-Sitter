// const { response } = require('express');
const express = require('express');
const articleRouter  = express.Router();
const mongoose = require('mongoose');

const uploader = require('../configs/cloudinary-setup.config');

const Article = require ('../models/article-model')
const User = require ('../models/user-model')

/* POST /article créer d'une article */
articleRouter.post('/', (req, res, next) => {
   
  console.log('currentUser', req.session.currentUser)
  // vérifier si logged-in
  if (!req.session.currentUser) {
    res.status(401).json({
      message: "Connectez-vous pour poster une article!"
    });
    return;
  }

  //vérifier si admin ou pas
  User.findById(req.session.currentUser._id)
    .then (reponse => {

      if (reponse.username !== 'admin') {
        res.status(403).json({
          message: "Connectez-vous pour poster une article!"
        });
        return;
      }

      const {title,content,imageUrl} = req.body;

      Article.create({
        title,
        content,
        imageUrl
      })
        .then(response => {
          res.json(response)
        })
        .catch(err => {
          res.json(err);
        })

    })
    .catch(err => {
      res.json(err);
    })
  


});

/*GET afficher tous les articles */

articleRouter.get('/', (req,res,next) => {
  Article.find()
    .then(allTheArticles => {
      res.json(allTheArticles);
    })
    .catch(err => {
      res.json(err);
    })
})

/* GET /annonce/:id afficher le detail d'une annonce */

articleRouter.get('/:id', (req,res,next) => {

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "L'identifiant spécifié n'est pas valide"});
    return;
  }

  const id = req.params.id;

  Article.findOne({_id: id})
    .then (annonce => {
      res.json(annonce)
    })
    .catch(err => {
      res.json(err);
    })
})

/*PUT /annonce/:id modifier une annonce */

articleRouter.put('/:id', (req,res,next) => {

  if (!req.session.currentUser) {
    res.status(401).json({
      message: "Connectez-vous pour modifier cet article!"
    });
    return;
  }

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "L'identifiant spécifié n'est pas valide"});
    return;
  }

  const id = req.params.id;

  //vérifier si admin ou pas
  User.findById(req.session.currentUser._id)
    .then (reponse => {

      if (reponse.username !== 'admin') {
        res.status(403).json({
          message: "Connectez-vous pour modifier cet article!"
        });
        return;
      }

      Article.findByIdAndUpdate(id,req.body)
      .then (article => {
        res.json({ message: `L'article ${req.params.id} a été modifié` })
      })
      .catch(err => {
        res.json(err);
      }) 

    })
    .catch(err => {
      res.json(err);
    })
})

/*DELETE /annonce/:id delete une annonce */
articleRouter.delete('/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "L'identifiant spécifié n'est pas valide"});
    return;
  }

  if (!req.session.currentUser) {
    res.status(401).json({
      message: "Connectez-vous pour supprimer cet article!"
    });
    return;
  }

  //vérifier si admin ou pas
  User.findById(req.session.currentUser._id)
    .then (reponse => {

      if (reponse.username !== 'admin') {
        res.status(403).json({
          message: "Vous n'avez pas droit de supprimer cet article!"
        });
        return;
      }

      Article.findByIdAndRemove(req.params.id)
        .then(() => {
        res.json({ message: `Votre annonce ${req.params.id} a été supprimé` });
      })
      .catch( err => {
        res.json(err);
      })

      })
    .catch(err => {
      res.json(err);
    })

 
})

module.exports = articleRouter;