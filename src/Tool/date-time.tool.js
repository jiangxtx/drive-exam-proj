/**
 * Created by Jiangxtx on 2017/3/15.
 */

/**
 时间格式化工具
 把Long类型的yyyy-MM-dd日期还原yyyy-MM-dd格式日期
 */
/**
 * 时间格式化工具: 把Long类型的yyyy-MM-dd日期还原yyyy-MM-dd格式日期
 * @param longTypeDate
 * @param flag true:2017-03-12; false:2017-03-12 12:23:34;
 * @return {string}
 */
export function dateFormatUtil(longTypeDate, flag) {
    const getMonth = date => {
        let month = date.getMonth() + 1; //getMonth()得到的月份是0-11
        return (month < 10) ? `0${month}` : month;
    }
    const getDay = date => {
        let day = date.getDate();
        return (day < 10) ? `0${day}` : day;
    }

    var date = new Date(longTypeDate);
    var dateTypeDate = [];
    dateTypeDate.push(date.getFullYear());
    dateTypeDate.push(getMonth(date));
    dateTypeDate.push(getDay(date));

    let timeStr = '';
    if (flag) {
        const timeArr = [];
        timeArr.push(date.getHours())
        timeArr.push(date.getMinutes())
        timeArr.push(date.getSeconds())

        timeStr = timeArr.join(':');
    }

    return dateTypeDate.join('-') + ' ' + timeStr;
}
