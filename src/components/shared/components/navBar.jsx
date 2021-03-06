import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        My App
      </Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        <NavLink className="nav-link" to="/movies">
          Movies
        </NavLink>
        <NavLink className="nav-link" to="/customers">
          Customers
        </NavLink>
        <NavLink className="nav-link" to="/rentals">
          Rentals
        </NavLink>
      </div>
      <div className="d-flex">
      <NavLink style={{fontWeight: 'bold' , color: '#F0DB4F', background: '#323330'}}  className="nav-link" to="/js-playground">
          JS Playground
        </NavLink>
        <NavLink className="nav-link" to="/login">
          <i
            style={{ color: "black", fontSize: "1.5rem" }}
            className="fa fa-sign-in"
          ></i>
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
