import React, { Component } from 'react';
import {Navbar} from 'react-bootstrap';

export default class Header extends Component{
    state = {
        msg: ""
    }

    render() {
        return(
            <Navbar bg="dark" variant="dark">
                <h1 style={{color:"white"}}>{this.props.title}</h1>
            </Navbar>
        )
    }
}