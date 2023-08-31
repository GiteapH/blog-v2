import { post, put, del, get } from '../lib/js/axios'
import { notification } from '@/lib/js/tools.js'
const tools = {
    getCode(action, toMail, email, username) {
        return new Promise((resolve, reject) => {
            post('/user/sendMail', {
                "action": action,
                "toMail": toMail,
                "email": email,
                "username": username
            }).then((data) => {
                if (data.resultCode == 200) {
                    notification("验证码", "success", "发送成功")
                    resolve(email)
                } else {
                    notification("验证码", "error", data.message)
                }
            }).catch(e => {
                notification("验证码", "error", e)
                reject(e)
            })
        })
    },
    checkCode(email, code) {
        return new Promise((resolve, reject) => {
            post(`/user/checkCode/${code}/${email}`).then((data) => {
                if (data.resultCode == 200) {
                    notification("恭喜", "success", "验证码正确")
                    resolve(true)
                } else {
                    notification("验证码", "error", data.message)
                    reject(false)
                }
            }).catch(e => {
                notification("验证码", "error", e)
                reject(e)
            })
        })
    }
}

export default tools