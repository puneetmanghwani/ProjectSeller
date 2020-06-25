import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import { Button } from 'react-bootstrap';
import axios from "axios";
import { connect } from 'react-redux'
import {fetchJoke} from '../../redux/joke/jokeActions';
import authHeader from '../../services/auth_header';
import './Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    document.body.className="dashboardBody";
    this.props.fetchJoke();
    this.getUserDetails();
  }
  getUserDetails=()=>{
    axios.get('/user/details',{ headers: authHeader() })
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
       <div className="head">
       <h2>Dashboard</h2>  
       </div>
       <div className="profileData">
       Name : &nbsp; &nbsp; {this.state.name} <br />
       Email : &nbsp; &nbsp; {this.state.email}
       </div>
       <div className="profileImage"><img src={'http://localhost:8000/profile/'+this.state.userImage} alt="User" /></div>
       <div className="joke">
         <h3>Joke</h3> <br /> 
        {this.props.jokeData.loading ?<div>Loading  ..............</div> : 
                                      <div>Ques. &nbsp; {this.props.jokeData.joke.setup}<br/>
                                          Ans. &nbsp;  {this.props.jokeData.joke.punchline}
                                      </div>}
        
        <br />
        <br />
        <Button onClick={() => this.props.fetchJoke()}>New Joke</Button>
       </div>
      </div>
    )

  }
}
const mapStateToProps = state => {
  return {
    jokeData: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchJoke: () => dispatch(fetchJoke())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Dashboard);
