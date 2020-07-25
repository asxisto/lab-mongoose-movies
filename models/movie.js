const mongoose = require('mongoose');

const movies = new mongoose.Schema({
  title: String,
  genre: String,
  plot: String
});

const Movie = mongoose.model('movie', movies);

module.exports = Movie;
