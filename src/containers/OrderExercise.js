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

import ExerciseMainpart from './ExerciseMainpart'

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
    }

    queryOrderExerciseIds() {
        const url = `http://127.0.0.1:3000/drive-getAlltopicIds`;
        custom_fetch.get(url, data => {
            const idsArr = data.data || [];
            this.setState({
                isFetching: false,
                idsArr: data.data || [],
            })
        })
    }

    componentDidMount() {
        this.queryOrderExerciseIds();
    }

    render() {
        const { isFetching, idsArr } = this.state;
        // console.log('OrderExercise render seledIndex: ', selectedIndex)
        return (
            <Spin spinning={isFetching}>

                <h2 className="crumb-title">
                    <span className="crumb-title-main">顺序练习</span>
                    <span className="crumb-title-sub">从头至尾依次练习题库中的所有习题</span>
                </h2>

                { !!idsArr.length &&
                    <ExerciseMainpart idsArr={idsArr} />
                }
            </Spin>
        )
    }
}


export default OrderExercise;