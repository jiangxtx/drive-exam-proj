import React,{Component} from 'react'
import CarouselItem from './carousel_vertical_item'
import '../css/home/index_body.css'
import { Spin } from 'antd'
import { FETCH_FILE_URL } from '../Tool/wrap.fetch'

class IndexVerticalCarousel extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){
        // let item0=['../../img/test0.jpg','../../img/test1.jpg']
        // let item1=['../../img/test2.jpg','../../img/test3.jpg']
        //console.log('v',this.props)
        let defaultCourse = {
            pic:FETCH_FILE_URL+'',
            id:''
        }
        let verticalOne = defaultCourse,verticalTwo = defaultCourse
        if(this.props.courseList !== undefined){
            if(this.props.courseList[0]!== undefined){
                verticalOne.pic = FETCH_FILE_URL+this.props.courseList[0].coursePicPath
                verticalOne.id  = this.props.courseList[0].courseId
            }
            if(this.props.courseList[1]!==undefined){
                verticalTwo.pic = FETCH_FILE_URL+this.props.courseList[0].coursePicPath
                verticalTwo.id = this.props.courseList[1].courseId
            }

        }
        if(this.props.courseList === undefined){
            return(
                <div>
                    <div className="verticalCarouselItem">
                        <Spin tip="加载中..." size="large">
                        </Spin>
                    </div>
                    <div className="verticalCarouselItem">
                        <Spin tip="加载中..." size="large">
                        </Spin>
                    </div>
                </div>
            )
        }else{
            return(
                <div>
                    <div className="verticalCarouselItem">
                        <CarouselItem
                            item={verticalOne.pic}
                            courseId={verticalOne.id}
                        />
                    </div>
                    <div className="verticalCarouselItem">
                        <CarouselItem
                            item={verticalTwo.pic}
                            courseId={verticalTwo.id}
                        />
                    </div>
                </div>
            )
        }

    }
}


export default IndexVerticalCarousel