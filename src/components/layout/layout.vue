<template>
    <a-layout style="background: url('/img/webImg/hd-wallpaper-gf9e1d2e44_1920.jpg')">
        <div class="header">
            <a-row v-if="!showSearch">
                <a-col :span="2">
                    <div><img src="../../assets/logo.png" alt="" style="width:35px;padding-bottom:10px"></div>
                </a-col>
                <a-col :span="1"><router-link to="/" :class="headMenu.indexOf('1') != -1 ? 'active' : ''">首页</router-link></a-col>
                <a-col :span="1"><router-link to="/dynamic"
                        :class="headMenu.indexOf('3') != -1 ? 'active' : ''">动态</router-link></a-col>
                <a-col :span="8">
                    <a-input-search placeholder="请输入需要的搜索内容" @focus="showSearch = true"
                        style="width:70%;margin-left:50px" />
                </a-col>
                <a-col :span="11">
                    <div style="">
                        <Avatar id="avatar" :login='login' :describe='userinfo.describe' :userName='userinfo.username'
                            :src="'/img/userHead/' + userinfo.head" :BackImgsrc="'/img/userBackImg/' + userinfo.cardimg">
                        </Avatar>
                        <ul id="tinyUl" class='ver'>
                            <li class="verLi">
                                <div class="tinyField">
                                    <router-link to="/userArticle">
                                        <a-button type="dashed" shape="circle">
                                            <template #icon>
                                                <BulbOutlined class="icon" />
                                            </template>
                                        </a-button>
                                        <p
                                            style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;margin-top:15px;height: 15px;text-align: left;">
                                            创作
                                        </p>
                                    </router-link>
                                </div>
                            </li>
                            <li class="verLi">
                                <div class="tinyField">
                                    <div @click="to('/dynamic')">
                                        <a-button type="dashed" shape="circle">
                                            <template #icon>
                                                <SoundOutlined class="icon" />
                                            </template>
                                        </a-button>
                                        <p
                                            style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;margin-top:15px;height: 15px;">
                                            动态</p>
                                    </div>
                                </div>
                            </li>
                            <li class="verLi">
                                <div class="tinyField">
                                    <div @click="to('/user/'+userinfo.id+'?activeKey=收藏列表')">
                                        <a-button type="dashed" shape="circle">
                                            <template #icon>
                                                <StarOutlined class="icon" />
                                            </template>
                                        </a-button>
                                    <p
                                        style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;margin-top:15px;height: 15px;">
                                        收藏</p>
                                    </div>
                                </div>
                            </li>
                            <li class="verLi">
                                <div class="tinyField">
                                    <div @click="to('/userHistory')">
                                        <a-button type="dashed" shape="circle">
                                            <template #icon>
                                                <HistoryOutlined class="icon" />
                                            </template>
                                        </a-button>
                                        <p
                                            style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;margin-top:15px;height: 15px;">
                                            历史</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <a-button type="primary" :size="primary" style="top: 25px;position:fixed;right: 15px;"
                            @click="uploadArticle">
                            <template #icon>
                                <UploadOutlined />
                            </template>
                            发表文章
                        </a-button>
                    </div>
                </a-col>
            </a-row>
            <a-row v-else style="z-index:15615615;margin-bottom:15px">
                <searchFrame style="width:80%;margin:0 auto;" v-bind:value="searchValue" @update="val=>searchValue=val">
                    <template #input>
                        <a-input v-model:value="searchValue" placeholder="请输入需要的搜索内容" @blur="onBlur"
                            style="margin:0 auto;border-radius: 15px;">
                            <template #prefix>
                                <a-tooltip title="取消">
                                    <router-link to=""><close-outlined @click="showSearch = false" /></router-link>
                                </a-tooltip>
                            </template>
                            <template #suffix>
                                <a-tooltip title="搜搜">
                                    <search-outlined @click.prevent="onSearch" />
                                </a-tooltip>
                            </template>
                        </a-input>
                    </template>
                </searchFrame>
            </a-row>
        </div>
        <a-progress :stroke-color="{
            '0%': '#108ee9',
            '100%': '#87d068',
        }" :percent="percent" :showInfo="false" style="z-index: 0;margin-top: -10px;" v-show="true" />
        <a-layout>
            <a-layout-sider width="180" :style="menuStyle" collapsible
                v-show="headMenu.indexOf('3') == -1 && headMenu.indexOf('-1') == -1">
                <a-menu v-model:selectedKeys="selectItemMenu" v-model:openKeys="openItemMenu" mode="inline"
                    :style="{ height: '1020px', borderRight: 0 }">
                    <a-sub-menu key="sub1">
                        <template #title>
                            <span>
                                <ReadOutlined />
                                文章
                            </span>
                        </template>
                        <a-menu-item key="1"><router-link to="/">分类</router-link></a-menu-item>
                        <a-menu-item key="3"><router-link to="/curDayArticles/不限">刚刚发布</router-link></a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="sub2" :style="{ 'display': (!userinfo.username ? 'none' : 'block') }">
                        <template #title>
                            <span>
                                <UserOutlined />
                                {{ other ? userName : '我' }}的空间
                            </span>
                        </template>
                        <a-menu-item key="9"><router-link :to="'/user/' + userinfo.id">首页</router-link></a-menu-item>
                        <a-menu-item key="5" :style="{ 'display': (other ? 'none' : 'block') }"><router-link
                                :to="'/userLetter'">我的回复</router-link> </a-menu-item>
                        <a-menu-item key="6" :style="{ 'display': (other ? 'none' : 'block') }"><router-link
                                :to="'/userLetter'">我的评论</router-link></a-menu-item>
                        <a-menu-item key="7" :style="{ 'display': (other ? 'none' : 'block') }"><router-link
                                :to="'/userConfig'">编辑资料</router-link></a-menu-item>
                        <a-menu-item key="8"> {{ other ? 'ta的' : '我的' }}<router-link
                                :to="'/user/'+userinfo.id+'?activeKey=关注列表'">关注</router-link></a-menu-item>
                        <a-menu-item key="10"> {{ other ? 'ta的' : '我的' }}<router-link
                                :to="'/user/'+userinfo.id">收藏</router-link></a-menu-item>
                        <a-menu-item key="11"> {{ other ? 'ta的' : '我的' }}<router-link
                                :to="'/user/'+userinfo.id+'?activeKey=发布列表'">发布</router-link></a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="sub3">
                        <template #title>
                            <span>
                                <InfoCircleOutlined />
                                优化
                            </span>
                        </template>
                        <a-menu-item key="12">提交反馈</a-menu-item>
                        <a-menu-item key="13">用户意见</a-menu-item>
                    </a-sub-menu>
                </a-menu>
            </a-layout-sider>
            <a-layout style="padding: 0 24px 24px;">
                <a-breadcrumb style="margin:10px 15px">
                    <a-breadcrumb-item>
                        <router-link to="/">
                            <home-outlined />
                            <span>首页</span>
                        </router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                        <router-link :to="item.href" v-for="(item, index) in breadcrumbs" :key="index">
                            <span style="color:goldenrod">{{ item.menu }}</span>
                        </router-link>
                    </a-breadcrumb-item>
                </a-breadcrumb>
                <a-layout-content :style="content">
                    <slot name="content"></slot>
                </a-layout-content>
            </a-layout>
        </a-layout>
    </a-layout>
</template>
<script>
import { HomeOutlined, ReadOutlined, UserOutlined, CloseOutlined, InfoCircleOutlined, BulbOutlined, UploadOutlined, StarOutlined, HistoryOutlined, SoundOutlined, SearchOutlined } from '@ant-design/icons-vue';
import Avatar from '../avatar.vue'
import { defineComponent, ref } from 'vue';
import { getUserInfo } from '@/api/userRequest'
// import workList from '../article.vue'
import searchFrame from '../UtilComponents/searchFrame'
import $ from 'jquery'
import cookie from 'js-cookie'
import searchReq from '@/api/requests/search'
import dayjs from 'dayjs'
import { notification } from '@/lib/js/tools';
dayjs.locale('zh-cn')
export default defineComponent({
    props: {
        breadcrumbs: {
            default: [],
            type: Array
        },
        itemMenu: {
            type: Array,
            default: ['1']
        },
        headMenu: {
            type: Array,
            default: ['1']
        },
        openKeys: {
            default: ['sub1'],
            type: Array
        },
        other: {
            default: false,
            type: Boolean
        },
        userName: '',
        background: {
            default: 'background.webp',
            type: String
        },
        isCenter: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            showSearch: false,
            classCount: '10',
            login: false,
            userinfo: {
                describe: '',
                head: '',
                username: '',
                cardimg: '',
                qq: ''
            },
            searchValue: '',
            complete: false,
            percent: 0,
            content: {
                'padding': `12px ${this.$props.isCenter ? '150px' : '0px'}`,
                'margin': '0',
                'height': "auto",
                'background-size ': '100% 100%'
            },
            menuStyle: {
                'background': '#fff',
                'height': 'auto',
            },
            // 界面初始化
            selectItemMenu: [],
            openItemMenu: [],
            selectHeadMenu: []
        };
    },
    async mounted() {
        // cookie.remove('/history')
        let { itemMenu, headMenu, openKeys } = this.$props
        
        let self = this
        this.selectHeadMenu = headMenu
        this.selectItemMenu = itemMenu
        this.openItemMenu = openKeys
        let password = cookie.get('/user/loginPass')
        if (password) {
            if (this.userinfo.id != null) {
                this.login = true
                this.userinfo = this.$store.state.myself
            } else {
                console.log(cookie.get('/user/token'))
                await getUserInfo(cookie.get('/user/token')).then(({ data }) => {
                    if (data.resultCode == 200) {
                        this.$store.commit('setMySelf', data.data)
                        this.login = true
                        this.userinfo = this.$store.state.myself
                    }else{
                        // 登录失效
                        console.log(data)
                        notification('错误','danger',data.message)
                        cookie.remove('/user/loginPass')
                        cookie.remove('/user/uid')
                        cookie.remove('/user/token')
                    }
                }).catch((e) => {
                    console.error(e)
                    notification('错误','danger','登陆失败')
                })
            }
        }
        document.onreadystatechange = function () {//即在加载的过程中执行下面的代码
            let time = 1
            let itval = setInterval(() => {
                self.percent += time++ * Math.random() * 15
                if (self.percent >= 100) clearInterval(itval)
            }, 1000 + Math.random() * 500)
            if (document.readyState == 'complete') {
                
                self.complete = true
            }
        }

        this.content.background = 'url(' + require('@/assets/img/' + this.$props.background) + ')'

    },
    components: {
        CloseOutlined,
        SearchOutlined,
        SoundOutlined,
        HistoryOutlined,
        StarOutlined,
        UploadOutlined,
        BulbOutlined,
        ReadOutlined,
        UserOutlined,
        InfoCircleOutlined,
        Avatar,
        // workList,
        searchFrame,
        HomeOutlined
    },
    methods: {
        // 搜索框点击搜索
        onSearch(value) {
            if(cookie.get('/history')==null){
                
                cookie.set('/history',this.searchValue,{
                    expires:7
                })
            }else{
                
                cookie.set('/history',cookie.get('/history')+","+this.searchValue,{
                    expires:7
                })
            }
            searchReq.updateHot(this.searchValue)
            this.$router.push({
                path: '/search',
                query: {
                    key: this.searchValue,
                    type: 1
                }
            })
        },
        // 搜索框聚焦
        onFocus() {
            

        },
        // 搜索框失焦
        onBlur() {
            
            this.showSearch = false
        },
        to(url){
            if(this.userinfo.id!=null)
                this.$router.push({
                    path:url
                })
            else
                notification('警告','warning','请先登录')
        },  
        // 更新count
        creaseCount(count) {
            
            this.classCount += count
        },
        // 发表文章
        uploadArticle() {
            
            this.$router.push('/uploadArticle')
        }
    }
});

window.onscroll = function () {
    //为了保证兼容性，这里取两个值，哪个有值取哪一个
    //scrollTop就是触发滚轮事件时滚轮的高度
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop > 50) {
        $("#avatar").hide()
        $('#tinyUl').addClass('hor').removeClass('ver')
        $('#tinyUl li').addClass('horLi').removeClass('verLi')
    } else {
        $("#avatar").show()
        $('#tinyUl').addClass('ver').removeClass('hor')
        $('#tinyUl li').addClass('verLi').removeClass('horLi')
    }
}
</script>
<style>
*::-webkit-scrollbar {
    width: 10px;
}

*::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 5px;
}

*::-webkit-scrollbar-track {
    background-color: white;
}

.header {
    background: white;
    padding-top: 25px;
    padding-left: 25px;

}

.logo {
    height: 60px;
    width: 60px;
    float: left;
    margin-left: -10px;
}

.logo img {
    height: 60px;
    width: 60px;
    z-index: -1;
}

#search {
    transition: all 0.3s ease;
}

.hor {
    list-style: none;
    position: fixed;
    right: 15px;
    top: 50px;
}

.ver {
    position: fixed;
    list-style-type: none;
    right: 150px;
    color: #fff;
    top: 0;
}

.horLi {
    margin-top: 15px;
    line-height: 0px;
    right: 0px;
}

.verLi {
    float: left;
    line-height: 0px;
    right: 0px;
}

.tinyField {
    height: 60px;
    width: 80px;
    margin-top: 5px;
    line-height: 0px;
    color: black;
}

.icon:hover {
    animation: jumpBoxHandler 0.5s infinite;
    color: rgb(52, 124, 190);
    /* 1.8s 事件完成时间周期 infinite无限循环 */
}

.active {
    color: rgb(52, 124, 190);
}

@keyframes jumpBoxHandler {

    /* css事件 */
    0% {
        transform: translate(0px, 0px);
    }

    50% {
        transform: translate(0px, 5px);
        /* 可配置跳动方向 */
    }

    100% {
        transform: translate(0px, 0px);
    }
}</style>
