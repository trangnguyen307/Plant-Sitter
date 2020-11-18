const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');

const uploader = require('../configs/cloudinary-setup.config');

const Annonce = require ('../models/annonce-model')

/* POST créer une nouvel annonce */
router.post('/',uploader.single('picture'), (req, res, next) => {

    console.log('file is: ', req.file)

    // vérifier si logged-in
    // if (!req.session.currentUser) {
    //   res.status(401).json({
    //     message: "Connectez-vous pour postuler une annonce!"
    //   });
    //   return;
    // }
    const {type,moving,content,adress} = req.body;
    let pictureURL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM-VfnDe5n-tVS6ZpnKfMekZoX0o_V2_o7gw&usqp=CAU';
    if (req.file) {
      pictureURL = req.file.path
    }

    Annonce.create({
      type,
      moving,
      content,
      adress,
      // author: req.session.currentUser._id,
      picture: pictureURL,
    })
      .then(response => {
        res.json(response)
      })
      .catch(err => {
        res.json(err);
      })
});

module.exports = router;