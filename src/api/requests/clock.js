import {post,put,del,get} from '../../lib/js/axios'
import {ElMessage} from 'element-plus'
import {formatDate} from '@/lib/js/tools'

const clockReq = {
    getUserClocks(start,end,uid){
        return new Promise((resolve, reject) =>{
            get("/clock/AllClocks",{
                start:start,
                end:end,
                uid:uid
            }).then(({data})=>{
                
                if(data.resultCode==200)
                    resolve(data.data)
                else{
                    ElMessage.error(data.message)
                    reject(data.message)
                }
            }).catch(e=>{
                reject(e)
            })
        })
    }
}

export default clockReq