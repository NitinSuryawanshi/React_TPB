import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <Link className="navbar-brand" to="/">
        JDA ThirdPartyBilling
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/user">
              Users
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/invoice">
              Invoice
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/baseTransactions">
              Base Transactions
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/rules">
              Rules
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
