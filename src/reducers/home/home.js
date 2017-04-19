import {INIT_HOMEPAGE} from '../../actions/home'

export function homepageInfo(state={},action) {
    switch (action.type){
        case INIT_HOMEPAGE:
            return Object.assign({},action.homepageInfo)
        default:
            return state
    }
}