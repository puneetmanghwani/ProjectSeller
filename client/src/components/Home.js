import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css';




const TITLE = 'Home';
class Home extends Component {  
  render() {
    return (
      <div className="main">
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        <p> Profitable side projects to Buy/Sell</p>
        <p>Project Assist is a marketplace where one can sell and buy projects.</p>
        <Link to="/search">
          <Button className="float-right" style={{float: 'right'}} variant="primary" size="lg"> Buy Side Project </Button>
        </Link>
        <Link to="/add-project">
        <Button className="btn" variant="primary" size="lg"> Sell Side Project </Button>
        </Link>
        
      </div>
    )

  }
}

export default Home;
