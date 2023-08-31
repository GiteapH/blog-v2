
import { ElNotification } from 'element-plus'

let positions = {
    tl: 'top-left',
    tr: 'top-right',
    bl: 'bottom-left',
    br: 'bottom-right'
}

let minDiff = [60, 60 * 24, 60 * 24 * 30, 60 * 24 * 30 * 365]
let division = [1, 60, 60 * 24, 60 * 24 * 30, 60 * 24 * 30 * 365]
export function notification(title, type, message, position = 'tr', dangerouslyUseHTMLString = false) {
    ElNotification({
        type: type,
        title: title,
        message: message,
        dangerouslyUseHTMLString: dangerouslyUseHTMLString,
        position: positions[position]
    })
}
var lastTime = 0    // 用来记录上次执行的时刻
export function throttle(func = function(){}, wait){

    return function(...args){
        var now = Date.now()
        
        var coolingDown = now - lastTime < wait
        

        if(coolingDown){
            return
        }

        // 记录本次执行的时刻
        lastTime = Date.now()  
        let obj = {
            promise:null
        }
        func.apply(obj, ...args)

        return obj
    }
}

export function judgeDate(date) {
    date = new Date(date)
    let activeDataArr = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    //  今天
    let todayDate = new Date(); //今天
    let nowDataArr = [todayDate.getFullYear(), todayDate.getMonth() + 1, todayDate.getDate()] //今天的 年 月 日

    //  昨天
    let yesterdayDate = new Date(todayDate.setTime(todayDate.getTime() - 24 * 60 * 60 * 1000))
    let yesterdayDateArr = [yesterdayDate.getFullYear(), yesterdayDate.getMonth() + 1, yesterdayDate.getDate()]//昨天的 年 月 日

    var natian = null //储存到底是哪天

    //判断 是今天还是昨天 还是 明天  并赋值给 natian
    if (nowDataArr[0] == activeDataArr[0] && nowDataArr[1] == activeDataArr[1] && nowDataArr[2] == activeDataArr[2]) {
        natian = '今天'
    } else if (yesterdayDateArr[0] == activeDataArr[0] && yesterdayDateArr[1] == activeDataArr[1] && yesterdayDateArr[2] == activeDataArr[2]) {
        natian = '昨天'
    }
    return natian == null ? formatDate(date.getTime()) : (natian + "  " + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()))
}
export function formatDate(time, format = 'YY-MM-DD hh:mm:ss') {
    var date = new Date(time);
    var year = date.getUTCFullYear(),
        month = date.getUTCMonth() + 1,//月份是从0开始的
        day = date.getUTCDate(),
        hour = date.getUTCHours(),
        min = date.getUTCMinutes(),
        sec = date.getUTCSeconds();
    var preArr = Array.apply(null, Array(10)).map(function (elem, index) {
        return '0' + index;
    });

    var newTime = format.replace(/YY/g, year)
        .replace(/MM/g, preArr[month] || month)
        .replace(/DD/g, preArr[day] || day)
        .replace(/hh/g, preArr[hour] || hour)
        .replace(/mm/g, preArr[min] || min)
        .replace(/ss/g, preArr[sec] || sec);

    return newTime;
}

export function getBeforeTime(date = new Date(),before=false) {
    let obj = ['分钟', '小时', '天', '月', '年']
    let diff = (new Date().getTime() - date.getTime()-(before?8*60*60*1000:0)) / 1000 / 60
    for (let i = 0; i < minDiff.length; i++) {
        if (diff < minDiff[i]) {
            return parseInt(diff / division[i]) + obj[i]
        }
    }
    return parseInt(diff / division[division.length - 1]) + obj[obj.length - 1]
}

export function getURL(url, uid, aid) {
    let str = url + '?uid='
    let uidStr = getRandomSum(7) + uid
    let aidStr = getRandomSum(7) + aid
    str = str + uidStr + "&aid=" + aidStr
    return str
}

function getRandomSum(len) {
    let str = ''
    for (let i = 0; i < len; i++) {
        let s = parseInt(Math.random() * 10);
        str = str + '' + s
    }
    return str
}

export function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}