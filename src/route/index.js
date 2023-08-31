/*
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2022-08-29 15:18:53
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-08-27 19:03:32
 * @FilePath: \blog\src\route\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHistory } from "vue-router"

import articlelist from '../components/mainVue/articleList'
import uploadarticle from '../components/mainVue/uploadArticle'
import userArticle from '../components/mainVue/userArticle'
import regedit from '../components/mainVue/regedit'
import articleView from '../components/mainVue/articleView'
import curDayArticles from '../components/mainVue/curDayArticles'
import notFound from '../components/mainVue/404'
import user from '../components/mainVue/user'
import userConfig from '../components/mainVue/userConfig'
import userLetter from '../components/mainVue/userLetters'
import dynamic from '../components/mainVue/dynamic'
import search from '../components/mainVue/search'
import userHistory from '../components/mainVue/userHistory'
const routes = [
  {
    path: "/",
    name: "articleList",
    component: articlelist,
    meta:{
      title:'文章列表'
    }
  },
  {
    path: "/uploadArticle",
    name: "uploadArticle",
    component: uploadarticle,
    meta:{
      title:'上传文章'
    }
  },
  {
    path: "/userArticle",
    name: "userArticle",
    component: userArticle,
    meta:{
      title:'我的文章'
    }
  },
  {
    path: "/regedit",
    name: "regedit",
    component: regedit,
    meta:{
      title:'注册登录'
    }
  },
  {
    path: "/articleView",
    name: "articleView",
    component: articleView,
    meta:{
      title:'文章详情'
    }
  },
  {
    path: "/curDayArticles/:type",
    name: "curDayArticles",
    component: curDayArticles,
    meta:{
      title:'最近发布'
    }
  },
  {
    path: "/user/:uid",
    name: 'user',
    component: user,
    meta:{
      title:'用户详情'
    }
  },
  {
    path: "/error/:code/:describe",
    name: 'error',
    component: notFound,
    meta:{
      title:'页面不存在'
    }
  },
  {
    path: "/userConfig",
    name: "userConfig",
    component: userConfig,
    meta:{
      title:'用户设置'
    }
  },{
    path: "/userLetter",
    name: "userLetter",
    component: userLetter,
    meta:{
      title:'我的私信'
    }
  },
  {
    path: "/dynamic",
    name: "dynamic",
    component: dynamic,
    meta:{
      title:'动态'
    }
  },{
    path: "/search",
    name: "search",
    component: search,
    meta:{
      title:'站内搜索'
    }
  },{
    path:'/userHistory',
    name:'userHistory',
    component:userHistory,
    meta:{
      title:'历史记录'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

router.afterEach((to, from) => {
    document.title = to.meta.title
})

export default router
