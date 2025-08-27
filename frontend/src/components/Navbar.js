import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // optional custom styles

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm fixed-top py-1">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand fw-bold fs-4 text-uppercase" to="/">
          LOGO
        </Link>

        {/* Toggler button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/product/create">
                 Create
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                  Product List
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
