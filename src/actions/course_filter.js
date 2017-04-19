import { fetchAjax, FETCH_POST, FETCH_URL } from '../Tool/wrap.fetch'

export const INIT = 'INIT'
export const TARGETFILTER = 'TARGETFILTER'
export const SCHOOLFILTER = 'SCHOOLFILTER'
export const COURSETYPEFILTER = 'COURSETYPEFILTER'
export const SUBJECTFILTER = 'SUBJECTFILTER'
export const INITFILTER = 'INITFILTER'

export function initList() {
    return (dispatch)=>{
        fetchAjax(FETCH_URL+'/findSchoolList_HomePage.action',FETCH_GET).then(function (res) {
            if(res.ok){
                res.json().then(function(result){
                    //console.log('success',result)
                    dispatch(getlist(result.schoolBeanList))
                })
            }
        },function (ex) {
            console.log(ex)
        })
    }
}

function getlist(list) {
    return {
        type:INIT,
        schoolList:list
    }
}

export function filterCourse(target){
    //console.log('coursetype',target)
    return{
        type:COURSETYPEFILTER,
        courseTypeId:target
    }
}

export function filterTarget(target){
    return{
        type:TARGETFILTER,
        targetId:target
    }
    //initCourseList()
}

export function filterSubject(target){
    //console.log('subject123',target)
    return{
        type:SUBJECTFILTER,
        subjectId:target
    }
}

export function filterSchool(target){
    //console.log('school',target)
    return{
        type:SCHOOLFILTER,
        schoolId:target
    }
}