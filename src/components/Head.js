import 'antd/dist/antd.css'
import '../css/home/index_head.css'

import React ,{Component}from  'react'
import { Menu,Row,Col,Input,Icon,Modal,Form,Radio,notification} from 'antd'
import { Link } from 'react-router'
import { FETCH_POST, FETCH_URL } from '../Tool/fetchAjax-wrap'

import mooslogo from '../img/mooslogo.png'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const confirm = Modal.confirm

class IndexHead extends Component{
    constructor(props) {
        super(props);
        this.keydown_enterHandler = this.keydown_enterHandler.bind(this);

        this.state={
            loginVisible: false,
            registerVisible:false,
            loginJudge:false,     //判断用户是否已经登录
            userType:null,         //判断用户身份 'teacher' 教师  'admin'是管理员  'student'学生
            loginSuccess:'',
            passwordDirty: false,
            showName:'用户'
        };
    }

    // 回车响应登录 & 注册事件
    keydown_enterHandler(e) {
        if (e && (e.keyCode === 13)) {
            const { loginVisible, registerVisible } = this.state;
            loginVisible && this.handleOk();
            registerVisible && this.handleRegisterOk();
        }
    }

    componentDidMount(){
        this.props.checkLogin()   //判断是否有用户登陆
    }

    logoClick(){
        window.location.href='/'   //logo点击返回到首页
    }

    //打开登录模态框
    showLoginModal() {
        this.setState({
            loginVisible: true,
            loginSuccess:''
        }, () => {
            document.addEventListener('keydown', this.keydown_enterHandler, false);
        });
    }

    //用户跳转到个人页面
    go2Space(){
        //console.log('???',this.props.userInfo.userType)
        switch (this.props.userInfo.userType){
            case 'teacher':
                window.location.href='/teacher.html'
                break
            case 'admin':
                window.location.href='/manager.html'
                break
            case 'student':
                window.location.href='/student.html'
                break
            case 'expert':
                //console.log('123')
                window.location.href='/expert.html'
                break
            default:
                window.location.href='/'
        }
        //window.location.href='/teacher.html'
    }

    //用户退出登录
    logOut(){
        //console.log('log out')
        let comp = this
        confirm({
            title: '确认退出?',
            content: '点击确定退出系统',
            onOk() {
                return new Promise((resolve, reject) => {
                    setTimeout(resolve, 1000);
                    comp.props.userLogOut()
                })
            },
            onCancel() {},
        });




    }

    openNotificationWithIcon(){
        notification['success']({
            message:"注册成功!",
            description:'恭喜您注册成功,请使用您注册的账号登陆!'
        })
    }


    //打开注册模态框
    showRegisterModal(){
        this.setState({
            registerVisible:true
        }, () => document.addEventListener('keydown', this.keydown_enterHandler) )
    }

    handleOk() {                //登录按钮点击事件
        this.setState({
            confirmLoading: true,
        });
        let comp = this
        let fetchData = FETCH_POST


        fetchData.body = 'loginName=' + this.refs.loginName.refs.input.value + '&pwd=' + this.refs.loginPass.refs.input.value
        fetch(FETCH_URL + '/userLogin_User.action', fetchData).then(function (res) {
            if (res.ok) {
                res.json().then(function (result) {
                    let loginPromise = new Promise((resolve, reject)=> {
                        if (result.json.success) {
                            comp.setState({
                                loginSuccess: 'success'
                            })
                            //console.log('xxx',comp)

                            setTimeout(() => {
                                comp.setState({
                                    loginVisible: false,
                                    confirmLoading: false,
                                });
                                document.removeEventListener('keydown', comp.keydown_enterHandler, false); // 移除enter响应登录事件
                                comp.refs.loginName.refs.input.value = ''   //清空用户名
                                comp.refs.loginPass.refs.input.value = ''   //清空密码
                                resolve()
                            }, 1000);

                        } else {
                            comp.setState({
                                loginSuccess: 'error'
                            })
                            reject()
                        }
                    }).then(function () {
                       comp.props.checkLogin()

                    }, function (err) {
                        comp.setState({
                            confirmLoading: false
                        })
                        console.log(err)
                    })
                }, function (er) {
                    console.log(er)
                })
            }
        })
    }

    //注册按钮点击事件
    handleRegisterOk() {
        //let registerValues = this.props.form.getFieldsValue()
        let registerNameError = this.props.form.getFieldError('registerName') //检查注册名
        let registerPassError = this.props.form.getFieldError('password')   //检查注册密码
        let registerConfirmError = this.props.form.getFieldError('confirm')   //检查确认密码
        let registerTypeError = this.props.form.getFieldError('registerType') //检查用户类型
        if(registerConfirmError||registerNameError||registerPassError||registerTypeError){
            return false
        }else{
            this.setState({
                confirmLoading: true,
            });
            setTimeout(() => {
                this.setState({
                    registerVisible: false,
                    confirmLoading: false,
                }, () => document.removeEventListener('keydown', this.keydown_enterHandler) );
                let fetchData=FETCH_POST
                fetchData.body = ''
                let registerURL = ''
                let userType = this.props.form.getFieldsValue(['registerType']).registerType
                if(userType==='0'){
                    registerURL = '/register_Student.action'
                }else if(userType === '1'){
                    registerURL = '/register_Teacher.action'
                }
                let registerName = encodeURIComponent(this.props.form.getFieldsValue(['registerName']).registerName)
                let registerPass = encodeURIComponent(this.props.form.getFieldsValue(['password']).password)
                let registerPassRepeat = encodeURIComponent(this.props.form.getFieldsValue(['confirm']).confirm)
                let comp = this
                fetchData.body = 'loginName='+registerName+'&pwd='+registerPass+'&pwdAgain='+registerPassRepeat
                fetch(FETCH_URL+registerURL,fetchData).then(function (res) {
                    if(res.ok){
                        res.json().then(function (result) {
                            if(result.json.success){
                                //console.log('success',result)
                                comp.openNotificationWithIcon()
                            }else{
                                //console.log('fail',result)
                            }
                        },function (er) {
                            //console.log('register fetchAjax result error',er)
                        })
                    }
                },function (e) {
                    //console.log('register fetchAjax error',e)
                })



            }, 1000);
        }
        // console.log('register error',registerError)
        //console.log('register password',comp.refs.registerPassword.refs.input.value)
        //console.log('register type',comp.refs.registerType.state.value)

    }

    checkUserName(rule,value,callback){
        //fetchAjax()
        // /checkLoginName_Student.action
        // /checkLoginName_Teacher.action
        let pattern = RegExp(/^[\u4e00-\u9fa5a-zA-Z0-9]+$/)
        if(value.length>20) callback('用户名长度不能超过20个字符')
        if(!pattern.test(value) && value!=='')callback('请检查输入内容是否为字母、数字、汉字')
        let fetchData = FETCH_POST
        let userType = this.props.form.getFieldsValue(['registerType']).registerType
        //console.log('user type',userType)
        fetchData.body = 'loginName=' + encodeURIComponent(value)
        let checkUserUrl = ''
        if(userType === "0"){
            checkUserUrl = '/checkLoginName_Student.action'
        }else if(userType === '1'){
            checkUserUrl = '/checkLoginName_Teacher.action'
        }
        fetch(FETCH_URL+checkUserUrl,fetchData)
            .then(function (res) {
                if(res.ok){
                    res.json().then(function (result) {
                        //console.log('check user name',result)
                        if(result.json.success){
                            callback()
                        }else{
                            callback(result.json.msg)
                        }
                    })
                }
            })

    }

    handlePasswordBlur(e) {
        const value = e.target.value;
        this.setState({ passwordDirty: this.state.passwordDirty || !!value });
    }
    checkPassowrd(rule, value, callback) {
        const form = this.props.form;
        //console.log('pass',value)
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不相同!');
        } else {
            callback();
        }
    }
    checkConfirm(rule, value, callback) {
        const form = this.props.form;
        //console.log('confirm',value)
        if (value && this.state.passwordDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }


    //取消登陆模态框
    handleCancel() {
        //console.log('Clicked cancel button');
        document.removeEventListener('keydown', this.keydown_enterHandler ); // 移除enter响应登录事件

        this.setState({
            loginVisible: false,
        });
        this.refs.loginName.refs.input.value=''   //清空用户名
        this.refs.loginPass.refs.input.value=''   //清空密码
    }

    //取消注册模态框
    handleRegisterCancel() {
        //console.log('Clicked cancel button');
        this.setState({
            registerVisible: false,
        }, () => document.removeEventListener('keydown', this.keydown_enterHandler) );
    }

    render(){
        let loginModalHead = <div>用户登录</div>
        let registerModalHead = <div>用户注册</div>

        let registerHead = this.props.userInfo.userName || this.props.userInfo.loginName || '注册'
        let loginHead = (!!this.props.userInfo.loginName)?'退出':'登录'
        let loginHeadClick = (!!this.props.userInfo.loginName)?this.logOut.bind(this):this.showLoginModal.bind(this)     //登陆按钮点击事件判断
        let registerHeadClick = (!!this.props.userInfo.loginName)?this.go2Space.bind(this):this.showRegisterModal.bind(this) //注册按钮点击事件判断
        //console.log('render',this.props)
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { getFieldDecorator } = this.props.form;
        return(
            <div>
                <div className="headTop">
                    <Row>
                        <Col span={16} offset={4}>
                            <div className="headLogo">
                                <img src={mooslogo} style={{height:'75px',marginTop:'10px',borderBottom:'none',zIndex:'999',position:'relative'}} onClick={this.logoClick}/>
                            </div>

                            <div className="headLogin">
                                <div onClick={loginHeadClick} style={{cursor:'pointer',float:'right'}} ref="loginBtn">{loginHead}</div>
                                <span style={{float:'right',marginLeft:"5px",marginRight:"5px"}}>|</span>
                                <div onClick={registerHeadClick} style={{cursor:'pointer',float:'right'}} ref="registerBtn">{registerHead}</div>
                                {/*登录模态框begin*/}
                                <Modal title={loginModalHead}
                                       maskClosable={false}
                                       visible={this.state.loginVisible}
                                       onOk={this.handleOk.bind(this)}
                                       confirmLoading={this.state.confirmLoading}
                                       onCancel={this.handleCancel.bind(this)}
                                >
                                    <Form horizontal >
                                        <FormItem  hasFeedback={true} {...formItemLayout} label="用户名" validateStatus={this.state.loginSuccess} help={this.state.loginSuccess==='error'?'用户名或密码不正确':''}>
                                            <Input  ref="loginName" placeholder="请输入用户名" />
                                        </FormItem>
                                        <FormItem  hasFeedback={true} {...formItemLayout} label="密码" validateStatus={this.state.loginSuccess} help={this.state.loginSuccess==='error'?'用户名或密码不正确':''}>
                                                <Input  ref="loginPass" type="password" placeholder="请输入密码" />
                                        </FormItem>
                                    </Form>
                                </Modal>
                                {/*登录模态框end*/}
                                {/*注册模态框begin*/}
                                <Modal title={registerModalHead}
                                       maskClosable={false}
                                       visible={this.state.registerVisible}
                                       onOk={this.handleRegisterOk.bind(this)}
                                       confirmLoading={this.state.confirmLoading}
                                       onCancel={this.handleRegisterCancel.bind(this)}
                                >
                                    <Form horizontal ref="registerForm" >
                                        <FormItem  {...formItemLayout} label="用户名" required={true} hasFeedback={true}>
                                            {getFieldDecorator('registerName', {
                                                rules: [{
                                                    required: true, message: '请输入用户名',
                                                },{
                                                    validator:this.checkUserName.bind(this)
                                                }],
                                            })(
                                                <Input placeholder="请输入用户名" />
                                            )}
                                        </FormItem>
                                        <FormItem  {...formItemLayout} label="密码" required={true} hasFeedback={true}>
                                            {getFieldDecorator('password', {
                                                rules: [{
                                                    required: true, message: '请输入密码',
                                                }, {
                                                    validator: this.checkConfirm.bind(this),
                                                }],
                                            })(
                                                <Input type="password" placeholder="请输入密码" onBlur={this.handlePasswordBlur.bind(this)}/>
                                            )}
                                        </FormItem>
                                        <FormItem
                                            {...formItemLayout}
                                            label="确认密码"
                                            required={true}
                                            hasFeedback
                                        >
                                            {getFieldDecorator('confirm', {
                                                rules: [{
                                                    required: true, message: '请确认密码',
                                                }, {
                                                    validator: this.checkPassowrd.bind(this),
                                                }],
                                            })(
                                                <Input type="password" placeholder="请确认输入密码" />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            {...formItemLayout}
                                            label="类型"
                                            required={true}
                                            hasFeedback={true}
                                        >
                                            {getFieldDecorator('registerType', {
                                                initialValue: '0',
                                                rules: [{
                                                    required: true
                                                }],
                                            })(
                                                <RadioGroup >
                                                    <Radio value="0">学生</Radio>
                                                    <Radio value="1">教师</Radio>
                                                </RadioGroup>
                                            )}
                                        </FormItem>
                                    </Form>
                                </Modal>
                                {/*注册模态框end*/}
                            </div>
                            </Col>
                        </Row>
                </div>
                <Row style={{background:'#2f5c89'}}>
                    <Col span={16} offset={4}  style={{borderBottom:'none',height:'50px',background:'#2f5c89'}}>
                        {/*<div style={{float:'right',lineHeight:'48px',paddingRight:'10px'}} >*/}
                            {/*<Icon type="search" style={{marginLeft:'10px',position:'absolute',zIndex:'999',lineHeight:'48px'}}/>*/}
                            {/*<Input size="large" placeholder="学校/课程" style={{borderRadius:'25px',paddingLeft:'25px'}} />*/}
                        {/*</div>*/}
            <Menu  mode="horizontal" style={{borderBottom:'none',height:'50px',background:'#2f5c89'}}>
                <Menu.Item style={{float:'right'}} >
                    <Link to="/announce" style={{color:'#fff'}}>公告</Link>
                </Menu.Item>
                <Menu.Item style={{float:'right'}} >
                    <Link to="/school" style={{color:'#fff'}}>学校</Link>
                </Menu.Item>
                <Menu.Item style={{float:'right'}}>
                    <Link to="/course" style={{color:'#fff'}}>课程</Link>
                </Menu.Item>
                <Menu.Item style={{float:'right'}}>
                    <Link to="/home" style={{color:'#fff'}}>首页</Link>
                </Menu.Item>
            </Menu>
                        </Col>
                    </Row>
            </div>
        )
    }
}


export default Form.create()(IndexHead)