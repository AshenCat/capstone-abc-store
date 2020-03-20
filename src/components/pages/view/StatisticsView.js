import React from 'react'
import { Row, Col, ListGroup, FormControl, Card, InputGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'

import { VictoryChart, VictoryTheme, VictoryAxis, VictoryBar } from 'victory'
import Axios from 'axios';

export default class StatisticsView extends React.Component{
    state = {
        listCopy: [],
        search: '',
        tab: '',
        itemState: []
    }

    componentWillReceiveProps(nextProps){
        this.setState({listCopy: [...nextProps.itemList.sort((a,b) => a.vendor.localeCompare(b.vendor) || a.vendor - b.vendor)]})
    }

    componentDidMount(){
        this.setState({
            listCopy: [...this.props.itemList.sort((a,b) => a.vendor.localeCompare(b.vendor) || a.vendor - b.vendor)],
            itemState: []
        })
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value})

    onClick = (param) => {
        Axios.post(`${this.props.api}/statistics/get-item-statistics`,{name:param.name, vendor:param.vendor}).then((res)=>{
            // console.log(res.data)
            this.setState({
                itemState: res.data
            })
            //console.log(this.state.itemState.currData)
        })
    }

    chartView = () => {
        if(this.state.itemState === [] || this.state.itemState === null) return <div></div>
        // const data = [
        //     {name : "Klifford", weebness: 3},
        //     {name : "Igor", weebness: 9.9},
        //     {name : "Kevin", weebness: 10},
        // ]
        //console.log(this.state.listCopy)
        const data = this.state.itemState.shipmentData ? [...this.state.itemState.shipmentData]: []
        return (
            <VictoryChart 
                theme={VictoryTheme.material}
                domainPadding={{x:15}}
                height={220}>
                <VictoryAxis 
                    tickValues={data.map((item,ctr)=>ctr)}
                    tickFormat={data.map((item)=>item.date.substring(0,7))}/>
                <VictoryAxis
                    dependentAxis
                    tickFormat={(x)=>(`${x}`)}/>
                <VictoryBar 
                    barRatio={0.3}
                    animate={{
                        duration: 1000,
                        onLoad: { duration: 500 }
                      }}
                    alignment="start"
                    data={data.map(item=>item.quantity)}
                    x="name"
                    y="weebness"/>
            </VictoryChart>
        )
    }

    thisCount = () => {
        const data = this.state.itemState.currData ? [...this.state.itemState.currData]: []
        return  <React.Fragment>
                    {data.map(item=><React.Fragment key={item._id}>{item.quantity}, </React.Fragment>)}
                </React.Fragment>
    }

    thisStatus = () => {
        const data = this.state.itemState.returnData ? [...this.state.itemState.returnData]: []
        //console.log(data)
        return  <React.Fragment>
                    {data.map(item=><React.Fragment key={item._id}>{item !== [] ? item.status : "N/A"}, </React.Fragment>)}
                </React.Fragment>
    }

    thisRequest = () => {
        const data = this.state.itemState.requestData ? [...this.state.itemState.requestData] : []
        data.map(item=>console.log(item))
        return  <React.Fragment>
                    {data.map(item=><React.Fragment key={item._id}>{item !== [] ? item.status + "/" + item.quantity  : "N/A"}</React.Fragment>)}
                </React.Fragment>
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
                            <h3>
                                Other Details
                            </h3>
                            <Row>
                                <Col sm={4}><p className="text-right">Current Stock:</p></Col>
                                <Col sm><p className="text-left"><this.thisCount/></p></Col>
                            </Row>
                            <Row>
                                <Col sm={4}><p className="text-right">Return Status:</p></Col>
                                <Col sm><p className="text-left"><this.thisStatus/></p></Col>
                            </Row>
                            <Row>
                                <Col sm={4}><p className="text-right">Return Status (status/quantity):</p></Col>
                                <Col sm><p className="text-left"><this.thisRequest/></p></Col>
                            </Row>
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