/**
 * Created by dantegg on 16-11-24.
 */
import {
    CREATE_NEW_COURSE_START,
    CREATE_NEW_COURSE,
    UPDATE_COURSE_DESCRIP,
    GET_NEW_COURSE,
    UPDATE_COURSE_VALUE,
    UPDATE_COURSE_CONTENT,
    UPDATE_COURSE_SUGGESTION,
    UPDATE_COURSE_QUESTION,
    UPDATE_COURSE_TARGET,
    UPDATE_COURSR_CHAPTER,
    UPDATE_COURSR_SECTION,
    GET_COURSE_TREE,
    CHOOSE_SECTION,
    GET_OLD_COURSE
} from '../../src/actions/teacher_actions/create_new_course'


export function newCourseInfo(state={},action){
    //console.log(action)
    switch (action.type){
        case CREATE_NEW_COURSE:
            //console.log('aaa',action)
            window.location.href='/teacher.html#/newcourse/abstract/'+action.newCourseInfo.newCourseId
            return Object.assign({},action.newCourseInfo)
        case CREATE_NEW_COURSE_START:
            return Object.assign({},{})
        default:
            return state
    }
}


export function newCourseEdit(state={},action){
    switch (action.type){
        case GET_NEW_COURSE:
            return Object.assign({},action.courseEdit)
        case GET_OLD_COURSE:
            //console.log('reducer course',action)
            //console.log('window location',window.location)

            let re0 = /\/newcourse\/basic/
            let re1 = /\/newcourse\/abstract/
            let re2 = /\/newcourse\/edit/


            //console.log(this.props.location.pathname,re1.test(this.props.location.pathname))
            if(re0.test(window.location.hash)){
                window.location.href='/teacher.html#/newcourse/basic/'+action.courseEdit.courseId
            }else if(re1.test(window.location.hash)){
                //stepNumber=1
                window.location.href='/teacher.html#/newcourse/abstract/'+action.courseEdit.courseId
            }else if(re2.test(window.location.hash)){
                window.location.href='/teacher.html#/newcourse/edit/'+action.courseEdit.courseId
            }else{
                window.location.href='/teacher.html#/newcourse/basic/'+action.courseEdit.courseId
            }



            return Object.assign({},action.courseEdit)
        case UPDATE_COURSE_DESCRIP:
            //console.log('reducer',action.updateInfo)
            state.description =action.updateInfo
            return Object.assign({},state)
        case UPDATE_COURSE_VALUE:
            state.meaningValue=action.updateInfo
            return Object.assign({},state)
        case UPDATE_COURSE_CONTENT:
            state.referenceMaterial = action.updateInfo
            return Object.assign({},state)
        case UPDATE_COURSE_SUGGESTION:
            state.methodSuggestion = action.updateInfo
            return Object.assign({},state)
        case UPDATE_COURSE_QUESTION:
            state.other = action.updateInfo
            return Object.assign({},state)
        case UPDATE_COURSE_TARGET:
            state.targetTask = action.updateInfo
            return Object.assign({},state)
        case CREATE_NEW_COURSE_START:
            window.location.href='teacher.html#/newcourse/basic'
            return Object.assign({},{})
        default:
            return state
    }
}


export function newCourseTree(state=[],action){
    switch (action.type){
        case UPDATE_COURSR_CHAPTER:
            let tempChap = state
            tempChap.push(action.updateChap)
            return tempChap
        case UPDATE_COURSR_SECTION:
            let tempChapSection = state
            //console.log('re',tempChapSection)
            let secInfo = {
                "sectionName":action.updateSection.sectionName,
                "sectionId":action.updateSection.sectionId
            }
            state[parseInt(action.updateSection.position)].sections.push(secInfo)
            return tempChapSection
        case GET_COURSE_TREE:
            //console.log('tree',action.treeInfo)
            let allnode = []
            action.treeInfo.map(x=>{
                //console.log(x)
                let sections = []
                for(var i in x.childTreeList){
                    sections.push({
                        "sectionName":x.childTreeList[i].name,
                        "sectionId":x.childTreeList[i].id
                    })
                }
                allnode.push({
                    "chapterName":x.name,
                    "chapterId":x.id,
                    "sections":sections
                })
            })
            return allnode
        default:
            return state
    }
}

export function choosedSection(state={},action) {
    switch (action.type){
        case CHOOSE_SECTION:
            //console.log("section reducer",action)
            //let sid = action.sectionId
            let sectionInfo = {
                "sectionId":action.sectionId,
                "sectionName":action.sectionName,
                "chapterName":action.chapterName,
                "lessonPlan":action.lessonPlan
            }
            return Object.assign({},sectionInfo)
        case GET_COURSE_TREE:
            return Object.assign({},{})
        default:
            return state
    }
}