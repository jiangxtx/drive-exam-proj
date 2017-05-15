import 'antd/dist/antd.css'
import '../css/admin.css'
import '../css/public/public.css'

import React ,{Component}from  'react'
import { Link } from 'react-router'
import { Menu,Input,Table, Icon,Modal,Tag, Spin, Button } from 'antd'
import { Container, ContainerFluid, Row, Col } from '../layout'
import { custom_fetch } from '../Tool/wrap.fetch'
import DataTable from '../components/DataTable'
import { queryTopicDetailsByIds } from '../Tool/drive-exam-func.tool'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state={
            isFetching: true,
            topicsData: []
        };

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
                width: 60,
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
                render: data => (data == 1) ? '选择题' : '填空题',
            }, {
                title: '难度系数',
                dataIndex: 'difficulty',
                key: 'difficulty',
                width: 60,
                render: data => {
                    switch (~~data) {
                        case 1:
                            return <Tag color="#2db7f5">容易</Tag>;
                        case 2:
                            return <Tag color="#3dbff5">较易</Tag>;
                        case 3:
                            return <Tag color="#4dbdf5">适中</Tag>;
                        case 4:
                            return <Tag color="orange">较难</Tag>;
                        case 5:
                            return <Tag color="pink">很难</Tag>;
                        default:
                            return <Tag color="red">极难</Tag>;
                    }

                }
            }, {
                title: '操作',
                dataIndex: 'data',
                key: 'data',
                width: 80,
                render: data => {
                    return <Button type="primary" icon="cloud" size="small">详情</Button>
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