const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const annonceSchema = new Schema({
  type: String,
  moving: Boolean,
  title: String,
  description: String,
  adress: String,
  author: { type : Schema.Types.ObjectId, ref: 'User' },
  imageUrl: {
    type: String,
    default : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM-VfnDe5n-tVS6ZpnKfMekZoX0o_V2_o7gw&usqp=CAU'
  },
  startDate: String,
  endDate: String 

}, 
{
  timestamps: true
});

const Annonce = mongoose.model('Annonce', annonceSchema);

module.exports = Annonce;