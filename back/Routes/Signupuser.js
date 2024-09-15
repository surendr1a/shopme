const express = require('express');
const router = express.Router();
const User = require('../Model/User');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtSecret = 'MynameisEndtoEndYoutubeChannel$#';

router.post('/createuser', 
  [
    body('name').isLength({ min: 4 }),
    body('email').isEmail(),
    body('password', 'make password at least 5 digits').isLength({ min: 5 })
  ],
  async (req, res) => {
    console.log("post me pohoch gya", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(401).json({ success: false, message: 'Email already exists. Try with a new one or login.' });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        location: req.body.location,
        email: req.body.email
      });
      res.json({ success: true });
    } catch (error) {
      console.log("ye wala error hai", error);
      res.json({ success: false, message: 'Error creating user.' });
    } 
  }
);

module.exports = router;
