import React from 'react'
import {Card, Form, Row, Col, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default class Request extends React.Component {
    constructor(props){
        super(props)
        if(this.props.access !== "Store Clerk")
            this.state={
                name: this.props.item[0].name,
                vendor: this.props.item[0].vendor,
                quantity: this.props.item[0].quantity,
                status: this.props.item[0].status,
                date: this.props.item[0].date
            }
    }

    state = {
        name: "",
        vendor: "",
        quantity: 0,
        status: "Processing",
        date: Date(Date.now())
    }

    onSubmit = (e) => {
        e.preventDefault()
        if(this.props.access === "Store Clerk") {
            this.props.requestItem({
                name: this.state.name,
                vendor: this.state.vendor,
                quantity: this.state.quantity,
                status: "Processing"
            })
        } else {
            this.props.updateRequestStatus({
                _id: this.props.item[0]._id,
                status: this.state.status
            })
        }
        this.props.setMessage("Request Successful")
        this.props.setShowToast(true)
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value})

    btnReturn = () => {
                return (this.props.access === "Store Clerk" ? 
                <Link className="btn btn-secondary btn-lg" to="/">Return</Link> : 
                <Link className="btn btn-secondary btn-lg" to="/tickets">Return</Link>)
    }

    render() {
        const rArr = this.props.itemList ? [...new Set(this.props.itemList.map(data=>data.vendor))] : [];
        const cArr = this.props.itemList ? [...this.props.itemList] : [];
        return (
            <Card>
                <Card.Header>
                    Item Request
                </Card.Header>
                <Form onSubmit={this.onSubmit} role="form" className="mt-3">
                        <Form.Group as={Row} controlId="formName"  className="mr-3">
                            <Form.Label column sm="3" className="text-right">
                                Item Name
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control name="name" onChange={this.onChange} required
                                value={this.props.access === "Department Manager" ? this.state.name : ""} disabled>
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formVendor" className="mr-3">
                            <Form.Label column sm="3" className="text-right">
                                Vendor
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control name="vendor" onChange={this.onChange} required
                                value={this.props.access === "Department Manager" ? this.state.vendor : ""} disabled>
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formQuantity" className="mr-3">
                            <Form.Label column sm="3" className="text-right">
                                Quantity
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control name="quantity" defaultValue={this.state.quantity} type="number" onChange={this.onChange} required/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formStatus" className="mr-3">
                            <Form.Label column sm="3" className="text-right">
                                Status
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control name="status"  defaultValue={this.state.status} onChange={this.onChange} as="select" required disabled={this.props.access==="Store Clerk"}>
                                    <option>Processing</option>.
                                    <option>Rejected</option>
                                    <option>Accepted</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formDate" className="mr-3">
                            <Form.Label column sm="3" className="text-right">
                                Date Requested
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control defaultValue={this.state.date} readOnly/>
                            </Col>
                        </Form.Group>
                        <Card.Footer>
                            <Row>
                                <Col className="text-center">
                                    <Button size="lg" type="submit" variant="primary">Submit</Button>
                                </Col>
                                <Col className="text-center">
                                    <this.btnReturn/>
                                </Col>
                            </Row>
                        </Card.Footer>
                </Form>
            </Card>
        )
    }
}