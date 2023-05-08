import React from "react";
import { Outlet, Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import InsightsIcon from '@mui/icons-material/Insights';
import DashboardIcon from '@mui/icons-material/Dashboard';

const Navbar = () => {
    return (
      <div className="navbar">
        <nav>

          <Link to="/" className="link">
            Login
          </Link>
        
          <Link to="/adduser" className="link">
            Add user
          </Link>

          <Link to="/company" className="link">
            Company Page
          </Link>

          <Link to="/user" className="link">
            <HomeIcon className="icon" />
          </Link>
        
          <Link to="/dashboard" className="link">
            <DashboardIcon className="icon" />
          </Link>
        
          <Link to="/track" className="link">
            <InsightsIcon className="icon" />
          </Link>

          <Link to="/settings" className="link">
            <SettingsIcon className="icon" />
          </Link>

        </nav>
      <Outlet />
    </div>
    );
  };

export default Navbar;