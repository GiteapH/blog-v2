<template>
    <layout :itemMenu="['9']" :openKeys="['sub2']" :breadcrumbs="breadcrumbs" :other="noMyself" ref="layout"
        :userName="userinfo.username">
        <template #content>
            <el-dialog v-model="setGroups" width="25%">
                <template #header>
                    <h1>设置分组</h1>
                    <p style="color:grey">请为 <span style="color:black;font-size:18px">{{ activeName }}</span> 设置分组</p>
                </template>

                <h4>组别：</h4>
                <el-radio-group v-model="group">
                    <el-radio border v-for="(collapse, index) in collapses" :key="index" :label="index"
                        style="width:250px;margin-top:15px">{{
                            collapse.key
                        }}</el-radio>
                </el-radio-group>

                <a-button v-if="add" class="input-with-select" style="width:100%" @click="add = false">
                    <PlusOutlined />添加分组
                </a-button>
                <el-input v-model="addGroupName" maxlength="16" show-word-limit placeholder="最多输入16个字"
                    class="input-with-select" v-else>
                    <template #append>
                        <el-button style="background:skyblue;color:rgb(16, 148, 201)" @click="addGroup">
                            创建
                        </el-button>
                    </template>
                </el-input>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="setGroups = false">取消</el-button>
                        <el-button type="primary" @click="submitGroup(acitveFObj, group)">
                            确定
                        </el-button>
                    </span>
                </template>
            </el-dialog>
            <div class="userTitle">
                <el-row :gutter="30">
                    <el-col :span="2">
                        <img :src="'/img/userHead/' + userinfo.head"
                            style="width:80px;border-radius: 50%;border:1px beige solid;margin-top:-25px" />
                    </el-col>
                    <el-col :span="8">
                        <p style="font-weight: 400;font-size:25px;line-height: 25px;">{{ userinfo.username }}</p>
                        <el-input v-model="describe" maxlength="40" placeholder="请输入您的个性签名" show-word-limit v-show="onEnter"
                            @blur="enterBlur" type="text" />
                        <h4 style="color:darkgray;font-weight:300;line-height: 20px;margin-top:15px;text-overflow: ellipsis;overflow:hidden;width:100%;white-space: nowrap;"
                            v-show="!onEnter" @click="enterMethod">{{ userinfo.describe }}</h4>
                    </el-col>
                    <el-col :span="7" style="text-align:right">
                        <div class="statistics">
                            <a href="/405729749/fans/follow" class="na">
                                <p class="k">关注数</p>
                                <p id="n" class="space-attention">
                                    {{ userinfo.followers }}
                                </p>
                            </a>
                            <a href="/405729749/fans/fans" class="na">
                                <p class="k">粉丝数</p>
                                <p id="f" class="space-fans">
                                    {{ userinfo.fans }}
                                </p>
                            </a>
                            <div title="视频、动态、专栏累计获赞1" class="nh">
                                <p class="k">获赞数</p>
                                <p id="bf" class="n-data-v">{{ userinfo.goods }}</p>
                            </div>
                            <div title="截止昨天，阅读数总计为0" class="nh">
                                <p class="k">阅读数</p>
                                <p id="rd" class="n-data-v">{{ userinfo.readers }}</p>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="4" style="text-align: right;">

                        <div v-if="!noMyself">
                            <el-button plain @click="setting = true" style="margin-top:15px;">
                                面板设置
                            </el-button>
                            <br>

                            <el-button plain style="margin-top:15px;margin-left:10px;"><el-link :underline="false"
                                    href="/userConfig">信息修改</el-link></el-button>
                        </div>
                        <div v-else>
                            <el-button plain @click="addFan(loginId, uid)" v-show="!fan" color="#626aef"
                                style="margin-top:5px;">
                                关注ta
                            </el-button>
                            <el-button plain @click="delFan(fan.fid, userinfo.username)" v-show="fan" color="#135aaa"
                                style="margin-top:15px;">
                                取消关注
                            </el-button>
                        </div>
                        <el-dialog v-model="setting" width="40%" align-center>
                            <template #header>
                                <h2
                                    style="text-align:left;font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif">
                                    请选择需要开放的板块内容</h2>
                            </template>
                            <el-checkbox-group v-model="checkedModules" :min="1" style="text-align: left;">
                                <el-checkbox v-for="userModule in userModules" :key="userModule.key"
                                    :label="userModule.key">{{ userModule.name }}</el-checkbox>
                                <el-checkbox disabled>正在持续更新中</el-checkbox>
                            </el-checkbox-group>
                            <template #footer>
                                <span class="dialog-footer">
                                    <el-button @click="setting = false">取消</el-button>
                                    <el-button type="primary" @click="submitModules(checkedModules)">
                                        确定
                                    </el-button>
                                </span>
                            </template>
                        </el-dialog>
                    </el-col>
                </el-row>
            </div>
            <div class="contentDiv">
                <a-tabs v-model:activeKey="activeKey" @edit="onEdit">
                    <a-tab-pane key="收藏列表"
                        :tab="'收藏列表' + (!userModules['收藏列表'].checked ? '(未' + (!noMyself ? '向他人' : '') + '开放)' : '')"
                        :closable="false">
                        <el-empty v-if="!userModules['收藏列表'].checked && noMyself" image="/img/webImg/noPermission.png"
                            description="up尚未开启该模块的访问权限" />
                        <div v-else>
                            <a-empty v-show="collections.length == 0"
                                image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                                :image-style="{
                                    height: '60px',
                                }">
                            </a-empty>
                            <div class="artItem" v-for="item in collections">
                                <a class="title">
                                    <p>
                                        {{ item.title }}
                                    </p>
                                </a>
                                <div>
                                    <div>
                                        <a-row>
                                            <a-col :span="18">
                                                <a>
                                                    <p id="content">
                                                        {{ item.tinymes }}
                                                    </p>
                                                </a>
                                                <div style="display: inline-flex;height:20px;margin-top:20px;">
                                                    <p class="operation-b-img">
                                                        <EyeOutlined />
                                                        <span class="num ">{{ item.watched }}次阅读</span>
                                                    </p>
                                                    <p class="operation-b-img">
                                                        <LikeOutlined />
                                                        <span class="num ">{{ item.like }}人觉得不错</span>
                                                    </p>
                                                    <p class="operation-b-img">
                                                        <DislikeOutlined />
                                                        <span class="num "></span>
                                                    </p>
                                                    <span style="color:grey;margin-right:16px;">|</span>
                                                    <a target="_blank" href="https://blog.csdn.net/weixin_44350337">
                                                        <MessageOutlined />
                                                        <span>{{ item.comments }}</span>
                                                    </a>

                                                    <a target="_blank" href="https://blog.csdn.net/weixin_44350337"
                                                        style="margin-left:15px">
                                                        <UserOutlined />
                                                        <span>{{ item.username }}</span>
                                                    </a>

                                                </div>
                                            </a-col>
                                        </a-row>
                                    </div>
                                </div>
                                <a-divider />
                            </div>
                        </div>
                    </a-tab-pane>
                    <a-tab-pane key="关注列表"
                        :tab="'关注列表' + (!userModules['关注列表'].checked ? '(未' + (!noMyself ? '向他人' : '') + '开放)' : '')"
                        :closable="false">
                        <el-empty v-if="!userModules['关注列表'].checked && noMyself" description="up尚未开启该模块的访问权限"
                            image="/img/webImg/noPermission.png" />
                        <a-collapse v-else @change="collapseChange" v-model:activeKey="activeCollapse" accordion ghost>
                            <a-collapse-panel v-for="(collapse, index) in collapses" :header="collapse.key" :key="index">
                                <template #extra>
                                    <UserOutlined />
                                    <span style="margin-left:5px;color:grey;font-weight:600">共 {{
                                        collapse.total
                                    }} 人</span>
                                </template>
                                <a-list :loading="initLoading" item-layout="horizontal" :data-source="collapse.list"
                                    :split="false">
                                    <template #header>
                                        <a-tabs v-model:activeKey="collapse.sortKey" @change="sortChange">
                                            <a-tab-pane key="0" tab="默认排序"></a-tab-pane>
                                            <a-tab-pane key="1" tab="最近关注"></a-tab-pane>
                                        </a-tabs>
                                    </template>
                                    <template #loadMore>
                                        <a-pagination v-model:current="collapse.current" v-model:page-size="pageSize"
                                            :total="collapse.total" @change="currentChange(collapse, index)">
                                        </a-pagination>
                                    </template>
                                    <template #renderItem="{ item }">
                                        <a-list-item>
                                            <template #actions>
                                                <a-dropdown :trigger="['click']">
                                                    <a-button size="small">
                                                        <TeamOutlined v-if="item.fanEach" />
                                                        <UserOutlined v-else />
                                                        {{ !item.fanEach ? '已关注' : '已互相关注' }}

                                                    </a-button>
                                                    <template #overlay>
                                                        <a-menu>
                                                            <a-menu-item key="0" @click="openGroupForm(item)">
                                                                <MenuOutlined />
                                                                设置分组
                                                            </a-menu-item>
                                                            <a-menu-divider />
                                                            <a-menu-item key="1" style="color:red"
                                                                @click="delFan(item.fid, item.username)">
                                                                <UserDeleteOutlined />
                                                                取消关注
                                                            </a-menu-item>
                                                        </a-menu>
                                                    </template>
                                                </a-dropdown>
                                            </template>
                                            <a-skeleton avatar :title="false" :loading="!item.loading" active>
                                                <a-list-item-meta>
                                                    <template #description>
                                                        <p
                                                            style="color:gray;font-size:15px;overflow: hidden;text-overflow:ellipsis; white-space: nowrap;width:100%">
                                                            {{ item.describe }}</p>
                                                    </template>
                                                    <template #title>
                                                        <a :href="`/user/${item.id}`">{{ item.username }}</a>
                                                    </template>
                                                    <template #avatar>
                                                        <a-avatar :src="'/img/userHead/' + item.head" />
                                                    </template>
                                                </a-list-item-meta>
                                            </a-skeleton>
                                        </a-list-item>
                                    </template>
                                </a-list>
                            </a-collapse-panel>
                        </a-collapse>
                    </a-tab-pane>
                    <a-tab-pane key="发布列表"
                        :tab="'发布列表' + (!userModules['发布列表'].checked ? '(未' + (!noMyself ? '向他人' : '') + '开放)' : '')"
                        :closable="false">
                        <el-empty v-if="!userModules['发布列表'].checked && noMyself" description="up尚未开启该模块的访问权限"
                            image="/img/webImg/noPermission.png" />
                        <userList v-else></userList>
                    </a-tab-pane>
                    <a-tab-pane key="发布数量打卡"
                        :tab="'变动详情' + (!userModules['发布数量打卡'].checked ? '(未' + (!noMyself ? '向他人' : '') + '开放)' : '')"
                        :closable="false">
                        <el-empty v-if="!userModules['发布数量打卡'].checked && noMyself" description="up尚未开启该模块的访问权限"
                            image="/img/webImg/noPermission.png" />
                        <a-calendar v-else v-model:value="activeDate" @panelChange="onPanelChange" :locale="zhCN">
                            <template #dateCellRender="{ current }">
                                <ul class="events">
                                    <li v-for="item in getClockEvents(current)" :key="item.event">
                                        <a-badge :status="eventType[item.type]" :text="item.event" />
                                    </li>
                                </ul>
                            </template>
                            <template #monthCellRender="{ current }">
                                <SmileOutlined style="font-size:80px;text-align:center;width:100%" />
                            </template>
                        </a-calendar>
                    </a-tab-pane>
                    <a-tab-pane key="粉丝列表"
                        :tab="'粉丝列表' + (!userModules['粉丝列表'].checked ? '(未' + (!noMyself ? '向他人' : '') + '开放)' : '')"
                        :closable="false">
                        <el-empty v-if="!userModules['粉丝列表'].checked && noMyself" description="up尚未开启该模块的访问权限"
                            image="/img/webImg/noPermission.png" />
                        <a-list v-else :loading="fanList.initLoading" item-layout="horizontal" :data-source="fanList.list"
                            :split="false">
                            <template #header>
                                <a-tabs v-model:activeKey="fanList.sortKey" @change="listSortChange">
                                    <a-tab-pane key="0" tab="默认排序"></a-tab-pane>
                                    <a-tab-pane key="1" tab="按时间排序"></a-tab-pane>
                                </a-tabs>
                            </template>
                            <template #loadMore>
                                <a-pagination v-model:current="fanList.current" v-model:page-size="fanList.pageSize"
                                    :total="fanList.total" @change="fanListCurrentChange(fanList, index)">
                                </a-pagination>
                            </template>
                            <template #renderItem="{ item }">
                                <a-list-item>
                                    <template #actions>
                                        <a-dropdown :trigger="['click']">
                                            <a-button size="small">
                                                <TeamOutlined v-if="item.fanEach" />
                                                <UserOutlined v-else />
                                                {{ !item.fanEach ? '更多' : '已互相关注' }}
                                            </a-button>
                                            <template #overlay>
                                                <a-menu>
                                                    <a-menu-item key="0">
                                                        <SearchOutlined />
                                                        <a :href="`/user/${item.id}`" append>查看详情</a>
                                                    </a-menu-item>
                                                    <a-menu-divider />
                                                    <a-menu-item key="1" style="color:#3760ea" v-if="!item.fanEach"
                                                        @click="addFan(loginId, item.id)">
                                                        <UserAddOutlined />
                                                        关注ta
                                                    </a-menu-item>
                                                </a-menu>
                                            </template>
                                        </a-dropdown>
                                    </template>
                                    <a-skeleton avatar :title="false" :loading="!item.loading" active>
                                        <a-list-item-meta>
                                            <template #description>
                                                <p
                                                    style="color:gray;font-size:15px;overflow: hidden;text-overflow:ellipsis; white-space: nowrap;width:100%">
                                                    {{ item.describe }}</p>
                                            </template>
                                            <template #title>
                                                <a :href="`/user/${item.id}`">{{ item.username }}</a>
                                            </template>
                                            <template #avatar>
                                                <a-avatar :src="'/img/userHead/' + item.head" />
                                            </template>
                                        </a-list-item-meta>
                                    </a-skeleton>
                                </a-list-item>
                            </template>
                        </a-list>
                    </a-tab-pane>
                </a-tabs>
            </div>
        </template>
    </layout>
</template>
<script>
import layout from '../layout/layout.vue'
import { defineComponent, createVNode } from 'vue'
import { message, Modal } from 'ant-design-vue'
import { SearchOutlined, UserAddOutlined, SmileOutlined, PlusOutlined, ExclamationCircleOutlined, TeamOutlined, UserDeleteOutlined, MenuOutlined, UpOutlined, DownOutlined, LikeOutlined, DislikeOutlined, UserOutlined, EyeOutlined, MessageOutlined } from '@ant-design/icons-vue'
import cookie from 'js-cookie'
import userList from '../useraArtList.vue'
import { formatDate } from '@/lib/js/tools'
import 'moment/locale/zh-cn';
import { notification } from '@/lib/js/tools.js'

export default defineComponent({
    data() {
        return {
            breadcrumbs: "",
            noMyself: true,
            loginId: '',
            uid: '',
            userinfo: {},
            describe: '',
            onEnter: false,
            setting: false,
            userModules: {
                "发布列表": {
                    "name": "加载中...",
                    "checked": true
                },
                "发布数量打卡": {
                    "name": "加载中...",
                    "checked": true
                },
                "收藏列表": {
                    "name": "加载中...",
                    "checked": true
                },
                "关注列表": {
                    "name": "加载中...",
                    "checked": true
                },
                "粉丝列表": {
                    "name": "加载中...",
                    "checked": true
                },
            },
            checkedModules: [],
            activeKey: '收藏列表',
            collections: [],
            collapses: [],
            initLoading: true,
            activeCollapse: '0',
            sortKey: '1',
            pageSize: 15,

            setGroups: false,
            group: 1,
            addGroupName: '',
            add: true,
            activeFObj: {},
            activeName: '',
            fan: null,

            activeDate: '',
            dateInfo: {},
            eventType: {
                0: 'success',
                1: 'error',
                2: 'warning',
                3: 'default',
                4: 'processing'
            },
            fanList: {
                initLoading: false,
                current: 1,
                total: 50,
                list: [],
                sortKey: '0',
                pageSize: 15
            }
        }
    },
    mounted() {
        this.uid = parseInt(this.$route.params.uid)
        this.loginId = cookie.get('/user/uid')
        this.activeKey = this.$route.query.activeKey
        this.$users.getUserInfoByIds(this.uid).then(({ data }) => {

            if (data.list.length == 0) {
                this.$router.push({
                    name: "error",
                    params: {
                        code: 404,
                        describe: "您查找的用户不存在"
                    }
                })
            }
            this.userinfo = data.list[0]
            this.describe = this.userinfo.describe
            this.getUserClocks(new Date(), new Date(), this.userinfo.id)
            if (this.loginId == this.uid) {
                this.noMyself = false
            } else {
                // 是否已关注
                if (this.loginId)
                    this.$users.getUser2Up(this.loginId, this.uid).then(res => {
                        this.fan = res.fanRelation
                    })
            }
            this.breadcrumbs = [{
                menu: this.userinfo.username + " 的个人空间",
                href: '/'
            }]
        })
        this.getModules()
        this.$ColReq.getAllColByUid(this.uid).then(res => {
            this.collections = res
        })
        this.$FanReq.getGroups(this.uid).then(res => {
            for (let collapse of res) {

                this.collapses.push({
                    key: collapse,
                    current: 1,
                    total: 0,
                    sortKey: '1',
                    list: []
                })
            }
        })
        this.getFans(this.uid, 1, this.pageSize, this.sortKey, 0)
        this.getFanList(this.uid, 1, this.fanList.pageSize, this.fanList.sortKey, 0)
    },
    methods: {
        getClockEvents(date) {
            return this.dateInfo[formatDate(date.$d, "YY-MM-DD")]?.events ?? []
        },
        getUserClocks(start, end, uid) {
            this.$ClockReq.getUserClocks(start, end, uid).then(res => {
                for (let date in res) {
                    if (res[formatDate(date, "YY-MM")] == null) {
                        res[formatDate(date, "YY-MM")] = 1
                    } else {
                        res[formatDate(date, "YY-MM")]++
                    }
                }
                this.dateInfo = res

            })
        },
        onPanelChange(value, mode) {


            this.getUserClocks(value.$d, value.$d, this.userinfo.id)
        },
        fanListCurrentChange(fanListInfo, index) {
            this.getFanList(this.uid, fanListInfo.current, fanListInfo.pageSize, fanListInfo.sortKey)
        },
        getModules() {
            this.$UMs.getUserModules(this.uid).then(res => {
                this.userModules = res
                for (let UM in res) {
                    if (res[UM].checked) {
                        this.checkedModules.push(res[UM].key)
                    }
                }
            })
        },
        submitModules(checkedModules) {

            this.$UMs.updateModules(this.uid, checkedModules).then(res => {

                this.getModules()
            })
        },
        submitGroup(item, newType) {

            this.$FanReq.updateGroup(item.fid, newType)
            this.setGroups = false
        },
        addGroup() {
            this.add = true
            let name = this.addGroupName

            this.$FanReq.addGroup(this.uid, name).then((res) => {
                message.success("添加成功")
                this.collapses.push({
                    key: name,
                    current: 1,
                    total: 0,
                    sortKey: '1',
                    list: []
                })
            })
        },
        openGroupForm(item) {

            this.acitveFObj = item
            this.activeName = item.username
            this.group = item.ftype
            this.setGroups = true
        },
        currentChange(collapse, index) {
            this.getFans(this.uid, collapse.current, this.pageSize, this.sortKey, index)
        },
        getFans(loginUid, page, limit, sortKey, type) {
            this.initLoading = true
            this.$FanReq.getLUFans(loginUid, page, limit, sortKey, type).then(res => {
                res = res.map(e => {
                    e.loading = true
                    return e
                })
                this.collapses[type].list = res
                this.collapses[type].total = res[0]?.size ?? 0
                this.initLoading = false
            })
        },
        getFanList(loginUid, page, limit, sortKey) {
            this.fanList.initLoading = true
            this.$FanReq.getFansList(loginUid, page, limit, sortKey).then(res => {
                res = res.map(e => {
                    e.loading = true
                    return e
                })

                this.fanList.list = res
                this.fanList.total = res[0]?.size ?? 0
                this.fanList.initLoading = false

            })
        },
        addFan(loginId, upuid) {
            if (loginId && upuid) {
                this.$users.addFan(loginId, upuid).then(res => {
                    if (res) {
                        message.success("关注成功!")
                        this.fan = res


                    }
                }).catch(err => {
                    message.error(err)
                })
            }
            else if (loginId == null) {
                message.warning("您尚未登录,请先登录")
            } else if (upuid == null) {
                message.warning("上传用户已注销/不存在")
            }
        },
        delFan(fid, name) {
            let self = this
            Modal.confirm({
                title: "取消关注",
                icon: createVNode(ExclamationCircleOutlined),
                content: '您确定要取消关注' + name + "吗?",
                okText: '确定',
                okType: 'danger',
                cancelText: '取消',
                onOk() {
                    self.$users.delFan(fid).then(res => {

                        if (res.resultCode == 200) {
                            if (res.data == 1) {
                                message.success("已取消关注")
                                self.fan = null
                            }
                            self.collapseChange(self.activeCollapse)
                        } else {
                            message.error(res)
                        }
                    })
                }
            })
        },
        enterMethod() {
            this.onEnter = true

        },
        enterBlur() {
            this.onEnter = false
        },
        sortChange(sortKey) {
            let tag = this.collapses[this.activeCollapse]
            this.getFans(this.uid, tag.current, this.pageSize, sortKey, this.activeCollapse)
        },
        listSortChange(sortKey) {
            this.getFanList(this.uid, this.fanList.current, this.fanList.pageSize, sortKey)
        },
        collapseChange(key) {
            if (key) {
                this.reset(this.collapses[key])
                this.getFans(this.uid, 1, this.pageSize, '1', key)
            }
        },
        reset(target) {

            target.current = 1
            target.total = 0
            target.sortKey = '1'
            target.list = []
        }
    },
    components: {
        layout, userList, SmileOutlined, SearchOutlined, UserAddOutlined,
        PlusOutlined, TeamOutlined, UserDeleteOutlined, MenuOutlined, UpOutlined, DownOutlined, LikeOutlined, DislikeOutlined, UserOutlined, EyeOutlined, MessageOutlined
    }
})
</script>
<style>
.userTitle {
    background-color: white;
    padding: 5px;
    border-radius: 2%;
    margin-top: 25px;
}

.contentDiv {
    background-color: white;
    padding: 10px
}

#content {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    color: darkgrey;
    margin-top: 15px;
}

.tag {
    font-size: 13px;
    font-family: PingFang SC, Hiragino Sans GB, Arial, Microsoft YaHei, Verdana, Roboto, Noto, Helvetica Neue, sans-serif;
    width: 55px;

}

.pull {
    margin: 0 auto;
    width: 30px;
    background-color: gainsboro;
    border-bottom-left-radius: 45%;
    border-bottom-right-radius: 45%;
    height: 10px;
    text-align: center;
    line-height: 10px;
}

#main {
    margin: 15px auto;
}

.title {
    padding: 0;
    color: black;
}

.title p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 320px;
    -o-text-overflow: ellipsis;
    font-size: 20px;
    height: 30px;
    margin-bottom: 0px;
}

.operation-c {
    float: left;
}

.artItem {
    background: white;
    padding: 10px;
    border-radius: 10px;
}

.input-with-select {
    border: solid 1px rgb(16, 148, 201);
    border-radius: 3px;
    margin-top: 65px;
    z-index: 1
}

.statistics {
    margin-top: 15px;
    text-align: center;
}

.na,
.nh {
    float: left;
    margin-right: 25px
}

.k {
    color: #99a2aa
}

.na :hover {
    color: rgb(16, 148, 201)
}

.events {
    list-style: none;
    margin: 0;
    padding: 0;
}

.events .ant-badge-status {
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    text-overflow: ellipsis;
    font-size: 12px;
}
</style>