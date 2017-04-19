/**
 * 该组件用于 DataTable 的列表展示，集成 antd 的 Table 组件，方便后续统一维护。
 */

import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { Icon, Table } from 'antd'
import { Row, Col } from '../layout'

import '../css/components/dataTable.css'

const DataTable = (props) => {
    const { columns, dataSource } = props;

    return (
        <div className="dataTable">
            <Table columns={columns} dataSource={dataSource} />
        </div>
    )
}
DataTable.propTypes = {
    columns: PropTypes.array.isRequired,
    dataSource: PropTypes.array.isRequired,
}

export default DataTable