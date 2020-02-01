import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class Item extends Component{

    render() {
        const { name, price, stock, _id, vendor } = this.props.item
        return (
            <tr>
                <td>{vendor}</td>
                <td>{name}</td>
                <td>{price}</td>
                <td>{stock}</td>
                <td className="text-center"><Link to={'/items/' + _id} onClick={this.props.setSelected.bind(this, _id)}>View Details</Link></td>
            </tr>
        )
    }
}