import React, { Component } from 'react';
import { Helmet } from 'react-helmet'

const TITLE = 'Add Project';

class AddProject extends Component {  
  render() {
    return (
      <div>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        <p>Add a Project</p>    
      </div>
    )

  }
}

export default AddProject;
