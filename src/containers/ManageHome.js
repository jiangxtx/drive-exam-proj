import 'antd/dist/antd.css'
import '../css/home/index_head.css'

import React ,{Component}from  'react'
import { Link } from 'react-router'
import {bindActionCreators} from  'redux'
import {connect} from 'react-redux'
import { Menu,Input,Icon,Modal,Form,Radio,notification } from 'antd'
import { Container, ContainerFluid, Row, Col } from '../layout'

import '../css/manage-home.css'

const SubMenu = Menu.SubMenu;

class Main extends Component {
    constructor(props) {
        super(props);
        this.state={
            currentkey: '0'
        };

        this.handleMenuClick = this.handleMenuClick.bind(this)

    }
    handleMenuClick(e) {
        this.setState({
            currentkey: e.key,
        })
    }

    render() {
        const leftNavList = [
            { title: '上传banner图片', link: '/home/banner' },
            { title: '新闻列表', link: '/home/news' },
            { title: '编辑新闻', link: '/home/editE' },
            { title: '作业列表', link: '/home/excs' },
            { title: '编辑作业', link: '/home/excsE' },
            { title: '热门课程', link: '/home/hot' },
        ]

        return (
            <ContainerFluid>
                <Row>
                    <Col lg={2} md={2} sm={2}>
                        <Menu theme="dark"
                              style={{width:'100%', margin:'0 -14px',textAlign:'center'}}
                              selectedKeys={[this.state.currentkey]}
                              onClick={this.handleMenuClick}
                              mode="inline">
                            { leftNavList.map((item, idx) => (
                                <Menu.Item key={idx}><Link to={item.link}>{item.title}</Link></Menu.Item>
                            )) }
                        </Menu>
                    </Col>
                    <Col lg={10} md={10} sm={10}>
                        { this.props.children }
                    </Col>
                </Row>
            </ContainerFluid>
        )
    }
}


export default Main