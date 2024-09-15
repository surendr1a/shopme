// routes/orders.js
const express = require('express');
const router = express.Router();
const Order = require('../Model/Order');

router.post('/checkout', async (req, res) => {
  try {
    const { cartItems, userEmail } = req.body;

    // Find existing orders for the user
    let existingOrders = await Order.findOne({ userEmail });

    if (!existingOrders) {
      // If no existing orders, create a new one
      existingOrders = new Order({
        items: [],
        totalAmount: 0,
        userEmail,
      });
    }

    // Process and append the new order
    const orderItems = cartItems.map((item) => ({
      title: item.title,
      description: item.description,
      quantity: item.stock,
      discount: item.discount,
      total: item.stock * item.price,
    }));

    const totalAmount = cartItems.reduce((total, item) => total + item.stock * item.price, 0);

    existingOrders.items.push(...orderItems);
    existingOrders.totalAmount += totalAmount;

    // Save the order
    await existingOrders.save();

    res.status(201).json({ message: 'Order placed successfully!' });
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/myorders', async (req, res) => {
  try {
    // Fetch all orders from the database
    const allOrders = await Order.find();

    // Respond with the fetched orders
    res.status(200).json({ allOrders });
  } catch (error) {
    // Handle any errors that occur during the database operation
    console.error('Error fetching all orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// router.get('/myorders', async (req, res) => {
//   try {
//  console.log("ye rha bhai dekh le " , req.user);

//     if (!req.user || !req.user.email) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }

//     const userEmail = req.user.email;

//     // Fetch orders based on userEmail
//     const orders = await Order.find({ userEmail });

//     res.status(200).json({ orders });
//   } catch (error) {
//     console.error('Error fetching user orders:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

module.exports = router;