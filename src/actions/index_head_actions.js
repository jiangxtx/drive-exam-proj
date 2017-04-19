import { fetchAjax, FETCH_GET, FETCH_URL } from '../Tool/wrap.fetch'

export const INITLOGIN = 'INITLOGIN'
export const LOGOUT = 'LOGOUT'

export function checkLogin() {
    return (dispatch)=>{
        fetchAjax(FETCH_URL+'/findUserSimbol_User.action',FETCH_GET).then(function (res) {
            if(res.ok){
                res.json().then(function(result){
                    //console.log('success log in ',result)
                    if(result.json.success){
                        dispatch(getUser(result))
                    }
                    //dispatch(getlist(result.schoolBeanList))
                })
            }
        },function (ex) {
            console.log(ex)
        })
    }
}

export function userLogOut(){
    return(dispatch)=>{
        fetchAjax(FETCH_URL+'/userLogout_User.action',FETCH_GET).then(function (res) {
            if(res.ok){
                res.json().then(function (result) {
                    //console.log('success log out ', result)
                    if(result.json.success){
                        dispatch(logOutUser())
                    }
                })
            }
        })
    }
}


function getUser(userInfo) {
    return {
        type:INITLOGIN,
        userInfo:userInfo
        //schoolList:list
    }
}


function logOutUser() {
    return {
        type:INITLOGIN,
        userInfo:{}
        //schoolList:list
    }
}