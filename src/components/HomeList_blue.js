import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { Card, Icon, Row, Col } from 'antd'
// import { Row, Col } from '../layout'
import { Col3List, Col2List } from './DataList'

import '../css/components/homelist.css'

export default class HomeList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { titleBar, type, dataList, moreLink } = this.props;

        return (
            <Card title={<div><Icon type="double-right" style={{marginRight:'12px'}} />{titleBar}</div>}
                  className="cardBlue"
                  extra={<Link className="bcitem-more" to={moreLink}>更多>></Link>}
                  style={{ width: '100%' }}
            >
                { (type === 'news') && dataList.map((item, idx) => <Col2List key={idx} item={item} showIcon={false} />) }
                { (type === 'show') && dataList.map((item, idx) => <Col3List key={idx} item={item} showIcon={false} />) }
            </Card>
        )
    }
}
HomeList.propTypes = {
    dataList: PropTypes.array.isRequired,
    titleBar: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    moreLink: PropTypes.string.isRequired,
}