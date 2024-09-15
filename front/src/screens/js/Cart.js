// Cart.js
import React from 'react';
import { useCart } from '../../components/js/CartContext';
import axios from 'axios';
import Navbar from '../../components/js/Navbar';
import '../styles/Cart.css';
function Cart() {
  const { cartItems, clearCart } = useCart();

  const handleCheckout = async () => {
    const userEmail = localStorage.getItem("userEmail");

    try {
      // Ensure that 'discount' field is set for each item
      const itemsWithDiscount = cartItems.map(item => ({
        ...item,
        discount: item.discount || 0, // Set a default value if 'discount' is not provided
      }));

      // Send the updated data to the server, including userEmail
      await axios.post('https://shop-production-09d5.up.railway.app/api/checkout', { cartItems: itemsWithDiscount, userEmail });

      // Show success message to the user
      alert('Order placed successfully!');

      // Clear the cart after successful checkout
      clearCart();
    } catch (error) {
      // Handle errors during checkout
      console.error('Error during checkout:', error);
      alert('Error during checkout. Please try again later.');
    }
  };

  return (
    <div>
      <Navbar setSearchResults={() => {}} />
      <div>
        <h2>Shopping Cart</h2>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
              <p>Quantity: {item.stock}</p>
              <p>Discount: {item.discount}%</p>
              <p>Total Price: ${item.stock * item.price}</p>
            </li>
          ))}
        </ul>
        {cartItems.length > 0 && (
          <button className='checkout-btn' onClick={handleCheckout}>
            Checkout
          </button>
        )}
      </div>
    </div>
  );
}

export default Cart;
