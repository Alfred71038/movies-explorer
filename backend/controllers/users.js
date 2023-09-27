const { NODE_ENV, JWT_SECRET } = process.env;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;
  
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash, 
      name,
    }))
    .then((newUser) => {
      const { _id } = newUser;
      res.status(201).send({
        email,
        name,
        _id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      } else if (err.code === 11000) {
        next(new ConflictError('Такой пользователь уже сущетсвует'));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    
    {
      new: true, 
      runValidators: true, 
      upsert: false, 
    },
  )
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Данные не верные!'));
      } else if (err.message === 'NotValidId') {
        next(new NotFoundError('Такого пользователя не зарегистрировано!'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' }, 
      );

      
      res.send({ token });
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Данные не верные!'));
      } else if (err.message === 'NotValidId') {
        next(new NotFoundError('Такого пользователя не зарегистрировано!'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  updateUser,
  login,
  getUserInfo,
};
