import React, { Component } from 'react';

export default class Login extends Component {
    state ={
        username: '',
        password: ''
    }

    onSubmit = (e) => {
        e.preventDefault();
    }

    //onChange = (e) => this.setState( {[e.target.name]: e.target.value})

    render () {
        return (
            <form >
                <input
                    
                    type="text"
                    name="username"
                    placeholder="Enter username..."
                    //value={this.state.username}
                    //onChange={this.onChange}
                />
                <input 
                    type="password"
                    name="password"
                    placeholder="Enter Password..."
                    //value={this.state.password}
                />
                <input
                    type="submit"
                    value="submit"
                    className="btn"
                    style={{flex:'1'}}
                />
            </form>
        )
    }
}