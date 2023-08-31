import { post, put, del, get } from '../../lib/js/axios'
import { ElMessage } from 'element-plus'
import { notification } from '@/lib/js/tools.js'
const userRequest = {
    getUserInfoByIds(ids, pageSize, page) {
        return new Promise(function (resolve, reject) {
            get('/user/infoBIs', {
                uids: ids,
                limit: pageSize,
                start: page
            }).then(({ data }) => {
                
                resolve(data)
            }).catch(e => {

                reject(e)
            })
        })
    },
    getUserCategory(id) {
        return new Promise(function (resolve, reject) {
            get('/info/getUserCategory', {
                uid: id
            }).then(({ data }) => {
                if(data.resultCode == 200) {
                    resolve(data.data)
                }else{
                    notification("错误","error",data.message)
                    reject(data.message)
                }
            }).catch(e => {
                reject(e)
            })
        })
    },
    userData(id) {
        return new Promise((resolve, reject) => {
            get("/info/userInfo", {
                uid: id
            }).then(({ data }) => {
                if (data.resultCode == 200) {
                    resolve(data.data)
                } else {
                    ElMessage.error(data.message)
                    reject(data.message)
                }
            }).catch(e => {
                reject(e)
            })
        })
    },
    updateUserData(userName, email, password, describe, originalEmail, qq, head) {
        return new Promise(function (resolve, reject) {
            put('/user/info', {
                "describe": describe,
                "email": email,
                "username": userName,
                "passwordMd5": password,
                "originalEmail": originalEmail,
                "qq": qq,
                "head": head
            }).then(data => {
                if (data.resultCode == 200) {
                    notification("提示", "success", "修改成功")
                    resolve(data.message)
                } else {
                    notification("错误", "error", data.message)
                    reject(data.message)
                }
            }).catch(e => {
                notification("错误", "error", e)
            })
        })
    },
    updateUserInfo(info = {
        "collections": null,
        "comments": null,
        "fans": null,
        "followers": null,
        "gender": null,
        "goods": null,
        "interviewer": null,
        "readers": null,
        "submits": null,
        "uid": null,
        "dislikeCategory":null,
        "likeCategory":null
    }) {
        return new Promise((resolve, reject) => {
            put('/info/updateUserInfo', info).then(data => {
                if (data.resultCode == 200) {
                    notification("提示", "success", "修改成功")
                    resolve(data.message)
                } else {
                    notification("错误", "error", data.message)
                    reject(data.message)
                }
            }).catch(e => {
                notification("错误", "error", e)
            })
        })
    },
    getUser2Up(loginUid, upUid) {
        return new Promise(function (resolve, reject) {
            get("/user/login2up", {
                upUid: upUid,
                loginUid: loginUid
            }).then(({ data }) => {
                
                resolve(data.data)
            }).catch(e => {
                reject(e.message)
            })
        })
    },
    addFan(fanUid, toUid, type = 0) {
        return new Promise(function (resolve, reject) {
            put("/fan/putFan", {
                type: type,
                uid: fanUid,
                toUid: toUid
            }).then(data => {
                if (data.resultCode == 200)
                    resolve(data.data)
                else
                    reject(data.message)
            }).catch(e => {
                reject(e)
            })
        })
    },
    delFan(fid) {
        return new Promise((resolve, reject) => {
            if (fid != null) {
                del('/fan/delFan', null, {
                    fid: fid
                }).then((data) => {
                    resolve(data)
                }).catch(e => {
                    ElMessage.error(e?.message)
                    reject(e.message)
                })
            } else {
                ElMessage.error("关注信息已不存在")
            }
        })
    },
}

export default userRequest;
