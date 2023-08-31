import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
    state() {
        return {
            myself: {
                describe: '',
                head: '',
                username: '',
                cardimg: '',
                qq: "",
                email: ''
            }
        }
    },
    mutations: {
        setMySelf(state,myself) {  
            state.myself = myself
            
        }
    }
})

export default store