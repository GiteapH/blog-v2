import {post,put,del,get} from '../../lib/js/axios'


const tagsReq = {
    getCategories(){
        return new Promise((resolve,reject)=>{
            get("/tag/categories").then(({data})=>{
                if(data.resultCode==200){
                    resolve(data.data)
                }else{
                    reject(data.message)
                }
            }).catch(e_=>{
                reject(e_)
            })
        })
    }
}

export default tagsReq