import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class User extends Component {

    render() {
        const { username, access, _id } = this.props.user;
        return(
            <tr>
                <td>{username}</td>
                <td>{access}</td>
                <td>
                    <Button variant="danger" size="sm" onClick={() => this.props.deleteUser(_id)}> Delete User </Button>
                </td>
            </tr>
        )
    }
}