import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import { Container,Row,Col } from 'react-bootstrap';

import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './AddProject.css';
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
  componentDidMount() {
    document.body.className="addProjectBody"
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
    
    axios.post('/add-product',postData ,axiosConfig)
    .then(response => console.log(response))
    .catch((err) => console.log("AXIOS ERROR: ", err))
    

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
        <Container>
        <Row>
        <Col md={{ span: 5, offset: 3 }} >
        <Col md={{ offset: 1 }}>
        <div className="add"><h3><br />Add Project <br /><br /></h3></div>
        <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input className="form-control " placeholder="Enter Title" name="title" id="title" type="text" onChange={this.handleChange} value={this.state.title} />
        </div>
          
        <div className="form-group">
          <label>Price</label>
          <input className="form-control " placeholder="Enter Price" name="price" id="price" type="number" step="0.01" onChange={this.handleChange} value={this.state.price} />
        </div>
          
        <div className="form-group">
          <label>Description</label>
          <textarea className="form-control " placeholder="Enter Description" name="description" id="description" rows="5" onChange={this.handleChange} value={this.state.description} ></textarea>
        </div>
          
          <button type="submit" className="btn btn-primary btn-block">Add</button>
        </form>  
        </Col>
        </Col>
        </Row>
        </Container>
      </div>
    )

  }
}

export default AddProject;
