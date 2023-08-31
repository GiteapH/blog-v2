/*
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-03-18 19:33:18
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-08-26 11:38:56
 * @FilePath: \blog\src\api\requests\topic.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { post, put, del, get } from '../../lib/js/axios'
import { notification } from '@/lib/js/tools.js'
const topic = {
    getAllTopics(page,limit,key){
        this.promise = new Promise((resolve,reject)=>{
            get("/topic/getAllTopic",{
                page:page,
                limit:limit,
                key:key
            }).then(({data})=>{
                if(data.resultCode==200){
                    resolve(data.data)
                }else{
                    notification('错误','danger',data.message)
                    reject(data.message)
                }
            }).catch(err=>{
                notification('错误','danger',err)
                reject(err)
            })
        })
    },
    getAllTopicsWithNoThrottle(page,limit,key){
        return new Promise((resolve,reject)=>{
            get("/topic/getAllTopic",{
                page:page,
                limit:limit,
                key:key
            }).then(({data})=>{
                if(data.resultCode==200){
                    resolve(data.data)
                }else{
                    notification('错误','danger',data.message)
                    reject(data.message)
                }
            }).catch(err=>{
                notification('错误','danger',err)
                reject(err)
            })
        })
    },
    createTopic(name,content,uid){
        return new Promise((resolve,reject)=>{
            post("/topic/createTopic",{
                "tcontent": content,
                "tdate": new Date(),
                "ttopic": name,
                "tuid": uid,
                "tpartake": 0,
                "tvisit":0
              }).then(data=>{
                if(data.resultCode==200){
                    resolve(data.data)
                }
                else{
                    notification('错误','danger',data.message)
                }
            })
        })
    }
}

export default topic