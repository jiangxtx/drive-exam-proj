/**
 * Created by 仲夏 on 2017/1/1.
 * 模拟 bootatrap 的栅格布局系统，来编写 react 布局组件
 */

import React, { Component, PropTypes } from 'react'
import './css/bootstrap.min.css'

const Container = (props) => (
    <div className="container">
        { props.children }
    </div>
)

const ContainerFluid = (props) => (
    <div className="container-fluid">
        { props.children }
    </div>
)

const Row = (props) => (
    <div className="row">
        { props.children }
    </div>
)

const Col = (props) => {
    let { xs, sm, md, lg } = props;
    if (!(xs || sm || md || lg)) {
        xs = 12;
    }
    const colClass = [];
    const colKey = ['xs', 'sm', 'md', 'lg'];
    [ xs, sm, md, lg ].forEach((item, idx) => (item && colClass.push(`col-${colKey[idx]}-${item}`)));
    return (
        <div className={colClass.join(' ')}>
            { props.children }
        </div>
    )
}
Col.propTypes = {
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
};



export { Container, ContainerFluid, Row, Col }


