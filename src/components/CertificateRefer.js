/**
 * 证书查询组件
 */
import React from 'react'
import { Form, Input, Button, Card } from 'antd'
import '../css/components/certificateRefer.css'

import certImg from '../img/homepage/defaultcourse.png'

const FormItem = Form.Item;

class Main extends React.Component {
     constructor(props) {
         super(props)
         this.state = {
            showCert: false
         }

         this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this)
         this.handleClearImg = this.handleClearImg.bind(this)
     }

    handleRegisterSubmit(e) {
         e.preventDefault();
         this.props.form.validateFields((err, values) => {
             if (!err) {
                 console.log('cert value: ', values)
                 this.setState({
                     showCert: true,
                 })
             }
         })
     }
    handleClearImg(e) {
         e.preventDefault();
        this.setState({
            showCert: false,
        })
    }

     render() {
         const { getFieldDecorator } = this.props.form;
         console.log('state: ', this.state)
         return (
             <div>
                 <Form className="cert" inline onSubmit={this.handleRegisterSubmit}>
                     <FormItem>
                         <span className="cert-item-title">证书查询</span>
                     </FormItem>
                     <FormItem>
                         { getFieldDecorator('usrName', {
                             rules: [{required: true, message: '请输入证书号'}]
                         })(
                             <Input size="large" width="40%"
                                    className="cert-item-input"
                                    placeholder="请输入证书号" onPressEnter={this.handleRegisterSubmit} />
                         )}
                     </FormItem>
                     <FormItem>
                         <Button className="cert-item-button" type="primary" htmlType="submit">查询</Button>
                     </FormItem>
                 </Form>
                 { this.state && this.state.showCert && (
                     <div>
                         <p>以下是您获取的证书(可右键下载)：<a href="#" onClick={this.handleClearImg}>清除</a></p>
                         <img src={certImg} alt="" />
                     </div>
                 )}

             </div>
         )
     }
}

const CertificateRefer = Form.create()(Main);

export default CertificateRefer