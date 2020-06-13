import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import axios from "axios";
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
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

  }
  componentDidMount() {
    this.getCart();
  }
  getCart() {
    axios.get('http://127.0.0.1:8000/cart/',{ headers: authHeader() })
    .then(cartItems => {
      this.setState({ cartItems:cartItems.data });
    });
  }
  removeItem(event) {
    console.log(event.currentTarget.getAttribute('value'));
    
  }
  placeOrder(){
    axios.post('http://127.0.0.1:8000/placeorder/',{orderItems: this.state.cartItems},{ headers: authHeader() })
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
                <li key={ITEM._id}>{ITEM.title}  :  {ITEM.quantity}    Price --{ITEM.price*ITEM.quantity}  <DeleteForeverOutlinedIcon value={ITEM._id} onClick={this.removeItem} /></li>
              )
            })
        }
        {placeOrder}
        
      </div>
    )

  }
}

export default Cart;
