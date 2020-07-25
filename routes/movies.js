const express = require('express');
const Movie = require('../models/movie');

const Router = express.Router;
const moviesRouter = new Router();

// INDEX (GET)
moviesRouter.get('/', (req, res, next) => {
  Movie.find()
    .then(movies => {
      res.render('movies/index', { movies });
    })
    .catch(error => {
      next(error);
    });
});

// MOVIE DETAILS (GET)
moviesRouter.get('/show/:id', (req, res, next) => {
  const id = req.params.id;

  Movie.findById(id)
    .then(movie => {
      res.render('movies/show', { movie });
    })
    .catch(error => {
      next(error);
    });
});

// CREATE NEW MOVIE (GET)
moviesRouter.get('/create', (req, res, next) => {
  res.render('movies/create');
});

// CREATE NEW MOVIE (POST)
moviesRouter.post('/create', (req, res, next) => {
  const data = req.body;

  Movie.create({
    title: data.title,
    genre: data.genre,
    plot: data.plot
  })
    .then(newMovie => {
      console.log('New Movie added to the database.', newMovie.title);
      res.redirect('/movies');
    })
    .catch(error => {
      next(error);
    });
});

// DELETE MOVIE (POST)
moviesRouter.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;

  Movie.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/movies');
    })
    .catch(error => {
      next(error);
    });
});

// UPDATE MOVIE (GET)
moviesRouter.get('/:id/edit', (req, res, next) => {
  const id = req.params.id;

  Movie.findById(id)
    .then(movieUpdate => {
      res.render('movies/edit', { movieUpdate });
    })
    .catch(error => {
      next(error);
    });
});

// UPDATE MOVIE (POST)
moviesRouter.post('/:id/edit', (req, res, next) => {
  const id = req.params.id;
  const data = req.body;

  console.log(data);
  Movie.findByIdAndUpdate(id, { title: data.titleUpdate, genre: data.genreUpdate, plot: data.plotUpdate })
    .then(() => {
      res.redirect('/movies');
    })
    .catch(error => {
      next(error);
    });
});

// EXPORT TO APP.JS
module.exports = moviesRouter;
