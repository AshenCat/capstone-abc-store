import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Axios from 'axios'

import TableView from './view/TableView';
import Navs from './nav/Navs'
import ItemDetails from './view/ItemDetails'

export default class Home extends Component {

    state = {
        itemList:[],
        id: ''
    }

    componentDidMount() {
        Axios.get(`http://localhost:7171/api/item/get-items`).then(res=>{
            this.setState({itemList:res.data})
          })
    }

    updateData = (item) => {
        const id = item._id;
        // console.log(item);
        // console.log(id);
        // console.log([...this.state.itemList.filter(item=>item._id!==id)])
        delete item._id;
        Axios.put(`http://localhost:7171/api/item/edit-item/${id}`, item).then(res=>{
            this.setState({itemList: [...this.state.itemList.filter(item=>item._id!==id), res.data]})
        })
    }

    deleteData = (id) => {
        // Axios.delete(`http://localhost:7171/api/item/delete-item/${id}`).then(
        //     res=>this.setState({itemList: [...this.state.itemList.filter(item=>item._id!==id)]})
        // )
        this.setState({itemList: [...this.state.itemList.filter(item=>item._id!==id)]})
    }

    setSelected = (id) => {
        this.setState({id})
    }

    render() {
        return(
            <main className="mt-2">
                <Router>
                    <Row>
                        <Col sm={3}>
                            <nav className="container">
                                <Navs access={this.props.access}></Navs>
                            </nav>
                        </Col>
                        <Col sm={8}>
                            <figure className="container">
                                <Route exact path="/home">
                                    <TableView itemList={this.state.itemList} setSelected={this.setSelected}></TableView>
                                </Route>
                                <Route path="/items/">
                                    <ItemDetails 
                                        item={[...this.state.itemList.filter(it => it._id === window.location.pathname.split("/")[2])]} 
                                        updateData={this.updateData}
                                        deleteData={this.deleteData}>
                                    </ItemDetails>
                                </Route>
                            </figure>
                        </Col>
                    </Row>
                </Router>
            </main>
        )
    }
}

