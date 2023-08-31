import { post, get } from '../lib/js/axios'

export const  getUserInfo = async (token) => {
    return get("/user/info",null,{
        token:token
    })
}

