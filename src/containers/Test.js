import 'antd/dist/antd.css'
import '../css/candidate.css'

import React ,{Component}from  'react'
import { Link } from 'react-router'
import { Menu,Input,Icon,Modal,Form,Radio,notification, Spin } from 'antd'
import { Container, ContainerFluid, Row, Col } from '../layout'
import TopicPanel from '../components/TopicPanel'
import TopicItem from '../components/TopicItem'
import { custom_fetch } from '../Tool/wrap.fetch'
import { queryTopicDetailsByIds } from '../Tool/drive-exam-func.tool'

class Test extends Component {
    constructor(props) {
        super(props);
        this.state={
            isFetching: true,
            examTopicIds: [],
            examTopicInfos: [],
            selectedIndex: 0,
        };

        this.onTopicIndexHandle = this.onTopicIndexHandle.bind(this)
    }

    componentDidMount() {
        const url = `http://api2.jiakaobaodian.com/api/open/exam/do-exam.htm?_r=11960929823423763090&cityCode=310000&page=1&limit=25&course=kemu1&carType=car&_=0.5454376299386103`
        custom_fetch.get(url, data => {
            console.log('mock Exam topicIds: ', data.data);
            const topicIds = data.data || [];

            queryTopicDetailsByIds(topicIds, (data) => {
                this.setState({
                    examTopicIds: topicIds || [],
                    examTopicInfos : data
                })
            })
        })
        const _this = this;

        Modal.info({
            title: '温馨提示',
            content: (
                <div>
                    <p>按交管部门通知，科目一考试系统全面更新。
                        全真模拟考试下不能修改答案，每做一题，系统自动计算错误题数，及格标准为90分。</p>
                    <p>单击“确定”按钮进行全真模拟考试。</p>
                </div>
            ),
            onOk() {
                _this.setState({
                    isFetching: false,
                })
            },
        });
    }

    onTopicIndexHandle(index) {
        this.setState({
            selectedIndex: ~~index,
        })
    }

    componentWillUnmount() {
        // alert('componentWillUnmount')
        // return false


    }

    render() {
        const { examTopicInfos, selectedIndex, isFetching } = this.state;
        const detailInfo = examTopicInfos[~~selectedIndex] || {};


        return (
            <Spin size="large" spinning={isFetching}>
                <Row>
                    <Col lg={8}>
                        <h2>考试模拟</h2>
                        <TopicItem index={selectedIndex} detailInfo={detailInfo} />
                    </Col>
                    <Col lg={4}>
                        <h4>剩余时间</h4>
                        45:00
                        <h4>答题面板</h4>
                        <TopicPanel onTopicIndexHandle={this.onTopicIndexHandle} />
                    </Col>
                </Row>
            </Spin>
            
        )
    }
}


export default Test;

