import React, { Component } from 'react';
import { Link } from 'react-router';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import './App.css';

/**
 * Main component
 */
export default class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Header />
        </div>
        <Link to={'/addmovie'} >
          <button type="button">AddMovie</button>
        </Link>
        <div className="container">
          {this.props.children}
        </div>
        <div className="App-footer">
          <Footer />
        </div>
      </div>
    );
  }
}
