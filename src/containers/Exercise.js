import 'antd/dist/antd.css'
import '../css/candidate.css'

import React ,{Component}from  'react'
import { Link } from 'react-router'
import { Menu,Input,Select, Icon,Modal,Form,Radio,notification } from 'antd'
import { Container, ContainerFluid, Row, Col } from '../layout'


class Exercise extends Component {
    constructor(props) {
        super(props);
        this.state={
        };

        this.onChapterChange = this.onChapterChange.bind(this)
    }

    onChapterChange(value) {
        console.log('onChapterChange: ' ,value)
    }

    render() {

        const chapterList = [
            { name: '第一章 道路交通安全法律、法规和规章', id: 231, total: 565 },
            { name: '第二章 交通信号', id: 232, total: 337 },
            { name: '第三章 安全行车、文明驾驶基础知识', id: 233, total: 284 },
            { name: '第四章 机动车驾驶操作相关基础知识', id: 234, total: 139 },
            { name: '第五章 上海地区题库', id: 235, total: 29 },
            { name: '第六章 上海“快处易赔”考题', id: 236, total: 24 },
        ]

        const chapterSelectDOM = chapterList.map((item, idx) => {
            return <Option key={idx} value={item.id+''}>{item.name}</Option>;
        });

        return (
            <Row>
                <h2>章节练习</h2>

                <div className="chapter-filter">
                    <span>章节：</span>
                    <Select
                        defaultValue="231"
                        style={{ width: 380 }}
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={this.onChapterChange}
                    >
                        { chapterSelectDOM }
                    </Select>
                </div>

            </Row>
        )
    }
}


export default Exercise;