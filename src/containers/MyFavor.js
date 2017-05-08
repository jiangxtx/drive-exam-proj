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

        this.queryFavorExerciseIds = this.queryFavorExerciseIds.bind(this)
    }

    queryFavorExerciseIds() {
        const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo') || '{}');
        const { id, _uid } = userInfo;

        const url = `http://127.0.0.1:3000/drive-myfavor?`
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
        this.queryFavorExerciseIds();
    }

    render() {
        const { isFetching, idsArr } = this.state;
        // console.log('OrderExercise render seledIndex: ', selectedIndex)
        return (
            <Spin spinning={isFetching}>
                <h2 className="crumb-title">
                    <span className="crumb-title-main">我的收藏</span>
                    <span className="crumb-title-sub">历次做题中我的收藏集</span>
                </h2>

                { !!idsArr.length &&
                    <ExerciseMainpart idsArr={idsArr} />
                }
            </Spin>
        )
    }
}


export default OrderExercise;