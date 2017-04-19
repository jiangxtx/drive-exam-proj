/**
 * Created by dantegg on 16-9-30.
 * 主站首页热门课程轮播
 */


import React,{Component} from 'react'
import Slider from 'react-slick'
import {Spin} from 'antd'
import HorizonItem from './carousel_horizon_item'
import { fetchAjax, FETCH_FILE_URL } from '../Tool/wrap.fetch'

class IndexHorizonCarousel extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){
        var settings = {
            dots: false,
            infinite: true,
            autoplaySpeed:5000,
            speed: 1000,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay:true,
            arrows:true,
            // nextArrow:<Button type="primary" shape="circle-outline" icon="left"/>,
            // prevArrow:<Button type="primary" shape="circle-outline" icon="right"/>
        }
        if(this.props.courseList === undefined){
            return (
                <div style={{height:'300px',textAlign:'center'}}>
                    <Spin tip="加载中..." size="large">
                    </Spin>
                </div>
            )
        }else{
            //console.log('sss',this.props.courseList)
            let courseDefaultInfo = {
                courseId:'',
                courseName:'',
                coursePicPath:'../../img/test0.jpg',
                teacherName:''
            }
            let courseInfo0 = courseDefaultInfo,courseInfo1 = courseDefaultInfo,courseInfo2 = courseDefaultInfo,courseInfo3 = courseDefaultInfo,courseInfo4=courseDefaultInfo,courseInfo5 = courseDefaultInfo
            if(this.props.courseList[0] !== undefined){
                courseInfo0 = this.props.courseList[0]
            }
            if(this.props.courseList[1] !== undefined){
                courseInfo1 = this.props.courseList[1]
            }
            if(this.props.courseList[2] !== undefined){
                courseInfo2 = this.props.courseList[2]
            }
            if(this.props.courseList[3] !== undefined){
                courseInfo3 = this.props.courseList[3]
            }
            if(this.props.courseList[4] !== undefined){
                courseInfo4 = this.props.courseList[4]
            }
            if(this.props.courseList[5] !== undefined){
                courseInfo5 = this.props.courseList[5]
            }

            return(
                <Slider {...settings}>
                    <div>
                        <HorizonItem
                            courseInfo={courseInfo3}
                            imgSrc={FETCH_FILE_URL+courseInfo3.coursePicPath}
                        />
                    </div>
                    <div>
                        <HorizonItem
                            courseInfo={courseInfo4}
                            imgSrc={FETCH_FILE_URL+courseInfo4.coursePicPath}
                        />
                    </div>
                    <div>
                        <HorizonItem
                            courseInfo={courseInfo5}
                            imgSrc={FETCH_FILE_URL+courseInfo5.coursePicPath}
                        />
                    </div>
                    <div>
                        <HorizonItem
                            courseInfo={courseInfo0}
                            imgSrc={FETCH_FILE_URL+courseInfo0.coursePicPath}
                        />
                    </div>
                    <div>
                        <HorizonItem
                            courseInfo={courseInfo1}
                            imgSrc={FETCH_FILE_URL+courseInfo1.coursePicPath}
                        />
                    </div>
                    <div>
                        <HorizonItem
                            courseInfo={courseInfo2}
                            imgSrc={FETCH_FILE_URL+courseInfo2.coursePicPath}
                        />
                    </div>
                </Slider>
            )
        }

    }
}



export default IndexHorizonCarousel
