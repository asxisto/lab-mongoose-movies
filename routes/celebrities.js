const express = require('express');
const Celeb = require('../models/celebrity');

const Router = express.Router;
const celebRouter = new Router();

// console.log(Celeb);

// INDEX (GET)
celebRouter.get('/', (req, res, next) => {
  Celeb.find()
    .then(celebridades => {
      res.render('celebrities/index', { celebridades });
    })
    .catch(error => {
      next(error);
    });
});

// CELEB DETAILS (GET)
celebRouter.get('/show/:id', (req, res, next) => {
  const id = req.params.id;

  Celeb.findById(id)
    .then(celebridade => {
      res.render('celebrities/show', { celebridade });
    })
    .catch(error => {
      next(error);
    });
});

// CREATE NEW CELEB (GET)
celebRouter.get('/create', (req, res, next) => {
  res.render('celebrities/create');
});

// CREATE NEW CELEB (POST)
celebRouter.post('/create', (req, res, next) => {
  const data = req.body;

  Celeb.create({
    name: data.name,
    occupation: data.occupation,
    catchPhrase: data.known
  })
    .then(newCelebrity => {
      console.log('New Celebrity added to the database.', newCelebrity.name);
      res.redirect('/celebrities');
    })
    .catch(error => {
      next(error);
    });
});

// DELETE CELEB (POST)
celebRouter.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;

  Celeb.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch(error => {
      next(error);
    });
});

// UPDATE CELEB (GET)
celebRouter.get('/:id/edit', (req, res, next) => {
  const id = req.params.id;

  Celeb.findById(id)
    .then(celebUpdate => {
      res.render('celebrities/edit', { celebUpdate });
    })
    .catch(error => {
      next(error);
    });
});

// UPDATE CELEB (POST)
celebRouter.post('/:id/edit', (req, res, next) => {
  const id = req.params.id;
  const data = req.body;

  console.log(data);
  Celeb.findByIdAndUpdate(id, { name: data.nameUpdate, occupation: data.occupationUpdate, catchPhrase: data.knownUpdate })
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch(error => {
      next(error);
    });
});

// EXPORT TO APP.JS
module.exports = celebRouter;
