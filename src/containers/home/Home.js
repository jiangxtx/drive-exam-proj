import {bindActionCreators} from  'redux'
import {connect} from 'react-redux'
import * as HomepageActions from '../../actions/home'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'antd/dist/antd.css'
import '../../css/home/slickarrow.css'

import '../../css/home/home.css'


import React ,{Component}from 'react'
// import { Row, Col } from 'antd'
import { Container, ContainerFluid, Row, Col } from '../../layout'

import IndexTopic from '../../components/index_topic'
import StudyList from '../../components/StudyList'
import HomeListBlue from '../../components/HomeList_blue'
import CertificateRefer from '../../components/CertificateRefer'

import HorizonCarousel from '../../components/index_horizon_carousel'  //横向轮播

class Main extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount(){
        console.log('home didMount props', this.props)
        this.props.initHomepage()
    }

    render() {
        const studyListData = [
            { name: '基础教育慕课1.0走向2.0', time: '1月2日 — 3月23日' },
            { name: '基础教育慕课1.0走向2.0', time: '1月2日 — 3月23日' },
            { name: '基础教育慕课1.0走向2.0', time: '1月2日 — 3月23日' },
            { name: '基础教育慕课1.0走向2.0', time: '1月2日 — 3月23日' },
            { name: '基础教育慕课1.0走向2.0', time: '1月2日 — 3月23日' },
            { name: '基础教育慕课1.0走向2.0', time: '1月2日 — 3月23日' },
        ];
        const newsListData = [
            { name: '基础教育慕课1.0 何去何从？', time: '2017.01.05 12:56' },
            { name: '基础教育慕课1.0 何去何从？', time: '2017.01.05 12:56' },
            { name: '基础教育慕课1.0 何去何从？', time: '2017.01.05 12:56' },
            { name: '基础教育慕课1.0 何去何从？', time: '2017.01.05 12:56' },
            { name: '基础教育慕课1.0 何去何从？', time: '2017.01.05 12:56' },
        ];
        const showListData = [
            { name: '基础教育，设计一个慕课教程，如何处理？', teacher:'梁老师', time: '2017.01.05 12:56', orga:'上海市教育委员会教研室' },
            { name: '基础教育，设计一个慕课教程，如何处理？', teacher:'梁老师', time: '2017.01.05 12:56', orga:'上海市教育委员会教研室' },
            { name: '基础教育，设计一个慕课教程，如何处理？', teacher:'梁老师', time: '2017.01.05 12:56', orga:'上海市教育委员会教研室' },
            { name: '基础教育，设计一个慕课教程，如何处理？', teacher:'梁老师', time: '2017.01.05 12:56', orga:'上海市教育委员会教研室' },
            { name: '基础教育，设计一个慕课教程，如何处理？', teacher:'梁老师', time: '2017.01.05 12:56', orga:'上海市教育委员会教研室' },
        ];

        return (
            <Container>
                <Row className="divide">
                    <Col lg={12}>
                        <Row style={{paddingTop:'10px',paddingBottom:'10px'}}>
                            <Col lg={8}>
                                <IndexTopic courseList={this.props.homepageInfo.bigPicList}/>
                            </Col>
                            <Col lg={4}>
                                <StudyList dataList={studyListData} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="divide">
                    <Col sm={12} lg={5}>
                        <HomeListBlue titleBar="新闻动态" type="news"
                                      dataList={newsListData} moreLink="news" />
                    </Col>
                    <Col sm={12} lg={7}>
                        <HomeListBlue titleBar="优秀作业展示" type="show"
                                      dataList={showListData} moreLink="excs" />
                    </Col>
                </Row>
                <Row className="divide" id="hotcourseCarousel">
                    <div style={{fontSize:'24px',textAlign:'center', margin:'6px 0'}}>热门课程</div>
                    <Col lg={12}>
                        <HorizonCarousel courseList={this.props.homepageInfo.hotCourseList}/>
                    </Col>
                </Row>
                <Row className="divide">
                    <div className="cert-item">
                        <CertificateRefer />
                    </div>
                </Row>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    //console.log('container',state)
    return{
        //counter:state.counter,
        homepageInfo:state.homepageInfo
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(HomepageActions,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Main)