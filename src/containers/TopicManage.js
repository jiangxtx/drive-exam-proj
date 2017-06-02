import 'antd/dist/antd.css'
import '../css/admin.css'
import '../css/public/public.css'

import React ,{Component}from  'react'
import { Link } from 'react-router'
import { Menu,Input,Table, Icon,Modal,Tag, Spin, Button } from 'antd'
import { Container, ContainerFluid, Row, Col } from '../layout'
import { custom_fetch } from '../Tool/wrap.fetch'
import { topicDifficultyLevel } from '../Utils/topicRelated.util'
import DataTable from '../components/DataTable'
import { queryTopicDetailsByIds } from '../Tool/drive-exam-func.tool'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state={
            isFetching: true,
            topicsData: []
        };

        this.openEditModal = this.openEditModal.bind(this)
        this.openShowDetailModal = this.openShowDetailModal.bind(this)
    }

    openEditModal() {
        Modal.info({
            title: '题目编辑',
            content: (
                <div style={{textAlign: 'center'}}>
                    <h4>敬请期待.....</h4>
                </div>
            ),
            onOk() {

            },
        });
    }

    convertAnswer(value, topicType) {
        if (topicType === 0) { //判断题
            return value === 16 ? '正确' : '错误';
        } else {
            return (value === 16) ? 'A' :
                (value === 32) ? 'B' :
                    (value === 64) ? 'C' :
                        (value ===128) ? 'D' : 'X';
        }
    }

    openShowDetailModal(topicId, type) {
        const url = `http://127.0.0.1:3000/drive-queryTopicsByIds?`;
        const idsStr = [];
        idsStr.push(topicId)
        const data = {
            uid: 1,
            _uid: 11111,
            idsStr: JSON.stringify(idsStr),
        };
        custom_fetch.post(url, data, json => {
            const detail = json.data[0];

            Modal.info({
                title: '题目详情',
                content: (
                    <div style={{textAlign: 'left'}}>
                        <p>{detail.question}</p>
                        { (type == 1) &&
                            <div>
                                <div className="detailItem-option">A. {detail.optionA}</div>
                                <div className="detailItem-option">B. {detail.optionB}</div>
                                <div className="detailItem-option">C. {detail.optionC}</div>
                                <div className="detailItem-option">D. {detail.optionD}</div>
                            </div>
                        }
                        <div>
                            <div className="detailItem-answer">
                                答案：{this.convertAnswer(detail.answer, type)}
                            </div>
                        </div>
                    </div>
                ),
                onOk() {

                },
            });
        })
    }

    componentDidMount() {
        const url = `http://127.0.0.1:3000/drive-getAlltopics`;
        custom_fetch.get(url, json => {
            if (json.success) {
                this.setState({
                    isFetching: false,
                    topicsData: json.data || [],
                })
            } else {
                alert(json.msg)
            }
        })
    }

    render() {
        const { isFetching, topicsData } = this.state;
        const columns = [
            {
                title: '试题ID',
                dataIndex: 'id',
                width: 80,
                key: 'id',
            }, {
                title: '题干',
                dataIndex: 'question',
                key: 'question',
                width: 180,
                render: data => {
                    const sub_data = (data.length > 30) ? (data.substring(0, 30) + '......') : data;
                    return <span className="b_wsol topicTable-Q" title={data}>{sub_data}</span>;
                }
            }, {
                title: '题型',
                dataIndex: 'type',
                key: 'type',
                width: 60,
                render: data => (data == 1) ? '选择题' : '判断题',
            }, {
                title: '难度系数',
                dataIndex: 'difficulty',
                key: 'difficulty',
                width: 60,
                render: data => topicDifficultyLevel(data)
            }, {
                title: '操作',
                dataIndex: 'data',
                key: 'data',
                width: 180,
                render: (id, data) => {
                    return (
                        <div>
                            <Button type="default" icon="cloud" size="small"
                                    onClick={ () => this.openShowDetailModal(data.id, data.type) }>详情</Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button type="primary" icon="edit" size="small"
                                    onClick={this.openEditModal}>编辑</Button>

                        </div>
                    )
                }
            }
        ];

        return (
            <Row>
                <Spin spinning={isFetching}>
                    <div className="admin-tablWrap">
                        <DataTable
                            columns={columns}
                            dataSource={topicsData}
                        />
                    </div>
                </Spin>
            </Row>
        )
    }
}


export default Main;