/**
 * Created by dantegg on 16-9-30.
 * 主站首页头图组件
 */

import React,{Component} from 'react'
import {Carousel,Spin} from 'antd'
import 'antd/dist/antd.min.css'
import { fetchAjax, FETCH_FILE_URL } from '../Tool/wrap.fetch'

class IndexTopic extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    go2HighLight(courseId){
        window.location.href='/#/course/'+courseId
    }


    render(){
        // if(this.props.courseList !== undefined && this.props.courseList>0){
        if(true){
            return(
                <Carousel effect="fade" autoplay={false} autoplaySpeed="5000">
                    <div>
                        <img
                            src='http://www.c20steam.com/courseware/82c20579-0b4d-4469-9baa-f1c04aad4fb8/1c31aa09-2289-4410-8d50-ba1574b82559.jpg'
                            style={{height:'380px',width:'100%'}}
                        />
                    </div>
                </Carousel>
            )
        }else{
            return(
                <Spin tip="加载中..." size="large">
                    <div style={{height:'380px',width:"100%"}}>

                    </div>
                </Spin>
            )
        }

    }
}

export default IndexTopic