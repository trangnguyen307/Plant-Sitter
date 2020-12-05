const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');

const uploader = require('../configs/cloudinary-setup.config');

const Annonce = require ('../models/annonce-model')

/* POST créer une nouvel annonce */
router.post('/', (req, res, next) => {

    console.log('currentUser', req.session.currentUser)

    // vérifier si logged-in
    if (!req.session.currentUser) {
      res.status(401).json({
        message: "Connectez-vous pour poster une annonce!"
      });
      return;
    }
    const {type,moving,title,description,adress,imageUrl, startDate, endDate} = req.body;
    

    Annonce.create({
      type,
      moving,
      description,
      title,
      adress,
      author: req.session.currentUser._id,
      imageUrl,
      startDate,
      endDate
    })
      .then(response => {
        res.json(response)
      })
      .catch(err => {
        res.json(err);
      })
});


/*GET afficher tous les annonces */

router.get('/', (req,res,next) => {
  Annonce.find()
    .populate('author')
    .then(allTheAnnonces => {
      res.json(allTheAnnonces);
    })
    .catch(err => {
      res.json(err);
    })
})

/* GET /annonce/:id afficher le detail d'une annonce */

router.get('/:id', (req,res,next) => {

  if (!req.session.currentUser) {
    res.status(401).json({
      message: "Connectez-vous pour consulter une annonce!"
    });
    return;
  }

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "L'identifiant spécifié n'est pas valide"});
    return;
  }

  const id = req.params.id;

  Annonce.findOne({_id: id})
    .populate('author')
    .then (annonce => {
      res.json(annonce)
    })
    .catch(err => {
      res.json(err);
    })
})


/*PUT /annonce/:id modifier une annonce */

router.put('/:id', (req,res,next) => {

  if (!req.session.currentUser) {
    res.status(401).json({
      message: "Connectez-vous pour modifier cet annonce!"
    });
    return;
  }

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "L'identifiant spécifié n'est pas valide"});
    return;
  }

  const id = req.params.id;

  Annonce.findByIdAndUpdate(id,req.body)
    .populate('author')
    .then (annonce => {
      res.json({ message: `Votre annonce ${req.params.id} a été modifié` })
    })
    .catch(err => {
      res.json(err);
    })
})

/*DELETE /annonce/:id delete une annonce */
router.delete('/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "L'identifiant spécifié n'est pas valide"});
    return;
  }

  Annonce.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Votre annonce ${req.params.id} a été supprimé` });
    })
    .catch( err => {
      res.json(err);
    })
})


module.exports = router;