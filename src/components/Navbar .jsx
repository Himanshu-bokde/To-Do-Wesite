// src/components/Navbar.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUserName } from "../redux/slices/authSlice";
import "../styles/Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const name = useSelector(selectUserName); // G
  return (
    <header className="navbar">
      <nav>
        <ul className="navbar-list">
        <li>Welcome, {name}</li> {/* Display user name */}
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
