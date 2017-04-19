/**
 * Created by dantegg on 16-11-7.
 */
/**
 * Created by dantegg on 16-11-7.
 */
import {INIT_STUDENT,PAGE_CHANGE_STUDENT} from '../../src/actions/manager/manager_student'


export function studentList(state=[],action){
    switch (action.type){
        case INIT_STUDENT:
            return Object.assign([],action.studentList)
        case PAGE_CHANGE_STUDENT:
            return Object.assign([],action.studentList)
        default:
            return state
    }
}

export function studentTotal(state=0,action){
    switch (action.type){
        case INIT_STUDENT:
            //console.log('reducer',action)
            state = action.studentTotal
            return state
        case PAGE_CHANGE_STUDENT:
            state = action.studentTotal
            return state
        default:
            return state
    }
}