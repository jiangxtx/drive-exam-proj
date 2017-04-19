import 'antd/dist/antd.css'
import '../css/home/index_head.css'

import React ,{Component}from  'react'
import { Link } from 'react-router'
import {bindActionCreators} from  'redux'
import {connect} from 'react-redux'
import { Menu,Input,Icon,Modal,Form,Radio,notification } from 'antd'
import { Container, ContainerFluid, Row, Col } from '../layout'
import { fetchAjax, FETCH_POST, FETCH_URL } from '../Tool/wrap.fetch'

import homeIcon from '../img/icon/home.svg'
import perosnIcon from '../img/icon/people.svg'
import courseIcon from '../img/icon/course-book.svg'
import studyIcon from '../img/icon/paper-study.svg'
import certIcon from '../img/icon/certificate.svg'
import boardIcon from '../img/icon/notice.svg'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const confirm = Modal.confirm
const MenuItem = Menu.Item;
const MenuItemGroup = Menu.ItemGroup;

class Main extends Component {
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

        this.keydown_enterHandler = this.keydown_enterHandler.bind(this);
    }

    // 回车响应登录 & 注册事件
    keydown_enterHandler(e) {
        if (e && (e.keyCode === 13)) {
            // const { loginVisible, registerVisible } = this.state;
            // loginVisible && this.handleOk();
            // registerVisible && this.handleRegisterOk();
        }
    }

    componentDidMount(){
        // this.props.checkLogin();   //判断是否有用户登陆
    }


    render() {
        const navList = [
            { key: 'home', title: '首页管理', icon: homeIcon },
            { key: 'person', title: '人员管理', icon: perosnIcon },
            { key: 'course', title: '课程管理', icon: courseIcon },
            { key: 'study', title: '研修方案', icon: studyIcon },
            { key: 'cert', title: '证书管理', icon: certIcon },
            { key: 'board', title: '公告管理', icon: boardIcon },
        ]

        return(
            <div className="headTop">
                <Container>
                    <Row>
                        <Col lg={4}>
                            <div className="headLogo">
                                <h1 className="headLogo-title">
                                    <a href="index.html">中小学教师研修平台</a>
                                </h1>
                            </div>
                        </Col>
                        <Col lg={8}>
                            <div className="head-manageList">
                                <Menu onClick={this.handleClickMenu} mode="horizontal">
                                    { navList.map((item, idx) => (
                                        <MenuItem key={item.key}>
                                            <img src={item.icon} className="head-list-icon" />
                                            <div className="head-list-title">{item.title}</div>
                                        </MenuItem>
                                    )) }
                                </Menu>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

const Head = Form.create()(Main);

export default Head