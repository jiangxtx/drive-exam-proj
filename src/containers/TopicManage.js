import 'antd/dist/antd.css'
import '../css/admin.css'

import React ,{Component}from  'react'
import { Link } from 'react-router'
import { Menu,Input,Select, Icon,Modal,Form,Spin, notification } from 'antd'
import { Container, ContainerFluid, Row, Col } from '../layout'
import { custom_fetch } from '../Tool/wrap.fetch'
import { queryTopicDetailsByIds } from '../Tool/drive-exam-func.tool'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state={
        };

    }



    componentDidMount() {
    }

    render() {
        return (
            <Row>
                <Spin spinning={false}>
                    <h2>试题管理</h2>

                </Spin>
            </Row>
        )
    }
}


export default Main;