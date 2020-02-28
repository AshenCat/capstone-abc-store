import React from 'react'
import { Table } from 'react-bootstrap';
import Request from './table/Request';

export default class RequestsView extends React.Component{
    render() {
        return(
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
                    {this.props.requestList.map(item => <Request item={item} key={item._id} setSelected={this.props.setSelected}/>)}
                </tbody>
            </Table>
        )
    }
}