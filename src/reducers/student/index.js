/**
 * Created by Jiangxtx on 2016/11/8.
 */

import { combineReducers } from 'redux'
import { studentInfoList } from './student_info'
import { courseCompass } from './course_compass'
import { courseLearn, courseExercise } from './course_learn'
// import { courseExercise } from './course_exercse'
import { courseDiscussAll } from '../discuss/course_discuss_all'


const rootReducer = combineReducers({
    studentInfoList,
    courseCompass, courseLearn, courseExercise, courseDiscussAll
});

export default rootReducer