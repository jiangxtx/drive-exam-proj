/**
 * Created by 仲夏 on 2017/1/1.
 * 模拟 bootatrap 的栅格布局系统，来编写 react 布局组件
 */

import React, { Component, PropTypes } from 'react'
import './css/bootstrap.min.css'

import Col from './Col'
import Row from './Row'

const Container = (props) => {
    let { className } = props;
    const iClass = ['container'];
    className && iClass.push(className);

    return (
        <div className={iClass.join(' ')}>
            { props.children }
        </div>
    )
}
Container.propTypes = {
    className: PropTypes.string,
}

const ContainerFluid = (props) => {
    let { className } = props;
    const iClass = ['container-fluid'];
    className && iClass.push(className);

    return (
        <div className={iClass.join(' ')}>
            { props.children }
        </div>
    )
}
ContainerFluid.propTypes = {
    className: PropTypes.string,
}


export { Container, ContainerFluid, Row, Col }


