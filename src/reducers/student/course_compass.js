/**
 * Created by dantegg on 16-11-9.
 */
import {INIT_COURSE_COMPASS} from '../../src/actions/student/course_compass'


export function courseCompass(state={},action) {
    //console.log(action)
    switch (action.type){
        case INIT_COURSE_COMPASS:
            // return Object.assign({}, action.courseCompass)
            // return Object.assign({}, state, { courseCompass: action.courseCompass } );
            return Object.assign({}, state, action.courseCompass );
        default:
            return state
    }
}