const router = require('express').Router();

const Users = require('./users-model');
const restricted = require('../auth/restrictedMiddleware');
const checkRole = require('../auth/checkRoleMiddleware');

router.get("/", restricted, checkRole("admin"), (req, res) => {
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });
  
  module.exports = router;
  