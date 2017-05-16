/**
 * Created by 仲夏 on 2017/5/16.
 */


import React ,{Component}from  'react'
import { Tag, Spin, Button } from 'antd'

/**
 * 依据题目难度系数返回难度等级
 * @param diffculty
 */
function topicDifficultyLevel(diffculty) {
    const data = ~~diffculty;

    switch (~~data) {
        case 1:
            return <Tag color="#2db7f5">容易</Tag>;
        case 2:
            return <Tag color="#3dbff5">较易</Tag>;
        case 3:
            return <Tag color="#4dbdf5">适中</Tag>;
        case 4:
            return <Tag color="orange">较难</Tag>;
        case 5:
            return <Tag color="pink">很难</Tag>;
        default:
            return <Tag color="red">极难</Tag>;
    }
}

export { topicDifficultyLevel }