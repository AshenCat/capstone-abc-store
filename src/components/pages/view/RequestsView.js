import React from 'react'
import { Table } from 'react-bootstrap';
import Request from './table/Request';
import {Link} from 'react-router-dom'

export default class RequestsView extends React.Component{
    render() {
        return(
            <>
            <Table striped hover bordered>
                <thead>
                    <tr>
                        <th>Vendor</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.requestList.sort((a,b) => a.vendor.localeCompare(b.vendor) || a.vendor - b.vendor).map(item => <Request item={item} key={item._id} setSelected={this.props.setSelected}/>)}
                </tbody>
            </Table>
            <Link className="btn btn-secondary" to="/">Return</Link>
            </>
        )
    }
}