import React, { Component } from 'react'
import { Container, Row, Col } from '../../layout'
import PaginateMid from '../../components/PaginateMid'
import { Col2List } from '../../components/DataList'

export default class NewsList extends Component {
    constructor(props) {
        super(props)
        this.handlePageChange = this.handlePageChange.bind(this)
    }
    handlePageChange() {

    }
    render() {
        const newsListData = [
            { name: '研修课育慕课1.0 程列表基础教育慕课1.0 何去何从？', time: '2017.01.05 12:56', link: 'study/detail/12365246' },
            { name: '研修课程育慕课1.0 何去何从？', time: '2017.01.05 12:56', link: 'study/detail/12365246' },
            { name: '研修课程列表基础教育', time: '2017.01.05 12:56', link: 'study/detail/12365246' },
            { name: '研修育慕课1.0 课程列表基础教育慕课1.0 何去何从？', time: '2017.01.05 12:56', link: 'study/detail/12365246' },
            { name: '研修课程课1.0 何去何从？', time: '2017.01.05 12:56', link: 'study/detail/12365246' },
            { name: '研修课程列表基础教育慕课1.0 何去何从？', time: '2017.01.05 12:56', link: 'study/detail/12365246' },
            { name: '研修课程列表基础教育慕课1.0 何去何从？', time: '2017.01.05 12:56', link: 'study/detail/12365246' },
            { name: '研修课程列表基础教1.0 何去何从？', time: '2017.01.05 12:56', link: 'study/detail/12365246' },
            { name: '研修课程列表基础教育慕课1.0 何去何从？', time: '2017.01.05 12:56', link: 'study/detail/12365246' },
            { name: '研修课程列表基础教育慕课1.0 育慕课1.0 何去何从？', time: '2017.01.05 12:56', link: 'study/detail/12365246' },
            { name: '研育慕课1.0 修课程列表基础教育.0 何去何从？', time: '2017.01.05 12:56', link: 'study/detail/12365246' },
            { name: '研修课程列表基础教育慕课1.0 何去何从？', time: '2017.01.05 12:56', link: 'study/detail/12365246' },
            { name: '研修课程列表基础教育慕课1.0 何去何从？', time: '2017.01.05 12:56', link: 'study/detail/12365246' },
            { name: '研育慕课1.0 修课程列表基础教育0 何去何从？', time: '2017.01.05 12:56', link: 'study/detail/12365246' },
            { name: '研育慕课1.0 修课程列表基础教育慕课1.0 何去何从？', time: '2017.01.05 12:56', link: 'study/detail/12365246' },
            { name: '研修课程列表基础教育慕课1.0 何去何从？', time: '2017.01.05 12:56', link: 'study/detail/12365246' },
            { name: '研修sd是打发杀是多少gsdg课程列表基础教育慕课1.0 何去何从？', time: '2017.01.05 12:56', link: 'study/detail/12365246' },
            { name: '收到佛山市.0 何去何从？', time: '2017.01.05 12:56', link: 'study/detail/12365246' },
            { name: '研修课程列表基础教育慕课1.0 何去何从？', time: '2017.01.05 12:56', link: 'study/detail/12365246' },
            { name: '是的发生的.0 何去何从？', time: '2017.01.05 12:56', link: 'study/detail/12365246' },
        ];

        return (
            <div>
                { newsListData.map((item, idx) => <Col2List key={idx} item={item} showIcon={true} />) }
                <PaginateMid total={63}
                             pageSize={10}
                             currentPage={2}
                             pageChange={this.handlePageChange} />
            </div>
        )
    }
}