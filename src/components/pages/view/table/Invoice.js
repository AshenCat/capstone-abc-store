import React from 'react'

export default class Invoice extends React.Component{

    render(){
        return(
            <React.Fragment>
                <tr>
                    <td>{this.props.invoice.vendor}</td>
                    <td>{this.props.invoice.date}</td>
                </tr>
            </React.Fragment>
        )
    }
}