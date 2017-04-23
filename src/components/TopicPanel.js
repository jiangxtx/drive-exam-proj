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
        alert(`点击了第 ${index} 题`)
    }

    render() {
        const panelArr = [];
        for (let i=1; i<101; i++) {
            panelArr.push(
                <span key={i} className="topicPanel-item"
                      onClick={() => this.onItemhandle(i)}>
                    {i}
                </span>
            )
        }

        return (
            <div>
                { panelArr }
            </div>
        )
    }
}


export default TopicPanel;

