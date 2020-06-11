import React, { Component } from 'react';
import { Helmet } from 'react-helmet'





class Project extends Component {  
  constructor(props) {
    super(props);
 
    this.state = {
      projectId : '',
      projectTitle:'',
      projectPrice:'',
      projectDescription:''
    };
    
  }
  componentDidMount() {
    const PROJECT=this.props.match.params.PROJECT.split('-');
    const projectId= PROJECT[PROJECT.length-1];
    
    fetch('http://127.0.0.1:8000/project/'+projectId)
    .then(response => response.json())
    .then(PROJECT => {
      this.setState({ 
        projectTitle: PROJECT.title,
        projectPrice: PROJECT.price,
        projectDescription: PROJECT.description
      })
  
    });
  }
  
  render() {
    return (
      <div>
        <Helmet>
          <title>{ this.state.projectTitle }</title>
        </Helmet>
        <div style={{ display:'inline-block',width:300,margin:50 }}>
          <h3>{this.state.projectTitle}</h3>
          <h4>{this.state.projectPrice}</h4>
          <p>{this.state.projectDescription}</p>
        </div>
      </div>
    )

  }
}

export default Project;
