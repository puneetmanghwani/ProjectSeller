import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';




const TITLE = 'Order Placed';
class OrderConfirm extends Component {  
  render() {
    return (
      <div className="main">
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        <h2>Thank you your order has been placed.</h2>
        <h3>Yor will receive a confirmation email regarding it.</h3>
        <Link to="/">
          <Button  variant="primary" size="lg"> Return to Home Page </Button>
        </Link>
        
      </div>
    )

  }
}

export default OrderConfirm;
