import React from 'react'
import { Table } from 'react-bootstrap';
import ReturnItem from './table/ReturnItem';
import {Link} from 'react-router-dom'

export default class ReturnView extends React.Component{

    render(){
        return(
            <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Vendor</th>
                        <th>Item Name</th>
                        <th>IMEI</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.returnItems.map(item=><ReturnItem key={item._id} item={item} setSelected={this.props.setSelected}/>)}
                </tbody>
            </Table>
            <Link className="btn btn-secondary" to="/">Return</Link>
            </>
        )
    }
}