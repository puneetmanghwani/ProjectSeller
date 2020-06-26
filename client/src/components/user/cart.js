import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import axios from "axios";
import { Button,Container,Row,Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import authHeader from '../../services/auth_header';
import './Cart.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const TITLE = 'Cart';


class Cart extends Component {  
  constructor(props) {
    super(props);
 
    this.state = {
      cartItems:[]
    };

    this.getCart = this.getCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.itemQuantityDecrease = this.itemQuantityDecrease.bind(this);
    this.itemQuantityIncrease = this.itemQuantityIncrease.bind(this);
  }
  componentDidMount() {
    document.body.className="cartBody"
    this.getCart();
  }
  getCart() {
    axios.get('/cart/',{ headers: authHeader() })
    .then(cartItems => {
      this.setState({ cartItems:cartItems.data });
    });
  }
  removeItem(event) {
    const cartItem = event.currentTarget.getAttribute('value');
    axios.post('/cart/removeitem/',{cartItem},{ headers: authHeader() })
    .then(response => {
      console.log(response);
      this.getCart();
    });
    
  }
  itemQuantityIncrease(event) {
    const cartItem = event.currentTarget.getAttribute('value');
    axios.post('/cart/removeitem/',{cartItem ,action:'Increase'},{ headers: authHeader() })
    .then(response => {
      console.log(response);
      this.getCart();
    });
  }
  itemQuantityDecrease(event) {
    const cartItem = event.currentTarget.getAttribute('value');
    axios.post('/cart/removeitem/',{cartItem ,action:'Decrease'},{ headers: authHeader() })
    .then(response => {
      console.log(response);
      this.getCart();
    });
  }
  placeOrder(){
    axios.post('/placeorder/',{orderItems: this.state.cartItems},{ headers: authHeader() })
    .then(response => {
      console.log(response);
      this.props.history.push('/orderplaced');
    });
  }
  render() {
    var isCartItems = this.state.cartItems;
    var placeOrder;
    var cart;
    if(isCartItems.length > 0){
      // cart = <div className="cart"><h2>Cart Items</h2> </div>
      cart = <Row><Col md={{ span: 5, offset: 5 }} xs={{ span:10,offset:2 }}><h2>Cart Items</h2></Col></Row>

      placeOrder=<Container>
        <Row>
        <Col md={{ span: 5, offset: 5 }} xs={{ span: 8, offset: 2 }}>
        Final Price:
        {
          this.state.cartItems.reduce((prev,next) => prev + next.price*next.quantity,0)
        }
        </Col>
        </Row>
        <Row>
        <Col md={{ span: 5, offset: 5 }} xs={{ span: 8, offset: 2 }}>
        <Button variant="outline-success" onClick={this.placeOrder}>Place Order</Button>
        </Col>
        </Row>
      </Container>
    }
    else{
      placeOrder=<div className="addCartProject">
        <Row>
        <Col md={{ span: 8, offset: 1 }}><h2>Please Add Some Projects in Cart</h2></Col>
        </Row>
        <Row className="buttonCart">
        <Col md={{ span: 3, offset: 1 }} xs={{ span: 12 }}>
        <Link to="/search">
          <Button  variant="primary" size="lg"> Search the Projects </Button>
        </Link> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        </Col>
        <Col  md={{ span: 3 }} xs={{ span: 10}}>
        <Link to="/projects">
          <Button  variant="primary" size="lg"> All Projects </Button>
        </Link>
        </Col>
        </Row>
      </div>
    }
    return (
      <div className="cartDiv">
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        {cart}
        <Container fluid >
        <div className="cartItems">
        {
            this.state.cartItems.map(ITEM=>{
              return(
                <Row className="itemRow">
                <Col md={{ span: 4, offset: 1 }} xs={{ span: 8, offset: 2 }}>
                <p>Title: &nbsp; &nbsp;      
                <Link to={'/project/'+ITEM.title+'-'+ITEM.projectId} >{ITEM.title}</Link> &nbsp; &nbsp; <Link value={ITEM._id} onClick={this.removeItem}><DeleteForeverOutlinedIcon  /></Link></p>
                </Col>
                <Col md={{ span: 5, offset: 1 }} xs={{ span: 8, offset: 2 }}>
                <p>Quantity : &nbsp; &nbsp;       
                {ITEM.quantity} &nbsp; &nbsp; <Link value={ITEM._id} onClick={this.itemQuantityIncrease}><ArrowUpwardIcon  /></Link> <Link value={ITEM._id} onClick={this.itemQuantityDecrease}> <ArrowDownwardIcon  /></Link> </p> 
                </Col>
                <Col md={{ span: 5, offset: 1 }} xs={{ span: 8, offset: 2 }}>
                <p>Total Price : &nbsp; &nbsp;    
                {ITEM.price*ITEM.quantity} &nbsp; &nbsp; </p>
                </Col>
                <br />
                <br />
                </Row>
              )
            })
        }
        </div>
        {placeOrder}
        </Container>
      </div>
    )

  }
}

export default Cart;
