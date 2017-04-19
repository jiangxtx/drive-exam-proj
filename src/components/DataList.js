/**
 * 该组件用于展示在一行中，不同板块的信息列表。
 * 可能包括：标题、教师、时间、组织等条目信息。
 */

import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { Icon } from 'antd'
import { Row, Col } from '../layout'

import '../css/components/datalist.css'

const Col3List = (props) => {
    const { item, showIcon } = props;

    return (
        <Row className="listItem">
            <Col span={6} className="b_wsol">
                <Link to={item.link} className="listItem-title"  title={item.name}>
                    { showIcon && <Icon type="double-right" style={{marginRight:'12px'}} /> }
                    {item.name}
                </Link>
            </Col>
            <Col span={2} className="b_wsol">
                <div className="listItem-teacher">{item.teacher}</div>
            </Col>
            <Col span={4} className="b_wsol">
                <div className="listItem-time">{item.orga}</div>
            </Col>
        </Row>
    )
}
Col3List.propTypes = {
    item: PropTypes.object.isRequired,
    showIcon: PropTypes.bool.isRequired,
}

const Col2List = (props) => {
    const { item, showIcon } = props;

    return (
        <Row className="listItem">
            <Col span={7} className="b_wsol">
                <Link to={item.link} className="listItem-title"  title={item.name}>
                    { showIcon && <Icon type="double-right" style={{marginRight:'12px'}} /> }
                    {item.name}
                </Link>
            </Col>
            <Col span={5} className="b_wsol">
                <div className="listItem-time">{item.time}</div>
            </Col>
        </Row>
    )
}
Col2List.propTypes = {
    item: PropTypes.object.isRequired,
    showIcon: PropTypes.bool.isRequired,
}

export { Col2List, Col3List }