import React ,{Component}from 'react'
import { Link } from 'react-router'
import { Card, Form, Icon, Input, Button, Checkbox } from 'antd'
import { Container, ContainerFluid, Row, Col } from '../layout'
import { drawNetCanvas } from '../Tool/drawNetCanvas'
import RegisterSuccessFrom from './RegisterSuccessForm'
import '../css/home/login.css'

const FormItem = Form.Item;
const canvasId = 'netsBackground';

const RegisterForm = Form.create()( React.createClass({
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('单击了注册 form: ', values);
                this.props.handleRegisterSubmit(values)
            }
        });
    },

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
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
                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: '请输入您的邮箱！'}],
                    })(
                        <Input addonBefore={<Icon type="mail" />} type="email" placeholder="请输入您的邮箱" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">马上注册</Button>
                    <p className="login-form-forgot">已有账号？ <Link to="login" style={{color:'red'}}>立即登录!</Link></p>
                </FormItem>
            </Form>
        );
    },
}));

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registerSuccess: false,
        }

        this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this)
    }

    handleRegisterSubmit(data) {
        console.log('handleRegisterSubmit: ', data)
        this.setState({
            registerSuccess: true,
        })
    }

    componentDidMount() {
        drawNetCanvas(canvasId)
    }

    render() {

        return (
            <div className="index-main">
                <canvas id={canvasId}></canvas>
                { !this.state.registerSuccess &&
                    <div className="loginPanel">
                        <Card title={<div className="loginPanel-title">用户注册</div>}
                              style={{backgroundColor:'#f5f5f5'}}
                              bordered={false} >
                            <RegisterForm handleRegisterSubmit={this.handleRegisterSubmit.bind(this)} /> :
                        </Card>
                    </div>
                }
                { this.state.registerSuccess &&
                    <div className="loginPanel successPanel">
                        <Card title={
                                <div className="loginPanel-title">
                                    <p className="loginPanel-titleSuccess">
                                        <Icon type="check-circle-o" />恭喜您，注册成功！
                                    </p>
                                    <p className="loginPanel-sidetitle">您好！请完善个人信息，否则无法选择研修计划！</p>
                                </div>
                              }
                              style={{backgroundColor:'#f5f5f5'}}
                              bordered={false} >
                            <RegisterSuccessFrom />
                        </Card>
                    </div>
                }
            </div>
        )
    }
}

export default Register
