// CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const existingItemIndex = cartItems.findIndex((i) => i.id === item.id);

    if (existingItemIndex !== -1) {
      // If item already exists, update the quantity
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].stock += item.stock;
      setCartItems(updatedCart);
    } else {
      // If item is new, add it to the cart
      setCartItems([...cartItems, item]);
    }
  };

  const clearCart = () => {
    // Clear the cart by setting an empty array
    setCartItems([]);
  };

  const value = {
    cartItems,
    addToCart,
    clearCart, // Include the clearCart function in the value
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
