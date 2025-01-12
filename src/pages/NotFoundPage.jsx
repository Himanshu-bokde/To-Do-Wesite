import React from "react";
import "../styles/NotFoundPage.css";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="not-found-container">
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link to="/dashboard" className="go-home-btn">
        Go DashBoard
      </Link>
    </div>
  );
}

export default NotFoundPage;
