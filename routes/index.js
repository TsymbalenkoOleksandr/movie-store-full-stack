const express = require('express');
const router = express.Router();
const mongodb = require('promised-mongo');

const uri = "mongodb://mongo/movie-store";
const db = mongodb(uri);

/**
 * Function that sends error.
 */
function sendError(res, reason) {
  res.status(500).json({ error: reason });
}

/**
 * Function that sends result.
 */
function sendResult(res, result) {
  res.send({ result });
}

/*
 * Add movie.
 */
router.post('/api/into/movies', (req, res) => {
  db.movies.find()
    .then(movies => {
      db.movies.insert(req.body)
        .then(x => sendResult(res, x))
        .catch(err => sendError(res, err));
    })
    .catch(err => sendError(res, err));
});

/*
 * Delete movie with :id param.
 */
router.delete('/api/from/movies/:id', (req, res) => {
  db.movies.remove({
    _id: mongodb.ObjectId(req.params.id)
  }, true)
    .then(x => sendResult(res, x))
    .catch(err => sendError(res, err));
});

/*
 * Load movie with :id param.
 */
router.get('/api/from/movies/:id', (req, res) => {
  db.movies.findOne({
    _id: mongodb.ObjectId(req.params.id)
  })
    .then(movie => res.send(movie))
    .catch(err => sendError(res, err));
});

/**
 * Load all movie titles
 */
router.get('/api/from/movies', (req, res) => {
  db.movies.find({}, {title: 1})
    .then(movies => res.send(movies))
    .catch(err => sendError(res, err));
});

/**
 * Load all movies sorted by title.
 */
router.get('/api/sorted/from/movies', (req, res) => {
  db.movies.find({}, {title: 1}).sort({title: 1})
    .then(movies => res.send(movies))
    .catch(err => sendError(res, err));
});

/**
 * Search movies by stars.
 */
router.get('/api/search/stars/:star', (req, res) => {
  const req1 = req.params.star;
  db.movies.find(
    {stars: {$regex: req1.charAt(0).toUpperCase() + req1.slice(1)}},
    {title: 1}
  )
    .then(movies => res.send(movies))
    .catch(err => sendError(res, err));
});

/**
 * Search movies by title.
 */
router.get('/api/search/title/:title', (req, res) => {
  const req1 = req.params.title;
  db.movies.find(
    {title: {$regex: req1.charAt(0).toUpperCase() + req1.slice(1)}},
    {title: 1}
  )
    .then(movies => res.send(movies))
    .catch(err => sendError(res, err));
});

/**
 * Drop db, for real prod must be protected.
 */
router.get('/api/dropdb', (req, res) => {
  db.movies.remove()
    .then(x => sendResult(res, x))
    .catch(err => sendError(res, err));
});

module.exports = router;
