/*
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2022-08-27 08:33:51
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-08-28 11:28:56
 * @FilePath: \blog\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import store from './store'
import 'ant-design-vue/dist/antd.css';
import {notification} from 'ant-design-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import cookie from 'js-cookie'
import tinymce from 'tinymce'
import App from './App'
import  router  from './route/index.js'
import { formatDate,judgeDate,getBeforeTime } from '@/lib/js/tools'
import article from './api/requests/articles'
import user from './api/requests/user'
import UMR from './api/requests/userModules'
import fan from './api/requests/fans'
import ColReq from './api/requests/collections'
import clock from './api/requests/clock'
import tools from './api/toolsReq'
import tags from './api/requests/tags'
import letters from './api/requests/letters'
import connect from './api/requests/connect'
import dynamic from './api/requests/dynamic'
import goodPoints from './api/requests/goodPoints'
import search from './api/requests/search'
import topic from './api/requests/topic'
import history from './api/requests/history'
import { getUserInfo } from '@/api/userRequest'

import preview from 'vue3-photo-preview';
import 'vue3-photo-preview/dist/index.css';

const app = createApp(App).use(router).use(preview)
.use(router).use(Antd).use(tinymce).use(ElementPlus).use(store)

app.config.globalProperties.$articles = article
app.config.globalProperties.$users = user
app.config.globalProperties.$UMs = UMR
app.config.globalProperties.$ColReq = ColReq
app.config.globalProperties.$FanReq = fan
app.config.globalProperties.$ClockReq = clock
app.config.globalProperties.$tools = tools
app.config.globalProperties.$tags = tags
app.config.globalProperties.$letters = letters
app.config.globalProperties.$connect = connect
app.config.globalProperties.$dynamic = dynamic
app.config.globalProperties.$goodPoints = goodPoints
app.config.globalProperties.$topic = topic
app.config.globalProperties.$search = search
app.config.globalProperties.$history = history
app.config.globalProperties.formatDate = formatDate
app.config.globalProperties.judgeDate = judgeDate
app.config.globalProperties.getBeforeTime = getBeforeTime

console.log(cookie.get('/user/token'))
getUserInfo(cookie.get('/user/token')).then(({ data }) => {
    if (data.resultCode == 200) {
        store.commit('setMySelf',data.data)
    }
    app.mount('#app')
}).catch((e)=>{
    console.error(e)
    notification.error({
        title:'错误',
        message:'服务器连接失败'
    })
    app.mount('#app')
})
