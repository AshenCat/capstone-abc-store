import React from 'react'
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export default class VendorReturn extends React.Component{
    state = {
        name: '',
        vendor: '',
        reason: '',
        imei: '',
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value})

    onSubmit = (e) => {
        e.preventDefault()
        this.props.returnToVendor({
            name: this.state.name,
            vendor: this.state.vendor,
            reason: this.state.reason,
            imei: this.state.imei,
        })
        window.history.back();
    }

    render(){
        return (
            <Card>
                <Card.Header>
                    Return to Vendor
                </Card.Header>
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

                        <Form.Group as={Row} controlId="formIMEI">
                            <Form.Label column sm="3" className="text-right">
                                IMEI
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control name="imei" onChange={this.onChange}></Form.Control>
                                <Form.Control.Feedback type="invalid">Please enter a valid input</Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formReason">
                            <Form.Label column sm="3" className="text-right">
                                Reason
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control maxLength="150" as="textarea" rows="3" name="reason" onChange={this.onChange}></Form.Control>
                                <Form.Control.Feedback type="invalid">Please enter a valid input</Form.Control.Feedback>
                                <Form.Text className="text-muted">
                                  Limited up to 150 characters
                                </Form.Text>
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