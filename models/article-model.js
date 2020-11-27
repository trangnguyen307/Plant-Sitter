const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const articleSchema = new Schema({
  title: String,
  content: String,
  imageUrl: String,
  commentaire: [{ type : Schema.Types.ObjectId, ref: 'Comment' }],
}, 
{
  timestamps: true
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;