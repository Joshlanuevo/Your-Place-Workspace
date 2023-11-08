const HttpError = require('../models/http-error');

let DUMMY_PLACES = [
    {
      id: 'p1',
      title: 'Empire State Building',
      description: 'One of the most famous sky scrapers in the world!',
      location: {
        lat: 40.7484474,
        lng: -73.9871516
      },
      address: '20 W 34th St, New York, NY 10001',
      creator: 'u1'
    }
];
  
const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid; // { pid: 'p1 }

    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    })

    if (!place) {
        throw new HttpError('Could not find place for the provided id.', 404);
    }

    res.json({ place }); // => { place } => { place: place }
}

exports.getPlaceById = getPlaceById;