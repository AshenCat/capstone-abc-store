import React, { Component } from 'react';
import { Table, Card, Form, Col, Row, Button } from 'react-bootstrap'

import User from '../table/User'
import Axios from 'axios'

export default class Users extends Component {

    state = {
        userList: [],

        username: '',
        access: 'Store Clerk',
        password: ''
    }

    componentDidMount() {
        Axios.get('http://localhost:7171/api/user/get-users').then(res => {
          console.log(res)
          this.setState({userList: res.data});
        })
    }

    deleteUser = (key) => {
        Axios.delete(`http://localhost:7171/api/user/delete-user/${key}`).then(
            this.setState({userList: [...this.state.userList.filter(us => us._id !== key)]})
        )
        //this.setState({userList: [...this.state.userList.filter(us => us._id === key)]})
        //window.history.back();
    }

    back = () => {
        //window.history.back();
    }

    onSubmit = (e) => {
        e.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password,
            access: this.state.access
        }
        Axios.post(`http://localhost:7171/api/user/add-user/`, user).then(
            this.setState({userList: [...this.state.userList, user]})
        )
        //this.setState({userList: [...this.state.userList, user]})
    }
    
    onChange = (e) => this.setState({[e.target.name]: e.target.value});

    render() {
        return (
            <div className="container">
                <div className="row">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Access</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.userList.map((user)=>(<User key={user._id} user={user} deleteUser={this.deleteUser}/>))}
                        </tbody>
                    </Table>
                </div>

                <div className="row">
                    <div className="container">
                    <Card border="light">
                        <Card.Header>User Management</Card.Header>
                        <Card.Body><Card.Title></Card.Title></Card.Body>
                        <Form onSubmit={this.onSubmit} role="form">
                            <Form.Group as={Row}>
                                <Form.Label column sm="3" className="text-right">Username</Form.Label>
                                <Col sm="9">
                                    <Form.Control name="username" onChange={this.onChange} defaultValue={this.state.username} required/>
                                    <Form.Control.Feedback type="invalid">Please enter a valid username.</Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="3" className="text-right">Password</Form.Label>
                                <Col sm="9">
                                    <Form.Control name="password" type="password" onChange={this.onChange} required/>
                                    <Form.Control.Feedback type="invalid">Please enter a valid password.</Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="3" className="text-right">Access Level</Form.Label>
                                <Col sm="9">
                                    <Form.Control name="access" onChange={this.onChange} defaultValue={this.state.access} as="select">
                                        <option>Store Clerk</option>
                                        <option>Warehouse Associate</option>
                                        <option>Department Manager</option>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">Please enter a valid username.</Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Card.Footer>
                                <Row>
                                    <Col className="text-center"><Button type="submit" className="btn btn-lg">Submit</Button></Col>
                                    <Col className="text-center"><Button onClick={this.back} className="btn btn-lg btn-secondary">Return</Button></Col>
                                </Row>
                            </Card.Footer>
                        </Form>
                    </Card>
                    </div>
                </div>
            </div>
        )
    }
}