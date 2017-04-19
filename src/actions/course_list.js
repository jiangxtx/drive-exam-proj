import { fetchAjax, FETCH_POST, FETCH_URL } from '../Tool/wrap.fetch'
import $ from 'jquery'

export const INITCOURSELIST = 'INITCOURSELIST'
export const MORECOURSELIST = 'MORECOURSELIST'


export function initCourseList(target) {
    return (dispatch)=>{
        // let targetData = target.props.targetList
        // target.props.targetList.map(x=>{
        //     if(x===0){
        //         targetData = []
        //     }
        // })
        //console.log('current target',target.props.targetList)
        $.ajax({
            type:'post',
            dataType:'json',
            traditional:true,
            data:{
                'applicableTargets':target.props.targetList,
                'courseTypeIds':target.props.courseTypeList,
                'schoolIds':target.props.schoolFilterList,
                'relatedSubjects':target.props.relateSubjectList,
                'start':0,
                'length':8
            },
            url:FETCH_URL+'/findMoreCourseList_HomePage.action',
            success:function(res){
                dispatch(getlist(res.courseBeanPageModel.datas))
            }
        })
        // let data = $.param({
        //     'applicableTargets':target.props.targetList,
        //     'courseTypeIds':courseTypeString,
        //             'start':0,
        //             'length':8
        // })
        // let fetchdata = Object.assign(FETCH_POST,
        //     {
        //         body:data
        //     })
        // fetchAjax( '/findMoreCourseList_HomePage.action',fetchdata).then(function (res) {
        //     if(res.ok){
        //         res.json().then(function(result){
        //             //console.log('success list',result)
        //             dispatch(getlist(result.courseBeanPageModel.datas))
        //         })
        //     }
        // },function (ex) {
        //     console.log(ex)
        // })
    }
}


export function moreCourseList(target){
    let courseTypeString = ''
    target.props.courseTypeList.map(x=>{
        courseTypeString += x
    })
    return (dispatch=>{
        // let data = $.param({
        //     'applicableTargets':target.props.targetList,
        //     'courseTypeIds':courseTypeString,
        //     'start': 0,
        //     'length':parseInt(target.props.courseList.length)+4
        // })
        // let fetchdata = Object.assign(FETCH_POST,
        //     {
        //         body:data
        //     })
        // fetchAjax( '/findMoreCourseList_HomePage.action',fetchdata).then(function (res) {
        //     if(res.ok){
        //         res.json().then(function(result){
        //             console.log('success list',result)
        //             dispatch(getMoreCourse(result.courseBeanPageModel.datas))
        //         })
        //     }
        // },function (ex) {
        //     console.log(ex)
        // })
        $.ajax({
            type:'post',
            dataType:'json',
            traditional:true,
            data:{
                'applicableTargets':target.props.targetList,
                'courseTypeIds':target.props.courseTypeList,
                'schoolIds':target.props.schoolFilterList,
                'relatedSubjects':target.props.relateSubjectList,
                'start':0,
                'length':parseInt(target.props.courseList.length)+4
            },
            url:FETCH_URL+'/findMoreCourseList_HomePage.action',
            success:function(res){
                dispatch(getlist(res.courseBeanPageModel.datas))
            }
        })
    })
}



function getMoreCourse(list){
    //console.log(list)
    return{
        type:MORECOURSELIST,
        courseList:list
    }
}


function getlist(list) {
    //console.log(list)
    return {
        type:INITCOURSELIST,
        courseList:list
    }
}

