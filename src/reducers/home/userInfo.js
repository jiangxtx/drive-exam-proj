/**
 * Created by dantegg on 16-11-21.
 */


import {INITLOGIN,LOGOUT} from '../../actions/index_head_actions'


export function userInfo(state={},action){
    switch (action.type){
        case INITLOGIN:
            //console.log('indexhead',action)
            return Object.assign({},action.userInfo)
        case LOGOUT:
            return Object.assign({},action.userInfo)
        default:
            return state
    }
}