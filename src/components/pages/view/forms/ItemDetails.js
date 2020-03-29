import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap';

export default class ItemDetails extends Component{

    state ={
        name: this.props.item[0].name,
        isle: this.props.item[0].isle,
        lastShipment: this.props.item[0].lastShipment,
        price: this.props.item[0].price,
        quantity: this.props.item[0].quantity,
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
            quantity: this.state.quantity,
            _id: this.state._id,
            vendor: this.state.vendor,
        }
        this.props.updateData(item);
        this.props.setMessage("Update Successful")
        this.props.setShowToast(true)
    }

    onDelete = () => {
        this.props.deleteData(this.state._id)
        this.props.setMessage("Successfully Deleted")
        this.props.setShowToast(true)
        window.history.back();
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value});

    Buttons = () => {
        if(this.props.access === "Department Manager") return(
            <React.Fragment>
                <Col className="text-center">
                    <Button size="lg" type="submit" variant="primary">Update</Button>
                </Col>
                <Col className="text-center">
                    <Button size="lg" onClick={this.onDelete} variant="danger">Delete</Button>
                </Col>
                <Col className="text-center">
                    <Link className="btn btn-secondary btn-lg" to="/">Return</Link>
                </Col>
            </React.Fragment>
        )
        else return (
            <React.Fragment>
                <Col className="text-center">
                    <Button size="lg" type="submit" variant="primary">Update</Button>
                </Col>
                <Col className="text-center">
                    <Link className="btn btn-secondary btn-lg" onClick={() => window.history.back()} to="/">Return</Link>
                </Col>
            </React.Fragment>
        )
    }

    render(){

        return(
            <Card>
                <Card.Header>Item Details</Card.Header>
                <Card.Body></Card.Body>
                    <Form onSubmit={this.onSubmit} role="form">
                        <Form.Group as={Row} controlId="formItemName"  className="mr-3">
                            <Form.Label column sm="3" className="text-right">
                                Item Name
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control name="name" onChange={this.onChange} defaultValue={this.state.name} readOnly={this.props.access!=="Department Manager"} required></Form.Control>
                                <Form.Control.Feedback type="invalid">Please enter a valid input</Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formVendor"  className="mr-3">
                            <Form.Label column sm="3" className="text-right">
                                Vendor
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control name="vendor" onChange={this.onChange} defaultValue={this.state.vendor} readOnly={this.props.access!=="Department Manager"} required></Form.Control>
                                <Form.Control.Feedback type="invalid">Please enter a valid input</Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formQuantity"  className="mr-3">
                            <Form.Label column sm="3" className="text-right">
                                Quantity
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control name="quantity" type="number" onChange={this.onChange} defaultValue={this.state.quantity}></Form.Control>
                                <Form.Control.Feedback type="invalid">Please enter a valid input</Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPrice"  className="mr-3">
                            <Form.Label column sm="3" className="text-right">
                                Price
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control name="price" type="number" onChange={this.onChange} defaultValue={this.state.price} readOnly={this.props.access!=="Department Manager"} required></Form.Control>
                                <Form.Control.Feedback type="invalid">Please enter a valid input</Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formLastShipment"  className="mr-3">
                            <Form.Label column sm="3" className="text-right">
                                Last Shipment
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control  name="lastShipment" plaintext readOnly defaultValue={this.state.lastShipment}></Form.Control>
                                <Form.Control.Feedback type="invalid">Please enter a valid input</Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formIsle"  className="mr-3">
                            <Form.Label column sm="3" className="text-right">
                                Aisle
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control name="isle" onChange={this.onChange} defaultValue={this.state.isle} readOnly={this.props.access==="Warehouse Associate"}></Form.Control>
                                <Form.Control.Feedback type="invalid">Please enter a valid input</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Card.Footer>
                            <Row>
                                <this.Buttons />
                            </Row>
                        </Card.Footer>
                    </Form>
            </Card>
        )
    }
}