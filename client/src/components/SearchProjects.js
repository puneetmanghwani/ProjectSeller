import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom';
import axios from "axios";
import {DebounceInput} from 'react-debounce-input';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchProjects.css';

const TITLE = 'Search Project';


const Project = props => {
  
  const { _id, title, price, description } = props.project;
  return(
    // <div style={{ display:'inline-block',width:300,margin:50 }}>
    //   <Link to={'/project/'+title+'-'+_id} ><h3>{title}</h3></Link>
    //   <h4>{price}</h4>
    //   <p>{description}</p>
    // </div>
    <Card className="searchCard" style={{ display:'inline-block',width: '15rem' }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{price}</Card.Subtitle>
        <Card.Text>
        {description}
        </Card.Text>
        <Link to={'project/'+title+'-'+_id} ><Card.Link >Go to Project</Card.Link></Link>
      </Card.Body>
    </Card>
  )
  
}


class SearchProjects extends Component {  
  constructor(props) {
    super(props);
 
    this.state = {
      PROJECTS: [],
      title: undefined,
      minPrice: undefined,
      maxPrice: undefined
    };
   
    this.searchProjects = this.searchProjects.bind(this);
  }
  componentDidMount() {
    document.body.className="searchProjectsBody"
    
  }
  searchProjects(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    const data={
      title: this.state.title,
      minPrice: this.state.minPrice,
      maxPrice: this.state.maxPrice
    }

    axios.get('http://127.0.0.1:8000/search/',{ params:data })
    .then(PROJECTS => {
      this.setState({ PROJECTS:PROJECTS.data });
      
    })
}
  render() {
    
    return (
      <div>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        <div className="searchForm">
          <h2>Search Project</h2>
          <form className="loginform ">
            <div className="form-group">
              <label>Enter Title</label>
              <DebounceInput
              type="text" name="title" id="title" placeholder="Enter Title" className="form-control "
              minLength={1} debounceTimeout={300}
              onChange={this.searchProjects} />
            </div>
            {/* <DebounceInput
              type="text" name="title" id="title" placeholder="Enter Title" className="form-control "
              minLength={1} debounceTimeout={300}
              onChange={this.searchProjects} /> */}
              
            {/* <br />
            <br /> */}
            <div className="form-group">
              <label>Enter Price Range</label>
              <DebounceInput
              type="number" name="minPrice" id="minPrice" placeholder="Minimum Price" className="form-control "
              minLength={1} debounceTimeout={300}
              onChange={this.searchProjects} />
              <DebounceInput
              type="number" name="maxPrice" id="maxPrice" placeholder="Maximum Price" className="form-control "
              minLength={1} debounceTimeout={300}
              onChange={this.searchProjects} />
            </div>
            {/* <p> */}
            {/* Enter Price Range
            <DebounceInput
              type="number" name="minPrice" id="minPrice" placeholder="Minimum Price"
              minLength={1} debounceTimeout={300}
              onChange={this.searchProjects} />
            <DebounceInput
              type="number" name="maxPrice" id="maxPrice" placeholder="Maximum Price"
              minLength={1} debounceTimeout={300}
              onChange={this.searchProjects} /> */}
            {/* </p> */}
          </form>
        </div>
        {
          this.state.PROJECTS.map(PROJECT=>{
            return(
              <Project key={PROJECT._id} project={PROJECT} />
            )
          })
        }
      </div>
    )

  }
}

export default SearchProjects;
