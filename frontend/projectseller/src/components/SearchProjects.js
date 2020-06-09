import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom';



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
    };
  }
  componentDidMount() {
    this.getProjects();
  }
  
  getProjects() {
    fetch('http://127.0.0.1:8000/projects')
    .then(response => response.json())
    .then(projects => {
      this.setState({ PROJECTS:projects });
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

export default SearchProjects;
