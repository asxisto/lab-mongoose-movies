const mongoose = require('mongoose');

const celebs = new mongoose.Schema({
  name: String,
  occupation: String,
  catchPhrase: String
});

const Celeb = mongoose.model('celeb', celebs);

module.exports = Celeb;
