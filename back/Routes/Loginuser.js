const express = require('express');
const router = express.Router();
const User = require('../Model/User');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const jwtSecret = 'MynameisEndtoEndYoutubeChannel$#';

router.post('/enteruser', [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found. Try logging in with correct credentials!' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ success: false, message: 'Wrong password. Try logging in with correct credentials!' });
    }

    const data = {
      user: {
        id: user.id,
        email: user.email,
      }
    };

    const authToken = jwt.sign(data, jwtSecret);

    return res.json({ success: true, authToken, userEmail: user.email });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
