/*
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-03-05 14:11:01
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-08-25 19:38:53
 * @FilePath: \blog\src\api\requests\connect.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { post, put, del, get } from '../../lib/js/axios'
import { notification } from '@/lib/js/tools.js'

const connectReq = {
    getConnectList: (orderName, limit, page, principal) => {
        return new Promise((resolve, reject) => {
            get('/connectList/getConnectList',{
                orderName:orderName,
                limit:limit,
                pageNumber:page,
                principal:principal
            }).then(({data})=>{
                
                if(data.resultCode==200){
                    resolve(data.data)
                }else{
                    notification('错误','error',data.message)
                }
            }).catch(e=>{
                notification('错误','error',e)
            })
        })
    },
    startConnect :(params={
        "connectDate": new Date(),
        "lastContent": "string",
        "principalUid": 0,
        "subordinateUid": 0,
        "unreadNum": 0,
        "weight": 0
      })=>{
        return new Promise((resolve, reject) =>{
            post('/connectList/startConnect',params).then(data =>{
                
                if(data.resultCode==200){

                    resolve(data.data)
                }else{
                    notification('错误','error',data.message)
                }
            })
        })
    },
    closeConnect : (params={
        "connectDate": "2023-08-25T10:09:49.633Z",
        "connectId": 0,
        "lastContent": "string",
        "principalUid": 0,
        "subordinateUid": 0,
        "unreadNum": 0,
        "weight": 0
      })=>{
        return new Promise((resolve, reject) =>{
            post('/connectList/closeConnect',params).then(data =>{
                
                if(data.resultCode==200){
                    notification('成功','success','关闭对话')
                    resolve(data.data)
                }else{
                    notification('错误','error',data.message)
                }
            })
        })
    }
}

export default connectReq