import React, { Component, ProTypes } from 'react';
import { Row, Col } from 'antd';
import { PROJ_LICENSE_KEY } from '../Config/constants'

import '../css/home/index_foot.css';

export default class FootBottom extends Component {
    render() {
        return (
            <Row className="footbottom">
                <Col span={24}>
                    <p>
                        C20STEAM 创新课程实验共同体
                    </p>
                    <p className="footbottom small">
                        @版权所有 2016 上海智而仁课程研发中心 <a href="http://www.miitbeian.gov.cn/">{PROJ_LICENSE_KEY}</a>
                    </p>
                </Col>
            </Row>
        );
    }
}
