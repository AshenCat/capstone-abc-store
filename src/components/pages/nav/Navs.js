import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom'

export default function() {
    return (
        <ListGroup as="ul">
            <ListGroup.Item as="li">Inventory List</ListGroup.Item>
            <ListGroup.Item as="li">Add Item</ListGroup.Item>
            <ListGroup.Item as="li">Request Tickets</ListGroup.Item>
            <ListGroup.Item as="li">Item Statistics</ListGroup.Item>
            <ListGroup.Item as="li">Users</ListGroup.Item>
        </ListGroup>
    )
}