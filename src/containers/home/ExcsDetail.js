import React, { Component } from 'react'
import { Button, message } from 'antd'
import { Container, Row, Col } from '../../layout'
import '../../css/newsDetail.css'
import { MESSAGE_CONFIG } from '../../Config/constants'

message.config(MESSAGE_CONFIG);

export default class ExcsDetail extends Component {
    constructor(props) {
        super(props)
        this.handleDownload = this.handleDownload.bind(this)
    }
    handleDownload() {
        message.info('点击下载作业包的响应。。。')

    }
    render() {
        const data = {
            title: '基础教育慕课的未来在哪里？',
            teacher: '梁宏达',
            orga: '上市教育委员会教研室',
            content: '在 web 应用开发中，路由系统是不可或缺的一部分。在浏览器当前的 URL 发生变化时，路由系统会做出一些响应，用来保证用户界面' +
            '与 URL 的同步。随着单页应用时代的到来，为之服务的前端路由系统也相继出现了。有一些独立的第三方路由系统，比如 director，代码库也比较' +
            '轻量。当然，主流的前端框架也都有自己的路由，比如 Backbone、Ember、Angular、React 等等。那 react-router 相对于其他路由系统又' +
            '针对 React 做了哪些优化呢？它是如何利用了 React 的 UI 状态机特性呢？又是如何' +
            '将 JSX 这种声明式的特性用在路由中？基础教育慕课的未来在哪里？基础教育慕课的未来在哪里？' +
            '基础教育慕课的未来在哪里？基础教育慕课的未来在哪里？基础教育慕课的未来在哪里？基础教育慕课的未来在哪里？基础教育慕课的未来在哪里' +
            '？基础教育慕课的未来在哪里？基础教育慕课的未来在哪里？基础教育慕课的未来在哪里？基础教育慕课的未来在哪里？基础教育慕课的未来在哪' +
            '里？基础教育慕课的未来在哪里？基础教育慕课的未来在哪础教育慕课的未来在哪里？基础教育慕课的未来在哪里？基础教育慕课的未来在' +
            '哪里？基础教育慕课的未来在哪里教育慕课的未来在哪里？基础教育慕课的未来在哪里？基础教育慕课的未来在哪里？基础教育慕课的未来在' +
            '哪里？<p>基础教育慕课的未来在哪里？基础教育慕课的未来在哪里？基础教育慕课的未来在哪里？基础教育慕课的未来在哪里？<p>基础教育慕课的未' +
            '来在哪里？基础教育慕课的未来在哪里？基础教育慕课的未来在哪里？基础教育慕课的未来在哪里育慕课的未来在哪里？基础教育慕课的未' +
            '教育慕课的未来在哪里？基础教育慕课的未教育慕课的未来在哪里？基础教育慕课的未教育慕课的未来在哪里？基础教育慕课的未教育慕课的未来在哪里' +
            '？基础教育慕课的未来在哪里？基础教育慕课的未来在哪里？基础教育慕课的未来在哪里？<p>' +
            '在 web 应用开发中，路由系统是不可或缺的一部分。在浏览器当前的 URL 发生变化时，路由系统会做出一些响应，用来保证用户界面' +
            '与 URL 的同步。随着单页应用时代的到来，为之服务的前端路由系统也相继出现了。有一些独立的第三方路由系统，比如 director，代码库也比较' +
            '轻量。当然，主流的前端框架也都有自己的路由，比如 Backbone、Ember、Angular、React 等等。那 react-router 相对于其他路由系统又' +
            '针对 React 做了哪些优化呢？它是如何利用了 React 的 UI 状态机特性呢？又是如何' +
            '将 JSX 这种声明式的特性用在路由中？基础教育慕课的未来在哪里？基础教育慕课的未来在哪里？' +
            '基础教育慕课的未来在哪里？基础教育慕课的未来在哪里？基础教育慕课的未来在哪里？基础教育慕课的未来在哪里？基础教育慕课的未来在哪里' +
            '？基础教育慕课的未来在哪里？基础教育慕课的未来在哪里？基础教育慕课的未来在哪里？基础教育慕课的未来在哪里？基础教育慕课的未来在哪' +
            '里？基础教育慕课的未来在哪里？基础教育慕课的未来在哪础教育慕课的未来在哪里？基础教育慕课的未来在哪里？基础教育慕课的未来在' +
            '哪里？基础教育慕课的未来在哪里教育慕课的未来在哪里？基础教育慕课的未来在哪里？基础教育慕课的未来在哪里？基础教育慕课的未来在' +
            '哪里？<p>基础教育慕课的未来在哪里？基础教育慕课的未来在哪里？基础教育慕课的未来在哪里？基础教育慕课的未来在哪里？<p>基础教育慕课的未' +
            '来在哪里？基础教育慕课的未来在哪里？基础教育慕课的未来在哪里？基础教育慕课的未来在哪里育慕课的未来在哪里？基础教育慕课的未' +
            '教育慕课的未来在哪里？基础教育慕课的未教育慕课的未来在哪里？基础教育慕课的未教育慕课的未来在哪里？基础教育慕课的未教育慕课的未来在哪里' +
            '？基础教育慕课的未来在哪里？基础教育慕课的未来在哪里？基础教育慕课的未来在哪里？<p>',
            publishTime: '2016.01.02'
        };

        return (
            <div>
                <div style={{textAlign:'center'}}>
                    <h3 className="newsDetail-title">{data.title}</h3>
                    <span className="newsDetail-time">{data.teacher}</span>
                    <time className="newsDetail-time">{data.orga}</time>
                    <time className="newsDetail-time">{data.publishTime}</time>
                </div>
                <div className="newsDetail-content" dangerouslySetInnerHTML={{__html: data.content }}></div>
                <div className="btn-download">
                    <Button className="detail-btn" type="primary" onClick={this.handleDownload}>下载作业包</Button>
                </div>
            </div>
        )
    }
}