import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom'

export default class ItemDetails extends Component{    

    state ={
        name: this.props.item[0].name,
        isle: this.props.item[0].isle,
        lastShipment: this.props.item[0].lastShipment,
        price: this.props.item[0].price,
        stock: this.props.item[0].stock,
        _id: this.props.item[0]._id,
        vendor: this.props.item[0].vendor
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
        this.props.updateData(item);
    }

    onDelete = () => {
        this.props.deleteData(this.state._id)
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value});

    render(){
        // const { name, isle, lastShipment, price, stock, _id, vendor } = this.props.item[0]
        // this.setState({
        //     name: this.props.item[0].name,
        //     isle: this.props.item[0].isle,
        //     lastShipment: this.props.item[0].lastShipment,
        //     price: this.props.item[0].price,
        //     stock: this.props.item[0].stock,
        //     _id: this.props.item[0]._id,
        //     vendor: this.props.item[0].vendor,
        // })

        return(
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
                        <Form.Control name="stock" type="number" onChange={this.onChange} defaultValue={this.state.stock} required></Form.Control>
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
                        <Form.Control  name="lastShipment" plaintext readOnly defaultValue={this.state.lastShipment} required></Form.Control>
                        <Form.Control.Feedback type="invalid">Please enter a valid input</Form.Control.Feedback>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formIsle">
                    <Form.Label column sm="3" className="text-right">
                        Aisle
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control name="isle" onChange={this.onChange} defaultValue={this.state.isle} required></Form.Control>
                        <Form.Control.Feedback type="invalid">Please enter a valid input</Form.Control.Feedback>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formID">
                    <Form.Label column sm="3" className="text-right">
                        id
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control name="_id" plaintext readOnly defaultValue={this.state._id} required></Form.Control>
                        <Form.Control.Feedback type="invalid">Please enter a valid input</Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Row>
                    <Col className="text-center">
                        <Button size="lg" type="submit" variant="primary">Update</Button>
                    </Col>
                    <Col className="text-center">
                        <Button size="lg" onClick={this.onDelete} variant="danger">Delete</Button>
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