/**
 * 单选题组件
 */
import '../css/public/public.css'
import '../css/topicItem.css'

import React,{Component} from 'react'
import { Form, Input, Modal,Button, DatePicker, Icon,Select, Badge, Spin, Row, Col } from 'antd';
import { dateFormatUtil } from '../Tool/date-time.tool'
import { cutFloat_dot2 } from '../Tool/number.tool'
import { contentConvert, convertKeySteps, convertYourAnswer, convertAnalysis, convertGapUnderline } from '../Tool/topicContentAnalysis'

const selectSymbol = ['A', 'B','C', 'D', 'E', 'F','G', 'H', 'I'];  // 选择题题目选项的标识符
const topicRightIcon = require('../img/user/topic-right.jpg')
const topicErrorIcon = require('../img/user/topic-error.jpg')

export default class SelectTopic extends Component {
    constructor(props) {
        super(props)
        this.state= {
            isShow: true,
            excsType: 1,
            testType: 1,
            timeObj: {},
            isVideoModalVisible: false,
            isItemFaovred: true, // 该题目是否被收藏
        }

        this.toggleAnswerPart = this.toggleAnswerPart.bind(this)
    }
    toggleAnswerPart() {
        this.setState({
            isShow: !this.state.isShow,
        })
    }

    componentDidMount() {
    }

    render() {
        const isFavor = this.props.isFavor || false;  // 是否隶属“我的收藏”板块习题
        const topicIndex = this.props.index || 1;
        let {
            questionStatistics={}, answer={}, question={},
            graspState, studyRecord
        } = this.props.topicInfo || {};

        let { analysis='暂无', content='', type, identifier } = question;
        let myTime = answer && answer.time || 0;
        const answerTime = studyRecord && studyRecord.submitTime || '2017-03-13';

        const { correctRate=0, averageTime=0, totalNumber=0 } = questionStatistics || {};


        content = '我是题干部分我是题干部分我是题干部分###我是题干A###我是题干B###我是题干C###我是DDDD';
        const contentArr = content.split('###');    // 题目主体部分，包括题干与选项
        type='选择题';

        let correctAnswer,
            yourAnswer,
            itemStemDOM,   // 题干
            itemBranchDOM;  // 题目选项（不同题型 不一样的展示）
        switch (type) {
            case '多选题':
            case '选择题':
                itemStemDOM = contentArr[0];

                itemBranchDOM = contentArr.map((item, idx) => {
                    if (idx !== 0) {
                        return (
                            <div key={idx} className="topic-branchItem">
                                <span className="topic-branch-icon">{selectSymbol[idx - 1]}</span>
                                <span className="topic-branchItem-main"
                                      dangerouslySetInnerHTML={{__html: contentConvert(contentArr[idx]) }}></span>
                            </div>
                        )
                    } else {
                        return false;
                    }
                });
                correctAnswer = question.answer;
                yourAnswer = answer.answer;
                break;
            case '判断题':
                itemStemDOM = contentArr[0];
                itemBranchDOM = null;
                correctAnswer = question.answer=='true' ? '正确' : '错误';
                yourAnswer = answer.answer=='true' ? '正确' : '错误';
                break;
            default:
                itemStemDOM = null;
                itemBranchDOM = null;
        }
        // console.log('DOM:', itemStemDOM, itemBranchDOM)

        const { isFetching, isShow, isItemFaovred } = this.state;

        let displayVal = 'none',
            btnIconType = 'down-circle',
            btnTitle = '查看详情',
            favorBtnTitle = '取消收藏';

        if (isShow) {
            displayVal = 'block';
            btnIconType = 'up-circle';
            btnTitle = '收起详情';
        }
        if (!isItemFaovred) {
            favorBtnTitle = '收藏';
        }

        const judegIcon = (graspState === 2) ? topicRightIcon : topicErrorIcon;

        // 把每题的题号嵌入到题干 string 的内部开头；
        const item_index = `<strong class="tipicItem-index" title="题号: ${identifier}">${topicIndex}.</strong>`;
        if (itemStemDOM.indexOf('<p>') === 0) {
            itemStemDOM = '<p>' + item_index + itemStemDOM.substring(3, itemStemDOM.length)
        } else if (itemStemDOM.indexOf('<div>') === 0) {
            itemStemDOM = '<div>' + item_index + itemStemDOM.substring(5, itemStemDOM.length)
        } else {
            itemStemDOM = item_index + itemStemDOM;
        }

        return (
            <div className="topicItem">
                { !isFavor && <img className="topic-judgeImg" src={judegIcon} alt=""/> }

                <Row >
                    <Col md={18}>
                        <div className="topicItem-left">
                            {/*<p className="topicItem-type">题 {topicIndex}：{type}</p>*/}
                            <p className="topicItem-stem"
                               dangerouslySetInnerHTML={{__html: contentConvert(itemStemDOM) }} ></p>
                            <div className="topic-branch">
                                { itemBranchDOM }
                            </div>
                        </div>
                    </Col>
                    <Col md={6} >
                        <div style={{textAlign: 'right'}} className={ !isFavor ? "topicItem-right": '' }>
                            右侧部分
                        </div>
                    </Col>
                </Row>
                <Row className="topicItem-info">
                    <span className="topicItem-info-key">答题时间：</span>
                    <span className="topicItem-info-val">{dateFormatUtil(answerTime, true)}</span>
                    <span className="topicItem-info-key">本题正确率：</span>
                    <span className="topicItem-info-val">{cutFloat_dot2(correctRate)}%</span>
                    <span className="topicItem-info-val">{totalNumber}次</span>

                    <Button className="topicItem-info-btn"
                            type="primary"
                            icon={btnIconType}
                            onClick={this.toggleAnswerPart} >
                        { btnTitle }
                    </Button>
                </Row>
                <Row className="topicItem-answer" style={{display: displayVal}}>
                    <Col>
                        <Row className="topicItem-answer-item">
                            <Col md={3}>
                                <span className="topicItem-yourAnswer">您的答案：</span>
                            </Col>
                            <Col md={21}>
                                <span dangerouslySetInnerHTML={{__html: convertYourAnswer(yourAnswer, type)}}></span>
                            </Col>
                        </Row>
                        <Row className="topicItem-answer-item">
                            <Col md={3}>
                                <span className="topicItem-rightAnswer">正确答案：</span>
                            </Col>
                            <Col md={21}>
                                <span dangerouslySetInnerHTML={{__html: contentConvert(correctAnswer)}}></span>
                            </Col>
                        </Row>
                        <Row className="topicItem-answer-anlyItem">
                            <Col md={3}>
                                <span className="topicItem-answer-anlyTitle">答案解析：</span>
                            </Col>
                            <Col md={21}>
                                <span dangerouslySetInnerHTML={{__html: convertAnalysis(analysis)}}></span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}
