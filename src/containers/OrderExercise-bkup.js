import 'antd/dist/antd.css'
import '../css/candidate.css'

import React ,{Component}from  'react'
import { Link } from 'react-router'
import { Menu,Input,Select, Icon,Modal,Form,Spin, notification } from 'antd'
import { Container, ContainerFluid, Row, Col } from '../layout'
import TopicPanel from '../components/TopicPanel'
import TopicItem from '../components/TopicItem'
import { custom_fetch } from '../Tool/wrap.fetch'
import { queryTopicDetailsByIds } from '../Tool/drive-exam-func.tool'

class OrderExercise extends Component {
    constructor(props) {
        super(props);
        this.state={
            idsArr: [],

            isFetching: true,
            topicInfo: {},
            selectedIndex: 0,
            answerState: '0', // 0: 答题状态，1: 查看解答；
        };

        this.queryOrderExerciseIds = this.queryOrderExerciseIds.bind(this)
        this.onLastOrNextTopic = this.onLastOrNextTopic.bind(this)
        this.onTopicIndexHandle = this.onTopicIndexHandle.bind(this)
    }

    queryOrderExerciseIds() {
        const url = `http://api2.jiakaobaodian.com/api/open/exercise/sequence.htm?_r=13721661427365837087` +
            `&cityCode=310000&page=1&limit=25&course=kemu1&carType=car&_=0.7845020336057755`;
        custom_fetch.get(url, data => {
            const idsArr = data.data || [];
            queryTopicDetailsByIds(idsArr[0], (detail) => {
                this.setState({
                    isFetching: false,
                    idsArr: data.data || [],
                    topicInfo: detail
                })
            })
        })
    }

    onTopicIndexHandle(index) {
        this.onLastOrNextTopic(index)
    }

    onLastOrNextTopic(index) {
        const idsArr = this.state.idsArr || [];
        if (index < 0) {
            notification.error({
                message: '友情提醒',
                description: '已经是第一题了！'
            });
            return false;
        } else if (index > idsArr.length - 1) {
            notification.error({
                message: '友情提醒',
                description: '已经是最后一题了！'
            });
            return false;
        }
        this.setState({
            isFetching: true,
        })
        const targetId = this.state.idsArr[index];
        console.log('next Topic index:', index, targetId)

        queryTopicDetailsByIds(targetId, (detail) => {
            this.setState({
                isFetching: false,
                topicInfo: detail,
                selectedIndex: index,
            })
        })
    }


    componentDidMount() {
        this.queryOrderExerciseIds();
    }

    render() {
        const { topicInfo, selectedIndex, isFetching, idsArr } = this.state;
        const detailInfo = topicInfo && topicInfo[0] || {};
        const totalNum = idsArr && idsArr.length || 0;

        // console.log('OrderExercise render seledIndex: ', selectedIndex)
        return (
            <Spin spinning={isFetching}>
                <Row>
                    <Col lg={8}>
                        <h2>模拟考试 > 科目一 > 顺序练习</h2>

                        <TopicItem
                            key={selectedIndex}
                            index={selectedIndex}
                            detailInfo={detailInfo}
                            state={this.state.answerState}
                            onLastOrNextTopic={this.onLastOrNextTopic}
                        />
                    </Col>
                    <Col lg={4}>
                        <div className="">
                            <TopicPanel totalNum={totalNum}
                                        currentIndex={selectedIndex}
                                        onTopicIndexHandle={this.onTopicIndexHandle} />
                        </div>
                    </Col>
                </Row>
            </Spin>
        )
    }
}


export default OrderExercise;