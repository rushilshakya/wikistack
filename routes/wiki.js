const express = require('express');
const db = require('../models');
const router = express.Router();
const addPage = require('../views/addPage');

router.get('/', async (req, res, next) => {
  try {
    const pages = await db.Page.findAll();
    console.log(pages);
    res.send('this is the wiki page');
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  // const user = new db.User({
  //   name: req.body.author,
  //   email: req.body.email,
  // });

  // try {
  //   await user.save();
  // } catch (err) {
  //   next(err);
  // }

  const page = new db.Page({
    title: req.body.title,
    slug: makeSlug(req.body.title),
    content: req.body.content,
    status: req.body.status,
  });

  try {
    await page.save();
  } catch (err) {
    next(err);
  }

  res.redirect('/wiki');
  // res.json(req.body);
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

function makeSlug(title) {
  let str = '';
  for (let i = 0; i < title.length; i++) {
    let currChar = title[i];
    if (currChar === ' ') str += '_';
    else str += currChar;
  }

  return str;
}

module.exports = router;
