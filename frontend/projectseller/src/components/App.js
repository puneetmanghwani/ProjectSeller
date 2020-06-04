import React, { Component } from 'react';
import { Helmet } from 'react-helmet'

import Header from './Header';
import Footer from './Footer';


const TITLE = 'Project Assist';
class App extends Component {  
  render() {
    return (
      <div>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        <Header />
        <p> Profitable side projects to Buy/Sell</p>
        <p>At Project Assist is a marketplace where one can sell and buy projects.</p>
        <button > Buy Side Project </button>
        <button > Sell Side Project </button>
        <Footer />
      </div>
    )

  }
}

export default App;
