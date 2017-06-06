/**
 * Created by dantegg on 16-9-30.
 * 主站首页热门课程横向轮播中子组件
 */


import React,{Component} from 'react'
import '../css/home/index_body.css'

const hotCourseStyle={
    // height:'240px',
    padding:'10px'
}

const oneLineStyle = {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
}

class Main extends Component{
    constructor(props){
        super(props)
        this.state= {

        }
    }
    go2hotCourse(courseId){
        //console.log(courseId)
        window.location.href='/#/course/'+courseId
    }
    render(){
        //let imgSrc = this.state.itemHover?this.props.item[1]:this.props.item[0]
        return(
            <div onClick={this.go2hotCourse.bind(this,this.props.courseInfo.courseId)} style={hotCourseStyle}>
                <div className="hotCourseItemStyle">
                    <img src={this.props.imgSrc} style={{height:"270px",width:'100%'}}/>
                    <p style={oneLineStyle} title={this.props.courseInfo.courseName}>{this.props.courseInfo.courseName}</p>
                    <p style={oneLineStyle} title={this.props.courseInfo.teacherName}>策划:{this.props.courseInfo.teacherName}</p>
                </div>
            </div>
        )
    }
}


export default Main