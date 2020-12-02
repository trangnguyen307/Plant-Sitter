const express = require('express');
const messagesRoutes  = express.Router();
const mongoose = require('mongoose');


const Message = require ('../models/message-model')

/* POST créer un nouveau message */
messagesRoutes.post('/', (req, res, next) => {
      // vérifier si logged-in
    if (!req.session.currentUser) {
      res.status(401).json({
        message: "Connectez-vous pour écrire un commentaire !"
      });
      return;
    }
    const {message, receiver, sender, annonce} = req.body;
    let messagesBox = [];
    messagesBox.push({author : req.session.currentUser,message : message}); 

    Message.findOne({$and: [{sender:sender}, {receiver:receiver},{annonce:annonce}]})
    .then (message => {
      console.log(message)
      if(message) {
        Message.findOneAndUpdate({_id : message.id}, {$push: {messagesBox: { 
          message:req.body.message,
          author: req.session.currentUser
        }}})
          .populate('sender receiver annonce')
          .then (message => {
            res.json(message)
          })
          .catch(err => {
            res.json(err);
          })
        
      } else {
        Message.create({
          messagesBox,
          receiver,
          sender,
          annonce
        })
          .then(response => {
            res.json(response)
          })
          .catch(err => {
            res.json(err);
          })
      }
    })
    
});

/*GET afficher tous les messages */

messagesRoutes.get('/', (req, res, next) => {
  Message.find()
    .populate('sender receiver')
    .then(allTheMessages => {
      res.json(allTheMessages);
    })
    .catch(err => {
      res.json(err);
    })
})

/*chercher messages par sender id ou receiver id*/
messagesRoutes.get('/find/:id', (req, res, next) => {

  if (!req.session.currentUser) {
    res.status(401).json({
      message: "Connectez-vous pour consulter un message !"
    });
    return;
  }

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "L'identifiant spécifié n'est pas valide"});
    return;
  }

  const id = req.params.id;

  Message.find({$or : [{sender: id},{receiver: id}] })
    .populate('sender receiver annonce')
    .then (messages => {
      res.json(messages)
    })
    .catch(err => {
      res.json(err);
    })
})

/*Add messages */

messagesRoutes.put('/add-message/:messageid', (req, res, next) => {

  if (!req.session.currentUser) {
    res.status(401).json({
      message: "Connectez-vous pour envoyer un message !"
    });
    return;
  }

  const id = req.params.messageid;
  console.log('req.body.addMessage',req.body.addMessage)
  Message.findOneAndUpdate({_id : id}, {$push: {messagesBox: { 
    message:req.body.addMessage,
    author: req.body.author
  }}})
    .populate('sender receiver annonce')
    .then (message => {
      res.json(message)
    })
    .catch(err => {
      res.json(err);
    })
})

/* GET /messages/:id afficher le detail d'un message */

messagesRoutes.get('/:id', (req, res, next) => {

  if (!req.session.currentUser) {
    res.status(401).json({
      message: "Connectez-vous pour consulter un message !"
    });
    return;
  }

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "L'identifiant spécifié n'est pas valide"});
    return;
  }

  const id = req.params.id;

  Message.findOne({_id: id})
    .populate('sender receiver annonce')
    .then (message => {
      res.json(message)
    })
    .catch(err => {
      res.json(err);
    })
})

/*PUT /message/:id éditer un message */

messagesRoutes.put('/:id', (req, res, next) => {

  if (!req.session.currentUser) {
    res.status(401).json({
      message: "Connectez-vous pour modifier ce message!"
    });
    return;
  }

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "L'identifiant spécifié n'est pas valide"});
    return;
  }

  const id = req.params.id;

  Message.findByIdAndUpdate(id,req.body)
    .populate('sender receiver')
    .then (message => {
      res.json({ message: `Votre message ${req.params.id} a été modifié` })
    })
    .catch(err => {
      res.json(err);
    })
})

/*DELETE /message/:id delete un message */
messagesRoutes.delete('/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "L'identifiant spécifié n'est pas valide"});
    return;
  }

  Message.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Votre message ${req.params.id} a été supprimé` });
    })
    .catch( err => {
      res.json(err);
    })
})



module.exports = messagesRoutes;