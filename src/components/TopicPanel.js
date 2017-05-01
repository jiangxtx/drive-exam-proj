import 'antd/dist/antd.css'
import '../css/candidate.css'

import React ,{Component}from  'react'
import { Link } from 'react-router'
import { Menu,Input,Icon,Modal,Form,Radio,notification } from 'antd'
import { Container, ContainerFluid, Row, Col } from '../layout'

class TopicPanel extends Component {
    constructor(props) {
        super(props)

        this.onItemhandle = this.onItemhandle.bind(this)
    }

    onItemhandle(index) {
        // alert(`点击了第 ${index} 题`)
        this.props.onTopicIndexHandle(index)
    }

    render() {
        let { totalNum, currentIndex } = this.props;
        totalNum = totalNum || 100;
        currentIndex = currentIndex || -1;

        const panelArr = [];
        for (let i=0; i<totalNum; i++) {
            panelArr.push(
                <span key={i} className={`topicPanel-item ${currentIndex === i ? 'active' : ''}`}
                      onClick={() => this.onItemhandle(i)}>
                    {i + 1}
                </span>
            )
        }

        return (
            <div className="topicPanel-wrap">
                <h4>答题卡</h4>
                <div className="topicPanel">
                    { panelArr }
                </div>
            </div>
        )
    }
}


export default TopicPanel;

