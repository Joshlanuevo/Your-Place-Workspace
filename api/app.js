const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const HttpError = require('./models/http-error');
const usersRoutes = require('./routes/users-routes');
const placesRoutes = require('./routes/places-routes');

app.use(bodyParser.json());

app.use('/api/users', usersRoutes);
app.use('/api/places', placesRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.messgae || 'An unknown error occured!'});
});

app.listen(5000);
