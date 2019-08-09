const express = require('express');
const db = require('../models');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await db.User.findAll();
    console.log(users);
    res.send('this is the users page');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
