import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import { Button,Container,Row,Col,Image,Spinner } from 'react-bootstrap';
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
      <Container>
       <div className="head">
       <br />
       <br />
      <Row>
       <Col md={{ span: 4, offset: 4 }}  xs={{ span: 4, offset: 1 }}><Col md={{ span: 4, offset: 1 }}><h2>Dashboard</h2></Col></Col>
      </Row>
       </div>
       <br />
       <br />
       <Row>
       <Col md={{ span: 4, offset: 1 }} ><Image src={'/profile/'+this.state.userImage} alt="User" thumbnail />
       <br />
       <br />
       </Col>
       
       <Col md={{ span: 4, offset: 1 }}>
       Name : &nbsp; &nbsp; {this.state.name} <br />
       Email : &nbsp; &nbsp; {this.state.email}
       <br />
       <br />
       <br />
       
       </Col>
       </Row>
       <Row>
         
         <Col md={{ span: 11, offset: 1 }} xs={{ offset:3 }}><h3>Joke</h3></Col>
        
         
           <Col md={{ span: 11, offset: 1 }}><br />
                    {this.props.jokeData.loading ?<Spinner animation="border" /> : 
                                      <div>Ques. &nbsp; {this.props.jokeData.joke.setup}<br/><br />
                                          Ans. &nbsp;  {this.props.jokeData.joke.punchline}
                                          
                                      </div>}
         </Col>
         <Col md={{ offset: 1 }} xs={{ offset:3 }}>
         <br />
         <Button onClick={() => this.props.fetchJoke()}>New Joke</Button>
         </Col>
       </Row>
        
       </Container>
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
