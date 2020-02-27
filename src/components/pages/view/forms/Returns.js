import React from 'react'
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export default class VendorReturn extends React.Component{
    constructor(props){
        super(props)
        if(this.props.access === "Warehouse Associate"){
            console.log("aw")
            this.state = {
                name: this.props.item[0].name,
                vendor: this.props.item[0].vendor,
                reason: this.props.item[0].reason,
                imei: this.props.item[0].imei,
                status: this.props.item[0].status
            }
        }
    }
    state = {
        name: '',
        vendor: '',
        reason: '',
        imei: '',
        status: 'Processing'
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value})

    onSubmit = (e) => {
        e.preventDefault()
        if(this.props.access==="Store Clerk")
            this.props.storeReturn({
                name: this.state.name,
                vendor: this.state.vendor,
                reason: this.state.reason,
                imei: this.state.imei,
                status: 'Processing'
            })
        else 
            this.props.returnToVendor({
                _id: this.props.item[0]._id,
                status: this.state.status
            })
        window.history.back();
    }

    render(){
        return (
            <Card>
                <Card.Header>
                    {this.props.access === "Warehouse Associate" ? "Item Return" : "Return to Vendor"}
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={this.onSubmit} role="form">
                        <Form.Group as={Row} controlId="formItemName">
                            <Form.Label column sm="3" className="text-right">
                                Item Name
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control name="name" onChange={this.onChange} defaultValue={this.state.name} required  disabled={this.props.access === "Warehouse Associate"}></Form.Control>
                                <Form.Control.Feedback type="invalid">Please enter a valid input</Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formVendor">
                            <Form.Label column sm="3" className="text-right">
                                Vendor
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control name="vendor" onChange={this.onChange} required defaultValue={this.state.vendor} disabled={this.props.access === "Warehouse Associate"}></Form.Control>
                                <Form.Control.Feedback type="invalid">Please enter a valid input</Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formIMEI">
                            <Form.Label column sm="3" className="text-right">
                                IMEI
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control name="imei" onChange={this.onChange} defaultValue={this.state.imei} disabled={this.props.access === "Warehouse Associate"}></Form.Control>
                                <Form.Control.Feedback type="invalid">Please enter a valid input</Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formReason">
                            <Form.Label column sm="3" className="text-right">
                                Reason
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control maxLength="150" as="textarea" rows="3" name="reason" defaultValue={this.state.reason} onChange={this.onChange} disabled={this.props.access === "Warehouse Associate"}></Form.Control>
                                <Form.Control.Feedback type="invalid">Please enter a valid input</Form.Control.Feedback>
                                <Form.Text className="text-muted">
                                  Limited up to 150 characters
                                </Form.Text>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formStatus">
                            <Form.Label column sm="3" className="text-right">
                                Status
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control as="select" name="status" defaultValue={this.state.status} onChange={this.onChange} disabled={this.props.access === "Store Clerk"}>
                                    <option>Returned</option>
                                    <option>Processing</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">Please enter a valid input</Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Row>
                            <Col className="text-center">
                                <Button size="lg" type="submit" variant="primary">Submit</Button>
                            </Col>
                            <Col className="text-center">
                                <Link className="btn btn-secondary btn-lg" to="/returns">Return</Link>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        )
    }
}