import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar, Nav,NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import store from '../redux/store';
import Home from './Home';
import SearchProjects from './SearchProjects';
import AllProjects from './AllProjects';
import AddProject from './AddProject';
import Project from './SingleProject';
import Registration from './auth/registration';
import Login from './auth/login';
import Cart from './user/cart'
import OrderConfirm from './user/orderconfirm';
import Dashboard from './user/dashboard';
import jwt_decode from "jwt-decode";
import './App.css'; 

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    
     JSON.parse(localStorage.getItem('token'))  &&  Date.now()/1000 < jwt_decode(JSON.parse(localStorage.getItem('token'))).exp 
      ? <Component {...props} />
      : {...rest}.logout(props)
     
  )} />
)

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined,
      authLoading: false
    };
  }
   componentDidMount() {
    const token = JSON.parse(localStorage.getItem('token'));
    if(!token){
      this.logoutHandler();
      return ;
    }
    const expiryDate = jwt_decode(JSON.parse(localStorage.getItem('token'))).exp;

    if(Date.now()/1000 > expiryDate){
      this.logoutHandler();
      return ;
    }
    const user = this.getCurrentUser();
    this.setState({
      currentUser: user,
    });
    const remainingMilliseconds =  expiryDate - Date.now()/1000;
    this.setAutoLogout(remainingMilliseconds);
  }
  setAutoLogout = milliseconds => {
    
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds*1000);
  };
  logoutHandler= (props) =>{
    
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    this.setState({
      currentUser: undefined
    });  
    if(!this.props.history && props && props.history){
      props.history.push('/login');
    }
    
  }
  login=(email,password)=>{
    this.setState({
      authLoading: true
    });  
    return axios
    .post('/user/login',{
        email,
        password
    })
    .then(response=>{
        if(response.data.token){
            localStorage.setItem("user", JSON.stringify(jwt_decode(response.data.token)));
            localStorage.setItem("token", JSON.stringify(response.data.token));
            this.setState({
              currentUser: JSON.stringify(jwt_decode(response.data.token)),
              authLoading: false
            });  
            // this.props.history.push('/');
            return response;
        }
        else{
          this.setState({
            authLoading: false
          });
          return response;
        }
        
    });
}
register=(formData)=> {
  this.setState({
    authLoading: true
  });
    return axios.post("/user/register", formData,{ headers: { "Content-Type": "multipart/form-data" } })
    .then(response=>{
      this.setState({
        authLoading: false
      });
      return response;
    })
}

getCurrentUser=()=> {
    return JSON.parse(localStorage.getItem('user'));;
  }
  render() {
    const isLoggedIn = this.state.currentUser
    
    
    if(isLoggedIn){
      var toAddProject=<Link to={'/add-project'} className="nav-link">Sell</Link>;
      var toUser= <NavDropdown title="User"  id="basic-nav-dropdown">
                    <NavDropdown.Item ><Link to={'/dashboard'} className="nav-link" >Dashboard</Link></NavDropdown.Item>
                    <NavDropdown.Divider />
                    <Link to={'/login'} className="nav-link" onClick={this.logoutHandler}><NavDropdown.Item >Sign Out</NavDropdown.Item></Link>
                  </NavDropdown> 

      var cart = <Link to={'/cart'} className="nav-link">Cart</Link>;
    }
    else{
      var toSignIn=<Link to={'/login'} currentUser={this.state.currentUser} className="nav-link">Sign In</Link>;
      var toSignUp=<Link to={'/register'} className="nav-link">Sign Up</Link>;
    }
    return (
    <Provider store={store}>
    <Router>
        <div>
        <Navbar bg="light" expand="lg">
        <Link to={'/'} className="nav-link">Project Assist</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Link to={'/search'} className="nav-link">Search</Link>
              <Link to={'/'} className="nav-link">Home</Link>
              {toAddProject}
              {cart}
              {toSignIn}
              {toSignUp}
              <Link to={'/projects'} className="nav-link">All Projects</Link>
              
              {toUser}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Nav> 
          </Navbar.Collapse>
        </Navbar> 
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/search' component={SearchProjects} />
              <Route path='/projects' component={AllProjects} />
              <Route path='/project/:PROJECT' component={Project} />
              <PrivateRoute path='/add-project' component={AddProject} logout={this.logoutHandler} />
              <Route path='/register' component={(props) => (<Registration register={this.register} loading={this.state.authLoading}  {...props} />)}  />
              <Route path='/login' component={(props) => (<Login login={this.login} loading={this.state.authLoading} {...props} />)} />
              <PrivateRoute path='/cart' component={Cart} logout={this.logoutHandler} />
              <PrivateRoute path='/orderplaced' component={OrderConfirm} logout={this.logoutHandler} />
              <PrivateRoute path='/dashboard' component={Dashboard} logout={this.logoutHandler} />
          </Switch>
            <Navbar bg="light" fixed="bottom" >
            About Me &nbsp;&nbsp;&nbsp;
            <a className="nav-link" href="https://in.linkedin.com/in/puneet-manghwani-86191b169"  target="_blank" rel="noopener noreferrer">Linkedlin</a> 
            <a className="nav-link" href="https://github.com/puneetmanghwani/"  target="_blank" rel="noopener noreferrer">Github </a>
              </Navbar>
        </div>
      </Router>
      </Provider>
    );
  }
}

export default App;