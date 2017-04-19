import React, { Component } from 'react'
import { Container, Row, Col } from '../../layout'
import PaginateMid from '../../components/PaginateMid'
import { Col3List } from '../../components/DataList'

export default class ExcsList extends Component {
    constructor(props) {
        super(props)
        // this.handlePageChange = this.handlePageChange.bind(this)
    }

    render() {
        const data = [
            { name: '基础教育，设计一个慕课教程，如何处理？', teacher:'梁老师', time: '2017.01.05 12:56', orga:'上海市教育委员会教研室', link: 'excs/detail/12345' },
            { name: '基础教育，设计一个慕课教程，如何处理？', teacher:'梁老师', time: '2017.01.05 12:56', orga:'上海市教育委员会教研室', link: 'excs/detail/12345' },
            { name: '基础教育，设计一个慕课教程，如何处理？', teacher:'梁老师', time: '2017.01.05 12:56', orga:'上海市教育委员会教研室', link: 'excs/detail/12345' },
            { name: '基础教育，设计一个慕课教程，如何处理？', teacher:'梁老师', time: '2017.01.05 12:56', orga:'上海市教育委员会教研室', link: 'excs/detail/12345' },
            { name: '基础教育，设计一个慕课教程，如何处理？', teacher:'梁老师', time: '2017.01.05 12:56', orga:'上海市教育委员会教研室', link: 'excs/detail/12345' },
            { name: '基础教育，设计一个慕课教程，如何处理？', teacher:'梁老师', time: '2017.01.05 12:56', orga:'上海市教育委员会教研室', link: 'excs/detail/12345' },
            { name: '基础教育，设计一个慕课教程，如何处理？', teacher:'梁老师', time: '2017.01.05 12:56', orga:'上海市教育委员会教研室', link: 'excs/detail/12345' },
            { name: '基础教育，设计一个慕课教程，如何处理？', teacher:'梁老师', time: '2017.01.05 12:56', orga:'上海市教育委员会教研室', link: 'excs/detail/12345' },
            { name: '基础教育，设计一个慕课教程，如何处理？', teacher:'梁老师', time: '2017.01.05 12:56', orga:'上海市教育委员会教研室', link: 'excs/detail/12345' },
            { name: '基础教育，设计一个慕课教程，如何处理？', teacher:'梁老师', time: '2017.01.05 12:56', orga:'上海市教育委员会教研室', link: 'excs/detail/12345' },
            { name: '基础教育，设计一个慕课教程，如何处理？', teacher:'梁老师', time: '2017.01.05 12:56', orga:'上海市教育委员会教研室', link: 'excs/detail/12345' },
            { name: '基础教育，设计一个慕课教程，如何处理？', teacher:'梁老师', time: '2017.01.05 12:56', orga:'上海市教育委员会教研室', link: 'excs/detail/12345' },
            { name: '基础教育，设计一个慕课教程，如何处理？', teacher:'梁老师', time: '2017.01.05 12:56', orga:'上海市教育委员会教研室', link: 'excs/detail/12345' },
            { name: '基础教育，设计一个慕课教程，如何处理？', teacher:'梁老师', time: '2017.01.05 12:56', orga:'上海市教育委员会教研室', link: 'excs/detail/12345' },
        ];

        return (
            <div>
                { data &&
                    data.map((item, idx) => <Col3List key={idx} item={item} showIcon={true} />)
                }
                <PaginateMid total={63}
                             pageSize={10}
                             currentPage={2}
                             pageChange={this.handlePageChange} />
            </div>
        )
    }
}