const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentSchema = new Schema({
  content: String,
  sender: { type : Schema.Types.ObjectId, ref: 'User' },
  receiver: { type : Schema.Types.ObjectId, ref: 'User' },
  note: Number

}, 
{
  timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;