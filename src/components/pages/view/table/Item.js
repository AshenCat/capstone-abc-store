import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

export default class Item extends Component{

    render() {
        const { name, isle, lastShipment, price, stock, _id, vendor } = this.props.item
        return (
            <tr>
                <td>{vendor}</td>
                <td>{name}</td>
                <td>{price}</td>
                <td>{stock}</td>
                <td><Button variant="primary">View Details</Button></td>
            </tr>
        )
    }
}