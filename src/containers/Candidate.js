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
            { title: '顺序练习', link: '/candidate/order' },
            { title: '练习模式', link: '/candidate/excs' },
            { title: '测验模式', link: '/candidate/test' },
            { title: '考试模式', link: '/candidate/editE' },
            { title: '我的错题', link: '/candidate/editE' },
            { title: '我的收藏', link: '/home/editE' },
            { title: '我的统计', link: '/home/editE' },
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