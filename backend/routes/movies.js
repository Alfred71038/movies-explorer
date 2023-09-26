const router = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

const {
  validateCreateMovie,
  validateDeleteMovieById,
} = require('../middlewares/validations');

router.get('/movies', getMovies);

router.post('/movies', validateCreateMovie, createMovie);

router.delete('/movies/:movieId', validateDeleteMovieById, deleteMovieById);

module.exports = router;
