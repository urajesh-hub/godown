import React from "react";
import { Link } from 'react-router-dom';
import './Navbar.css'; // Ensure the path is correct

const Navbar = () => {
  return (
    <div>
      <nav>
        <Link to="/">HOME</Link> | 
        <Link to="/EditGodown">EDIT GODOWN</Link> | 
        <Link to="/qrcode">QR CODE</Link>
      </nav>
      <p className="">Welcome to the application! Select an option from the menu above.</p>
    </div>
  );
};

export default Navbar;
