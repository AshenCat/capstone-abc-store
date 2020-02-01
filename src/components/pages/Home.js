import React, { Component } from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
//import Container from 'react-bootstrap/Container'
import { Router, Route } from 'react-router-dom'
import TableView from './view/TableView';
import Navs from './nav/Navs'

export default class Home extends Component {

    render() {

        return(
            <main className="mt-2">
                <Row>
                    <Col sm={3}>
                        <nav className="container">
                            <Navs></Navs>
                        </nav>
                    </Col>
                    <Col sm={8}>
                        <figure className="container">
                            <TableView></TableView>
                        </figure>
                    </Col>
                </Row>
            </main>
        )
    }
}



