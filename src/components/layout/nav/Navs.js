import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

export default class Navs extends Component {
  state = {
    isList: false,
  };

  ViewManager = () => {
    if (this.props.access === "Department Manager") {
      return (
        <React.Fragment>
          <ListGroup.Item as="li" className="text-center">
            <Link to="/add-item">Add Item</Link>
          </ListGroup.Item>
          <ListGroup.Item as="li" className="text-center">
            <Link to="/tickets">Request Tickets</Link>
          </ListGroup.Item>
          <ListGroup.Item as="li" className="text-center">
            <Link to="/users">Users</Link>
          </ListGroup.Item>
        </React.Fragment>
      );
    } else if (this.props.access === "Store Clerk") {
      return (
        <React.Fragment>
          <ListGroup.Item as="li" className="text-center">
            <Link to="/request-item">Request Item</Link>
          </ListGroup.Item>
          <ListGroup.Item as="li" className="text-center">
            <Link to="/return-item">Customer Return</Link>
          </ListGroup.Item>
        </React.Fragment>
      );
    } else if (this.props.access === "Warehouse Associate") {
      return (
        <React.Fragment>
          <ListGroup.Item as="li" className="text-center">
            <Link to="/invoices">Invoices</Link>
          </ListGroup.Item>
          <ListGroup.Item as="li" className="text-center">
            <Link to="/receive-shipment">Receive Shipments</Link>
          </ListGroup.Item>
          <ListGroup.Item as="li" className="text-center">
            <Link to="/returns">Vendor Return</Link>
          </ListGroup.Item>
        </React.Fragment>
      );
    }
  };

  render() {
    return (
      <ListGroup as="ul">
        <ListGroup.Item
          className="text-center"
          style={{ background: "#d3d3d3" }}
        >
          <h5>Navigation</h5>
        </ListGroup.Item>
        <ListGroup.Item as="li" className="text-center">
          <Link to="/">Inventory List</Link>
        </ListGroup.Item>
        <this.ViewManager />
      </ListGroup>
    );
  }
}
