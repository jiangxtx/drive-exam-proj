import 'antd/dist/antd.css'
import '../css/admin.css'
import '../css/public/public.css'

import React ,{Component}from  'react'
import { Menu, Modal, notification, Spin, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import { Link } from 'react-router'
import { custom_fetch } from '../Tool/wrap.fetch'
import DataTable from '../components/DataTable'
import { queryTopicDetailsByIds } from '../Tool/drive-exam-func.tool'


const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;


class RegistrationForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmDirty: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleConfirmBlur = this.handleConfirmBlur.bind(this)
        this.checkPassword = this.checkPassword.bind(this)
        this.checkConfirm = this.checkConfirm.bind(this)
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    handleConfirmBlur(e) {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    checkPassword(rule, value, callback) {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    checkConfirm(rule, value, callback) {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { username='' } = this.props;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="用户名"
                    hasFeedback
                >
                    {getFieldDecorator('username', {
                        rules: [{
                            required: true, message: 'Please input your password!',
                        }, {
                            validator: this.checkConfirm,
                        }],
                        initialValue: username,
                    })(
                        <Input type="text" disabled={true} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="新密码"
                    hasFeedback
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '请输入新密码!',
                        }, {
                            validator: this.checkConfirm,
                        }],
                    })(
                        <Input type="password" placeholder="请输入新密码" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="确认密码"
                    hasFeedback
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: '请再次输入新密码!',
                        }, {
                            validator: this.checkPassword,
                        }],
                    })(
                        <Input type="password" placeholder="请再次输入新密码" onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>
            </Form>
        );
    }
}

const UpdatePwdForm = Form.create()(RegistrationForm);

let count = 1;

class Main extends Component {

    constructor(props) {
        super(props);
        this.state={
            isFetching: true,
            updatePwdVisible: false,
            topicsData: [],
            selectedUser: '',
        };

        this.onDeleteUser = this.onDeleteUser.bind(this)
        this.onUpdatePwd = this.onUpdatePwd.bind(this)
        this.queryAllUsers = this.queryAllUsers.bind(this)

        this.onUpdatePwdOK = this.onUpdatePwdOK.bind(this)
        this.onUpdatePwdOKCancel = this.onUpdatePwdOKCancel.bind(this)

    }

    onUpdatePwd(userData) {
        this.setState({
            updatePwdVisible: true,
            selectedUser: userData || {},
        })

    }

    onUpdatePwdOK() {
        this.refs.updatePwdForm.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                const { selectedUser } = this.state;

                const url = `http://127.0.0.1:3000/drive-updatePwd?`
                const data = {
                    id: selectedUser.id,
                    newPwd: values.password,
                };
                custom_fetch.post(url, data, json => {
                    notification[json.success ? 'success' : 'error']({
                        message: '操作提示',
                        description: json.msg
                    })
                });

                this.onUpdatePwdOKCancel();
            }
        });

    }

    onUpdatePwdOKCancel() {
        this.setState({
            updatePwdVisible: false,
        })
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
        const { isFetching, topicsData, updatePwdVisible, selectedUser } = this.state;
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
                            <Button type="primary" size="small"
                                    onClick={() => this.onDeleteUser(data)} >
                                删除</Button>&nbsp;&nbsp;&nbsp;
                            <Button type="danger" size="small"
                                    onClick={() => this.onUpdatePwd(data)}>
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

                    <Modal
                        key={count++}
                        title="更改密码"
                        visible={updatePwdVisible}
                        onOk={this.onUpdatePwdOK}
                        onCancel={this.onUpdatePwdOKCancel}
                    >
                        <UpdatePwdForm ref="updatePwdForm" username={selectedUser.name} />
                    </Modal>
                </Row>
            </Spin>
        )
    }
}


export default Main;