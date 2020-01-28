import React, { Component } from 'react';
import {Navbar} from 'react-bootstrap';

export default class Header extends Component{
    state = {
        msg: ""
    }

    render() {
        return(
            <Navbar bg="dark" variant="dark">
                {this.props.title}
            </Navbar>
        )
    }
}