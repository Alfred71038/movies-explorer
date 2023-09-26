const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  max: 100, // limit each IP to 100 request
  windowMs: 15 * 60 * 1000, // 15 min
  message: 'Too many request from this IP, please try again after 15 min',
});

module.exports = limiter;
