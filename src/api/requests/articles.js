/*
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-01-10 17:52:06
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-08-26 16:49:35
 * @FilePath: \blog\src\api\requests\articles.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { notification } from '@/lib/js/tools'
import { post, put, del, get } from '../../lib/js/axios'

const article = {
    getTags: () => {
        return new Promise((resolve, reject) => {
            get("/article/getTags").then(({ data }) => {
                if (data.resultCode == 200)
                    resolve(data.data)
                else
                    reject(data.message)
            }).catch(e => {
                reject(e)
            })
        })
    },
    getCurDaysArticles: (page, limit, sortType, tag) => {
        return new Promise((resolve, reject) => {
            get("/article/getAroundCurDay", {
                page: page,
                limit: limit,
                orderPath: sortType,
                tag: tag
            }).then(({ data }) => {
                if (data.resultCode == 200) {
                    resolve(data.data)
                } else {
                    reject(data.message)
                }
            }).catch(e => {
                reject(e)
            })
        })
    },
    updateIntInfo(aid, oldParamName, newParamName) {
        return new Promise(function (resolve, reject) {
            put("/article/updateIntInfo", {
                "aid": aid,
                "newParamName": newParamName,
                "oldParamName": oldParamName
            }).then(res => {
                if (res.resultCode != 200) {
                    notification("错误", "error", "网络异常")
                }
            })
        })
    },
    getTags() {
        return new Promise(function (resolve, reject) {
            get('/article/getTags').then(({ data }) => {
                if (data.resultCode != 200) {
                    notification("错误", "error", "网络异常")
                }
                else{
                    resolve(data.data)
                }
            })
        })
    },
    getLike(id){
        return new Promise((resolve, reject) =>{
            get("/article/getUserLike",{
                uid:id,
                start:1
            }).then(({ data })=>{
                if (data.resultCode != 200) {
                    notification("错误", "error", "网络异常")
                }
                else{
                    resolve(data.data)
                }
            })
        })
    },
    getU2A(page,limit,orderPath){
        return new Promise((resolve, reject) =>{
            get('/article/getUsers2Article', {
                pageNumber: page,
                orderPath: orderPath,
                limit:limit
            }).then(({ data }) => {
                if (data.resultCode != 200) {
                    notification("错误", "error", "网络异常")
                }
                else{
                    resolve(data.data)
                }
            })
        })
    }
}

export default article