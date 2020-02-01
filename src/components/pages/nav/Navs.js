import React, { Component } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom'

export default class Navs extends Component {
    state = {

    }

    isList = () => {
        if(window.location.pathname === "/home")
            return true
        return false
    }

    //department manager
    isAddItem = () => {
        if(window.location.pathname === "/add-item")
            return true
        return false
    }

    isTickets = () => {
        if(window.location.pathname === "/tickets")
            return true
        return false
    }

    isStats = () => {
        if(window.location.pathname === "/stats")
            return true
        return false
    }

    isUsers = () => {
        if(window.location.pathname === "/users")
            return true
        return false
    }

    //Store Clerk

    isRequestItems = () => {
        if(window.location.pathname === "/request-items")
            return true
        return false
    }

    isCustomerReturns = () => {
        if(window.location.pathname === "/customer-returns")
            return true
        return false
    }

    //Warehouse Associate

    isInvoices = () => {
        if(window.location.pathname === "/invoices")
            return true
        return false
    }

    isReceiveShipments = () => {
        if(window.location.pathname === "/receive-shipments")
            return true
        return false
    }

    isVendorReturn = () => {
        if(window.location.pathname === "/vendor-return")
            return true
        return false
    }

    ViewManager = () => {
        if (this.props.access === "Department Manager"){
            return (
                <React.Fragment>
                    <ListGroup.Item as="li"><Link to="/add-item" style={{color: 'black'}}>Add Item</Link></ListGroup.Item>
                    <ListGroup.Item as="li"><Link to="/tickets" style={{color: 'black'}}>Request Tickets</Link></ListGroup.Item>
                    <ListGroup.Item as="li"><Link to="/stats" style={{color: 'black'}}>Item Statistics</Link></ListGroup.Item>
                    <ListGroup.Item as="li"><Link to="/users" style={{color: 'black'}}>Users</Link></ListGroup.Item>
                </React.Fragment>
            )
        }
        else if (this.props.access === "Store Clerk"){
            return (
                <React.Fragment>
                    <ListGroup.Item as="li"><Link to="/request-item">Request Item</Link></ListGroup.Item>
                    <ListGroup.Item as="li"><Link to="/customer-return">Customer Return</Link></ListGroup.Item>
                </React.Fragment>
            )
        }
        else if (this.props.access === "Warehouse Associate") {
            return (
                <React.Fragment>
                    <ListGroup.Item as="li"><Link to="/invoices">Invoices</Link></ListGroup.Item>
                    <ListGroup.Item as="li"><Link to="/receive-shipments">Receive Shipments</Link></ListGroup.Item>
                    <ListGroup.Item as="li"><Link to="/vendor-return">Vendor Return</Link></ListGroup.Item>
                </React.Fragment>
            )
        }
    }

    render() {
        return (
            <ListGroup as="ul">
                <ListGroup.Item as="li" active={this.isList()}><Link to="/home" style={{color: 'black'}}>Inventory List</Link></ListGroup.Item>
                <this.ViewManager/>
            </ListGroup>
        )
    }
}

