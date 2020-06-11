import React, { Component } from 'react';
import { Navbar, Nav,NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './Header.css';


class Header extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Link to={'/'} className="nav-link">Project Assist</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Link to={'/search'} className="nav-link">Search</Link>
              <Link to={'/'} className="nav-link">Home</Link>
              <Link to={'/add-project'} className="nav-link">Add Project</Link>
              <Link to={'/login'} className="nav-link">Sign In</Link>
              <Link to={'/registration'} className="nav-link">Sign Up</Link>
              <Nav.Link href="#link">Buy</Nav.Link>
              <Nav.Link href="#link">Sell</Nav.Link>
              <NavDropdown title="User" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Dashboard</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Sign Out</NavDropdown.Item>
               </NavDropdown>
            </Nav> 
          </Navbar.Collapse>
        </Navbar> 
    )

  }
}

export default Header;
