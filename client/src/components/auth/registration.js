import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import { Button } from 'react-bootstrap';

const TITLE = 'Sign Up';
const validEmailRegex = 
//eslint-disable-next-line
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validateForm = (errors,name,email,password) => {
  let valid = true;
  Object.values(errors).forEach(
    // if we have an error string set valid to false
    (val) => val.length > 0 && (valid = false)
  );
  if(!name.length>0 || !email.length>0 || !password.length>0){
    valid=false
  }
  return valid;
}
  
class Registration extends Component {  
  constructor(props) {
    super(props);
 
    this.state = {
      
      name : "",
      email : "",
      password: "",
      errors: {
        name: '',
        email: '',
        password: '',
      }
      
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    const stateToBeChanged = event.target.name;
    const valueToBeChanged = event.target.value;
    
    let errors = this.state.errors;
    switch (stateToBeChanged) {
      case 'name': 
        errors.name = 
          valueToBeChanged.split(" ").length >= 2
            ? ''
            : 'Name should be Full Name';
        break;
      case 'email': 
        errors.email = 
          validEmailRegex.test(valueToBeChanged)
            ? ''
            : 'Email is not valid!';
        break;
      case 'password': 
        errors.password = 
        valueToBeChanged.length < 8
            ? 'Password must be 8 characters long!'
            : '';
        break;
      default:
        break;
    }

    this.setState({ errors ,[stateToBeChanged] : valueToBeChanged });
  }
  handleSubmit(event) {
    event.preventDefault();

    if(!validateForm(this.state.errors,this.state.name,this.state.email,this.state.password)) {
        return ;
    }
    
    this.props.register(
      this.state.email,
      this.state.name,
      this.state.password
    ).then(response=>{
      console.log(response);
      this.props.history.push('/login');
    })
    this.setState({
      name : "",
      email : "",
      password: "",  
    });
  }
  render() {
    const {errors} = this.state;

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
          {errors.name.length > 0 && 
              <span className='error'>{errors.name}</span>}
          <label>
            Email Address:
            <input name="email" id="email" type="email" onChange={this.handleChange} value={this.state.email} />
          </label>
          {errors.email.length > 0 && 
            <span className='error'>{errors.email}</span>}

          <label>
            Password:
            <input name="password" id="password" type="password" onChange={this.handleChange} value={this.state.password} />
          </label>
          {errors.password.length > 0 && 
            <span className='error'>{errors.password}</span>}

          <Button design="raised" type="submit" disabled={this.props.loading}>
            {this.props.loading ? 'Signing Up' : 'Sign Up'}
          </Button>
        </form>  
      </div>
    )

  }
}

export default Registration;
