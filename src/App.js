import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './components/pages/Login';

import './App.css';


class App extends Component {

  state = {
    isLoggedIn: false,
    username: '',
  }

  render(){
    return (
      <div className="App">
        <Router>
          <Route exact path="/" component={Login} />
        </Router>
      </div>
    );
  }
}

export default App;
