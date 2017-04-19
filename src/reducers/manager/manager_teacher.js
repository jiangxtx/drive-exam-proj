/**
 * Created by dantegg on 16-11-7.
 */
import {INIT_TEACHER,PAGE_CHANGE_TEACHER,FIND_TEACHER_DETAIL} from '../../src/actions/manager/manager_teacher'


export function teacherList(state=[],action){
    switch (action.type){
        case INIT_TEACHER:
            return Object.assign([],action.teacherList)
        case PAGE_CHANGE_TEACHER:
            return Object.assign([],action.teacherList)
        default:
            return state
    }
}

export function teacherTotal(state=0,action){
    switch (action.type){
        case INIT_TEACHER:
            //console.log('reducer',action)
            state = action.teacherTotal
            return state
        case PAGE_CHANGE_TEACHER:
            state = action.teacherTotal
            return state
        default:
            return state
    }
}

export function teacherInfo(state={},action){
    if(action.type === FIND_TEACHER_DETAIL){
        console.log('???',action)
        //state = action.teacherInfo
        return action.teacherInfo
    }else{
        return state
    }
}