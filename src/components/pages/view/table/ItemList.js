import React, { Component } from 'react'
import Axios from 'axios'
import Item from './Item'

export default class ItemList extends Component {
    state = {
        itemList:[],
    }
    
    componentDidMount() {
        Axios.get(`http://localhost:7171/api/item/get-items`).then(res=>{
            this.setState({itemList:res.data})
          })
    }

    //getItems = () => {}

    render(){
        return (this.state.itemList.map((item)=>(<Item key={item._id} item={item}></Item>))
        )
    }
}