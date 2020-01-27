import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './components/pages/Login';

import './App.css';


class App extends Component {

  state = {
    access: 'none',
    username: '',
  }

  updateAccess = (access) => {
    this.setState({access})
  }

  Landing = (props) => {
    const access = props.access;
    if (access === 'departmentManager') return "IN PROGRESS";
    if (access === 'clerk') return "IN PROGRESS";
    if (access === 'warehouseAssociate') return "IN PROGRESS";
    return <Login updateAccess={this.updateAccess} />
  }

  render(){
    return (
      <div className="App">
        <this.Landing></this.Landing>
      </div>
    );
  }
}

export default App;
