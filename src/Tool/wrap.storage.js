/**
 * Created by Jiangxtx on 2016/12/29.
 */

/**
 * 本地数据存储或读取
 * @param key
 * @param val
 */
function localItem(key, val) {
    const paramLen = arguments.length || 0;
    if (paramLen > 2) {
        throw Error('localItem() param length should no more than 2!');
    } else if (paramLen === 1) {
        return sessionStorage.getItem(key);
    } else if (paramLen === 2) {
        return sessionStorage.setItem(key, val);
    }
}

/**
 * 删除本地数据
 * @param key
 */
function removeLocalItem(key) {
    !!key ? sessionStorage.removeItem(key) : sessionStorage.removeItem();
}

export { localItem, removeLocalItem }