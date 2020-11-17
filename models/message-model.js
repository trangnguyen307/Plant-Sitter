const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const messageSchema = new Schema({
  message: String,
  sender: [{ type : Schema.Types.ObjectId, ref: 'User' }],
  receiver: [{ type : Schema.Types.ObjectId, ref: 'User' }],

}, 
{
  timestamps: true
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;