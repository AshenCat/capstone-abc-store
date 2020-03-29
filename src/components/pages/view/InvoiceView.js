import React from 'react';
import { Table, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Invoice from './table/Invoice'

export default class InvoiceView extends React.Component {

    
    render () {
        return (
            <React.Fragment>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Vendor</th>
                            <th>Date Received</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {this.props.invoices.sort((a,b) => a.vendor.localeCompare(b.vendor) || a.vendor - b.vendor).map(invoice => <Invoice key={invoice._id} invoice={invoice} /> )}
                    </tbody>
                </Table>
                <Container>
                    <Link to="/invoice" className="btn btn-secondary">New Invoice</Link>
                </Container>
            </React.Fragment>
        )
    }
}