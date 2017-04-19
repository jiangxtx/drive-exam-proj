import { REQUEST_QUERY_LIST,
    RECEIVE_QUERY_LIST } from '../../src/actions/student/course_discuss_all'


export function courseDiscussAll(state={},action) {
    switch (action.type){
        case REQUEST_QUERY_LIST:
            return Object.assign({}, state, {
                isLoading: true,
                topicList: [],
                totalSize: -1,
            });

        case RECEIVE_QUERY_LIST:
            return Object.assign({}, state, {
                isLoading: false,
                topicList: action.topicList,
                totalSize: action.totalSize,
            });

        // case COURSE_DISCUSS_ALL:
        default:
            return state
    }
}