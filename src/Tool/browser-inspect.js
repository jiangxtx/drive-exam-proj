/*******页面加载前判断当前浏览器的类型与版本，是否符合浏览的最低需求********/


var browserInfo = getBrowserVersion();
var browserArr = browserInfo.split('-');
var browserName = browserArr[0];
var browserVer = parseInt(browserArr[1].split('.')[0]);
browserVer = ~~browserVer;

// alert(browserName + ': ' + browserVer + ' -- ' + !!(browserName=='Internet Explorer' && browserVer<9))
// console.log('Browser Info: ' + browserName  + ' - ' + browserVer); // IE6IE7没有console对象

var errorDOM =  '<h1 style="color: red;text-align: center;margin: 50px auto; font-family:微软雅黑">您当前的浏览器版本过低，推荐使用最新 Chrome 或 Firefox 浏览器！</h1>' +
				'<h2 style="color: green;text-align: center;margin: 50px auto; font-family:微软雅黑">当前浏览器：' + browserInfo + '</h2>';

if(browserName=='Internet Explorer' && browserVer < 9) {
    // alert('IE test: ' + browserVer)
	errorDOM +=  '<h3 style="color: yellow;text-align: center;margin: 50px auto; font-family:微软雅黑"><a href="http://windows.microsoft.com/zh-cn/internet-explorer/download-ie" >最新版下载</a></h3>';
	_writeErrorInfo(errorDOM);
} else if(browserName=='Firefox' && browserVer < 12) {
	errorDOM +=  '<h3 style="color: yellow;text-align: center;margin: 50px auto; font-family:微软雅黑"><a href="http://download.firefox.com.cn/releases-sha2/stub/official/zh-CN/Firefox-latest.exe" >最新版下载</a></h3>';
	_writeErrorInfo(errorDOM);
} else if(browserName=='Chrome' && browserVer < 10) {
	errorDOM +=  '<h3 style="color: yellow;text-align: center;margin: 50px auto; font-family:微软雅黑"><a href="http://www.google.cn/intl/zh-CN/chrome/browser/desktop/index.html" >最新版下载</a></h3>';
	_writeErrorInfo(errorDOM);
} else if(browserName=='Opera' && browserVer < 10) {
	errorDOM +=  '<h3 style="color: yellow;text-align: center;margin: 50px auto; font-family:微软雅黑"><a href="http://www.baidu.com" >最新版下载</a></h3>';
	_writeErrorInfo(errorDOM);
} else if(browserName=='Safari' && browserVer < 4) {
	errorDOM +=  '<h3 style="color: yellow;text-align: center;margin: 50px auto; font-family:微软雅黑"><a href="http://www.baidu.com" >最新版下载</a></h3>';
	_writeErrorInfo(errorDOM);
}


function _writeErrorInfo(errorDOM) {
    // alert('Stop flag: ' + !!(window.stop || document.execCommand) )

	document.write(errorDOM);
	if (window.stop) {
		window.stop(); 
	} else {
		document.execCommand("Stop"); 
	}
}


function getBrowserVersion() {
	var browser = {};
	var userAgent = navigator.userAgent.toLowerCase();
	var s;
	(s = userAgent.match(/msie ([\d.]+)/)) ? browser.ie = s[1] : (s = userAgent.match(/firefox\/([\d.]+)/))
        ? browser.firefox = s[1] : (s = userAgent.match(/chrome\/([\d.]+)/))
            ? browser.chrome = s[1] : (s = userAgent.match(/opera.([\d.]+)/))
                    ? browser.opera = s[1] : (s = userAgent.match(/version\/([\d.]+).*safari/)) ? browser.safari = s[1] : 0;
   var version = "";
   if (browser.ie) {
        version = 'Internet Explorer-' + browser.ie;
   } else if (browser.firefox) {
        version = 'Firefox-' + browser.firefox;
   } else if (browser.chrome) {
        version = 'Chrome-' + browser.chrome;
    } else if (browser.opera) {
        version = 'Opera-' + browser.opera;
    } else if (browser.safari) {
        version = 'Safari-' + browser.safari;
    } else {
        version = '-1';
    }
    return version;
}