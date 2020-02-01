import React from 'react'
import ItemList from './table/ItemList'
import Table from 'react-bootstrap/Table'

export default function() {
    return (
    <figure>
        <Table striped bordered hover size="sm">
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
                <ItemList></ItemList>
            </tbody>
        </Table>
    </figure>
    )
}