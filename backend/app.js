require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rate-limiter');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/error-handler');

const { PORT = 3000 } = process.env;
const app = express();

app.use(cors({
  // origin: 'https://мое-доменное-имя',
  origin: 'https://alfred71038.movies.nomoredomainsrocks.ru',
  credentials: true,
}));

// подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb')
  .then(() => {
    console.log('Connected to bitfilmsdb');
  });

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(requestLogger); // подключаем логгер запросов
app.use(limiter);
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(routes);
app.use(helmet());
app.disable('x-powered-by');
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is runnig on port ${PORT}`);
});
