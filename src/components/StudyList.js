import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { Card } from 'antd'
import { Col2List } from './DataList'

import '../css/components/homelist.css'

export default class HomeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOver: false,
        }

        this.onDoingHandle = this.onDoingHandle.bind(this)
        this.onOverHandle = this.onOverHandle.bind(this)
    }

    onDoingHandle() {
        this.setState({ isOver: false })
    }
    onOverHandle() {
        this.setState({ isOver: true })
    }

    render() {
        return (
            <Card className="homeList"
                  title="研修计划方案"
                  extra={
                      <span>
                          <a onClick={this.onDoingHandle} className={!this.state.isOver ? 'item-active' : ''} href="#">进行中</a>
                          <a onClick={this.onOverHandle} className={this.state.isOver ? 'item-active' : ''} href="#">已结束</a>
                      </span>
                  }
                  style={{ width: '100%', height:'380px' }}
            >
                {
                    this.props.dataList.map((item, idx) => (
                        <Col2List key={idx} item={item} showIcon={false} />
                    ))
                }
                <div style={{lineHeight: '35px'}}>
                    <Link to="study" className="item-more" style={{float:'right', marginRight:'16px'}}>更多>></Link>
                </div>
            </Card>
        )
    }
}
HomeList.propTypes = {
    dataList: PropTypes.array.isRequired,
}