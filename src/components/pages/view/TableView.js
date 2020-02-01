import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import Item from './table/Item'

export default class TableView extends Component {
    render(){
        return (
            <figure>
                <Table striped bordered hover size="sm" variant="dark">
                    <thead>
                        <tr>
                            <th>Vendor</th>
                            <th>Model</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.itemList.map((item)=>(<Item key={item._id} item={item} setSelected={this.props.setSelected}></Item>))}
                    </tbody>
                </Table>
            </figure>
            )
    }
}