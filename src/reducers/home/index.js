/**
 * Created by dantegg on 16-10-24.
 */
import {combineReducers} from 'redux'
import {
    courseList,targetList,courseTypeList,relateSubjectList,schoolList,schoolFilterList
} from './course_list'
import { userInfo } from './userInfo'
import {homepageInfo} from './home'

const rootReducer = combineReducers({
    schoolList,
    courseList,
    courseTypeList,
    targetList,
    relateSubjectList,
    schoolFilterList,
    userInfo,
    homepageInfo
})


export default rootReducer