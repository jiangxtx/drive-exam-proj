/**
 * Created by Jiangxtx on 2016/11/8.
 */

import { INIT_STUDENT_INFO } from '../../src/actions/student/student_info';

export function studentInfoList(state={}, action) {
    switch (action.type) {
        case INIT_STUDENT_INFO : 
            return Object.assign( {}, action.studentInfoList );
        default :
            return state;
    }
}