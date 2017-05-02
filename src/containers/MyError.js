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

        this.queryErrorExerciseIds = this.queryErrorExerciseIds.bind(this)
    }

    queryErrorExerciseIds() {
        const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo') || '{}');
        const { id, _uid } = userInfo;

        const url = `http://127.0.0.1:3000/drive-myerror?`
        const data = {
            uid: id,
            _uid
        };
        custom_fetch.post(url, data, json => {
            if (json.success) {
                this.setState({
                    isFetching: false,
                    idsArr: json.data || [],
                })
            } else {
                alert(json.msg)
            }

        })
    }

    componentDidMount() {
        this.queryErrorExerciseIds();
    }

    render() {
        const { isFetching, idsArr } = this.state;
        // console.log('OrderExercise render seledIndex: ', selectedIndex)
        return (
            <Spin spinning={isFetching}>

                <h2>我的错题</h2>

                { !!idsArr.length &&
                    <ExerciseMainpart idsArr={idsArr} />
                }
            </Spin>
        )
    }
}


export default OrderExercise;