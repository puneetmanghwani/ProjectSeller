import React, { Component } from 'react';
import { Helmet } from 'react-helmet'

import AuthService from '../../services/auth_service';
const TITLE = 'Sign In';

class Login extends Component {  
  constructor(props) {
    super(props);
 
    this.state = {
      
      email : "",
      password: "",
      
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    const stateToBeChanged = event.target.name;
    const valueToBeChanged = event.target.value;
    
    this.setState({ [stateToBeChanged] : valueToBeChanged });
  }
  handleSubmit(event) {
    event.preventDefault();

    AuthService.login(this.state.email, this.state.password)
    .then(response=>{
      console.log(response.token);
      this.props.history.push('/');
      window.location.reload();
    })
    // const requestOptions = {
    //   method: 'POST',
    //   body: JSON.stringify({ email: this.state.email , password: this.state.password }),
    //   headers: {  "Content-Type": "application/json" },
    // };
    // fetch('http://127.0.0.1:8000/user/login', requestOptions)
    // .then(response => response.json())
    // .then(data => {
    //   if (data.token){
    //     console.log(jwt_decode(data.token));
    //   }
    //   else{
    //     console.log(data);
    //   }
    // }); 
 
    this.setState({
      email : "",
      password: "",  
    });
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email Address:
            <input name="email" id="email" type="email" onChange={this.handleChange} value={this.state.email} />
          </label>
          <label>
            Password:
            <input name="password" id="password" type="password" onChange={this.handleChange} value={this.state.password} />
          </label>
        <input type="submit" value="Submit" />
        </form>  
      </div>
    )

  }
}

export default Login;
