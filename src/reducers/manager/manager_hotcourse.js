/**
 * Created by dantegg on 16-12-23.
 */
import {INIT_HOTCOURSE_MANAGE,INIT_ALLCOURSE_ADMIN} from '../../src/actions/manager/manager_hotcourse'


export function hotInfo(state=[],action) {
    switch (action.type){
        case INIT_HOTCOURSE_MANAGE:
            //console.log('zzz',action)
            return action.hotInfo
        default:
            return state
    }
}

export function hotCourses(state=[],action) {
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