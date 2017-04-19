/**
 * Created by dantegg on 16-11-9.
 */
import {
    COURSE_LEARN_REQUEST, COURSE_LEARN_RECEIVE,
    COURSE_EXERCISE_REQUEST, COURSE_EXERCISE_RECEIVE,
} from '../../src/actions/student/course_learn'


export function courseLearn(state={}, action) {
    switch (action.type) {
        case COURSE_LEARN_REQUEST:
            return Object.assign({}, state, {isLoading: true});
        case COURSE_LEARN_RECEIVE:
            // return Object.assign([],action.courseLearn)
            return Object.assign({}, state, {isLoading: false, courseLearn: action.courseLearn})
        default:
            return state
    }
}

export function courseExercise(state={}, action) {
    switch (action.type) {
        case COURSE_EXERCISE_REQUEST:
            return Object.assign({}, state, { isLoading: true} );
        case COURSE_EXERCISE_RECEIVE:
            return Object.assign({}, state, { isLoading: false, excsInfo: action.excsInfo });
        default:
            return state;
    }
}