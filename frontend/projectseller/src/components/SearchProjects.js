import React, { Component } from 'react';
import { Helmet } from 'react-helmet'




const TITLE = 'Search Project';
class SearchProjects extends Component {  
  constructor(props) {
    super(props);
 
    this.state = {
      projects: '',
    };
  }
  componentDidMount() {
    this.getProjects();
  }
  getProjects() {
    fetch('http://127.0.0.1:8000/projects')
    .then(response => response.json())
    .then(projects => {
      this.setState({ projects });
    });
  }
  render() {
    const projects = this.state.projects;
    return (
      <div>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        Search a Project
        <p>{projects}</p>
        
      </div>
    )

  }
}

export default SearchProjects;
