// Routes/FoodData.js

const express = require('express');
const router = express.Router();

router.get('/fooddata', async (req, res) => {
  try {
    // Use the data from global.products
    const foodData = global.products;
    res.send({
      fooddata: foodData
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
