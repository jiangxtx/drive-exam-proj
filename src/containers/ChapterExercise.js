import 'antd/dist/antd.css'
import '../css/candidate.css'

import React ,{Component}from  'react'
import { Link } from 'react-router'
import { Menu,Input,Select, Icon,Modal,Form, Spin,notification } from 'antd'
import { Container, ContainerFluid, Row, Col } from '../layout'

import ExerciseMainpart from './ExerciseMainpart'
import { custom_fetch } from '../Tool/wrap.fetch'

const Option = Select.Option;

class ChapterExercise extends Component {
    constructor(props) {
        super(props);
        this.state={
            chapterList: [],
            selectedIndex: 0,
            isFetching: true,
        };

        this.onChapterChange = this.onChapterChange.bind(this)
    }

    onChapterChange(value) {
        console.log('onChapterChange: ' ,value)
        this.setState({
            selectedIndex: ~~value,
        })
    }

    componentDidMount() {
        const url = 'http://127.0.0.1:3000/drive-chapters';
        custom_fetch.get(url, json => {
            console.log('/drive-chapters Data: ', json)
            const data = json.data || [];
            const chapterInfo = [];
            data && data.map((item, idx) => {
                chapterInfo.push({
                    index: idx,
                    name: item.name,
                    id: item.id,
                    total: item.count,
                    idsArr: item.ids
                });

                this.setState({
                    chapterList: chapterInfo,
                    isFetching: false,
                })
            })
        })

    }

    render() {

        /*const chapterList = [
            { name: '第一章 道路交通安全法律、法规和规章', id: 121, total: 565 },
            { name: '第二章 交通信号', id: 122, total: 337 },
            { name: '第三章 安全行车、文明驾驶基础知识', id: 123, total: 284 },
            { name: '第四章 机动车驾驶操作相关基础知识', id: 124, total: 139 },
            { name: '第五章 上海地区题库', id: 221, total: 80 },
            { name: '第六章 上海“快处易赔”考题', id: 222, total: 87 },
        ]*/
        const { chapterList, selectedIndex, isFetching } = this.state;

        const idsArr = chapterList[~~selectedIndex] && chapterList[~~selectedIndex].idsArr || [];

        return (
            <Spin spinning={isFetching}>
                <h2 className="crumb-title">
                    <span className="crumb-title-main">章节练习</span>
                    <span className="crumb-title-sub">按照章节依次练习题库中的所有习题</span>
                </h2>

                <div className="chapter-filter">
                    <span>章节：</span>
                    { !!chapterList.length &&
                        <Select
                            defaultValue="0"
                            style={{ width: 380 }}
                            placeholder="请选择一个章节"
                            optionFilterProp="children"
                            onChange={this.onChapterChange}
                        >
                            { chapterList.map((item, idx) => {
                                return <Option key={idx} value={`${item.index}`}>{item.name}</Option>;
                            }) }
                        </Select>
                    }
                </div>

                { !!idsArr.length && <ExerciseMainpart key={selectedIndex} idsArr={idsArr} /> }

            </Spin>
        )
    }
}


export default ChapterExercise;