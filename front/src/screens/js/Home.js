// Home.js
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/js/Navbar';
import Cards from '../../components/js/Card';
import Footer from '../../components/js/Footer';
import '../styles/Home.css';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const addToCart = (item) => {
    // Correct usage of navigate to route with state
    navigate('/cart', { state: { cartItem: item } });
  };

  useEffect(() => {
    // Fetch data from MongoDB using your backend API
    axios.get('https://shop-production-09d5.up.railway.app/api/fooddata')
      .then(response => {
        // Ensure fetchedProducts is an array
        const fetchedProducts = response.data.fooddata || [];
        console.log('Fetched Products:', fetchedProducts); // Debugging statement
        setProducts(fetchedProducts);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <Navbar setSearchResults={setSearchResults} />
      <div className='home-container'>
        {searchResults.length > 0 ? (
          // Display search results if available
          searchResults.map(result => (
            <Cards key={result._id} product={result} addToCart={addToCart} />
          ))
        ) : (
          // Display products if no search results
          products.length > 0 ? (
            products.map(product => (
              <Cards key={product._id} product={product} addToCart={addToCart} />
            ))
          ) : (
            // Display message when no results are found
            <p>Result not found.</p>
          )
        )}
      </div>
      <Footer />
    </div>
  );
}
