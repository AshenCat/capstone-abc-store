import React from 'react'
import {Link} from 'react-router-dom'

export default class Request extends React.Component {
    render() {
        const { name, vendor, quantity, status, _id } = this.props.item;
        return (
            <tr>
                <td>{vendor}</td>
                <td>{name}</td>
                <td>{quantity}</td>
                <td>{status}</td>
                <td><Link className="btn btn-secondary btn-sm" to={'/requests/' + _id}  onClick={this.props.setSelected.bind(this, _id)}>View Item</Link></td>
            </tr>
        )
    }
}