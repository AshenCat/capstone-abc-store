import React from 'react'
import { Col, Row, Button, Form, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

export default class ReceiveShipment extends React.Component{
    state = {
        name: '',
        received: '',
        date: '',
        quantity: 0,
        vendor: ''
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value})

    onSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
        this.props.newShipment(this.state)
        window.history.back()
    }

    getDate = (date) => {
        this.setState({date: date._d})
    }

    render(){
        
        return(
            <Card>
                <Card.Header>Receive Shipment</Card.Header>
                <Card.Body>
                    <Form onSubmit={this.onSubmit} role="form">
                        <Form.Group as={Row} controlId="formItemName">
                            <Form.Label column sm="3" className="text-right">
                                Item Name
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control name="name" onChange={this.onChange} required></Form.Control>
                                <Form.Control.Feedback type="invalid">Please enter a valid input</Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formVendor">
                            <Form.Label column sm="3" className="text-right">
                                Vendor
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control name="vendor" onChange={this.onChange} required></Form.Control>
                                <Form.Control.Feedback type="invalid">Please enter a valid input</Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formQuantity">
                            <Form.Label column sm="3" className="text-right">
                                Quantity
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control name="quantity" type="number" onChange={this.onChange}></Form.Control>
                                <Form.Control.Feedback type="invalid">Please enter a valid input</Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} onChange={this.onChange} controlId="formLastShipment">
                            <Form.Label column sm="3" className="text-right">
                                Last Shipment
                            </Form.Label>
                            <Col sm="9">
                                <Datetime onChange={this.getDate} required/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formReceived">
                            <Form.Label column sm="3" className="text-right">
                                Received By
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control name="received" onChange={this.onChange}></Form.Control>
                                <Form.Control.Feedback type="invalid">Please enter a valid input</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Row>
                            <Col className="text-center">
                                <Button size="lg" type="submit" variant="primary">Submit</Button>
                            </Col>
                            <Col className="text-center">
                                <Link className="btn btn-secondary btn-lg" to="/home">Return</Link>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        )
    }
}