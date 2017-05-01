import 'antd/dist/antd.css'
import '../../css/home/index_head.css'

import React ,{Component}from  'react'
import { Link } from 'react-router'
import {bindActionCreators} from  'redux'
import {connect} from 'react-redux'
import { Menu,Button,Icon,Modal,Form,Radio,notification} from 'antd'
import { Container, ContainerFluid, Row, Col } from '../../layout'



class Head extends Component {
    constructor(props) {
        super(props);
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

    componentDidMount(){
        // this.props.checkLogin();   //判断是否有用户登陆
    }

    render() {
        return(
            <div className="headTop">
                <Container>
                    <Row>
                        <Col sm={8}>
                            <div className="headLogo">
                                <h1 className="headLogo-title">
                                    <Link to="/">考试系统平台</Link></h1>
                            </div>
                        </Col>
                        <Col sm={4}>
                            <div className="headLogin">
                                <Link activeClassName="link-active" to="register">注册</Link>
                                <span style={{marginLeft:"5px",marginRight:"5px"}}>|</span>
                                <Link activeClassName="link-active" to="login">登录</Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Head