import 'antd/dist/antd.css'
import '../css/candidate.css'

import React ,{Component}from  'react'
import { Link } from 'react-router'
import { Menu,Input,Select, Icon,Modal,Form,Radio,notification } from 'antd'
import { Container, ContainerFluid, Row, Col } from '../layout'
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
        };

        this.queryOrderExerciseIds = this.queryOrderExerciseIds.bind(this)
    }

    queryOrderExerciseIds() {
        const url = `http://api2.jiakaobaodian.com/api/open/exercise/sequence.htm?_r=13721661427365837087` +
            `&cityCode=310000&page=1&limit=25&course=kemu1&carType=car&_=0.7845020336057755`;
        custom_fetch.get(url, data => {
            const idsArr = data.data || [];
            queryTopicDetailsByIds(idsArr[0], (detail) => {
                this.setState({
                    idsArr: data.data || [],
                    topicInfo: detail
                })
            })
        })
    }

    componentDidMount() {
        this.queryOrderExerciseIds();
    }

    render() {
        const { topicInfo, selectedIndex, isFetching } = this.state;
        const detailInfo = topicInfo && topicInfo[0] || {};

        return (
            <Row>
                <h2>模拟考试 > 科目一 > 顺序练习</h2>

                <TopicItem index={selectedIndex} detailInfo={detailInfo} />

            </Row>
        )
    }
}


export default OrderExercise;