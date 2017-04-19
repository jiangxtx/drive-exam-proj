/**
 * Created by dantegg on 16-12-23.
 */
import {INIT_VERTICAL_MANAGE,INIT_ALLCOURSE_ADMIN} from '../../src/actions/manager/manager_vertical'


export function verticalInfo(state=[],action) {
    switch (action.type){
        case INIT_VERTICAL_MANAGE:
            //console.log('zzz',action)
            return action.verticalInfo
        default:
            return state
    }
}

export function verticalCourses(state=[],action) {
    switch (action.type){
        case INIT_ALLCOURSE_ADMIN:
            //console.log('ddd',action)
            let tempstate = state
            tempstate = action.courseList
            return tempstate
        default:
            return state
    }
}