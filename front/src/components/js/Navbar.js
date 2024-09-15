// Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import Search from './Search'; // Import the Search component

function Navbar({ setSearchResults }) {
  let navigate = useNavigate();
  const authToken = localStorage.getItem('authToken');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  const handleSearch = async (searchTerm) => {
    try {
      // Send the search term to your backend API
      const response = await fetch(`https://shop-production-09d5.up.railway.app/api/search?term=${searchTerm}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Handle the response from your backend
        const searchData = await response.json();
        setSearchResults(searchData.results);
      } else {
        console.error('Error searching:', response.status);
      }
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <div className="navbar-container">
      <div className="logo-container">
        <img src="/img/shoppers3.png" alt="Logo" className="logo" />
      </div>

      {/* Include the Search component here */}
      <Search onSearch={handleSearch} />
      <div className="account-container">
            <Link to="/">
              <button className="login-btn">Home</button>
            </Link>
          </div>
      {authToken ? (
        <>
          <div className="account-container">
            <Link to="/myorder">
              <button className="login-btn">My Order</button>
            </Link>
          </div>
          <div className="account-container">
            <Link to="/cart">
              <button className="login-btn">Cart🛒</button>
            </Link>
          </div>
          <div className="account-container">
            <button className="signup-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="account-container">
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>
          </div>
          <div className="account-container">
            <Link to="/signup">
              <button className="signup-btn">Signup</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar;
