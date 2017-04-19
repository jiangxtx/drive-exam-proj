/**
 * Created by dantegg on 16-12-22.
 */
import {INIT_HIGHLIGHT,INIT_ALLCOURSE_ADMIN} from '../../src/actions/manager/manager_highlight'


export function highLightInfo(state=[],action) {
    switch (action.type){
        case INIT_HIGHLIGHT:
            //console.log('zzz',action)
            return action.highLight
        default:
            return state
    }
}

export function highlightCourses(state=[],action) {
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