import { post, put, del, get } from '../../lib/js/axios'

const UMRequest = {
    getUserModules(uid = -1) {
        return new Promise((resolve, reject) => {
            get('/modules/getUMs', {
                uid: uid
            }).then(({ data }) => {
                resolve(data.data)
            }).catch(e => {
                reject(e)
            })
        })
    },
    updateModules(uid, modules = []) {
        return new Promise((resolve, reject) => {
            put("/modules/UDMdoules", null, {
                uid: uid,
                modules: modules.join(",")
            }).then(( data ) => {
                if (data.resultCode == 200)
                    resolve(data.data)
                else
                    resolve(data.message)
            }).catch(e => {
                reject(e)
            })
        })
    }
}

export default UMRequest;