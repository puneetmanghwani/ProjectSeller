import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom';
import axios from "axios";
import {DebounceInput} from 'react-debounce-input';

const TITLE = 'Search Project';


const Project = props => {
  
  const { _id, title, price, description } = props.project;
  return(
    <div style={{ display:'inline-block',width:300,margin:50 }}>
      <Link to={'/project/'+title+'-'+_id} ><h3>{title}</h3></Link>
      <h4>{price}</h4>
      <p>{description}</p>
    </div>
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
        <div>
          <p>Search Project</p>
          <DebounceInput
            type="text" name="title" id="title" placeholder="Enter Title"
            minLength={1} debounceTimeout={300}
            onChange={this.searchProjects} />
          <br />
          <br />
          <p>
          Enter Price Range
          <DebounceInput
            type="number" name="minPrice" id="minPrice" placeholder="Minimum Price"
            minLength={1} debounceTimeout={300}
            onChange={this.searchProjects} />
          <DebounceInput
            type="number" name="maxPrice" id="maxPrice" placeholder="Maximum Price"
            minLength={1} debounceTimeout={300}
            onChange={this.searchProjects} />
          </p>
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
