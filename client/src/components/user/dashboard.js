import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import { Button } from 'react-bootstrap';
import axios from "axios";
import { connect } from 'react-redux'
import  {generateJoke} from '../../redux/joke/jokeActions'
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
    document.body.className="dashboardBody"
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
        Ques. &nbsp; {this.props.setup}<br/>
        Ans. &nbsp;  {this.props.punchline}
        <br />
        <br />
        <Button onClick={() => this.props.jokeGenerate()}>New Joke</Button>
       </div>
      </div>
    )

  }
}
const mapStateToProps = state => {
  console.log('hey')
  return {
    setup: state.setup,
    punchline: state.punchline
  }
}
const mapDispatchToProps = dispatch => {
  return {
    jokeGenerate: () => dispatch(generateJoke())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Dashboard);
