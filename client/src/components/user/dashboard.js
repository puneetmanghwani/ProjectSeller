import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import axios from "axios";
import authHeader from '../../services/auth_header';

const TITLE = 'Dashboard';

class Dashboard extends Component {  
    constructor(props) {
        super(props);
        this.state = {
          email:"",
          name:"",
          userImage:undefined
        };
    }
  

  componentDidMount() {
    this.getUserDetails();
  }
  getUserDetails=()=>{
    axios.get('http://localhost:8000/user/details',{ headers: authHeader() })
    .then(user => {
    
      const {email,name,profileImage}=user.data;
      const image=profileImage.split('\\');
      const userImage=image[image.length-1];
      
      this.setState({
        email,
        name,
        userImage
      })
    });
  }
  
  render() {
    return (
      <div>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
       Dashboard  
       {this.state.name}
       {this.state.email}
       <img src={'http://localhost:8000/profile/'+this.state.userImage} alt="User" /> 
      </div>
    )

  }
}

export default Dashboard;
