import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import { Button } from 'react-bootstrap';

const TITLE = 'Sign In';
const validEmailRegex = 
//eslint-disable-next-line
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validateForm = (errors,email,password) => {
  let valid = true;
  Object.values(errors).forEach(
    // if we have an error string set valid to false
    (val) => val.length > 0 && (valid = false)
  );
  if(!email.length>0 || !password.length>0){
    valid=false
  }
  return valid;
}
class Login extends Component {  
  constructor(props) {
    super(props);
 
    this.state = {
      
      email : "",
      password: "",
      errors: {
        email: '',
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

      case 'email': 
        errors.email = 
          validEmailRegex.test(valueToBeChanged)
            ? ''
            : 'Email is not valid!';
        break;
      default:
        break;
    }
    this.setState({ errors ,[stateToBeChanged] : valueToBeChanged });
  }
  handleSubmit(event) {
    event.preventDefault();
    if(!validateForm(this.state.errors,this.state.email,this.state.password)) {
      return ;
    }
    this.props.login(this.state.email, this.state.password)
    .then(response=>{
      console.log(response.token);
      this.props.history.push('/');
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
    const {errors} = this.state;
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
          {errors.email.length > 0 && 
            <span className='error'>{errors.email}</span>}
          <label>
            Password:
            <input name="password" id="password" type="password" onChange={this.handleChange} value={this.state.password} />
          </label>
          <Button design="raised" type="submit" disabled={this.props.loading}>
            {this.props.loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>  
      </div>
    )

  }
}

export default Login;
