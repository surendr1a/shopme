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
    navigate('/cart', { state: { cartItem: item } });
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/fooddata')
      .then(response => {
        const fetchedProducts = response.data.fooddata || [];
        console.log('Fetched Products:', fetchedProducts);
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
          searchResults.map(result => (
            <Cards key={result._id} product={result} addToCart={addToCart} />
          ))
        ) : (
          products.length > 0 ? (
            products.map(product => (
              <Cards key={product._id} product={product} addToCart={addToCart} />
            ))
          ) : (
            <p>No products found.</p>
          )
        )}
      </div>
      <Footer />
    </div>
  );
}
