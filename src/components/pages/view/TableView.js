import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import Item from './table/Item'
import { Form, InputGroup } from 'react-bootstrap'

export default class TableView extends Component {
    render(){
        return (
            <figure>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>Search </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control style={{'width':'150px'}}/>
                </InputGroup>
                <Table className="mt-1" striped bordered hover>
                    <thead>
                        <tr>
                            <th className="text-center">Vendor</th>
                            <th className="text-center">Model</th>
                            <th className="text-center">Price</th>
                            <th className="text-center">Quantity</th>
                            <th className="text-center">Action</th>
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