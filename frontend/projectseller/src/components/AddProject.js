import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import axios from "axios";

const TITLE = 'Add Project';

class AddProject extends Component {  
  constructor(props) {
    super(props);
 
    this.state = {
      
      title : "",
      price : "",
      description: "",
      
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    const stateToBeChanged = event.target.name;
    const valueToBeChanged = event.target.value;
    
    this.setState({ [stateToBeChanged] : valueToBeChanged });
  }
  handleSubmit(event) {
    event.preventDefault();
    // const data =JSON.stringify({ title: this.state.title , price : this.state.price , description: this.state.description });
    
    var postData = {
      title: this.state.title,
      price : this.state.price,
      description: this.state.description
    };
    
    let axiosConfig = {
      headers: {
          "Content-Type": "application/json" 
      }
    };
    
    axios.post('http://127.0.0.1:8000/add-product',postData ,axiosConfig)
    .then(response => console.log(response))
    .catch((err) => console.log("AXIOS ERROR: ", err))
    // const requestOptions = {
    //   method: 'POST',
    //   body: JSON.stringify({ title: this.state.title , price : this.state.price , description: this.state.description }),
    //   headers: {  "Content-Type": "application/json" },
    // };
    // fetch('http://127.0.0.1:8000/add-product', requestOptions)
    // .then(response => response.json())
    // .then(data => console.log(data)); 
    // const requestOptions = {
    //   method: 'POST',
    //   body: JSON.stringify({ email:"p@gmail.com",password:"hello" }),
    //   headers: {  "Content-Type": "application/json" },
    // };
    // fetch('http://127.0.0.1:8000/user/login', requestOptions)
    // .then(response => response.json())
    // .then(data => {
    //   const { token } = data;
    //   console.log(jwt_decode(token));
    // }); 
    // fetch('http://127.0.0.1:8000/checktoken')
    // .then(response => response.json())
    // .then(data => {
    //   console.log(data);
    // }); 
    // fetch('http://127.0.0.1:8000/user/login', requestOptions)
    // .then(res => {
    //   if (res.status === 200) {
    //     this.props.history.push('/');
    //   } else {
    //     console.log(res.error);
    //   }
    // })
    

    this.setState({
      title : "",
      price : "",
      description: "",  
    });
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        <form onSubmit={this.handleSubmit}>
          <label>
            Title:
            <input name="title" id="title" type="text" onChange={this.handleChange} value={this.state.title} />
          </label>
          <label>
            Price:
            <input name="price" id="price" type="number" step="0.01" onChange={this.handleChange} value={this.state.price} />
          </label>
          <label>
            Description:
            <textarea name="description" id="description" rows="5" onChange={this.handleChange} value={this.state.description} ></textarea>
          </label>
        <input type="submit" value="Submit" />
        </form>  
      </div>
    )

  }
}

export default AddProject;
