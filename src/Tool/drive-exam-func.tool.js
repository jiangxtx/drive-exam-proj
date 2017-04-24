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
}

export { queryTopicDetailsByIds }