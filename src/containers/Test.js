import 'antd/dist/antd.css'
import '../css/candidate.css'

import React ,{Component}from  'react'
import { Link } from 'react-router'
import { Menu,Input,Icon,Modal,Form,Radio,notification } from 'antd'
import { Container, ContainerFluid, Row, Col } from '../layout'
import TopicPanel from '../components/TopicPanel'
import TopicItem from '../components/TopicItem'

class Test extends Component {
    constructor(props) {
        super(props);
        this.state={
        };


    }

    componentDidMount() {
        Modal.info({
            title: '温馨提示',
            content: (
                <div>
                    <p>按交管部门通知，科目一考试系统全面更新。
                        全真模拟考试下不能修改答案，每做一题，系统自动计算错误题数，及格标准为90分。</p>
                    <p>单击“确定”按钮进行全真模拟考试。</p>
                </div>
            ),
            onOk() {},
        });
    }

    componentWillUnmount() {
        // alert('componentWillUnmount')
        // return false
    }

    render() {

        return (
            <Row>
                <Col lg={8}>
                    <h2>考试模拟</h2>

                    <TopicItem />
                </Col>
                <Col lg={4}>
                    <h4>剩余时间</h4>
                    45:00
                    <h4>答题面板</h4>
                    <TopicPanel />
                </Col>
            </Row>
        )
    }
}


export default Test;

