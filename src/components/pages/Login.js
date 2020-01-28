import React, { Component } from 'react';
import Axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class Login extends Component {
    state ={
        username: '',
        password: '',
        message: ''
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log('Username: ' + this.state.username + '\nPassword: ' + this.state.password )
        Axios.post('http://localhost:7171/api/user/login', {
            username: this.state.username,
            password: this.state.password
        }).then((res) => {
            console.log(res);
            //this.setState({access: res.data.access})
            this.props.updateAccess(res.data.access);
        }).catch((err)=> {
            //console.log(err);
            this.setState({ message: "Please Try Again"})
        })
    }

    onChange = (e) => this.setState( {[e.target.name]: e.target.value});


    baseStyle = () => {
        return {
            marginTop: '25px',
            marginLeft: '10%',
            marginRight: '10%',
            padding: '5%',
            border: '1px solid black',
            borderRadius: '25px',
            background: '#84828F'
        }
    }


    render () {
        return (
            <div style={this.baseStyle()}>
                <div>
                    <p className="text-center">{this.state.message}</p>
                </div>
                <h2>Login</h2>
                <Form onSubmit={this.onSubmit} role="form">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            name="username"
                            placeholder="Enter username..."
                            value={this.state.username}
                            onChange={this.onChange}
                        />
                        </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            name="password"
                            type="password"
                            placeholder="Enter Password..."
                            value={this.state.password}
                            onChange={this.onChange}
                        />
                    </Form.Group>
                    <Button
                        type="submit"
                        variant="primary">
                    Submit
                    </Button>
                </Form>
            </div>
        )
    }
}