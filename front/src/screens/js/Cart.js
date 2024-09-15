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
      const itemsWithDiscount = cartItems.map(item => ({
        ...item,
        discount: item.discount || 0,
      }));

      await axios.post('https://shopme-back.vercel.app/api/checkout', { cartItems: itemsWithDiscount, userEmail });

      alert('Order placed successfully!');
      clearCart();
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Error during checkout. Please try again later.');
    }
  };

  return (
    <div>
      <Navbar setSearchResults={() => {}} />
      <div>
        <h2>Shopping Cart</h2>
        {cartItems.length > 0 ? (
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
                <p>Quantity: {item.stock}</p>
                <p>Discount: {item.discount}%</p>
                <p>Total Price: ${(item.stock * item.price).toFixed(2)}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}
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
