import React, { Component } from 'react';
import { Helmet } from 'react-helmet'




const TITLE = 'Search Project';


const Project = props => {
  
  const { title, price, description } = props.project;
  return(
    <div style={{ display:'inline-block',width:300,margin:50 }}>
      <h3>{title}</h3>
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
      console.log(projects);
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
              <Project key={PROJECT.title} project={PROJECT} />
            )
          })
        }
      </div>
    )

  }
}

export default SearchProjects;
