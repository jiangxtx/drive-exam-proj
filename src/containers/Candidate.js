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
            { title: '章节练习', link: '/candidate/excs' },
            { title: '模拟考试', link: '/candidate/test' },
            { title: '我的错题', link: '/candidate/error' },
            { title: '我的收藏', link: '/candidate/favor' },
            { title: '我的统计', link: '/candidate/statis' },
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
                    <Col lg={10} md={10} sm={10} >
                        <div style={{amrginRight:'32px'}}>
                            { this.props.children }
                        </div>
                    </Col>
                </Row>
            </ContainerFluid>
        )
    }
}


export default Main