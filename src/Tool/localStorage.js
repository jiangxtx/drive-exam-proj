/**
 * Created by Jiangxtx on 2017/3/17.
 */

import { notification } from 'antd'


/**
 * 从本地存储中获取当前登录用户信息
 * @return {*} userInfo Object
 */
export function getUserInfoFromLocalstorage() {
    let userInfo = {};
    try {
        userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
        // return Object.assign({}, JSON.parse(window.sessionStorage.getItem('userInfo')));
        if (!userInfo.id) {
            handleException()
        }
    } catch (e) {
        handleException();
        return {};
    }

    return JSON.parse(window.sessionStorage.getItem('userInfo')) || {};
}

/**
 * 异常情况处理
 */
function handleException() {
    notification.error({
        message: '登录失效',
        description: '当前用户登录失效或过期，请重新登录！'
    });
    window.location.href = `./home.html`;
}