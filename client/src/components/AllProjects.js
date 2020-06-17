import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom';
import axios from "axios";


const TITLE = 'All Projects';


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


class AllProjects extends Component {  
  constructor(props) {
    super(props);
 
    this.state = {
      PROJECTS: [],
    };
  }
  componentDidMount() {
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
