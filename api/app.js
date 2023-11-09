const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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

mongoose
  .connect('mongodb+srv://your-place-database:joshivan1124@cluster0.nejp82x.mongodb.net/')
  .then(() => {
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  })