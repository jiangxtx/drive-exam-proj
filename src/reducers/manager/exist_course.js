/**
 * Created by dantegg on 16-11-4.
 */
import {INIT_EXIST_COURSE} from '../../src/actions/manager/exist_course'


export function existCourseList(state=[],action){
    //console.log(action)
    switch (action.type){

        case INIT_EXIST_COURSE:
            return Object.assign([],action.existCourseList)
        default:
            return state
    }
}