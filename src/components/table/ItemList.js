import React, { Component } from 'react'
import Item from './Item'

export default class ItemList extends Component {
    state = {
        ItemList:[],
    }



    render(){
        return this.props.items.map((item)=>(<Item item={item}></Item>))
    }
}