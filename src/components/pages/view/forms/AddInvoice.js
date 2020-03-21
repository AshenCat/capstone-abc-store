import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import { Form, Row, Col, Button } from 'react-bootstrap';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

export default class AddInvoice extends React.Component {

    state = {
        date: "",
        vendor: "",
        received: "",
        upload: ""
    }

    onSubmit = (e) => {
        e.preventDefault();
        let invoice = {
            date: this.state.date,
            vendor: this.state.vendor,
            received: this.state.received,
            upload: this.state.upload
        }
        if (invoice.date === "")
            delete invoice.date
        console.log(invoice)
        this.props.addNewInvoice(invoice)
        this.props.setMessage("Add Successful")
        this.props.setShowToast(true)
    }

    onChange = (e) => this.setState({[e.target.name] : e.target.value})

    getDate = (date) => {
        this.setState({date: date._d})
    }

    render(){
        return (
            <React.Fragment>
                <Card>
                    <Card.Header>
                        Add Invoice
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={this.onSubmit} role="form">
                            <Form.Group as={Row}>
                                <Form.Label column sm="3" className="text-right">
                                    Date Received
                                </Form.Label>
                                <Col sm="9">
                                    <Datetime onChange={this.getDate} required/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm="3" className="text-right">
                                    Vendor
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control name="vendor" onChange={this.onChange} defaultValue={this.state.vendor} required></Form.Control>
                                    <Form.Control.Feedback type="invalid">Please enter a valid input</Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm="3" className="text-right">
                                    Received By
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control name="received" onChange={this.onChange} defaultValue={this.state.received}></Form.Control>
                                    <Form.Control.Feedback type="invalid">Please enter a valid input</Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm="3" className="text-right">
                                    Upload File
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control name="upload" onChange={this.onChange} defaultValue={this.state.upload}></Form.Control>
                                    <Form.Control.Feedback type="invalid">Please enter a valid input</Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Row>
                                <Col className="text-center">
                                    <Button size="lg" type="submit" variant="primary">Add Invoice</Button>
                                </Col>
                                <Col className="text-center">
                                    <Link className="btn btn-secondary btn-lg" to="/invoices">Return</Link>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            </React.Fragment>
        )
    }
}