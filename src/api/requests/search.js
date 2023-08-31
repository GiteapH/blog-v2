/*
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-04-05 19:20:28
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-08-25 19:37:45
 * @FilePath: \blog\src\api\requests\search.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { post, put, del, get } from '../../lib/js/axios'
import { notification } from '@/lib/js/tools.js'

const search = {
    info(prefix) {
        return new Promise((resovle, reject) => {
            get('/search/info', {
                prefix: prefix
            }).then(({ data }) => {
                if (data.resultCode == 200) {
                    resovle(data.data)
                } else {
                    resovle(data.message)
                }
            }).catch(e => {
                reject(e)
            })
        })
    },
    updateHot(content){
        return new Promise((resovle, reject) => {
            post('/search/updateHot',{
                searchContent:content
            }).then(res=>{
                if(res.resultCode!=200){
                    notification('错误','error',data.message)
                }
            })
        })
    }
}

export default search