import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import SearchProjects from './SearchProjects';
import AddProject from './AddProject';

import Header from './Header';


class App extends Component {
  render() {
    return (
    <Router>
        <div>
          <Header />
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/search' component={SearchProjects} />
              <Route path='/add-project' component={AddProject} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;