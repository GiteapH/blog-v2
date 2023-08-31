import { post, put, del, get } from '../../lib/js/axios'
import { notification } from '@/lib/js/tools.js'
const dynamic = {
    onLikeActive(uid,id,type,tableType) {
        return new Promise((resovle, reject) => {
            put('/GoodPointsParam/onLikeActive', {
                uid: uid,
                id: id,
                type: type,
                tableType:tableType
            }).then(data => {
                if (data.resultCode == 200) {
                    resovle(data)
                } else {
                    resovle(data.message)
                    notification('错误','danger',data.message)
                }
            }).catch(e => {
                notification('错误','danger',e)
                reject(e)
            })
        })
    },
    deleteLike(uid,id,type,tableType) {
        return new Promise((resovle, reject) => {
            del('/GoodPointsParam/deleteLike', {
                uid: uid,
                id: id,
                type: type,
                tableType:tableType
            }).then(data => {
                if (data.resultCode == 200) {
                    resovle(data)
                } else {
                    resovle(data.message)
                    notification('错误','danger',data.message)
                }
            }).catch(e => {
                notification('错误','danger',e)
                reject(e)
            })
        })
    },
}

export default dynamic