import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {Row, Col, Navbar, Container, NavbarBrand} from 'react-bootstrap'

import Axios from 'axios'

import TableView from './view/TableView';
import Navs from '../layout/nav/Navs'
import ItemDetails from './view/forms/ItemDetails'
import AddItem from './view/forms/AddItem'
import Users from './view/forms/Users'
import AddInvoice from './view/forms/AddInvoice'
import InvoiceView from './view/InvoiceView';
import ReceiveShipment from './view/forms/ReceiveShipment';
import VendorReturn from './view/forms/Returns';
import ReturnView from './view/ReturnView';
import Requests from './view/forms/Requests'
import RequestsView from './view/RequestsView'
import StatisticsView from './view/StatisticsView';
import Toaster from '../layout/Toast';

class Home extends Component {
    constructor(props){
        super(props)

        Axios.get(`${this.props.api}/item/get-items`).then(res=>{
            this.setState({itemList:[...res.data]})
        })

        Axios.get(`${this.props.api}/invoice/get-invoices`).then(res=>{
            this.setState({invoices: [...res.data]})
        })

        Axios.get(`${this.props.api}/return`).then(res=>{
            this.setState({returnItems: [...res.data]})
        })

        Axios.get(`${this.props.api}/request`).then(res=>{
            this.setState({requestItems: [...res.data]})
        })
    }

    state = {
        message: "",
        showToast: false,
        itemList:[],
        invoices: [],
        returnItems: [],
        requestItems: [],
        id: '',
    }
    
    setSelected = (id) => this.setState({id})
    setShowToast = (probablyABoolean) => this.setState({showToast:probablyABoolean})
    setMessage = (message) => this.setState({message})

    /*****************************************************************
     * 
     * 
     * ITEMS
     * 
     * 
     *****************************************************************/

    updateData = (item) => {
        const id = item._id;
        delete item._id;
        Axios.put(`${this.props.api}/item/edit-item/${id}`, item).then(res=>{
            this.setState({itemList: [...this.state.itemList.filter(item=>item._id!==id), res.data]})
        })
    }

   
    deleteData = (id) => {
        Axios.delete(`${this.props.api}/item/delete-item/${id}`).then(
            res=>this.setState({itemList: [...this.state.itemList.filter(item=>item._id!==id)]})
        )
    }


    addData = (item) => {
        Axios.put(`${this.props.api}/item/add-item`, item).then(res=>{
            this.setState({itemList: [...this.state.itemList, res.data]})
        })
    }

    /*****************************************************************
     * 
     * 
     * INVOICES
     * 
     * 
     *****************************************************************/

    addNewInvoice = (invoice) => {
        console.log(invoice)
        Axios.put(`${this.props.api}/invoice/add-invoice`, invoice).then(res=>{
            this.setState({invoices: [...this.state.invoices, res.data]})
        })
    }

     /*****************************************************************
     * 
     * 
     * SHIPMENTS
     * 
     * 
     *****************************************************************/

     newShipment = (shipment) => {
         console.log(shipment)
         Axios.post(`${this.props.api}/receive-shipment`,shipment).then(res =>{
             this.setState({itemList: [...this.state.itemList.filter(item => (item.name !== res.data.name)), res.data]})
         })
     }

     /*****************************************************************
     * 
     * 
     * Returns?!?!
     * 
     * 
     *****************************************************************/
     //Store clerk adds to list of item-returns
     storeReturn = (item) => {
        console.log(item)
        Axios.put(`${this.props.api}/return/add-to-return-list`, item).then(res => {
            console.log(res)
        })
     }

     //Warehouse Associate changing status of an item
     returnToVendor = (item) => {
         //console.log(item)
         Axios.patch(`${this.props.api}/return/change-status`, item).then(res=>{
            //console.log(res)
            this.setState({returnItems: [...this.state.returnItems.filter(item=> item._id !== res.data._id), res.data]})
         })
     }

     /*****************************************************************
     * 
     * 
     * Requests?!?!
     * 
     * 
     *****************************************************************/
    requestItem = (item) => {
        Axios.put(`${this.props.api}/request/add-item-request`, item).then(res=>{
            window.history.back();
        })
    }

    /*****************************************************************
     * 
     * 
     * Admin changing request ticket status?!?!
     * 
     * 
     *****************************************************************/
    updateRequestStatus = (item) => {
        Axios.patch(`${this.props.api}/request/change-status`, item).then(res=>{
            this.setState({requestItems: [...this.state.requestItems.filter(item=> item._id !== res.data._id), res.data]})
        })
    }

    /*****************************************************************
     * 
     * 
     * View
     * 
     * 
     *****************************************************************/

    ViewController = () => {
        if(this.props.access === "Department Manager") return (
            <figure className="ml-3">
                <Route exact path="/">
                    <TableView 
                        itemList={this.state.itemList.sort((a,b) => a.vendor.localeCompare(b.vendor) || a.vendor - b.vendor)}
                        setSelected={this.setSelected}
                        setShowToast={this.setShowToast}
                        setMessage={this.setMessage}/>
                </Route>
                <Route path="/items/">
                    <ItemDetails 
                        access={this.props.access}
                        item={[...this.state.itemList.filter(it => it._id === window.location.pathname.split("/")[2])]} 
                        updateData={this.updateData}
                        deleteData={this.deleteData}
                        setShowToast={this.setShowToast}
                        setMessage={this.setMessage}
                        />
                </Route>
                <Route exact path="/add-item">
                    <AddItem 
                    addData={this.addData}
                    setShowToast={this.setShowToast}
                    setMessage={this.setMessage}/>
                </Route>
                <Route exact path="/users">
                    <Users
                    api={this.props.api}
                    setShowToast={this.setShowToast}
                    setMessage={this.setMessage}/>
                </Route>
                <Route exact path="/tickets" 
                    render={(props) => 
                    <RequestsView 
                    requestList={this.state.requestItems}
                    setSelected={this.setSelected}
                    setShowToast={this.setShowToast}
                    setMessage={this.setMessage}/>}/>
                <Route path="/requests" 
                    render={(props)=>
                        <Requests
                            itemList={this.state.itemList}
                            access={this.props.access} 
                            item={[...this.state.requestItems.filter(it => it._id === window.location.pathname.split("/")[2])]} 
                            updateRequestStatus={this.updateRequestStatus}
                            setShowToast={this.setShowToast}
                            setMessage={this.setMessage}/>}/>
                <Route exact path="/stats"
                    render={(props)=>
                        <StatisticsView 
                            itemList={this.state.itemList}
                            api={this.props.api}
                            setShowToast={this.setShowToast}
                            setMessage={this.setMessage}/>} />
            </figure>
        )
        else if (this.props.access === "Warehouse Associate") return (
            <figure className="ml-3">
                <Route exact path="/">
                    <TableView 
                        itemList={this.state.itemList.sort((a,b) => a.vendor.localeCompare(b.vendor) || a.vendor - b.vendor)}
                        setSelected={this.setSelected}
                        setShowToast={this.setShowToast}
                        setMessage={this.setMessage}/>
                </Route>
                <Route path="/items/">
                    <ItemDetails 
                        access={this.props.access}
                        item={[...this.state.itemList.filter(it => it._id === window.location.pathname.split("/")[2])]} 
                        updateData={this.updateData}
                        deleteData={this.deleteData}
                        setShowToast={this.setShowToast}
                        setMessage={this.setMessage}/>
                </Route>
                <Route exact path="/invoices">
                    <InvoiceView invoices={this.state.invoices} />
                </Route>
                <Route exact path="/invoice">
                    <AddInvoice addNewInvoice={this.addNewInvoice} 
                    setShowToast={this.setShowToast}
                    setMessage={this.setMessage}/>
                </Route>
                <Route exact path="/receive-shipment">
                    <ReceiveShipment newShipment={this.newShipment} 
                    itemList={this.state.itemList} 
                    setShowToast={this.setShowToast}
                    setMessage={this.setMessage}/>
                </Route>
                <Route exact path="/returns">
                    <ReturnView returnItems={this.state.returnItems} 
                    setSelected={this.setSelected}
                    setShowToast={this.setShowToast}
                    setMessage={this.setMessage}/>
                </Route>
                <Route path="/return/">
                        <VendorReturn 
                            item={[...this.state.returnItems.filter(it => it._id === window.location.pathname.split("/")[2])]} 
                            access={this.props.access} 
                            returnToVendor={this.returnToVendor}
                            setShowToast={this.setShowToast}
                            setMessage={this.setMessage}/>
                </Route>
            </figure>
        )
        else if (this.props.access === "Store Clerk") return(
            <figure className="ml-3">
                <Route exact path="/">
                    <TableView 
                        itemList={this.state.itemList.sort((a,b) => a.vendor.localeCompare(b.vendor) || a.vendor - b.vendor)}
                        setSelected={this.setSelected}/>
                </Route>
                <Route path="/items/">
                    <ItemDetails 
                        access={this.props.access}
                        item={[...this.state.itemList.filter(it => it._id === window.location.pathname.split("/")[2])]} 
                        updateData={this.updateData}
                        deleteData={this.deleteData}
                        setShowToast={this.setShowToast}
                        setMessage={this.setMessage}/>
                </Route>
                <Route exact path="/return-item">
                    <VendorReturn 
                        item={this.state.returnItems.filter(it => it._id === window.location.pathname.split("/")[2])} 
                        access={this.props.access} 
                        storeReturn={this.storeReturn}
                        itemList={this.state.itemList}
                        setShowToast={this.setShowToast}
                        setMessage={this.setMessage}/>
                </Route>
                <Route exact path="/request-item" 
                    render={(props)=> <Requests 
                        itemList={this.state.itemList}
                        requestItem={this.requestItem}
                        access={this.props.access}
                        setShowToast={this.setShowToast}
                        setMessage={this.setMessage}/>}  />
            </figure>
        )
    }

    render() {
        return(
            <main className="mt-2">
                <Router>
                    <Row className="no-mr">
                        <Col sm={2}>
                            <nav className="container">
                                <Navs access={this.props.access}/>
                            </nav>
                        </Col>
                        <Col sm={10}>
                            <this.ViewController/>
                            <div style={{'height':'50px'}} />
                        </Col>
                    </Row>
                </Router>
                <Toaster    message={this.state.message} 
                            showToast={this.state.showToast}
                            setShowToast={this.setShowToast}/>
                <div className="fixed-bottom">  
                    <Navbar bg="dark" variant="dark">
                        <Container>
                            <NavbarBrand className="text-right">Inventory Management System &copy; 2020</NavbarBrand>
                        </Container>
                    </Navbar>
                </div>
            </main>
        )
    }
}

export default Home;