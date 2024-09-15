const express = require('express');
const router = express.Router();
const connection = require('../Db');

router.get('/search', async (req, res) => {
  const searchTerm = req.query.term;

  if (!searchTerm) {
    return res.status(400).json({ error: 'Search term is required' });
  }

  try {
    const db = await connection();

    if (!db) {
      console.error('Error connecting to the database');
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const result = await db.collection('products').find({
      title: { $regex: new RegExp(searchTerm, 'i') },
    }).toArray();

    return res.json({ results: result });
  } catch (error) {
    console.error('Error searching:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
