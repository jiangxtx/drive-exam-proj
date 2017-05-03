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

export default class extends Component {
    constructor(props) {
        super(props);
        this.state={
            idsArr: [],

            isFetching: true,
            topicInfo: {},
            selectedIndex: 0,
            answerState: '0', // 0: 答题状态，1: 查看解答；

            statisInfo: {},
        };

        this.queryMyStastics = this.queryMyStastics.bind(this)
    }

    queryMyStastics() {

    }

    componentDidMount() {
        // this.queryMyStastics();
        const myStatis = echarts.init(document.getElementById('my_statis'));

        const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo') || '{}');
        const { id, _uid } = userInfo;

        const url = `http://127.0.0.1:3000/drive-mystatis?`
        const data = {
            uid: id,
            _uid
        };
        custom_fetch.post(url, data, json => {
            if (json.success) {
                this.setState({
                    isFetching: false,
                    statisInfo: json.data || {},
                }, () => {
                    const statisInfo = json.data || {};
                    const { allTotal, doneTotal, errorTotal, favorTotal } = statisInfo;

                    const option = {
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            x: 'left',
                            data:['做错题','做对题','未做题']
                        },
                        series: [
                            {
                                name:'题目统计',
                                type:'pie',
                                radius: ['50%', '70%'],
                                avoidLabelOverlap: false,
                                label: {
                                    normal: {
                                        show: false,
                                        position: 'center'
                                    },
                                    emphasis: {
                                        show: true,
                                        textStyle: {
                                            fontSize: '30',
                                            fontWeight: 'bold'
                                        }
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        show: false
                                    }
                                },
                                data:[
                                    {value: errorTotal, name:'做错题'},
                                    {value: (doneTotal - errorTotal), name:'做对题'},
                                    {value: (allTotal - doneTotal), name:'未做题'},
                                ]
                            }
                        ]
                    };

                    myStatis.setOption(option);
                })
            } else {
                alert(json.msg)
            }
        })
    }

    render() {
        const { isFetching, statisInfo } = this.state;

        return (
            <Spin spinning={isFetching}>

                <h2>我的统计</h2>

                <div id="my_statis" style={{width: '600px', height:'400px'}}></div>

            </Spin>
        )
    }
}

