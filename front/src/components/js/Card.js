import React, { useState } from 'react';
import '../styles/Card.css';
import { useCart } from './CartContext';

function Card({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { addToCart } = useCart();

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value, 10) || 1);
  };

  const handleAddToCart = () => {
    addToCart({ ...product, stock: quantity });
  };

  const calculateTotalPrice = () => {
    return (quantity * product.price).toFixed(2);
  };

  return (
    <div className="product-card">
      <div className="product-details">
        <img src={product.image} alt={product.title} />
        <h3>{product.title}</h3>
        <p>{`Discount ${product.discount}%`}</p>
        <h3>{`$${product.price}`}</h3>
        <h3>{`Rating=> ${product.rating}`}</h3>
        {showFullDescription ? (
          <div>
            <p>{product.description}</p>
            <button onClick={() => setShowFullDescription(false)}>Less</button>
          </div>
        ) : (
          <div>
            <p>{product.description.substring(0, 50)}</p>
            {product.description.length > 50 && (
              <button onClick={() => setShowFullDescription(true)}>More</button>
            )}
          </div>
        )}
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
        />
        <p>{`Total: $${calculateTotalPrice()}`}</p>
        <button onClick={handleAddToCart}>Add To Cart</button>
      </div>
    </div>
  );
}

export default Card;
 