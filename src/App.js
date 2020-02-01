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
    access: 'login',
    username: '',
  }

  updateAccess = (newAccess) => {
    this.setState({access: newAccess})
    this.setState({isLoggedIn: true})
  }

  

  Landing = () => {
    if(this.state.isLoggedIn === true) {
      if (this.state.access === 'Department Manager') return <Home></Home>;
      if (this.state.access === 'Store Clerk') return "IN PROGRESS";
      if (this.state.access === 'Warehouse Associate') return "IN PROGRESS";
    }
    return <Login updateAccess={this.updateAccess} />
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
