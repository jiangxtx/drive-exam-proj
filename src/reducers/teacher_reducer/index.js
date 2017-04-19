/**
 * Created by dantegg on 16-11-3.
 */
import {combineReducers} from 'redux'

//import {courseList,targetList,courseTypeList,relateSubjectList,schoolList,schoolFilterList} from './course_list'
import {teacherInfoList} from './teacher_info'
import {newCourseInfo,newCourseEdit,newCourseTree,choosedSection} from './create_new_course'
import { courseCompass } from '../student/course_compass'
import { courseLearn } from '../student/course_learn'
import { courseDiscussAll } from '../discuss/course_discuss_all'

const rootReducer = combineReducers({
    teacherInfoList,newCourseInfo,newCourseEdit,newCourseTree,choosedSection,
    courseCompass, courseLearn, courseDiscussAll
})

export default rootReducer;