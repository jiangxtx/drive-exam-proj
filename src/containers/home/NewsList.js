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
            { name: '基础教育慕课1.0 何去何从？', time: '2017.01.05 12:56', link: 'news/detail/1234' },
            { name: '基础教育慕课1.0 何去何从？', time: '2017.01.05 12:56', link: 'news/detail/1234' },
            { name: '基础教育慕课1.0 何去何从？', time: '2017.01.05 12:56', link: 'news/detail/1234' },
            { name: '基础教育慕课1.0 何去何从？', time: '2017.01.05 12:56', link: 'news/detail/1234' },
            { name: '基础教育慕课1.0 何去何从？', time: '2017.01.05 12:56', link: 'news/detail/1234' },
            { name: '基础教育慕课1.0 何去何从？', time: '2017.01.05 12:56', link: 'news/detail/1234' },
            { name: '基础教育慕课1.0 何去何从？', time: '2017.01.05 12:56', link: 'news/detail/1234' },
            { name: '基础教育慕课1.0 何去何从？', time: '2017.01.05 12:56', link: 'news/detail/1234' },
            { name: '基础教育慕课1.0 何去何从？', time: '2017.01.05 12:56', link: 'news/detail/1234' },
            { name: '基础教育慕课1.0 何去何从？', time: '2017.01.05 12:56', link: 'news/detail/1234' },
            { name: '基础教育慕课1.0 何去何从？', time: '2017.01.05 12:56', link: 'news/detail/1234' },
            { name: '基础教育慕课1.0 何去何从？', time: '2017.01.05 12:56', link: 'news/detail/1234' },
            { name: '基础教育慕课1.0 何去何从？', time: '2017.01.05 12:56', link: 'news/detail/1234' },
            { name: '基础教育慕课1.0 何去何从？', time: '2017.01.05 12:56', link: 'news/detail/1234' },
            { name: '基础教育慕课1.0 何去何从？', time: '2017.01.05 12:56', link: 'news/detail/1234' },
            { name: '基础教育慕课1.0 何去何从？', time: '2017.01.05 12:56', link: 'news/detail/1234' },
        ];

        return (
            <div>
                { newsListData &&
                    newsListData.map((item, idx) => <Col2List key={idx} item={item} showIcon={true} />)
                }
                <PaginateMid total={63}
                             pageSize={10}
                             currentPage={2}
                             pageChange={this.handlePageChange} />
            </div>
        )
    }
}