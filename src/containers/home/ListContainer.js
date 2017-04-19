/**
 * 该 Container Component 作为 研修、新闻、作业三大展示板块的主容器。来提供一个整体的框架。
 * 每个部分的子容器通过 Router 来嵌套进入该容器内部。
 *      ——jiangxtx -2017-1-10
 */

import React, { Component } from 'react'
import BreadCrumb from '../../components/BreadCrumb'
import { Container, Row, Col } from '../../layout'

import excsbar from '../../img/homepage/detailbar-excs.jpg'
import studybar from '../../img/homepage/detailbar-study.jpg'
import newsbar from '../../img/homepage/detailbar-news.jpg'

const imgbar = [ newsbar, studybar, excsbar ];
// 0-news, 1-study, 2-excs;
const crumbObj = {
    l1_obj: { title: '首页', link: '/' },
    l2_title: ['新闻列表', '研修课程列表', '优秀作业展示'],
    l2_link: ['news', 'study', 'excs'],
    level3_link: [
        { title: '基础教育慕课的未来在哪里aa啊啊啊！！！？' },{ title: '中小学教师研修方案' },{ title: '基础教育慕课的研修课程列表!!？' }
    ]
}

const ListContainer = (props) => {
    // console.log('listContainer props:', props)
    /**
     * return 之前的这块代码，主要依据 当前页面路由来判断展示的 Bar 图片以及面包屑信息。
     * 被很好的优化的一番，体味编程之美，细细看来，甚是妙哉！！！--2017-1-11
     */
    const pathname = props.location.pathname;  // router of current page
    const isContain = str => (pathname.indexOf(str) > -1);

    const isDetail = isContain('detail');
    const flag = isContain('news') ? 0 : ( isContain('study') ? 1 :
            ( isContain('excs') ? 2 : -1 ) );  // -1 is an error flag;
    if (flag === -1) {
        throw new Error('ListContainer path router Error!')
    }

    const crumbData = [
        crumbObj.l1_obj,
        { title: crumbObj.l2_title[flag], link: isDetail ? crumbObj.l2_link[flag] : null },
    ];
    isDetail && crumbData.push(crumbObj.level3_link[flag]);

    return (
        <Container>
            <img src={imgbar[flag]} style={{width:'100%', marginTop:'10px'}} alt=""/>
            <BreadCrumb crumbData={crumbData} />
            { props.children }
        </Container>
    )
}

export default ListContainer