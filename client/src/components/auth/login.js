import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
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
      },
      incorrectDetails:undefined
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }
  componentDidMount() {
    document.body.className="loginbody"
    if(this.props.location.state){
      this.setState({
        incorrectDetails:this.props.location.state.loginError
      })
    }
    
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
      if(response.data.token){
        
        this.props.history.push('/');
      }
      else{
        this.props.history.push({
          pathname:'/login',
          state: {loginError:response.data.error}
        });
        window.location.reload();
      }
    })
 
 
    this.setState({
      email : "",
      password: "",  
    });
  }
  render() {
    const {errors} = this.state;
    const loginError= this.state.incorrectDetails;
    return (
      <div>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        <div >
        <form onSubmit={this.handleSubmit} className="loginform">
        {/* <div class="col-lg-4 col-lg-offset-4"> */}
          <h3>Sign In</h3>
          <div className="form-group">
            <label>Email address</label>
            <input className="form-control " placeholder="Enter email" name="email" id="email" type="email" onChange={this.handleChange} value={this.state.email} />
          </div>
          {/* <label>
            Email Address:
            <input name="email" id="email" type="email" onChange={this.handleChange} value={this.state.email} />
          </label> */}
          {errors.email.length > 0 && 
            <span className='error-message'>{errors.email}</span>}
          <div className="form-group">
            <label>Password</label>
            <input className="form-control" placeholder="Enter password" name="password" id="password" type="password" onChange={this.handleChange} value={this.state.password} />
          </div>
          {/* <label>
            Password:
            <input className="form-control" placeholder="Enter password" name="password" id="password" type="password" onChange={this.handleChange} value={this.state.password} />
          </label> */}
          <button type="submit" className="btn btn-primary btn-block">
            {this.props.loading ? 'Signing In...' : 'Sign In'}
          </button>
          {loginError && 
            <span className='error-message'>{loginError}</span>}
        </form>  
        </div>
       
        
            
      </div>
    )

  }
}

export default Login;
