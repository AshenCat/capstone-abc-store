import React, { Component } from 'react';
//import { BrowserRouter as Router, Route } from 'react-router-dom';


import Login from './components/pages/Login';
import Header from './components/layout/Header';
import Home from './components/pages/Home'

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';


class App extends Component {

  state = {
    isLoggedIn: false,
    access: 'Login',
    username: '',
  }

  updateAccess = (newAccess) => {
    this.setState({access: newAccess, isLoggedIn: true})
    //this.setState({isLoggedIn: true})
  }

  

  Landing = () => {
    if(this.state.isLoggedIn === true) {
    if (this.state.access !== 'Login') {
      return <Home access={this.state.access}></Home>
    };
    }
    return <Login updateAccess={this.updateAccess} isLoggedIn={this.isLoggedIn}/>
  }

  headerController = () => {
    if(this.state.isLoggedIn === true) {
      switch(this.state.access){
        case 'Department Manager':
          //this.setState((prevState)=> ({newTitle: "Department Manager"}))
          //this.state.newTitle="Department Manager";
          break;
        case 'Warehouse Associate':
          //this.setState({newTitle: "Warehouse Associate"})
          //this.state.newTitle="Warehouse Associate";
          break;
        case 'Store Clerk':
          //this.setState({newTitle: "Store Clerk"})
          //this.state.newTitle="Store Clerk";
          break;
        default:
          //this.setState({newTitle: "Login"})
          break;
      }
    }
    return <Header title={this.state.access}></Header>
  }

  render(){
    return (
      <div className="App">
        <this.headerController></this.headerController>
        <this.Landing></this.Landing>
      </div>
    );
  }
}

export default App;
