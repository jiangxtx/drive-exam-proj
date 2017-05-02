import 'antd/dist/antd.css'
import '../css/candidate.css'

import React ,{Component}from  'react'
import { Link } from 'react-router'
import { Menu,Input,Icon,Modal,Form,Radio,notification } from 'antd'
import { Container, ContainerFluid, Row, Col } from '../layout'


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

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
            { title: '用户管理', link: '/admin/user' },
            { title: '导入管理', link: '/admin/import' },
            { title: '习题管理', link: '/admin/topic' },
        ]

        return (
            <ContainerFluid>
                <Row>
                    <Col lg={2} md={2} sm={2}>
                        <Menu theme="light"
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