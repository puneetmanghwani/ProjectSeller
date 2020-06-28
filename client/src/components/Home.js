import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import { Button,Container,Row,Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link } from 'react-router-dom';
import './Home.css';




const TITLE = 'Home';
class Home extends Component {  
  componentDidMount() {
    document.body.className="homebody"
    
    
  }
  render() {
    return (
      <div className="homediv">
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        <Container fluid >
        <Row >
          <Col md={{ span: 5, offset: 1 }}><p> Profitable side projects to Buy/Sell</p></Col>
        </Row>
        <Row >
        <Col md={{ span: 10, offset: 1 }}><p>Project Assist is a marketplace where one can sell and buy projects.</p></Col>
        </Row> 
        <Row className="homebutton">
          <Col md={{ span: 3, offset: 1 }} >
          <Link to="/search">
            <Button className="homebtn"  variant="light" size="lg"> Buy Side Project </Button>
            <br /><br />
          </Link>
          </Col>
          <Col >
          <Link to="/add-project">
          <Button className="homebtn" variant="light" size="lg"> Sell Side Project </Button>
          </Link>
          </Col>
        </Row>
        </Container>
      </div>
    )

  }
}

export default Home;
