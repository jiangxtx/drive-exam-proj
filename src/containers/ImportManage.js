import 'antd/dist/antd.css'
import '../css/admin.css'

import React ,{Component}from  'react'
import { Link } from 'react-router'
import { Menu,Input,Select, Button, Modal,Form,Spin, notification } from 'antd'
import { Container, ContainerFluid, Row, Col } from '../layout'
import { queryTopicDetailsByIds } from '../Tool/drive-exam-func.tool'
import { custom_fetch } from '../Tool/wrap.fetch'
import { Url } from '../Config/constants'

class ImportManage extends Component {
    constructor(props) {
        super(props);
        this.state={
        };

        this.importTopicData = this.importTopicData.bind(this)
        this.importChapterData = this.importChapterData.bind(this)
    }

    importChapterData() {
        const chapterIdsArr = [121, 122, 123, 124, 221, 222];
        chapterIdsArr.forEach(item => {
            const topicInfoUrl =Url.chapterInfoByid + `chapterId=${item}`;
            custom_fetch.get(topicInfoUrl, json => {
                if (!json.success) {
                    alert('Error fetch!!')
                    return false;
                }

                const chapterData = json.data || {};
                const { chapter, questionList } = chapterData;

                const importUrl = 'http://127.0.0.1:3000/drive-chapterImport';
                const importData = {
                    id: chapter.id,
                    key: `chapter-${chapter.chapter}`,
                    name: chapter.title,
                    count: chapter.count,
                    ids: questionList.join(',')
                }
                custom_fetch.post(importUrl, importData, json => {
                    // alert(json.msg)

                }, false)
            })
        })

    }

    /**
     * 从远程数据库中拉取习题ID，并把每题目的具体信息存入本地的MongoDB中
     */
    importTopicData() {
        const allTopicIdsUrl = Url.allTopicIdsList;  // 获取所有习题ID数组
        custom_fetch.get(allTopicIdsUrl, json => {
            console.log('allIdsUrl: ', json)
            if (!json.success) {
                alert('Error fetch!!')
                return false;
            }

            const idsData = json.data || [];
            for (let i=0; i<idsData.length; i++) {
                const questionId = idsData[i];
                const topicInfoUrl =Url.topicInfoByIds + `questionIds=${questionId}`;
                custom_fetch.get(topicInfoUrl, json => {
                    if (!json.success) {
                        alert('Error fetch!!')
                        return false;
                    }

                    const topicData = json.data && json.data[0] || {};
                    const innerId = topicData.id || -1;
                    const importUrl = 'http://127.0.0.1:3000/drive-dataImport';
                    const importData = {
                        questionId,
                        innerId,
                        topicData: JSON.stringify(topicData),
                    }
                    custom_fetch.post(importUrl, importData, json => {
                        // alert(json.msg)

                    }, false)

                })
            }
        })

    }

    componentDidMount() {
    }

    render() {
        return (
            <Row>
                <Spin spinning={false}>
                    <h2 className="import-title">导入管理</h2>
                    <h3 className="import-subtitle">导入操作，请务必慎重，仅需系统初始化阶段操作即可！！</h3>

                    <div className="importManage">
                        <Button type='primary'
                                onClick={this.importTopicData}
                        >导入试题数据库</Button>

                        <Button type='primary'
                                onClick={this.importChapterData}
                        >导入章节数据库</Button>
                    </div>

                </Spin>
            </Row>
        )
    }
}


export default ImportManage;