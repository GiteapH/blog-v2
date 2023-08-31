import {ajax} from 'jquery'

export function Ajax(url,method,data,contentType){
    data = JSON.stringify(data)
    
    return new Promise((resolve,reject)=>{
        ajax({
            url:url,
            method:method,
            contentType:contentType,
            data:data,
            dataType:'text',
            succcess(res){
                
                resolve(res)
            },
            error(err){
                
                reject(err)
            }
        })
    })
}