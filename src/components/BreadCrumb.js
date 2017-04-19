import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { Breadcrumb } from 'antd'
import { Container, Row, Col } from '../layout'

const CrumbItem = Breadcrumb.Item;
const STYLE = {
    crumb: {
        margin: '26px 0 30px'
    },
    crumbTitle: {
        fontSize: '14px',
        fontWeight: 100,
        color: '#2f5c89'
    },
};

export default class BreadCrumb extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { crumbData } = this.props;
        return (
            <div style={STYLE.crumb}>
                <Breadcrumb>
                    { crumbData &&
                    crumbData.map((item, idx) =>
                            <CrumbItem style={STYLE.crumbTitle} key={idx}>
                                { item.link ? <Link to={item.link}>{item.title}</Link> : item.title }
                            </CrumbItem>
                        )
                    }
                </Breadcrumb>
            </div>
        )
    }
}
BreadCrumb.propTypes = {
    crumbData: PropTypes.arrayOf(
        PropTypes.shape({
            link: PropTypes.string,
            title: PropTypes.string.isRequired,
        })
    ).isRequired,
}


