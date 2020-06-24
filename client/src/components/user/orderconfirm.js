import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './OrderConfirm.css';
import 'bootstrap/dist/css/bootstrap.min.css';



const TITLE = 'Order Placed';
class OrderConfirm extends Component {  
  componentDidMount() {
    document.body.className="orderConfirm"
  }
  render() {
    return (
      <div className="mainConfirm">
        <div className="mainConfirm">
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        <h2>Thank you your order has been placed.</h2>
        <h3>Yor will receive a confirmation email regarding it.</h3>
        <br />
        <Link to="/">
          <Button  variant="primary" size="lg"> Return to Home Page </Button>
        </Link>
        </div>
      </div>
    )

  }
}

export default OrderConfirm;
