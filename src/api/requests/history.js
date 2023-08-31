/*
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-04-05 19:20:28
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-08-27 19:06:19
 * @FilePath: \blog\src\api\requests\search.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { post, put, del, get } from '../../lib/js/axios'
import { notification } from '@/lib/js/tools.js'

const search = {
    insert: (htid,huid) => {
        return new Promise((resolve, reject) => {
            put("/view-history/addHistory", {
                "hdate": new Date(),
                "htid": htid,
                "huid": huid
            }).then(res=>{
                if(res.resultCode==200){
                    resolve(res.data)
                }
            })
        })
    },
    delete: (hid) => {
        return new Promise((resolve, reject) => {
            del("/view-history/deleteHistory", {
                "hid": hid
            }).then(res=>{
                if(res.resultCode==200){
                    resolve(res.data)
                }else{
                    notification('错误','danger','删除失败')
                }
            })
        })
    },
    deleteAll: (huid) => {
        return new Promise((resolve, reject) => {
            del("/view-history/deleteAll", {
                "huid": huid
            }).then(res=>{
                if(res.resultCode==200){
                    resolve(res.data)
                }else{
                    notification('错误','danger','删除失败')
                }
            })
        })
    },
    update: (hid) => {
        return new Promise((resolve, reject) => {
            post("/view-history/updateHistory", {
                "hdate": new Date(),
                "htid": hid
            }).then(res=>{
                if(res.resultCode==200){
                    resolve(res.data)
                }
            })
        })
    },
    selectHistory: (huid) => {
        return new Promise((resolve, reject) => {
            get("/view-history/selectHistory", {
                "huid": huid
            }).then(({data})=>{
                if(data.resultCode==200){
                    resolve(data.data)
                }else{
                    notification('错误','danger','历史记录获取失败')
                }
            })
        })
    },
    search:(huid,search)=>{
        return new Promise((resolve, reject) => {
            get("/view-history/search", {
                "huid": huid,
                search:search
            }).then(({data})=>{
                if(data.resultCode==200){
                    resolve(data.data)
                }else{
                    notification('错误','danger','搜索失败')
                }
            })
        })
    }
}

export default search