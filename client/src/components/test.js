import React, { Component } from 'react';
import authHeader from '../services/auth_header';
import axios from "axios";


class Test extends Component {  
  constructor(props) {
    super(props);
 
    this.state = {
      test:"",
    };
  }
  componentDidMount() {
    this.getTest();
  }
  
  getTest() {
    axios.get('http://127.0.0.1:8000/checktoken', { headers: authHeader() })
    .then(response=>{
        console.log(response);
    })
  }
  render() {
    return (
      <div>
        <h1>Hello</h1>
        <h2>Hello</h2>
        <h3>Hello</h3>
        <h3>Hello</h3>
        <h1>Hello</h1>

      </div>
    )

  }
}

export default Test;
