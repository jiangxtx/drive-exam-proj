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
        const url = `http://127.0.0.1:3000/drive-getAllusers`;
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
                title: '用户名',
                dataIndex: 'name',
                width: 60,
                key: 'name',
            }, {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email',
                width: 100,
            }, {
                title: '操作',
                dataIndex: 'id',
                key: 'id',
                width: 80,
                render: data => {
                    return <Button type="primary" icon="cloud" size="small">删除</Button> +
                        <Button type="primary" icon="cloud" size="small">更改密码</Button>
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