/**
 * 单选题组件
 */
import '../css/public/public.css'
import '../css/topicItem.css'

import React,{Component} from 'react'
import { Form, Input, Modal,Button, DatePicker, Icon, Radio, Spin, Row, Col } from 'antd';
import { dateFormatUtil } from '../Tool/date-time.tool'
import { cutFloat_dot2 } from '../Tool/number.tool'
import { contentConvert, convertKeySteps, convertYourAnswer, convertAnalysis, convertGapUnderline } from '../Tool/topicContentAnalysis'

const RadioGroup = Radio.Group;

const selectSymbol = ['A', 'B','C', 'D', 'E', 'F','G', 'H', 'I'];  // 选择题题目选项的标识符
const topicRightIcon = require('../img/user/topic-right.jpg')
const topicErrorIcon = require('../img/user/topic-error.jpg')

export default class SelectTopic extends Component {
    constructor(props) {
        super(props)
        this.state= {
            isFetching: false,
            isShow: false,
            isItemFaovred: true, // 该题目是否被收藏
            answer: '',
            // answerState: '0', // 0: 答题状态，1: 查看解答；
        }

        this.toggleAnswerPart = this.toggleAnswerPart.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    toggleAnswerPart() {
        this.setState({
            isShow: !this.state.isShow,
        })
    }

    onChange(e) {
        console.log('Your answer is : ' + e.target.value)
        this.setState({
            answer: e.target.value,
            answerState: '1',
        }, () => {
            // this.props.

        });
    }

    componentDidMount() {
    }

    render() {
        const answerTime = '2017-03-13';

        const detailInfo = this.props.detailInfo || {};
        const topicIndex = this.props.index;
        const answerState = this.props.answerState || '0';

        let {
            optionA, optionB, optionC, optionD, explain,
            optionType, wrongRate, mediaContent, answer
        } = detailInfo || {};
        const contentArr = [optionA, optionB, optionC, optionD];
        const analysis = explain || '暂无解析';
        optionType = ~~optionType;


        let correctAnswer,
            yourAnswer,
            itemStemDOM = detailInfo.question || '题干部分题干部分题干部分？',   // 题干
            itemBranchDOM;  // 题目选项（不同题型 不一样的展示）
        if (mediaContent) {
            itemStemDOM += `<p><img alt="图片加载中..." class="topicItem-media" src=${mediaContent} /></p>`;
        }
        switch (optionType) {
            case 1:
                itemBranchDOM = contentArr.map((item, idx) => {
                    return (
                        <div key={idx} className="topic-branchItem">
                            <span className="topic-branch-icon">{selectSymbol[idx]}</span>
                            <span className="topic-branchItem-main"
                                  dangerouslySetInnerHTML={{__html: contentConvert(contentArr[idx]) }}></span>
                        </div>
                    )

                });
                correctAnswer = answer;
                yourAnswer = answer;
                break;
            case 0:
                itemBranchDOM = null;
                correctAnswer = answer=='16' ? '正确' : '错误';
                yourAnswer = answer=='true' ? '正确' : '错误';
                break;
            default:
                itemStemDOM = '题干部分题干部分题干部分？';
                itemBranchDOM = null;
        }

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

        const judegIcon = (2 === 2) ? topicRightIcon : topicErrorIcon;

        // 把每题的题号嵌入到题干 string 的内部开头；
        const item_index = `<strong class="tipicItem-index" title="题号: ${topicIndex + 1}">${topicIndex + 1}.</strong>`;
        if (itemStemDOM.indexOf('<p>') === 0) {
            itemStemDOM = '<p>' + item_index + itemStemDOM.substring(3, itemStemDOM.length)
        } else if (itemStemDOM.indexOf('<div>') === 0) {
            itemStemDOM = '<div>' + item_index + itemStemDOM.substring(5, itemStemDOM.length)
        } else {
            itemStemDOM = item_index + itemStemDOM;
        }
// console.log('topicItem index: ', topicIndex)

        return (
            <div className="topicItem">
                { (answerState === '1') && <img className="topic-judgeImg" src={judegIcon} alt=""/> }

                <Row >
                    <Col md={18}>
                        <div className="topicItem-left">
                            <p className="topicItem-stem"
                               dangerouslySetInnerHTML={{__html: contentConvert(itemStemDOM) }} />
                            <div className="topic-branch">
                                { itemBranchDOM }
                            </div>
                        </div>

                        <div className="answerItem">
                            <span className="answer-title">您的答案：</span>
                            <span>
                                { optionType === 1 ?
                                    <RadioGroup onChange={this.onChange} value={this.state.answer}>
                                        <Radio value='1'>A</Radio>
                                        <Radio value='2'>B</Radio>
                                        <Radio value='3'>C</Radio>
                                        <Radio value='4'>D</Radio>
                                    </RadioGroup> :
                                    <RadioGroup onChange={this.onChange} value={this.state.answer}>
                                        <Radio value='1'>正确</Radio>
                                        <Radio value='2'>错误</Radio>
                                    </RadioGroup>
                                }
                            </span>
                        </div>


                    </Col>
                    <Col md={6} >
                        {/*<div style={{textAlign: 'right'}} className={ !isFavor ? "topicItem-right": '' }>
                            右侧部分
                        </div>*/}
                    </Col>
                </Row>
                <Row>
                    <Button type="primary" icon={btnIconType}
                            onClick={() => this.props.onLastOrNextTopic(~~topicIndex - 1)}>
                        上一题
                    </Button>
                    <Button type="primary" icon={btnIconType}
                            onClick={() => this.props.onLastOrNextTopic(~~topicIndex + 1)} >
                        下一题
                    </Button>
                </Row>
                { (answerState === '1') &&
                    <Row className="topicItem-info">
                        <span className="topicItem-info-key">答题时间：</span>
                        <span className="topicItem-info-val">{dateFormatUtil(answerTime, true)}</span>
                        <span className="topicItem-info-key">本题错误率：</span>
                        <span className="topicItem-info-val">{cutFloat_dot2(wrongRate)}%</span>

                        <Button className="topicItem-info-btn"
                                type="primary"
                                icon={btnIconType}
                                onClick={this.toggleAnswerPart} >
                            { btnTitle }
                        </Button>
                    </Row>
                }
                <Row className="topicItem-answer" style={{display: displayVal}}>
                    <Col>
                        <Row className="topicItem-answer-item">
                            <Col md={3}>
                                <span className="topicItem-yourAnswer">您的答案：</span>
                            </Col>
                            <Col md={21}>
                                <span dangerouslySetInnerHTML={{__html: yourAnswer }}></span>
                            </Col>
                        </Row>
                        <Row className="topicItem-answer-item">
                            <Col md={3}>
                                <span className="topicItem-rightAnswer">正确答案：</span>
                            </Col>
                            <Col md={21}>
                                <span dangerouslySetInnerHTML={{__html: correctAnswer }}></span>
                            </Col>
                        </Row>
                        <Row className="topicItem-answer-anlyItem">
                            <Col md={3}>
                                <span className="topicItem-answer-anlyTitle">答案解析：</span>
                            </Col>
                            <Col md={21}>
                                <span dangerouslySetInnerHTML={{__html: analysis }}></span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}
