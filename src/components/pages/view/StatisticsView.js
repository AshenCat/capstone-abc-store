import React from 'react'
import { Row, Col, ListGroup, FormControl, Card, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'

import { VictoryChart, VictoryTheme, VictoryAxis, VictoryBar } from 'victory'

export default class StatisticsView extends React.Component{
    state = {
        listCopy: [],
        search: '',
        tab: ''
    }

    componentWillReceiveProps(nextProps){
        this.setState({listCopy: [...nextProps.itemList.sort((a,b) => a.vendor.localeCompare(b.vendor) || a.vendor - b.vendor)]})
    }

    componentDidMount(){
        this.setState({
            listCopy: [...this.props.itemList.sort((a,b) => a.vendor.localeCompare(b.vendor) || a.vendor - b.vendor)]
        })
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value})

    onClick = (param) => {
        console.log(param)
    }

    chartView = () => {
        if(this.state.listCopy === []) return <div></div>
        const data = [
            {name : "Queefy", weebness: 3},
            {name : "Weebgor", weebness: 9.9},
            {name : "kweebvin", weebness: 10},
        ]
        console.log(this.state.listCopy)
        return (
            <VictoryChart 
                theme={VictoryTheme.material}
                domainPadding={20}
                height={300}>
                <VictoryAxis 
                    tickValues={[1,2,3]}
                    tickFormat={[data[0].name,data[1].name,data[2].name]}/>
                <VictoryAxis
                    dependentAxis
                    tickFormat={(x)=>(`${x}`)}/>
                <VictoryBar 
                    data={data}
                    x="name"
                    y="weebness"/>
            </VictoryChart>
        )
    }

    render() {
        

        return(
            <Row>
                <Col sm={3}>
                    <InputGroup>
                        <FormControl name="search" onChange={this.onChange} placeholder="search..."/>
                        <InputGroup.Append><InputGroup.Text id="inputGroupPrepend"><FaSearch/></InputGroup.Text></InputGroup.Append>
                    </InputGroup>
                    <ListGroup className="mt-2">
                        {this.state.listCopy.filter(
                            item => item.name.toLowerCase()
                                .includes(this.state.search.trim().toLowerCase()) || 
                                    item.vendor.toLowerCase().includes(this.state.search.trim().toLowerCase()))
                                .map(item => 
                            <ListGroup.Item 
                                className="box"
                                action 
                                key={item._id} 
                                onClick={() => this.onClick(item)}>
                                {item.name}
                            </ListGroup.Item>)}
                    </ListGroup>
                </Col>
                <Col sm={9}>
                    <Card>
                        <Card.Header>
                            Item Statistics
                        </Card.Header>
                        <Card.Body>
                            <this.chartView/>
                        </Card.Body>
                        <Card.Footer>
                            <Link className="btn btn-sm btn-secondary" to="/home">return</Link>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        )
    }
}