import React, { Component } from 'react';
import { Helmet } from 'react-helmet'


const TITLE = 'Sign Up';

class Registration extends Component {  
  constructor(props) {
    super(props);
 
    this.state = {
      
      name : "",
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
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({ email: this.state.email , name : this.state.name , password: this.state.password }),
      headers: {  "Content-Type": "application/json" },
    };
    fetch('http://127.0.0.1:8000/user/register', requestOptions)
    .then(response => response.json())
    .then(data => console.log(data)); 
 
    this.setState({
      name : "",
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
            Name:
            <input name="name" id="name" type="text" onChange={this.handleChange} value={this.state.name} />
          </label>
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

export default Registration;
