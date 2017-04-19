/**
 * Created by dantegg on 16-11-3.
 */
import {INIT_TEACHER_INFO} from '../../src/actions/teacher_actions/teacher_info'


export function teacherInfoList(state={},action){
    //console.log(action)
    switch (action.type){

        case INIT_TEACHER_INFO:
            return Object.assign({},action.teacherInfoList)
        default:
            return state
    }
}