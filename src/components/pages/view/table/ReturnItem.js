import React from 'react'
import {Link} from 'react-router-dom'

export default class ReturnItem extends React.Component{

    render() {
        const { _id } = this.props.item

        return(
            <tr>
                <td>{this.props.item.vendor}</td>
                <td>{this.props.item.name}</td>
                <td>{this.props.item.imei}</td>
                <td>{this.props.item.status}</td>
                <td>
                    <Link to={'/return/' + _id} onClick={this.props.setSelected.bind(this, _id)} className="btn btn-secondary btn-sm text-center">Process Item</Link>
                </td>
            </tr>
        )
    }
}