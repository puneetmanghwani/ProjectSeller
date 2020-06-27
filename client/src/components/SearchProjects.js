import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom';
import axios from "axios";
import {DebounceInput} from 'react-debounce-input';
import { Card ,Container,Row,Col } from 'react-bootstrap';

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
    <Card className="searchCard" style={{ display:'inline-block',width: '14rem', marginRight:'3rem',marginBottom:'1rem' }}>
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

    axios.get('/search/',{ params:data })
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
        <Container fluid>
        <Row>
        <Col md={{ span: 4,offset:1 }}>
          <h2><br /><br />Search Project</h2>
          <form>
            <div className="form-group">
              <label>Enter Title<br /></label>
              <DebounceInput
              type="text" name="title" id="title" placeholder="Enter Title" className="form-control "
              minLength={1} debounceTimeout={300}
              onChange={this.searchProjects} />
              <br /><br />
            </div>
            {/* <DebounceInput
              type="text" name="title" id="title" placeholder="Enter Title" className="form-control "
              minLength={1} debounceTimeout={300}
              onChange={this.searchProjects} /> */}
              
            {/* <br />
            <br /> */}
            <div className="form-group">
              <label>Enter Price Range<br /></label>
              <DebounceInput
              type="number" name="minPrice" id="minPrice" placeholder="Minimum Price" className="form-control "
              minLength={1} debounceTimeout={300}
              onChange={this.searchProjects} />
              <br />
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
        </Col>
       
        <Col md={{ offset: 1 }}>
        <br /><br />
        {
          this.state.PROJECTS.map(PROJECT=>{
            return(
              <Project key={PROJECT._id} project={PROJECT} />
            )
          })
        }
        </Col>
         </Row>
        </Container>
      </div>
    )

  }
}

export default SearchProjects;
