/**
 * Created by dantegg on 16-10-24.
 */
import {INITCOURSELIST,MORECOURSELIST} from '../../actions/course_list'
import {INIT,TARGETFILTER,SUBJECTFILTER,SCHOOLFILTER,COURSETYPEFILTER,INITFILTER
} from '../../actions/course_filter'

export function courseList(state=[],action){
    switch (action.type){
        case INITCOURSELIST:
            return Object.assign([],action.courseList)
        case MORECOURSELIST:
            return Object.assign([],action.courseList)
        default:
            return state
    }
}

//适用对象过滤条件
export function targetList(state=[],action){
    switch (action.type){
        case TARGETFILTER:
            let config = false
            console.log('current state',state)
            if(action.targetId === 0){

                state.splice(0,state.length)
                return Object.assign([],state)
            }else{
                for(let i in state){
                    if(state[i] === action.targetId){
                        state.splice(parseInt(i),1)
                        config = true
                    }
                }
                if(!config){
                    state.push(action.targetId)
                }
                return Object.assign([],state)
            }
            break
        default:
            return state
    }
}

//课程类型过滤条件
export function courseTypeList(state=[],action){
    switch (action.type){
        case COURSETYPEFILTER:
            let config = false
            if(action.courseTypeId === 0){
                state.splice(0,state.length)
                return Object.assign([],state)
            }else{
                for(let i in state){
                    if(state[i] === action.courseTypeId){
                        state.splice(parseInt(i),1)
                        config = true
                    }
                }
                if(!config){
                    state.push(action.courseTypeId)
                }
                return Object.assign([],state)
            }
            // state.push(action.courseTypeId)
            // //console.log('coursetype111',action)
            // return Object.assign([],state)
        default:
            return state
    }
}


//获取所有学校
export function schoolList(state=[],action){
    switch (action.type){
        case INIT:
            //console.log('action is',action)
            return Object.assign([],action.schoolList)
        default:
            return state
    }
}

//学校来源过滤条件
export function schoolFilterList(state=[],action){
    switch (action.type){
        case SCHOOLFILTER:
            let config = false
            if(action.schoolId === 0){
                state.splice(0,state.length)
                return Object.assign([],state)
            }else{
                for(let i in state){
                    if(state[i] === action.schoolId){
                        state.splice(parseInt(i),1)
                        config = true
                    }
                }
                if(!config){
                    state.push(action.schoolId)
                }
                return Object.assign([],state)
            }
            // console.log('action is',action)
            // state.push(action.schoolId)
            // return Object.assign([],state)
            // break
        default:
            return state
    }
}

//涉及学科过滤条件
export function relateSubjectList(state=[],action){
    switch (action.type){
        case SUBJECTFILTER:
            //console.log('subject',action)
            let config = false
            if(action.subjectId === 0){
                state.splice(0,state.length)
                return Object.assign([],state)
            }else{
                for(let i in state){
                    if(state[i] === action.subjectId){
                        state.splice(parseInt(i),1)
                        config = true
                    }
                }
                if(!config){
                    state.push(action.subjectId)
                }
                return Object.assign([],state)
            }
            // console.log('action is',action)
            // state.push(action.subjectId)
            // return Object.assign([],state)
        default:
            return state
    }
}