import 'antd/dist/antd.css'
import '../css/candidate.css'

import React ,{Component}from  'react'
import { Link } from 'react-router'
import { Menu, Select, Icon,Modal,Form,Spin, notification } from 'antd'
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
        const myStatisBar = echarts.init(document.getElementById('my_statis_bar'));

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
                            top: 150,
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

                    const bar_option = {
                        color: ['#3398DB'],
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis : [
                            {
                                type : 'category',
                                data : ['总题数', '做对题', '做错题', '未做题', '收藏题'],
                                axisTick: {
                                    alignWithLabel: true
                                }
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value'
                            }
                        ],
                        series : [
                            {
                                name:'数量',
                                type:'bar',
                                barWidth: '60%',
                                data:[
                                    allTotal, doneTotal - errorTotal, errorTotal,
                                    allTotal - doneTotal, favorTotal
                                ]
                            }
                        ]
                    }
                    myStatisBar.setOption(bar_option);
                })
            } else {
                alert(json.msg)
            }
        })
    }

    render() {
        const { isFetching, statisInfo } = this.state;
        const { allTotal, doneTotal, errorTotal, favorTotal } = statisInfo;

        return (
            <Spin spinning={isFetching}>
                <h2 className="crumb-title">
                    <span className="crumb-title-main">我的统计</span>
                    <span className="crumb-title-sub">我的个人做题统计信息</span>
                </h2>
                <Row>
                    <Col lg={12}>
                        <h2>我的统计</h2>
                    </Col>
                    <Col lg={6} md={6}>
                        <div id="my_statis" style={{width: '100%', height:'400px'}}></div>

                        <div className="mystatis-wrap">
                            <div className="mystatis">
                                <div className="mystatis-item">
                                    总共 <span className="mystatis-item-num">{allTotal}</span>题，
                                    占据比例 <span className="mystatis-item-rate">100%</span>
                                </div>
                            </div>
                            <div className="mystatis">
                                <div className="mystatis-item">
                                    做对 <span className="mystatis-item-num">{doneTotal - errorTotal}</span>题，
                                    占据比例 <span className="mystatis-item-rate">100%</span>
                                </div>
                            </div>
                            <div className="mystatis">
                                <div className="mystatis-item">
                                    做错 <span className="mystatis-item-num">{errorTotal}</span>题，
                                    占据比例 <span className="mystatis-item-rate">100%</span>
                                </div>
                            </div>
                            <div className="mystatis">
                                <div className="mystatis-item">
                                    未做 <span className="mystatis-item-num">{allTotal - doneTotal}</span>题，
                                    占据比例 <span className="mystatis-item-rate">100%</span>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={6} md={6}>
                        <div id="my_statis_bar" style={{width: '100%', height:'400px'}}></div>
                    </Col>
                </Row>





            </Spin>
        )
    }
}

