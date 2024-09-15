// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/js/Home';
import Login from './screens/js/Login';
import Cart from './screens/js/Cart';
import Signup from './screens/js/Signup';
import { CartProvider } from './components/js/CartContext';
import Myorder from './screens/js/Myorder';

function App() {
  return (
    <CartProvider>
      <div>
        <Router> 
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/myorder" element={<Myorder/>}/>
          </Routes>
        </Router>
      </div>
    </CartProvider>
  );
}

export default App;
