const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const messageSchema = new Schema({
  messages: [String],
  sender: { type : Schema.Types.ObjectId, ref: 'User' },
  receiver: { type : Schema.Types.ObjectId, ref: 'User' },
  annonce: { type : Schema.Types.ObjectId, ref: 'Annonce' }
}, 
{
  timestamps: true
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;