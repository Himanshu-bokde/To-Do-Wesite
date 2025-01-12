// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import "../styles/Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <header className="navbar">
      <nav>
        <ul className="navbar-list">
          <li>
            <Link to="/dashboard">Home</Link>
          </li>
          <li>
            <Link to="/" onClick={() => dispatch(logout())}>
              Log out
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
