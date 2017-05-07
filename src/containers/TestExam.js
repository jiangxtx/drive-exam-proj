import 'antd/dist/antd.css'
import '../css/candidate.css'

import React ,{Component}from  'react'
import { Link } from 'react-router'
import { Menu,Input,Icon,Modal,Form,Alert, notification, Spin } from 'antd'
import { Container, ContainerFluid, Row, Col } from '../layout'
import TopicPanel from '../components/TopicPanel'
import TopicItem from '../components/TopicItem'
import CountdownTimer from '../components/CountdownTimer'
import { custom_fetch } from '../Tool/wrap.fetch'
import { queryTopicDetailsByIds } from '../Tool/drive-exam-func.tool'

class Test extends Component {
    constructor(props) {
        super(props);
        this.state={
            isFetching: true,
            isCountdown: false, // 计时器是否工作
            examTopicIds: [],
            examTopicInfos: [],
            selectedIndex: 0,

            hasAnsweredIds: [],  // 已答题ID数组
            errorNum: 0,  // the number of answerWrong
            correctNum: 0,  // the number of answerCorrect
        };

        this.onTopicIndexHandle = this.onTopicIndexHandle.bind(this)
        this.onLastOrNextTopic = this.onLastOrNextTopic.bind(this)
        this.returnUserAnswer = this.returnUserAnswer.bind(this)
        this.onTriggerTestEnd = this.onTriggerTestEnd.bind(this)
    }

    /**
     * 考试结束触发操作事件
     * @param type 触发类型，0: error > 10；1: time over;
     */
    onTriggerTestEnd(type) {
        const { errorNum } = this.state;
        let showModalFlag = (type === 1) || (errorNum > 10) || false;
        let content = '';
        if (type === 1) {
            content = '考试时间已结束，请单击提交按钮提交考试！';
        }
        if (errorNum > 10) {
            content = '很遗憾，您已经做错超过 10 题，请单击提交按钮提交本次考试！';
        }

        showModalFlag && Modal.warning({
            title: '友情提示',
            content,
            onOk() {

            },
        });
    }

    /**
     * 返回用户答题情况
     * @param index 答题题号（对应答题卡）
     * @param isCorrect 是否答对标识
     */
    returnUserAnswer(index, isCorrect) {
        index = ~~index;
        let { hasAnsweredIds, errorNum, correctNum } = this.state;

        errorNum = isCorrect ? errorNum : (errorNum + 1);
        correctNum = !isCorrect ? correctNum : (correctNum + 1);
        if (hasAnsweredIds.indexOf(index) === -1) {
            hasAnsweredIds.push(index);
            this.setState({
                hasAnsweredIds,
                errorNum,
                correctNum
            }, () => this.onTriggerTestEnd(0) )
        }
    }

    onLastOrNextTopic(index) {
        const examIds = this.state.examTopicIds;
        if (index < 0) {
            notification.error({
                message: '友情提醒',
                description: '已经是第一题了！'
            });
            return false;
        } else if (index > examIds.length - 1) {
            notification.error({
                message: '友情提醒',
                description: '已经是最后一题了！'
            });
            return false;
        }

        this.setState({
            selectedIndex: ~~index,
        })
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
                    isCountdown: true,
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
        const {
            examTopicInfos, selectedIndex,
            isFetching, isCountdown, errorNum, correctNum
        } = this.state;
        const detailInfo = examTopicInfos[~~selectedIndex] || {};

        const alert_description = (
            <div>
                <p>本试卷包括 40 道判断题和 60 道选择题，全为客观题。</p>
                <p>考试的总时间为 45 分钟。</p>
                <p>您当前的<strong>做错题数</strong>为：
                    <span className="panelItem-info-errorNo">{errorNum}</span>。
                    您当前的<strong>做对题数</strong>为：
                    <span className="panelItem-info-errorNo">{correctNum}</span>。
                </p>
            </div>
        )


        return (
            <Spin size="large" spinning={isFetching}>
                <Row>
                    <Col lg={8}>
                        <h3 className="panelItem-title">驾照科目一考试-全真模拟测试</h3>

                        <Alert
                            message="考生考试信息"
                            description={alert_description}
                            type="info"
                            showIcon
                        />

                        <TopicItem
                            ownPanel="test"
                            key={selectedIndex}
                            index={selectedIndex}
                            detailInfo={detailInfo}
                            onLastOrNextTopic={this.onLastOrNextTopic}
                            returnUserAnswer={this.returnUserAnswer}
                        />
                    </Col>
                    <Col lg={4}>
                        { isCountdown &&
                            <CountdownTimer
                                onCountdownTimerEnd={this.onTriggerTestEnd}
                            />
                        }

                        <TopicPanel totalNum={100}
                                    onTopicIndexHandle={this.onTopicIndexHandle} />
                    </Col>
                </Row>
            </Spin>
            
        )
    }
}


export default Test;

