import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import SearchProjects from './SearchProjects';
import AddProject from './AddProject';
import Project from './SingleProject';
import Registration from './auth/registration';
import Login from './auth/login';
import Header from './Header';
import Test from './test';
import { Redirect } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import AuthService from '../services/auth_service';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    
     JSON.parse(localStorage.getItem('token'))  &&  Date.now()/1000 < jwt_decode(JSON.parse(localStorage.getItem('token'))).exp 
      ? <Component {...props} />
      : <Redirect to='/logout' />
     
  )} />
)
class Logout extends Component {
  componentDidMount() {
    console.log('hey')
    AuthService.logout();
    this.props.history.push('/login');
    window.location.reload();
  }
  render() {
    return (
      <div></div>
    );
  }
}

class App extends Component {
  render() {
    return (
    <Router>
        <div>
          <Header />
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/search' component={SearchProjects} />
              <Route path='/project/:PROJECT' component={Project} />
              <PrivateRoute path='/add-project' component={AddProject} />
              <Route path='/register' component={Registration} />
              <Route path='/login' component={Login} />
              <Route path='/logout' component={Logout} />
              <PrivateRoute path='/test' component={Test} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;