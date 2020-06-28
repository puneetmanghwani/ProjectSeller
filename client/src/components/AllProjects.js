import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom';
import axios from "axios";
import { Card } from 'react-bootstrap';

import './AllProjects.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const TITLE = 'All Projects';


const Project = props => {
  
  const { _id, title, price, description } = props.project;
  return(
    
    <Card className="allCard" style={{ display:'inline-block',width: '15rem' }}>
      <Card.Body>
        <Card.Title> <Link to={'/project/'+title+'-'+_id} >{title}</Link></Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{price}</Card.Subtitle>
        <Card.Text>
        {description}
        </Card.Text>
        <Link to={'/project/'+title+'-'+_id} ><Card.Link >Go to Project</Card.Link></Link>
      </Card.Body>
    </Card>
  )
  
}


class AllProjects extends Component {  
  constructor(props) {
    super(props);
 
    this.state = {
      PROJECTS: [],
    };
  }
  componentDidMount() {
    document.body.className="allProjectsBody"
    this.getProjects();
  }
  
  getProjects() {
    axios.get('/projects')
    .then(projects => {
      this.setState({ PROJECTS:projects.data });
    });
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        
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

export default AllProjects;
