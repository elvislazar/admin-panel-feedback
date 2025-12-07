import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "../styles/style.css";

const Navbar = () => {
  return (
    <AppBar position="static" className="navbar-root">
      <Toolbar className="navbar-toolbar">
        <Typography variant="h6" className="navbar-title">Admin Panel</Typography>

        <div className="navbar-links">
          <Button component={Link} to="/dashboard" className="navbar-btn">
            Dashboard
          </Button>
          <Button component={Link} to="/add-feedback" className="navbar-btn">
            Add Feedback
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
