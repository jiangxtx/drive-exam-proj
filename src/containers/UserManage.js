import 'antd/dist/antd.css'
import '../css/admin.css'
import '../css/public/public.css'

import React ,{Component}from  'react'
import { Link } from 'react-router'
import { Menu,Input,Table, Icon,Modal, notification, Spin, Button } from 'antd'
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

        this.onDeleteUser = this.onDeleteUser.bind(this)
        this.queryAllUsers = this.queryAllUsers.bind(this)

    }

    onDeleteUser(userData) {
        // alert('userId: ' + userData.id)

        Modal.confirm({
            title: '删除用户',
            content: `确定要删除用户 ${userData.name} 吗？`,
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                const url = `http://127.0.0.1:3000/drive-deleteUser`;
                custom_fetch.post(url, { userId: userData.id}, json => {
                    // debugger
                    if (json.success) {
                        this.queryAllUsers();
                    }
                    notification[json.success ? 'success' : 'error']({
                        message: '删除提示',
                        description: json.msg
                    })
                })
            },

        });
    }

    queryAllUsers() {
        const url = `http://127.0.0.1:3000/drive-getAllusers`;
        custom_fetch.get(url, json => {
            // debugger
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

    componentDidMount() {
        this.queryAllUsers();
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
                render: (id, data) => {
                    return (
                        <div>
                            <Button type="primary" ghost size="small"
                                    onClick={() => this.onDeleteUser(data)} >
                                删除</Button>&nbsp;&nbsp;&nbsp;
                            <Button type="danger" size="small" >
                                更改密码</Button>
                        </div>
                    )
                }
            }
        ];

        return (
            <Spin spinning={isFetching}>
                <Row>
                    <div className="admin-tablWrap">
                        <DataTable
                            columns={columns}
                            dataSource={topicsData}
                        />
                    </div>
                </Row>
            </Spin>
        )
    }
}


export default Main;