import React, { Component, ProTypes } from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router'

import '../css/home/index_foot.css';

class FootMain extends Component {

    render() {
        let aboutInfo = `上海智而仁信息科技有限公司，是C20慕课联盟（地市教育局、高中、初中、小学）的组织者与
                         秘书长单位，其任务为：将联盟单位的研究和实践成果转化为服务于我国基础教育的力量，推动我国中小学在数字时代教与学的变革`;
        let helpInfo = [
            <a  className="item-info" href="#" >学生手册</a>,
            <a  className="item-info" href="#" >教师手册</a>,
            <a  className="item-info" href="#" >指导手册</a>
        ];
       /* $.map(['学生手册', '教师手册', '指导手册', '管理员入口'], (value,index) => {
             helpInfo.push(<a href="#" key=index>value</a>);
        });*/
        let contactInfo = [
            <div key="2" className="item-info">地址：上海市普陀区金沙江路1006号12楼</div>,
            <div key="3" className="item-info">邮箱：c20steam@cz2r.com</div>,
            <div key="4" className="item-info">电话：021-62687637(转242)</div>,
            <div key="5" className="item-info">微信公众号：智而仁</div>
        ];

        const content = (
            <div>
                <img className="follow-weixin" src="../../img/follow-wechat-weixin.jpg" alt="" />
            </div>
        );
        let followInfo = <div>
            <img key="9"  src="../../img/antdIcon/qq.svg" alt="" />
            <img key="10"  src="../../img/antdIcon/wechat.svg" alt="" />
            <img key="11"  src="../../img/antdIcon/weibo.svg" alt="" />
            </div>

        return (
            <Row type="flex" justify="center" align="top" className="footmain">
                <FootMainItem span="5" title="About" children={aboutInfo} />
                <FootMainItem span="3" title="Help" >
                    <div>
                        <Link to="/studenthelp" style={{color:'#fff'}}>学生手册</Link>
                    </div>
                    <div>
                        <Link to="/teacherhelp" style={{color:'#fff'}}>教师手册</Link>
                    </div>
                    <div>
                        <Link to="/commonhelp" style={{color:'#fff'}}>指导手册</Link>
                    </div>
                </FootMainItem>
                <FootMainItem span="5" title="Contact" children={contactInfo} />
                {/*<FootMainItem span="3" title="Follow" children={followInfo} />*/}
            </Row>
        );
    }
}

class FootMainItem extends Component {

    render() {
        return (
            <Col span={this.props.span}>
                <Row>
                    <Col span={20} >
                        <p>{this.props.title}</p>
                        <div className="footmain-item">{this.props.children}</div>
                    </Col>
                </Row>
            </Col>
        );
    }
}

module.exports = FootMain;