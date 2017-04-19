/**
 * Created by Jiangxtx on 2016/12/7.
 */
/**
 * Description:
 *      改写 antd 中 Pagination 实现居中展现分页的组件。
 * 形如：
 *      --
 * 调用方式诸如：
 *      --
 * this.props includes:
 *      1. total -- 总条目数，必填
 *      2. currentPage -- 当前页，必填
 *      3. pageSize -- 页大小，可选
 *      4. pageChange -- 单击页数响应事件，必填
 */

import React, { Component, PropTypes } from 'react'
import { Pagination } from 'antd'
import '../css/components/paginateMid.css'

export default class PaginateMid extends Component {
    constructor(props) {
        super(props)
        this.onShowSizeChange = this.onShowSizeChange.bind(this)
    }

    onShowSizeChange(currentPage, pageSize) {
        console.log(currentPage, pageSize);
    }

    render() {
        const { total, currentPage, pageSize=10, pageChange } = this.props;
        // console.log('paginateMid: ',total, currentPage, pageSize)
        /*
            showSizeChanger
            onShowSizeChange={this.onShowSizeChange}
         */

        const paginationDOM = (total < 1) ? '' :
            (<div className="pagination-panel">
                <Pagination defaultCurrent={1}
                            showTotal={total => `共 ${total} 条记录`}
                            current={currentPage}
                            total={total}
                            pageSize={pageSize}
                            onChange={ pageChange } />
            </div>)
        return (
            <div>
                { paginationDOM }
            </div>
        )
    }
}

PaginateMid.PropTypes = {
    total: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    pageChange: PropTypes.func.isRequired
}