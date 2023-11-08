const express = require('express');
const router = express.Router();

const placesController = require('../controllers/places-controllers');

router.get('/:pid', placesController.getPlaceById);

module.exports = router;