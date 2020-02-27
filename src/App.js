import React, { Component } from 'react';
//import { BrowserRouter as Router, Route } from 'react-router-dom';


import Login from './components/pages/Login';
import Header from './components/layout/Header';
import Home from './components/pages/Home'

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import {createBrowserHistory}  from 'history'


class App extends Component {

  state = {
    isLoggedIn: false,
    access: 'Login',
    username: '',
    api: 'http://localhost:7171/api'
  }

  updateAccess = (newAccess) => this.setState({access: newAccess, isLoggedIn: true})
  

  logout = () => this.setState({access: 'Login', isLoggedIn: false})
  

  Landing = () => {
    if(this.state.isLoggedIn === true) {
      if (this.state.access !== 'Login')
        return <Home access={this.state.access} api={this.state.api}></Home>
    }
    return <Login updateAccess={this.updateAccess} api={this.state.api}/>
  }

  render(){
    return (
      <div className="App">
        <Header title={this.state.access} logout={this.logout}></Header>
        <this.Landing></this.Landing>
      </div>
    );
  }
}

export default App;
export const history = createBrowserHistory();