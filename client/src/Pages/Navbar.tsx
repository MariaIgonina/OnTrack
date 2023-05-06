import React from "react";
import { Outlet, Link } from 'react-router-dom';

const Navbar = () => {
    return (
      <>
      <nav>
        <ul>
          <li>
            <Link to="/">
              Login
            </Link>
          </li>

          <li>
            <Link to="/user">
              User Page
            </Link>
          </li>

          <li>
            <Link to="/company">
              Company Page
            </Link>
          </li>

          <li>
            <Link to="/dashboard">
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/track">
              Track
            </Link>
          </li>

        </ul>
      </nav>

      <Outlet />
    </>
    );
  };

export default Navbar;