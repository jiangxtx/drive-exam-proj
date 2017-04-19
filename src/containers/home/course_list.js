/**
 * Created by dantegg on 16-10-24.
 */
import {bindActionCreators} from  'redux'
import {connect} from 'react-redux'
import CourseList from '../../components/home/index_course_list'
import * as CourseListActions from '../../src/actions/course_list'

function mapStateToProps(state) {
    //console.log('container',state)
    return{
        //counter:state.counter,
        courseList:state.courseList,
        targetList:state.targetList,
        schoolList:state.schoolList,
        relateSubjectList:state.relateSubjectList,
        courseTypeList:state.courseTypeList,
        schoolFilterList:state.schoolFilterList
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(CourseListActions,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(CourseList)