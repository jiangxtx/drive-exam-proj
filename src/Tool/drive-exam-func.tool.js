/**
 * Created by Jiangxtx on 2017/4/24.
 */

import { custom_fetch } from '../Tool/wrap.fetch'

/**
 * 依据试题 IDs 获取对应题目详情
 * @param topicIds 题目ID数组
 * @param callback 回答函数
 */
function queryTopicDetailsByIds(topicIds, callback) {
    const topicIdStr = (topicIds instanceof Array && topicIds.length) ? topicIds.join(',') : topicIds;

    const url = `http://api2.jiakaobaodian.com/api/open/question/question-list.htm?` +
        `_r=13702421453740291070&page=1&limit=25&questionIds=` + topicIdStr;
    custom_fetch.get(url, data => {
        const detailInfos = data.data || [];
        callback(detailInfos)
    })
    return false;

    // TODO...准备替代上面的请求 --2017-5-4;
   /* const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo') || '{}');
    const { id, _uid } = userInfo;

    const url = `http://127.0.0.1:3000/drive-queryTopicsByIds?`
    const data = {
        uid: id,
        _uid,
        idsArr: topicIdStr
    };
    custom_fetch.post(url, data, json => {
        callback(json.data || [])
    })*/

}


export { queryTopicDetailsByIds }