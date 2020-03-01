import React, { Component } from 'react';
//import { BrowserRouter as Router, Route } from 'react-router-dom';


import Login from './components/pages/Login';
import Header from './components/layout/Header';
import Home from './components/pages/Home'

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

const API_ENDPOINT = process.env.REACT_APP_URL || 'http://localhost:7171/api'

class App extends Component {

  state = {
    isLoggedIn: false,
    access: 'Login',
    username: '',
    api: API_ENDPOINT
  }

  updateAccess = (newAccess) => this.setState({access: newAccess, isLoggedIn: true})
  

  logout = () => this.setState({access: 'Login', isLoggedIn: false})
  

  Landing = () => {
    //console.log(API_ENDPOINT)
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