const express = require('express');
const commentaireRoutes  = express.Router();
const mongoose = require('mongoose');


const Comment = require ('../models/comment-model')

/* POST créer un nouveau commentaire */
commentaireRoutes.post('/', (req, res, next) => {
      // vérifier si logged-in
    if (!req.session.currentUser) {
      res.status(401).json({
        message: "Connectez-vous pour poster un commentaire !"
      });
      return;
    }
    const {content, note} = req.body;
    console.log("server commentaires:" + content);

    Comment.create({
      content,
      note,
      sender: req.session.currentUser._id,
      receiver: req.session.currentUser._id
      
    })
      .then(response => { 
        console.log("MARCHE" + response);
        res.json(response)
      })
      .catch(err => {
        res.json(err);
      })
});

/* GET chercher des commentaires par sender id ou receiver id*/
commentaireRoutes.get('/find/:id', (req, res, next) => {

  if (!req.session.currentUser) {
    res.status(401).json({
      message: "Connectez-vous pour consulter un commentaire !"
    });
    return;
  }

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "L'identifiant spécifié n'est pas valide"});
    return;
  }

  const id = req.params.id;

  Comment.find({$or : [{sender: id},{receiver: id}] })
    .populate('sender receiver')
    .then (commentaires => {
      res.json(commentaires)
    })
    .catch(err => {
      res.json(err);
    })
})

/* GET /commentaires/:id afficher le detail d'un commentaire */

commentaireRoutes.get('/:id', (req, res, next) => {

  if (!req.session.currentUser) {
    res.status(401).json({
      message: "Connectez-vous pour consulter un commentaire !"
    });
    return;
  }

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "L'identifiant spécifié n'est pas valide"});
    return;
  }

  const id = req.params.id;

  Comment.findOne({_id: id})
    .populate('sender receiver')
    .then (commentaire => {
      res.json(commentaire)
    })
    .catch(err => {
      res.json(err);
    })
})

/*PUT /commentaire/:id éditer un commentaire */

commentaireRoutes.put('/:id', (req, res, next) => {

  if (!req.session.currentUser) {
    res.status(401).json({
      message: "Connectez-vous pour modifier ce commentaire!"
    });
    return;
  }

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "L'identifiant spécifié n'est pas valide"});
    return;
  }

  const id = req.params.id;

  Comment.findByIdAndUpdate(id,req.body)
    .populate('sender receiver')
    .then (commentaire => {
      res.json({ message: `Votre commentaire ${req.params.id} a été modifié` })
    })
    .catch(err => {
      res.json(err);
    })
})

/*DELETE /commentaire/:id delete un commentaire */
commentaireRoutes.delete('/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "L'identifiant spécifié n'est pas valide"});
    return;
  }

  Comment.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Votre commentaire ${req.params.id} a été supprimé` });
    })
    .catch( err => {
      res.json(err);
    })
})



module.exports = commentaireRoutes;