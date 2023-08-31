import { post, put, del, get } from '../../lib/js/axios'


const fanReq = {
    getLUFans: (loginUid, page, limit, sortKey, type) => {
        return new Promise((resolve, reject) => {
            get("/fan/getLUFans", {
                loginUid: loginUid,
                page: page,
                limit: limit,
                sortKey: sortKey,
                type: type
            }).then(({ data }) => {
                if (data.resultCode == 200)
                    resolve(data.data)
                else
                    resolve(data.message)
            }).catch(err => {
                reject(err)
            })
        })
    },
    getFansList(loginUid, page, limit, sortKey){
        return new Promise((resolve, reject)=>{
            get('/fan/getLUfanList',{
                loginUid: loginUid,
                page: page,
                limit: limit,
                sortKey: sortKey,
            }).then(({ data }) => {
                if (data.resultCode == 200)
                    resolve(data.data)
                else
                    resolve(data.message)
            }).catch(err => {
                reject(err)
            })
        })
    },
    getGroups(loginUid) {
        return new Promise((resolve, reject) => {
            get("/fan/fanGroups", {
                loginUid: loginUid
            }).then(({ data }) => {
                if (data.resultCode == 200)
                    resolve(data.data)
                else
                    resolve(data.message)
            }).catch(err => {
                reject(err)
            })
        })
    },
    addGroup(loginUid, newGroup) {
        return new Promise((resolve, reject) => {
            put('/fan/addGroup', {
                uid: loginUid,
                newGroup: newGroup
            }).then(({ data }) => {
                
                if (data.resultCode == 200)
                    resolve(data.data)
                else
                    resolve(data.message)
            }).catch(e => {
                reject(e)
            })
        })
    },
    updateGroup(fid,type){
        return new Promise((resolve, reject) => {
            put('/fan/updateGroup',null,{
                fid:fid,
                type:type
            }).then(data => {
                
                if (data.resultCode == 200)
                    resolve("更新成功")
                else
                    resolve(data.message)
            }).catch(e => {
                reject(e)
            })
        })
    }
}

export default fanReq