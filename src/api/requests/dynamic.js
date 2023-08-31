import { post, put, del, get } from '../../lib/js/axios'
import { notification } from '@/lib/js/tools.js'

const dynamic = {
    getDynamicInfo(page, limit, uid, type) {
        return new Promise((resovle, reject) => {
            get('/dynamic/getDynamicInfo', {
                uid: uid,
                type: type,
                page: page,
                limit: limit
            }).then(({ data }) => {
                if (data.resultCode == 200) {
                    resovle(data.data)
                } else {
                    resovle(data.message)
                    notification('错误', 'danger', data.message)
                }
            }).catch(e => {
                notification('错误', 'danger', e)
                reject(e)
            })
        })
    },
    sendDynamic(dcontent,ddate,dtype,duid,responseType,topicId=null,dSrc=null,daid=null) {
        return new Promise((resovle, reject) => {
            put('/dynamic/sendDynamic', {
                "daid": daid,
                "dcontent": dcontent,
                "ddate": ddate,
                "dtype": dtype,
                "duid": duid,
                "topicId":topicId,
                "responseType": responseType,
                "dsrc":dSrc
            }).then((data) => {
                if (data.resultCode == 200) {
                    notification('成功', 'success', '发布成功')
                    resovle(data.data)
                } else {
                    resovle(data.message)
                    notification('错误', 'danger', data.message)
                }
            }).catch(e => {
                notification('错误', 'danger', e)
                reject(e)
            })
        })
    }
}

export default dynamic