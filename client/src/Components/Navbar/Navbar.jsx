import React from "react";
import './Navbar.css';

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg">
      <h1 className="navbar-brand">Farmer's Almanac</h1>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            {!props.isLoggedIn && (
              <a className="nav-link" href="/">
                Sign In <span className="sr-only">(current)</span>
              </a>
            )}
          </li>
          <li className="nav-item active" onClick={props.logOut}>
            {props.isLoggedIn && (
              <a className="nav-link" href="/">
                Log Out <span className="sr-only">(current)</span>
              </a>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
