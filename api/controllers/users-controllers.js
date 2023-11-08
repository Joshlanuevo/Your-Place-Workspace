const HttpError = require('../models/http-error');

const DUMMY_USERS = [
    {
      id: 'u1',
      name: 'Max Schwarz',
      email: 'test@test.com',
      password: 'testers'
    }
];

const getUsers = (req, res, next) => {
    res.json({ users: DUMMY_USERS });
}

exports.getUsers = getUsers;