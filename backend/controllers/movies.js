const Movie = require('../models/movie');

const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    owner,
    nameRU,
    nameEN,
  })
    .then((newMovie) => {
      res.status(201).send(newMovie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Не верный формат данных!'));
      } else {
        next(err);
      }
    });
};

const deleteMovieById = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(new Error('NotValidId'))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        next(new ForbiddenError('Доступ запрещен'));
        return;
      }
      Movie.findByIdAndRemove(movieId)
        .then(() => {
          res.status(200).send(movie);
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Не верный формат данных!'));
      } else if (err.message === 'NotValidId') {
        next(new NotFoundError('Такого фильма нет в базе данных!'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovieById,
};
