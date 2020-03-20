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
        window.history.back();
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value})

    render() {
        const rArr = [...new Set(this.props.itemList.map(data=>data.vendor))];
        return (
            <Card>
                <Card.Header>
                    Item Request Form
                </Card.Header>
                <Form onSubmit={this.onSubmit} role="form" className="mt-3">
                        <Form.Group as={Row} controlId="formName"  className="mr-3">
                            <Form.Label column sm="3" className="text-right">
                                Item Name
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control as="select" name="name"  defaultValue={this.state.name} onChange={this.onChange} required>
                                    {this.props.itemList.map((el) => (<option key={el._id}>{el.name}</option> ))}
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formVendor" className="mr-3">
                            <Form.Label column sm="3" className="text-right">
                                Vendor
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control as="select" name="vendor" defaultValue={this.state.vendor} onChange={this.onChange} required>
                                {rArr.map((data,ctr)=> <option key={ctr}>{data}</option>)}
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
                                    <Link className="btn btn-secondary btn-lg" to="/tickets">Return</Link>
                                </Col>
                            </Row>
                        </Card.Footer>
                </Form>
            </Card>
        )
    }
}