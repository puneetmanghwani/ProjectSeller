import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import axios from "axios";
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import authHeader from '../../services/auth_header';



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
    if(isCartItems.length > 0){
      placeOrder=<div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
        Final Price:
        {
          this.state.cartItems.reduce((prev,next) => prev + next.price*next.quantity,0)
        }
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <Button variant="outline-success" onClick={this.placeOrder}>Place Order</Button>
        </div>
      </div>
    }
    else{
      placeOrder=<div>
        <h2>Please Add Some Projects in Cart</h2>
        <Link to="/search">
          <Button  variant="primary" size="lg"> Search the Projects </Button>
        </Link>
      </div>
    }
    return (
      <div>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        
        {
            this.state.cartItems.map(ITEM=>{
              return(
                <div>  
                <li key={ITEM._id}>
                <p>Title:    
                {ITEM.title}     <Link value={ITEM._id} onClick={this.removeItem}><DeleteForeverOutlinedIcon  /></Link> </p>
                <p>Quantity :     
                {ITEM.quantity}  <Link value={ITEM._id} onClick={this.itemQuantityIncrease}><ArrowUpwardIcon  /></Link> <Link value={ITEM._id} onClick={this.itemQuantityDecrease}> <ArrowDownwardIcon  /></Link> </p> 
                <p>Price :  
                {ITEM.price*ITEM.quantity}  </p></li>
                </div>
              )
            })
        }
        {placeOrder}
        
      </div>
    )

  }
}

export default Cart;
