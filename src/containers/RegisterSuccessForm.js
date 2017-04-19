import React ,{Component}from 'react'
import { Link } from 'react-router'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { Container, ContainerFluid, Row, Col } from '../layout'
import { COMMON_FORM_INFO } from '../Config/constants'
import '../css/home/login.css'
const FormItem = Form.Item;

const RegisterSuccessForm = Form.create()( React.createClass({
    handleRegisterSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                alert('注册成功 完成。。。')
                console.log('Received values of form: ', values);
            }
        });
    },

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemData = [
            COMMON_FORM_INFO.realName,
            COMMON_FORM_INFO.cardId,
            COMMON_FORM_INFO.telphone,
            COMMON_FORM_INFO.subject,
            COMMON_FORM_INFO.jobTime,
            COMMON_FORM_INFO.qq,
            COMMON_FORM_INFO.wechat,
        ];
        const formItemJSX = formItemData.map((item, idx) => (
            <FormItem>
                { getFieldDecorator(item.key, {
                    rules: item.rules,
                })(
                    <Input addonBefore={<Icon type={item.iconType} />} placeholder={item.placeholder} />
                )}
            </FormItem>
        ));

        return (
            <Form onSubmit={this.handleRegisterSubmit} className="login-form">
                { formItemJSX }
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">完成</Button>
                    <p><Link to="login" style={{color:'orange'}}>跳过此步></Link></p>
                </FormItem>
            </Form>
        );
    },
}));

export default RegisterSuccessForm
