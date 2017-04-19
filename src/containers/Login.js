import React ,{Component}from 'react'
import { Link } from 'react-router'
import { Card, Form, Icon, Input, Button, Checkbox } from 'antd'
import { Container, ContainerFluid, Row, Col } from '../layout'
import { drawNetCanvas } from '../Tool/drawNetCanvas'
import '../css/home/login.css'

const FormItem = Form.Item;
const canvasId = 'netsBackground';

const LoginForm = Form.create()( React.createClass({
    handleRegisterSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // alert('单击登录。。。')
                console.log('Received values of form: ', values);
                if (values.username === 'admin' && values.password === '123456') {
                    window.location.href = './index.html#/admin';
                } else if (values.username === 'jack' && values.password === '123456') {
                    window.location.href = './index.html#/candidate';
                } else {
                    alert('Sorry, your name or password is Error!');
                }
            }
        });
    },

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleRegisterSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入您的用户名!' }],
                    })(
                        <Input addonBefore={<Icon type="user" />} placeholder="请输入您的用户名" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入您的密码!' }],
                    })(
                        <Input addonBefore={<Icon type="lock" />} type="password" placeholder="请输入您的密码" />
                    )}
                </FormItem>
                {/*<FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                </FormItem>*/}
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                    <p>
                        <span className="login-form-forgot">没有账号？
                            <Link to="register" style={{color:'red'}}>现在注册!</Link>
                        </span>
                        <a href="#">忘记密码</a>
                    </p>
                </FormItem>
            </Form>
        );
    },
}));

class Login extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        drawNetCanvas(canvasId)
    }

    render() {

        return (
            <div className="index-main">
                <canvas id={canvasId}></canvas>

                <div className="loginPanel">
                    <Card title={<div className="loginPanel-title">用户登录</div>}
                          style={{backgroundColor:'#f5f5f5'}}
                          bordered={false} >
                        <LoginForm />
                    </Card>

                </div>
            </div>
        )
    }
}

export default Login
