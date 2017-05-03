/**
 * 单选题组件
 */
import '../css/public/public.css'
import '../css/topicItem.css'

import React,{Component} from 'react'
import { Form, Input, Modal,Button, DatePicker, Icon, Radio, Spin, Row, Col, notification } from 'antd';
import { dateFormatUtil } from '../Tool/date-time.tool'
import { cutFloat_dot2 } from '../Tool/number.tool'
import { contentConvert, convertKeySteps, convertYourAnswer, convertAnalysis, convertGapUnderline } from '../Tool/topicContentAnalysis'

import { custom_fetch } from '../Tool/wrap.fetch'

const RadioGroup = Radio.Group;

const selectSymbol = ['A', 'B','C', 'D', 'E', 'F','G', 'H', 'I'];  // 选择题题目选项的标识符
const topicRightIcon = require('../img/topic-right.jpg')
const topicErrorIcon = require('../img/topic-error.jpg')

export default class SelectTopic extends Component {
    constructor(props) {
        super(props)
        this.state= {
            isFetching: false,
            isShow: false,
            isItemFaovred: false, // 该题目是否被收藏
            yourAnswer: '',
            answerState: '0', // 0: 答题状态，1: 查看解答；
        }

        this.toggleAnswerPart = this.toggleAnswerPart.bind(this)
        this.onChange = this.onChange.bind(this)
        this.convertAnswer = this.convertAnswer.bind(this)
        this.toggleFavor = this.toggleFavor.bind(this)
    }

    /**
     *
     */
    convertAnswer(value, type) {
        if (!value) {
            return '';
        }
        value = ~~value;
        type = ~~type;

        if (type === 0) { //判断题
            return value === 16 ? '正确' : '错误';
        } else {
            return (value === 16) ? 'A' :
                (value === 32) ? 'B' :
                    (value === 64) ? 'C' :
                        (value ===128) ? 'D' : 'X';
        }
    }

    toggleAnswerPart() {
        this.setState({
            isShow: !this.state.isShow,
        })
    }

    onChange(e) {
        // console.log('Your answer is : ' + e.target.value)
        const detailInfo = this.props.detailInfo || {};
        const { answer, questionId } = detailInfo;
        const yourAnswer = e.target.value;

        this.setState({
            yourAnswer,
            isShow: true,
            answerState: '1',
        }, () => {
            // this.props.
            const userInfo = window.sessionStorage.getItem('userInfo');
            const userData = JSON.parse(userInfo || '{}');
            const _uid = userData._uid;

            const url = `http://127.0.0.1:3000/drive-record?`
            const data = {
                uid: userData.id,
                _uid,
                questionId,
                errorFlag: (yourAnswer == answer) ? 1 : 0
            };
            custom_fetch.post(url, data, json => {

            })

        });
    }

    /**
     * 收藏、取消收藏操作
     */
    toggleFavor() {
        const detailInfo = this.props.detailInfo || {};
        const { questionId } = detailInfo;

        const userInfo = window.sessionStorage.getItem('userInfo');
        const userData = JSON.parse(userInfo || '{}');
        const { id, _uid } = userData;

        const isfavored = this.state.isItemFaovred; //该题是否已被收藏

        const url = `http://127.0.0.1:3000/drive-toggleFavor?`
        const data = {
            uid: id,
            _uid,
            questionId,
            isfavored : isfavored ? 1 : 0
        };
        custom_fetch.post(url, data, json => {
            if (!json.success) {
                notification.error({
                    message: '操作提示',
                    description: json.msg
                })
                return false;
            }

            const isItemFaovred = json.data.isfavored || false;
            this.setState({
                isItemFaovred
            }, () => notification.success({
                message: '操作提示',
                description: json.msg
            }))

        })
    }

    // 注意 这里没切换题目时会执行该方法
    componentDidMount() {
        // alert('updating...')
        const detailInfo = this.props.detailInfo || {};
        const { questionId } = detailInfo;

        const userInfo = window.sessionStorage.getItem('userInfo');
        const userData = JSON.parse(userInfo || '{}');
        const { id, _uid } = userData;

        const url = `http://127.0.0.1:3000/drive-topicFavor?`
        const data = {
            uid: id,
            _uid,
            questionId
        };
        custom_fetch.post(url, data, json => {
            if (!json.success) {
                alert(json.msg)
                return false;
            }

            const isItemFaovred = json.data.isfavored || false;
            this.setState({
                isItemFaovred
            })

        })
    }

    render() {
        const answerTime = '2017-03-13';

        const detailInfo = this.props.detailInfo || {};
        const topicIndex = this.props.index;
        const answerState = this.state.answerState || '0';

        let {
            optionA, optionB, optionC, optionD, explain,
            optionType, wrongRate, mediaContent, answer
        } = detailInfo || {};
        const contentArr = [optionA, optionB, optionC, optionD];
        const analysis = explain || '暂无解析';
        optionType = ~~optionType;


        let correctAnswer = answer,
            yourAnswer = this.state.yourAnswer,
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
                break;
            case 0:
                itemBranchDOM = null;
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

        const judegIcon = (yourAnswer == correctAnswer) ? topicRightIcon : topicErrorIcon;

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
        const hasDone = !!(answerState === '1'); //已做该题

        return (
            <div className="topicItem">
                { hasDone && <img className="topic-judgeImg" src={judegIcon} alt=""/> }

                <Row style={{minHeight:'300px'}}>
                    <Col md={24}>
                        <div className="topicItem-left">
                            <p className="topicItem-stem"
                               dangerouslySetInnerHTML={{__html: contentConvert(itemStemDOM) }} />
                            <div className="topic-branch">
                                { itemBranchDOM }
                            </div>
                        </div>

                        <div className="topicItem-faovr">
                            <Button
                                type="default"
                                onClick={this.toggleFavor} >
                                <Icon type="heart" className={ isItemFaovred ? "topicItem-favorIcon":''} />{ favorBtnTitle }
                            </Button>
                        </div>

                        <div className="answerItem">
                            <span className="answer-title">选择答案：</span>
                            <span>
                                { optionType === 1 ?
                                    <RadioGroup onChange={this.onChange} value={yourAnswer}>
                                        <Radio value='16' disabled={hasDone}>A</Radio>
                                        <Radio value='32' disabled={hasDone}>B</Radio>
                                        <Radio value='64' disabled={hasDone}>C</Radio>
                                        <Radio value='128' disabled={hasDone}>D</Radio>
                                    </RadioGroup> :
                                    <RadioGroup onChange={this.onChange} value={yourAnswer}>
                                        <Radio value='16' disabled={hasDone}>正确</Radio>
                                        <Radio value='32' disabled={hasDone}>错误</Radio>
                                    </RadioGroup>
                                }
                            </span>
                        </div>


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
                            <Col md={4}>
                                <span className="topicItem-yourAnswer">您的答案：</span>
                            </Col>
                            <Col md={20}>
                                <span dangerouslySetInnerHTML={{__html: this.convertAnswer(yourAnswer, optionType) }}></span>
                            </Col>
                        </Row>
                        <Row className="topicItem-answer-item">
                            <Col md={4}>
                                <span className="topicItem-rightAnswer">正确答案：</span>
                            </Col>
                            <Col md={20}>
                                <span dangerouslySetInnerHTML={{__html: this.convertAnswer(correctAnswer, optionType) }}></span>
                            </Col>
                        </Row>
                        <Row className="topicItem-answer-anlyItem">
                            <Col md={4}>
                                <span className="topicItem-answer-anlyTitle">答案解析：</span>
                            </Col>
                            <Col md={20}>
                                <span dangerouslySetInnerHTML={{__html: analysis }}></span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}
