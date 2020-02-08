import React, { Component } from 'react'
import { Col, Row, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class AddItem extends Component{
    state = {
        name: '',
        isle: '',
        lastShipment: '',
        price: 0,
        stock: 0,
        vendor: ''
    }

    onSubmit = (e) => {
        e.preventDefault();
        const item = {
            name: this.state.name,
            isle: this.state.isle,
            lastShipment: this.state.lastShipment,
            price: this.state.price,
            stock: this.state.stock,
            _id: this.state._id,
            vendor: this.state.vendor,
        }
        console.log(item)
        this.props.addData(item);
        window.history.back();
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value});

    render(){
        return (
            <div className="border">
                <Form onSubmit={this.onSubmit} role="form">
                    <Form.Group as={Row} controlId="formItemName">
                        <Form.Label column sm="3" className="text-right">
                            Item Name
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control name="name" onChange={this.onChange} defaultValue={this.state.name} required></Form.Control>
                            <Form.Control.Feedback type="invalid">Please enter a valid input</Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formVendor">
                        <Form.Label column sm="3" className="text-right">
                            Vendor
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control name="vendor" onChange={this.onChange} defaultValue={this.state.vendor} required></Form.Control>
                            <Form.Control.Feedback type="invalid">Please enter a valid input</Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formStock">
                        <Form.Label column sm="3" className="text-right">
                            Stock
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control name="stock" type="number" onChange={this.onChange} defaultValue={this.state.stock}></Form.Control>
                            <Form.Control.Feedback type="invalid">Please enter a valid input</Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPrice">
                        <Form.Label column sm="3" className="text-right">
                            Price
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control name="price" type="number" onChange={this.onChange} defaultValue={this.state.price} required></Form.Control>
                            <Form.Control.Feedback type="invalid">Please enter a valid input</Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formLastShipment">
                        <Form.Label column sm="3" className="text-right">
                            Last Shipment
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control  name="lastShipment" plaintext readOnly defaultValue={this.state.lastShipment}></Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formIsle">
                        <Form.Label column sm="3" className="text-right">
                            Aisle
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control name="isle" onChange={this.onChange} defaultValue={this.state.isle}></Form.Control>
                            <Form.Control.Feedback type="invalid">Please enter a valid input</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Row>
                        <Col className="text-center">
                            <Button size="lg" type="submit" variant="primary">Update</Button>
                        </Col>
                        <Col className="text-center">
                            <Link className="btn btn-secondary btn-lg" to="/home">Return</Link>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}