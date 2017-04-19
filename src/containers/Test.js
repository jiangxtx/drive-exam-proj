import 'antd/dist/antd.css'
import '../css/candidate.css'

import React ,{Component}from  'react'
import { Link } from 'react-router'
import { Menu,Input,Icon,Modal,Form,Radio,notification } from 'antd'
import { Container, ContainerFluid, Row, Col } from '../layout'

class Test extends Component {
    constructor(props) {
        super(props);
        this.state={
        };


    }

    render() {

        return (
            <Row>
                <h2>测试板块</h2>
            </Row>
        )
    }
}


export default Test;