const express = require('express');
const db = require('../models');
const router = express.Router();
const addPage = require('../views/addPage');
const wikiPage = require('../views/wikipage');
const mainPage = require('../views/main');

router.get('/', async (req, res, next) => {
  try {
    const pages = await db.Page.findAll();
    res.send(mainPage(pages));
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
    content: req.body.content,
    status: req.body.status,
  });

  try {
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (err) {
    next(err);
  }

  // res.json(req.body);
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  try {
    const page = await db.Page.findOne({
      where: { slug: req.params.slug },
    });
    res.send(wikiPage(page));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
