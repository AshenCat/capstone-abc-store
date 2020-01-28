import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './components/pages/Login';
import Header from './components/layout/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';


class App extends Component {

  state = {
    isLoggedIn: false,
    access: 'login', newTitle: '',
    username: '',
  }

  updateAccess = (newAccess) => {
    this.setState({access: newAccess})
  }

  Landing = () => {
    if(this.state.isLoggedIn === false) {
      if (this.state.access === 'departmentManager') return "IN PROGRESS";
      if (this.state.access === 'clerk') return "IN PROGRESS";
      if (this.state.access === 'warehouseAssociate') return "IN PROGRESS";
    return <Login updateAccess={this.updateAccess} />
    }
  }

  headerController = () => {
    if(this.state.isLoggedIn === false) {
      switch(this.state.access){
        case 'departmentManager':
          this.state.newTitle="Department Manager";
          break;
        case 'warehouseAssociate':
          this.state.newTitle="Warehouse Associate";
          break;
        case 'clerk':
          this.state.newTitle="Store Clerk";
          break;
        default:
          this.state.newTitle="Login"
          break;
      }

      return <Header title={this.state.newTitle}></Header>
    }
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
