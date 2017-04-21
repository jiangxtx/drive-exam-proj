import 'antd/dist/antd.css'
import '../css/candidate.css'

import React ,{Component}from  'react'
import { Link } from 'react-router'
import { Menu,Input,Icon,Modal,Form,Radio,notification } from 'antd'
import { Container, ContainerFluid, Row, Col } from '../layout'
import TopicPanel from '../components/TopicPanel'

class Test extends Component {
    constructor(props) {
        super(props);
        this.state={
        };


    }

    render() {

        return (
            <Row>
                <Col lg={8}>
                    <h2>测试板块</h2>
                </Col>
                <Col lg={4}>
                    <h4>答题面板</h4>
                    <TopicPanel />
                </Col>
            </Row>
        )
    }
}


export default Test;

