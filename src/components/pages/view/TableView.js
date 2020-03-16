import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import Item from './table/Item'
import { Form, InputGroup } from 'react-bootstrap'

export default class TableView extends Component {
    state = {
        search: ""
    }

    onChange = (e) => this.setState({search: e.target.value})

    render(){
        return (
            <figure>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>Search </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control onChange={this.onChange}/>
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
                        {this.props.itemList.filter(item=>
                            item.name.toLowerCase().includes(this.state.search.trim()) || 
                            item.vendor.toLowerCase().includes(this.state.search.trim())).map((item)=>(
                            <Item key={item._id} item={item} setSelected={this.props.setSelected}/>))}
                    </tbody>
                </Table>
            </figure>
            )
    }
}