/**
 * Created by Jiangxtx on 2017/1/4.
 * This module aims to wrap fetch request and some common methods about fetch-request.
 * As you need ajax request, USE fetch here, thus can improve stability in the long run.
 *      --jiangxtx 2017-1-4
 */

import Promise from 'promise-polyfill'
import 'whatwg-fetch'
import queryString from 'query-string'

if (!window.Promise) {
    window.Promise = Promise;
}
const fetchAjax = fetch;

const FETCH_URL = '';
const FETCH_FILE_URL = 'http://192.168.11.139/'

const headers = {
    'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
    'Accept': 'application/json, text/javascript,*/*'
};
// 'include' is to send cookies in a cross-origin resource sharing request,'same-origin' is the opposite
const credentials = 'include';

/**
 * 依据 fetchAjax 的类型返回请求对象。
 * 已经通过内部测试。
 *          --jiangxtx--2017-1-6
 * @param type 'get' or 'post'
 */
function _fetchType(type) {
    const destObj = {
        method: type,
        credentials,
        headers,
    };
    if (arguments.length > 1) {
        return function (arrData) {
            destObj.body = arrToFetchData(arrData);
            return destObj;
        }
    }
    return destObj;
}

const FETCH_GET = _fetchType('get');
const FETCH_POST = _fetchType('post');
const FETCH_POST_WithData = _fetchType('post', true); // 'true' as a placeholder to return a function


/**
 * 检测 fetchAjax 请求是否正确响应
 *      fetchAjax(url)
 .then(fetchStatusCheck).then(res => res.json() ).then.....
 * @param response
 * @returns {*}
 */
const fetchStatusCheck = (response) => {
    if ( (response.status >= 200 && response.status < 300) || response.ok) {
        return response;
    } else {
        throw new Error(`fetchStatusCheck() status Error code: ${response.statusText}`);
    }
}

/**
 * 获取请求数据的 json 数据，返回 Promise 对象
 * @param response
 */
const parseJSON = (response) => response.json()

/**
 * post 发送数组类型参数，主要用于适配 fetchAjax 模式下的前后数据传输格式
 * @param senddataArr 数组类型参数名称 待传输参数，数组类型
 *      形如：     senddataArr: [
 *                          { name: 'score', data: [85, 68, 91] },
 *                          { name: 'subject', data: ['chinese', 'maths', 'English'] },
 *                        ],
 *      输出结果：  score[]=85&score[]=68&score[]=91&subject[]=chinese&subject[]=maths&subject[]=English
 *      用途：     用于 POST 传参
 * @return 序列化后的string
 */
function arrToFetchData(senddataArr) {
    const _arrToFetchPostJson = (sendArrData, arrName) => {
        let strArr = []
        sendArrData.map( item => strArr.push(`${arrName}[]=${item}`) );
        return strArr.join('&');
    }
    const fetchDataArr = senddataArr.map(item => _arrToFetchPostJson(item.data, item.name));
    return fetchDataArr.join('&');
}


export const custom_fetch = {
    post:function(url,data,callback, cors){
        fetch_function('post',url,callback,data, cors)
    },
    get:function (url,callback, cors) {
        fetch_function('get',url,callback, {}, cors)
    }
}
var FETCH_HEAD =  {
    //body:paydata,
    credentials,    // 'include' is to send cookies in a cross-origin resource sharing request,'same-origin' is the opposite
    // mode: 'no-cors',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
        'Accept': 'application/json, text/javascript,*/*'
    }
};
const fetch_function = function (type,url,callback,data={}, cors) {
    //console.log('query',query123)
    let tempdata = FETCH_HEAD;
    tempdata.method = type;
    tempdata.mode = (cors!==false) ? 'cors' : 'no-cors';

    if(type === 'post'){
        let tempQuery = queryString.stringify(data)
        tempdata.body = tempQuery

    }
    window.fetch(FETCH_URL+url,tempdata).then(res=>{
        if((res.status >= 200 && res.status < 300)|| res.ok){
            res.json().then(result=>{
                callback(result)
            },function (err) {
                console.log('fetch json error',err)
            })
        }else{
            var error = new Error(res.statusText)
            error.response = res
            callback({
                info:'fetch error',
                detail:error
            })
        }
    })
}

export {
    fetchAjax, FETCH_URL, FETCH_FILE_URL,
    FETCH_GET, FETCH_POST, FETCH_POST_WithData,
    fetchStatusCheck, parseJSON, arrToFetchData
}