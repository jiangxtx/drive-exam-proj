/**
 * Created by dantegg on 16-12-20.
 */
import {INIT_AUTH_COURSE} from '../../src/actions/manager/auth_course'


export function authCourseList(state=[],action){
    //console.log(action)
    switch (action.type){
        case INIT_AUTH_COURSE:
            //console.log('zzzz',action)
            return Object.assign([],action.authCourseList)
        default:
            return state
    }
}