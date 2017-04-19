/**
 * Created by Jiangxtx on 2016/10/9.
 * 功能：
 *      检测当前浏览器是否支持 webp 格式的图片
 * 用法：
 *      _g_isWebpSupported 作为一个全局变量global var，供其它脚本引用;
 *      possible value: true or false.
 */
var webpSupportFlag = false;

var isWebpSupported = function(callback) {
    var image = new Image();
    image.onerror = function(){
        callback && callback(false);
        //console.info('_g_isWebpSupported--onerror');
    }
    image.onload = function(){
        callback && callback(image.width == 1);
        //console.info('_g_isWebpSupported--onload');
    }
    image.src = "data:image/webp;base64,UklGRiwAAABXRUJQVlA4ICAAAAAUAgCdASoBAAEAL/3+/3+CAB/AAAFzrNsAAP5QAAAAAA==";
};

isWebpSupported(function(flag) {
    if(flag){
        //console.info('恭喜，浏览器支持webp');
        webpSupportFlag = true;
    }else{
        //console.info('抱歉，浏览器不支持webp');
        webpSupportFlag = false;
    }
    return webpSupportFlag;
});

console.info(`local webp supported : ${webpSupportFlag}`)
export default webpSupportFlag