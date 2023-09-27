const router = require('express').Router();

const userRoutes = require('./users');
const movieRoutes = require('./movies');
const {
  login,
  createUser,
} = require('../controllers/users');

const {
  validateLogin,
  validateCreateUser,
} = require('../middlewares/validations');

const auth = require('../middlewares/auth');

const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', validateLogin, login);

router.post('/signup', validateCreateUser, createUser);

router.use(auth);

router.use('/', userRoutes);
router.use('/', movieRoutes);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
