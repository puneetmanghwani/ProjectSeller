import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css';




const TITLE = 'Home';
class Home extends Component {  
  componentDidMount() {
    document.body.className="homebody"
    
    
  }
  render() {
    return (
      <div >
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        <div className="homehead">
          <p> Profitable side projects to Buy/Sell</p>
          <p>Project Assist is a marketplace where one can sell and buy projects.</p>
        </div>
        <div className="homemid">
          <Link to="/search">
            <Button className="homebtn"  variant="light" size="lg"> Buy Side Project </Button>
          </Link>
          <Link to="/add-project">
          <Button className="homebtn" variant="light" size="lg"> Sell Side Project </Button>
          </Link>
        </div>
        
      </div>
    )

  }
}

export default Home;
