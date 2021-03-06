import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import { Button,Container,Row,Col,Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Registration.css';
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
  componentDidMount() {
    document.body.className="registrationbody";
    if(this.props.location.state){
      this.setState({
        incorrectDetails:this.props.location.state.registrationError
      })
    }
  }
  constructor(props) {
    super(props);
 
    this.state = {
      
      name : "",
      email : "",
      password: "",
      profileImage:null,
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

    if(event.target.files){
      this.setState({
        profileImage: event.target.files[0],
      })
    }


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
    if(!event.target.files){
      this.setState({ errors ,[stateToBeChanged] : valueToBeChanged });
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    
    if(!validateForm(this.state.errors,this.state.name,this.state.email,this.state.password)) {
        return ;
    }
    const form = new FormData();
    
    form.append("email", this.state.email);
    form.append("name", this.state.name);
    form.append("password",this.state.password);
    form.append("image",this.state.profileImage)
    this.props.register(form)
    .then(response=>{
      if(!response.data.error){
        this.props.history.push('/login');
      }
      else{
        this.props.history.push({
          pathname:'/register',
          state: {registrationError:response.data.error}
        });
        window.location.reload();
      }
        
    })
    
    this.setState({
      name : "",
      email : "",
      password: "",  
    });
  }
  render() {
    const {errors} = this.state;
    const registrationError= this.state.incorrectDetails;
    return (
      <div>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        <Container>
        <Row>
        <Col md={{ span: 5, offset: 3 }}>
        <br /><br />
        <Col md={{ offset: 1 }}>
        <form onSubmit={this.handleSubmit} >
        <h3>Sign Up</h3>
          <div className="form-group">
            <label>Name</label>
            <input className="form-control" placeholder="Name" name="name" id="name" type="text" onChange={this.handleChange} value={this.state.name}  />
          </div>
          
          {errors.name.length > 0 && 
              <span className='error-message'>{errors.name}</span>}
          <div className="form-group">
            <label>Email address</label>
            <input className="form-control" placeholder="Enter email" name="email" id="email" type="email" onChange={this.handleChange} value={this.state.email} />
          </div>
          
          {errors.email.length > 0 && 
            <span className='error-message'>{errors.email}</span>}
          <div className="form-group">
            <label>Password</label>
            <input className="form-control" placeholder="Enter password" name="password" id="password" type="password" onChange={this.handleChange} value={this.state.password} />
          </div>
          
          {errors.password.length > 0 && 
            <span className='error-message'>{errors.password}</span>}
          <div className="form-group">
            <label>Profile Image</label>
            <input  className="form-control" name="profileImage" id="profileImage" type="file" onChange={this.handleChange}></input>
          </div>
          
          <Row>&nbsp; &nbsp;</Row>
          {this.props.loading ? <Button variant="primary" disabled>
                                  <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                  />
                                  &nbsp; Signing Up.....</Button>
                                  : <button type="submit" className="btn btn-primary btn-block">Sign Up</button>}
          {registrationError && 
            <span className='error-message'>{registrationError}</span>}
        </form>
        </Col>
        </Col>
        </Row>
        </Container>  
      </div>
    )

  }
}

export default Registration;
