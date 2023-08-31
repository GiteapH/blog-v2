import { post, put, del, get } from '../../lib/js/axios'


const letterReq = {
    getMessages(fromUid, toUid,connectId) {
        return new Promise((resolve, reject) => {
            get('/message/UserMessages', {
                fromUid: fromUid,
                toUid: toUid,
                connectId:connectId
            }).then(res => {
                
                res = res.data
                if (res.resultCode == 200) {
                    
                    resolve(res.data)
                }
                else {
                    
                    reject(res.message)
                }
            }).catch(err => {
                
                reject(err)
            })
        })
    }
}

export default letterReq