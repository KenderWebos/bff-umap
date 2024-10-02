const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Esquema de imágenes
const ImageSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  url: {
    type: String,
    required: true
  }
});

// Esquema de posts
const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: [ImageSchema] // Array de imágenes
}, {
  timestamps: true // Agrega createdAt y updatedAt automáticamente
});

// Modelo
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
