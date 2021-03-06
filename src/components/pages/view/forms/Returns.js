import React from 'react'
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export default class VendorReturn extends React.Component{
    constructor(props){
        super(props)
        if(this.props.access !== "Store Clerk")
            this.state={
                name: this.props.item[0].name,
                vendor: this.props.item[0].vendor,
                reason: this.props.item[0].reason,
                imei: this.props.item[0].imei,
                status: this.props.item[0].status
            }
    }
    state = {
        name: "",
        vendor: "",
        reason: "",
        imei: "",
        status:'Processing'
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
        this.props.setMessage("Return Successful")
        this.props.setShowToast(true)
    }

    btnReturn = () => {
        return (this.props.access === "Store Clerk" ? 
        <Link className="btn btn-secondary btn-lg" to="/">Return</Link> : 
        <Link className="btn btn-secondary btn-lg" to="/returns">Return</Link>)
}

    render(){
        const rArr = this.props.itemList ? [...new Set(this.props.itemList.map(data=>data.vendor))] : [];
        const cArr = this.props.itemList ? [...this.props.itemList] : [];

        return (
            <Card>
                <Card.Header>
                    {this.props.access === "Warehouse Associate" ? "Item Return" : "Return to Vendor"}
                </Card.Header>
                    <Form onSubmit={this.onSubmit} role="form" className="mt-3">
                        <Form.Group as={Row} controlId="formItemName" className="mr-3">
                            <Form.Label column sm="3" className="text-right">
                                Item Name
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control as="select" name="name" onChange={this.onChange} required disabled={this.props.access === "Warehouse Associate"}
                                    defaultValue={this.props.access === "Warehouse Associate" ? this.state.name : ""}>
                                    <option>Choose one...</option>
                                    {cArr.map((el) => (<option key={el._id}>{el.name}</option> ))}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">Please enter a valid input</Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formVendor" className="mr-3">
                            <Form.Label column sm="3" className="text-right">
                                Vendor
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control as="select" name="vendor" onChange={this.onChange} required disabled={this.props.access === "Warehouse Associate"}>
                                {this.props.access === "Warehouse Associate" ? <option selected>{this.state.vendor}</option> : ""}
                                <option>Choose one...</option>
                                {rArr.map((data,ctr)=> <option key={ctr}>{data}</option>)}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">Please enter a valid input</Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formIMEI" className="mr-3">
                            <Form.Label column sm="3" className="text-right">
                                IMEI
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control name="imei" onChange={this.onChange} defaultValue={this.state.imei} disabled={this.props.access === "Warehouse Associate"}></Form.Control>
                                <Form.Control.Feedback type="invalid">Please enter a valid input</Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formReason" className="mr-3">
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

                        <Form.Group as={Row} controlId="formStatus" className="mr-3">
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