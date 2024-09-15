import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';
export default function Footer() {
  return (
    <div>
      <footer className="footer">
    <div className="footer-div">
      <Link href="/" className="footer-link">
       </Link>
      <span className="text-muted">© 2023 Shoppers, Inc</span>
    </div>

    
  </footer>
    </div>
  )
}