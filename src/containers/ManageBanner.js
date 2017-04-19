import React ,{Component}from  'react'
import { Link } from 'react-router'
import {bindActionCreators} from  'redux'
import {connect} from 'react-redux'
import { Menu,Input,Icon,Modal,Form,Radio,notification, Tree } from 'antd'
import BreadCrumb from '../components/BreadCrumb'
import DataTable from '../components/DataTable'

import perosnIcon from '../img/icon/people.svg'
const TreeNode = Tree.TreeNode;

export default class ManageBanner extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const crumbData = [
            { title: '首页管理', link: '/' },
            { title: '上传banner图片', link: null },
        ];

        const columns = [
            {
            title: '题目',
            dataIndex: 'name',
            key: 'name',
            render: text => <a href="##">{text}</a>,
        }, {
            title: '缩略图',
            key: 'img',
            render: (text, record) => (
                <img src={record.img} style={{width:'32px', height:'32px'}} alt="loading..."/>
            )
        }, {
            title: '链接',
            dataIndex: 'link',
            key: 'link',
        }, {
            title: '操作',
            key: 'operate',
            render: (text, record) => (
                <span>
                  <a href="##">编辑</a>
                  <span className="ant-divider" />
                  <a href="##">删除</a>
                </span>
            ),
        }];
        const data = [
            {
            key: '1',
            name: '新年图片',
            img: perosnIcon,
            link: 'http://127.0.0.1:8080/public/manage.html#/home/banner?_k=5wzfhh',
        }, {
            key: '2',
            name: 'Jim Green',
            img: perosnIcon,
            link: 'http://127.0.0.1:8080/manage.html#/home/banner?_k=5wzfhh',
        }, {
            key: '3',
            name: 'Joe Black',
            img: 32,
            link: 'https://outlook.live.com/owa/',
        }];

        return (
            <div>
                <BreadCrumb crumbData={crumbData} />

                <DataTable columns={columns} dataSource={data} />

                <TreeDemo />
            </div>
        )
    }
}

const TreeDemo = React.createClass({
    getDefaultProps() {
        return {
            keys: ['0-0-0', '0-0-1'],
        };
    },
    getInitialState() {
        const keys = this.props.keys;
        return {
            defaultExpandedKeys: keys,
            defaultSelectedKeys: keys,
            defaultCheckedKeys: keys,
        };
    },
    onSelect(info) {
        console.log('selected', info);
    },
    onCheck(info) {
        console.log('onCheck', info);
    },
    render() {
        return (
            <Tree className="myCls" showLine checkable
                  defaultExpandedKeys={this.state.defaultExpandedKeys}
                  defaultSelectedKeys={this.state.defaultSelectedKeys}
                  defaultCheckedKeys={this.state.defaultCheckedKeys}
                  onSelect={this.onSelect} onCheck={this.onCheck}
            >
                <TreeNode title="parent 1" key="0-0">
                    <TreeNode title="leaf 1-0-1" key="0-0-0-1" />
                    <TreeNode title="parent 1-0" key="0-0-0" disabled>
                        <TreeNode title="leaf 1-0-0" key="0-0-0-0" disableCheckbox />

                    </TreeNode>
                    <TreeNode title="parent 1-1" key="0-0-1">
                        <TreeNode title={<span style={{ color: '#08c' }}>sss</span>} key="0-0-1-0" />
                    </TreeNode>
                </TreeNode>
            </Tree>
        );
    },
});