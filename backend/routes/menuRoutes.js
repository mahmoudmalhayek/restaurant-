// routes/menuRoutes.js
const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');

router.get('/', async (req, res) => {
  try {
    const menu = await Menu.find({});
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
