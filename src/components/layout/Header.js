import React, { Component } from 'react';
import {Navbar, Row, Col, Button} from 'react-bootstrap';

export default class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            date: new Date().toLocaleString()
        }
    }
    
    componentDidMount(){
        setInterval(()=>{
            this.setState({
                date: new Date().toLocaleString()
            })
        },1000)
    }

    headerController = () => {
        if(this.props.title !== "Login")
            return (
                <React.Fragment>
                    <Row className="w-100">
                        <Col>
                            <Navbar.Brand>{this.props.title}</Navbar.Brand>
                        </Col>
                        <Col className="text-center m-0 p-0">
                            <Navbar.Brand style={{'color':'white'}}>{this.state.date}</Navbar.Brand>
                        </Col>
                        <Col className="m-0 p-0">
                            <Button variant="outline-secondary" onClick={this.props.logout} className="float-right">Log out</Button>
                        </Col>
                    </Row>
                </React.Fragment>
            )
        else 
            return (
                <React.Fragment>
                    <Row className="w-100">
                        <Col>
                            <Navbar.Brand>{this.props.title}</Navbar.Brand>
                        </Col>
                        <Col className="m-0 p-0">
                            <Navbar.Brand className="float-right" style={{'color':'white'}}>{this.state.date}</Navbar.Brand>
                        </Col>
                    </Row>
                </React.Fragment>
            )
    }

    render() {
        return(
            <Navbar bg="dark" variant="dark">
                <this.headerController></this.headerController>
            </Navbar>
        )
    }
}