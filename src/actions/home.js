/**
 * Created by dantegg on 16-12-23.
 */
import { fetchAjax, FETCH_URL, FETCH_GET } from '../Tool/wrap.fetch'

export const INIT_HOMEPAGE = 'INIT_HOMEPAGE'

export function initHomepage() {
    return (dispatch)=>{
        fetchAjax(FETCH_URL+'/findAllHomePageCourseList_HomePage.action',FETCH_GET).then(res=>{
            if(res.ok){
                res.json().then(result=>{
                    //console.log('ss',result)
                    if(result.json.success){
                        dispatch(getHomepage(result))
                    }
                })
            }
        })
    }
}

export function getHomepage(res) {
    return{
        type:INIT_HOMEPAGE,
        homepageInfo:res

    }
}