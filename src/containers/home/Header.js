import 'antd/dist/antd.css'
import '../../css/home/index_head.css'

import React ,{Component}from  'react'
import { Link } from 'react-router'
import {bindActionCreators} from  'redux'
import {connect} from 'react-redux'
import { Menu,Button,Icon,Modal,Form,Radio,notification} from 'antd'
import { Container, ContainerFluid, Row, Col } from '../../layout'

const confirm = Modal.confirm;

class Head extends Component {
    constructor(props) {
        super(props);
        this.state={
            name
        };

        this.onLogout = this.onLogout.bind(this)
    }

    onLogout() {
        const _this = this;
        confirm({
            title: '退出登录',
            content: '您确定要退出系统吗？',
            onOk() {
                console.log('OK');
                window.sessionStorage.setItem('userInfo', '');
                _this.context.router.push('/');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    /*shouldComponentUpdate() {
        // console.log('update....')
        this.checkLogin();
        return true;
    }*/

    componentDidMount(){
        // this.checkLogin();   //判断是否有用户登陆

        const checkLogin = () => {
            const currentName = this.state.name;

            const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo') || '{}');
            const { name, id, _uid } = userInfo;
            // console.log('checkLogin... :', name, currentName, (currentName !=name))
            if (currentName != name) {
                this.setState({
                    name
                });
            }
        }

        setInterval(checkLogin, 1500);
    }

    render() {
        const { name } = this.state;
        console.log('header name: ', name)

        const loginJSX = (
            <div className="headLogin">
                <Link activeClassName="link-active" to="register">注册</Link>
                <span style={{marginLeft:"5px",marginRight:"5px"}}>|</span>
                <Link activeClassName="link-active" to="login">登录</Link>
            </div>
        );
        const userinfoJSX = (
            <div className="headLogin">
                欢饮您，<Link activeClassName="link-active" >{name}</Link>
                <span style={{marginLeft:"5px",marginRight:"5px"}}>|</span>
                <Link activeClassName="link-active" onClick={this.onLogout}>退出</Link>
            </div>
        )

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
                            { !!name ? userinfoJSX : loginJSX }
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

Head.contextTypes = {
    router: React.PropTypes.object,
}

export default Head