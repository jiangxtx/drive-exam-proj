/**
 * Created by dantegg on 16-11-4.
 */
import {combineReducers} from 'redux'
import {authCourseList} from './auth_course'
//import {courseList,targetList,courseTypeList,relateSubjectList,schoolList,schoolFilterList} from './course_list'
import {existCourseList} from './exist_course'
import {teacherList,teacherTotal,teacherInfo} from './manager_teacher'
import {studentList,studentTotal} from './manager_student'
import {highLightInfo,highlightCourses} from './manager_highlight'
import {verticalInfo,verticalCourses} from './manager_vertical'
import {hotInfo,hotCourses} from './manager_hotcourse'
// courseStudy & details relatedly
import { courseCompass } from '../student/course_compass'
import { courseLearn } from '../student/course_learn'
import {courseDiscussAll } from '../discuss/course_discuss_all'

const rootReducer = combineReducers({
    existCourseList,teacherList,teacherTotal,studentList,studentTotal,teacherInfo,authCourseList,
    courseCompass, courseLearn, courseDiscussAll,
    highLightInfo,highlightCourses,verticalInfo,verticalCourses,hotInfo,hotCourses
})


export default rootReducer