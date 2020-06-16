import React, { Component } from 'react';
import { Navbar, Nav,NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthService from "../services/auth_service";
import 'bootstrap/dist/css/bootstrap.min.css';



class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }
  render() {
    const isLoggedIn = this.state.currentUser
    
    if(isLoggedIn){
      var toAddProject=<Link to={'/add-project'} className="nav-link">Sell</Link>;
      var toTest=<Link to={'/test'} className="nav-link" >Test</Link>;
      var toLogout=<Link to={'/logout'} className="nav-link">Logout</Link>;
      var toUser= <NavDropdown title="User" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Dashboard</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Profile</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Sign Out</NavDropdown.Item>
                  </NavDropdown> 

      var cart = <Link to={'/cart'} className="nav-link">Cart</Link>;
    }
    else{
      var toSignIn=<Link to={'/login'} className="nav-link">Sign In</Link>;
      var toSignUp=<Link to={'/register'} className="nav-link">Sign Up</Link>;
    }
    
    return (
      <Navbar bg="light" expand="lg">
        <Link to={'/'} className="nav-link">Project Assist</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Link to={'/search'} className="nav-link">Search</Link>
              <Link to={'/'} className="nav-link">Home</Link>
              {toAddProject}
              {cart}
              {toTest}
              {toSignIn}
              {toSignUp}
              {toLogout}
              <Link to={'/projects'} className="nav-link">All Projects</Link>
              {toUser}
            </Nav> 
          </Navbar.Collapse>
        </Navbar> 
    )

  }
}

export default Header;
