<template>
    <layout :headMenu="['3']" :breadcrumbs="[{ href: '/dynamic', menu: '动态' }]">
        <template #content>
            <a-row type="flex" justify="space-around">
                <a-col :span="4">
                    <div class="card" style="margin-top:0px;position:sticky;top:0px">
                        <h3>话题</h3>
                        <div v-for=" t in topics" class="topic_item" :key="t.ttopic" style="margin-top:8px;">
                            <a-row>
                                <a-col :span="4">
                                    <svg t="1679213071078" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="2301" width="20" height="20">
                                        <path
                                            d="M568.886857 0C820.242286 0 1024 203.757714 1024 455.113143v455.113143A113.773714 113.773714 0 0 1 910.226286 1024h-455.131429C203.776 1024 0 820.242286 0 568.886857V455.131429C0 203.757714 203.757714 0 455.113143 0h113.773714z m145.188572 212.48a53.979429 53.979429 0 0 0-64.804572 33.974857l-1.243428 4.022857-31.872 118.4-2.267429-0.182857-2.285714-0.054857-99.401143-0.018286 24.32-90.368a53.668571 53.668571 0 0 0-38.144-65.755428 53.979429 53.979429 0 0 0-64.786286 33.956571l-1.261714 4.022857-31.817143 118.144-158.866286 0.018286a42.605714 42.605714 0 0 0-42.697143 42.514286c0 22.089143 16.932571 40.246857 38.582858 42.313143l4.114285 0.182857h135.990857l-38.125714 141.696h-97.865143a42.605714 42.605714 0 0 0-42.697143 42.532571c0 22.089143 16.932571 40.246857 38.582858 42.313143l4.114285 0.182857h74.971429l-23.844572 88.777143a53.668571 53.668571 0 0 0 38.125715 65.755429 53.979429 53.979429 0 0 0 64.804571-33.956572l1.243429-4.022857 31.36-116.553143h104.009143l-23.844572 88.777143a53.668571 53.668571 0 0 0 38.125714 65.755429 53.979429 53.979429 0 0 0 64.786286-33.956572l1.243429-4.022857 31.36-116.553143h138.368a42.605714 42.605714 0 0 0 42.697143-42.496 42.587429 42.587429 0 0 0-38.582858-42.313143l-4.114285-0.201143-115.474286-0.018285 85.321143-317.074286a53.668571 53.668571 0 0 0-38.125714-65.773714zM573.44 456.411429l-37.668571 140.434285h-102.765715l37.668572-140.434285h102.765714z m225.28-87.771429a43.885714 43.885714 0 1 0 0 87.771429 43.885714 43.885714 0 0 0 0-87.771429z"
                                            fill="#1296db" p-id="2302"></path>
                                    </svg>
                                </a-col>
                                <a-col :span="20">
                                    <a style="width:100%;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">{{
                                        t.ttopic }}</a>
                                </a-col>
                            </a-row>
                            <a-row>
                                <a-col :span="8">
                                    <p style="font-size: 10px;color:#bab7b6;">{{ t.tpartake }}人参与</p>
                                </a-col>
                                <a-col :span="8">
                                    <p style="font-size: 10px;color:#bab7b6;">{{
                                        t.tvisit }}人访问</p>
                                </a-col>
                            </a-row>
                        </div>
                        <a-spin :spinning="loadingTopic" tip="加载中..."
                            style="width:100%;text-align: center;"></a-spin>
                    </div>
                </a-col>
                <a-col :span="11">
                    <div>
                        <BlogMultiFunctionInput @afterSend="onAfterSend"></BlogMultiFunctionInput>
                        <div class="card">
                            <userSelector @change="userChange"></userSelector>
                        </div>
                        <div class="card" style="padding-bottom: 0px;">
                            <a-tabs v-model:activeKey="dynamicType" @change="tabChange">
                                <a-tab-pane key="-1" tab="全部"></a-tab-pane>
                                <a-tab-pane key="1" tab="评论动态"></a-tab-pane>
                                <a-tab-pane key="2" tab="文章动态"></a-tab-pane>
                            </a-tabs>
                        </div>
                        <div style="padding-bottom: 0px;" v-infinite-scroll="handleInfiniteOnLoad" class="infinite"
                            v-if="dynamics.length != 0 || loading" :infinite-scroll-disabled="busy"
                            :infinite-scroll-distance="0">
                            <a-spin :spinning="loading" style="text-align: center;width: 100%;"></a-spin>
                            <div class="card" v-for="(item, index) in dynamics" :key="item.DynamicInfo.dynamicId">
                                <a-row>
                                    <!-- 头像 -->
                                    <a-col :span="2">
                                        <a-avatar :src="`/img/userHead/${item.DynamicInfo.head}`"></a-avatar>
                                    </a-col>
                                    <!-- 姓名 动态时间简介 -->
                                    <a-col :span="20" style="text-align: left;">
                                        <p style="font-size:18px;color:#fb7299">{{ item.DynamicInfo.username }}</p>
                                        <p style="color:rgba(148, 148, 148, 0.897);font-size:10px">{{ getBeforeTime(new
                                            Date(item.DynamicInfo.ddate))
                                        }}前
                                            <span v-if="item.DynamicInfo.dtype == 1">·发布了一条评论</span>
                                            <span v-if="item.DynamicInfo.dtype == 2">·分享了一则文章</span>
                                        </p>
                                    </a-col>
                                    <!-- 操作，取消关注等 -->
                                    <a-col :span="2">
                                        <ellipsis-outlined class="action" rotate="90"
                                            @click="item.showAction = !item.showAction" />
                                        <div class="action_div" v-show="item.showAction" @blur="item.showAction = false">
                                            <a v-if="userinfo.id != item.DynamicInfo.id">取消关注</a>
                                            <!-- <a-divider style="margin:3px auto;"></a-divider> -->
                                            <a v-if="userinfo.id == item.DynamicInfo.id">删除动态</a>
                                            <a v-if="userinfo.id != item.DynamicInfo.id">举报</a>
                                        </div>
                                    </a-col>
                                </a-row>
                                <!-- 话题,如果有 -->

                                <a-row style="color:#5188ee;margin-top:10px;cursor:pointer;" v-if="item.topicInfo">
                                    <a-col :span="1">
                                        <svg t="1679213071078" viewBox="0 0 1024 1024" version="1.1"
                                            xmlns="http://www.w3.org/2000/svg" style="color: #000" p-id="2301" width="12"
                                            height="20">
                                            <path
                                                d="M568.886857 0C820.242286 0 1024 203.757714 1024 455.113143v455.113143A113.773714 113.773714 0 0 1 910.226286 1024h-455.131429C203.776 1024 0 820.242286 0 568.886857V455.131429C0 203.757714 203.757714 0 455.113143 0h113.773714z m145.188572 212.48a53.979429 53.979429 0 0 0-64.804572 33.974857l-1.243428 4.022857-31.872 118.4-2.267429-0.182857-2.285714-0.054857-99.401143-0.018286 24.32-90.368a53.668571 53.668571 0 0 0-38.144-65.755428 53.979429 53.979429 0 0 0-64.786286 33.956571l-1.261714 4.022857-31.817143 118.144-158.866286 0.018286a42.605714 42.605714 0 0 0-42.697143 42.514286c0 22.089143 16.932571 40.246857 38.582858 42.313143l4.114285 0.182857h135.990857l-38.125714 141.696h-97.865143a42.605714 42.605714 0 0 0-42.697143 42.532571c0 22.089143 16.932571 40.246857 38.582858 42.313143l4.114285 0.182857h74.971429l-23.844572 88.777143a53.668571 53.668571 0 0 0 38.125715 65.755429 53.979429 53.979429 0 0 0 64.804571-33.956572l1.243429-4.022857 31.36-116.553143h104.009143l-23.844572 88.777143a53.668571 53.668571 0 0 0 38.125714 65.755429 53.979429 53.979429 0 0 0 64.786286-33.956572l1.243429-4.022857 31.36-116.553143h138.368a42.605714 42.605714 0 0 0 42.697143-42.496 42.587429 42.587429 0 0 0-38.582858-42.313143l-4.114285-0.201143-115.474286-0.018285 85.321143-317.074286a53.668571 53.668571 0 0 0-38.125714-65.773714zM573.44 456.411429l-37.668571 140.434285h-102.765715l37.668572-140.434285h102.765714z m225.28-87.771429a43.885714 43.885714 0 1 0 0 87.771429 43.885714 43.885714 0 0 0 0-87.771429z"
                                                fill="#1296db" p-id="2302"></path>
                                        </svg>
                                    </a-col>
                                    <a-col>
                                        <p style="cursor:pointer;"> <a>{{ item.topicInfo.ttopic }}</a></p>
                                    </a-col>
                                </a-row>

                                <!-- 动态内容 -->
                                <editHTML style="margin-top:10px;font-size: 13px;" :html="item.DynamicInfo.dcontent">
                                </editHTML>
                                <!-- 动态图片，如果有 -->
                                <div v-if="item.DynamicInfo.dtype == 0">
                                    <photo-provider style="display: flex;" v-if="item.DynamicInfo.dsrc != null">
                                        <photo-consumer v-for="src in item.DynamicInfo.dsrc.split(',')"
                                            :intro="`/img/dynamicImg/${src}`" :key="`/img/dynamicImg/${src}`"
                                            :src="`/img/dynamicImg/${src}`">
                                            <img :src="`/img/dynamicImg/${src}`" class="view-box">
                                        </photo-consumer>
                                    </photo-provider>
                                </div>
                                <!-- 文章分享或评论动态 -->
                                <div v-else>
                                    <!-- 评论动态 -->
                                    <div v-if="item.DynamicInfo.dtype == 1">
                                        <div style="border-left: 2.5px gainsboro solid;margin-top:15px;padding-left: 10px;"
                                            v-if="item.commentInfo.replayComment">
                                            <CommentOutlined style="margin-right:10px;color:grey" />
                                            <span style="color:gray">{{
                                                item.commentInfo.replayComment.username }}:&nbsp&nbsp
                                                <span style="color:grey">{{
                                                    item.commentInfo.replayComment.content }}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <!-- 文章分享 -->
                                    <div v-if="item.DynamicInfo.dtype == 2">
                                        <div class="article" v-if="item.articleInfo">
                                            <a-row>
                                                <a-col :span="7">
                                                    <img :src="`/img/userHead/2.jpeg`" style="width:60%">``
                                                </a-col>
                                                <a-col :span="16">
                                                    <a>
                                                        <p
                                                            style="font-size: 18px;font-weight: 300;text-align: left;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">
                                                            {{ item.articleInfo.article.title }}</p>
                                                    </a>
                                                    <iconInfo disabled style="position: relative;margin-top:10%"
                                                        :types="[false, true, true, false, true, true]"
                                                        :data="[0, item.articleInfo.article.comments, item.articleInfo.article.like, 0, item.articleInfo.article.collected, item.articleInfo.article.watched]">
                                                    </iconInfo>
                                                </a-col>
                                            </a-row>
                                            <div v-if="item.articleInfo.bestComment"
                                                style="border-left: 2.5px gainsboro solid;margin-top:15px;padding-left: 10px;">
                                                <CommentOutlined style="margin-right:10px;color:cornflowerblue" />
                                                <span style="color:gray">{{
                                                    item.articleInfo.bestComment.username }}:&nbsp&nbsp
                                                    <span style="color:grey">{{
                                                        item.articleInfo.bestComment.content }}</span>
                                                </span>
                                                <FireOutlined style="color:firebrick;margin-left: 10px;" />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <!-- 文章首个评价，回复评论, 如果有 -->
                                <div>

                                </div>
                                <!-- 三连 -->
                                <iconInfo style="position: relative;margin-top:10px;width:40%"
                                    @onComment="onComment(item, index)"
                                    :types="[true, item.DynamicInfo.responseType == 0 || item.DynamicInfo.responseType == 2, true, false, false, false]"
                                    :filled="[!item.nolike, true, true]" :data="[0, 0, item.uidSet.length, 0, 0, 0]"
                                    @onLike="(dataReal, filledReal) => onLike(item.DynamicInfo.did, dataReal, filledReal)">
                                </iconInfo>
                                <!-- 评论详情 -->
                                <comment ref="comment" :cType="2" v-if="item.showComment" :userInfo="userinfo"
                                    :uid="userinfo.id"
                                    :placeholder="item.DynamicInfo.responseType == 2 ? '已开启精选评论' : '你猜我的评论区在等谁'"
                                    :aid="item.DynamicInfo.did">
                                </comment>
                            </div>
                        </div>
                        <a-empty v-else class="card"></a-empty>
                    </div>
                </a-col>
                <a-col :span="6">
                    <a-card style="position:sticky;top:0px">
                        <img alt="back" :src="'/img/userBackImg/' + userinfo.cardimg" style="width:100%" />
                        <template #actions>
                            <a-row style="padding:8px;">
                                <a-col :span="8">
                                    <div style="text-align:center">
                                        <p class="fieldInfo" style="font-size:12px"><a
                                                :href="`/user/${userinfo.id}?activeKey=发布列表`">{{ userinfo.submits }}</a></p>
                                        <p class="fieldName" style="font-size:12px"><a
                                                :href="`/user/${userinfo.id}?activeKey=发布列表`">发布</a></p>
                                    </div>
                                </a-col>
                                <a-col :span="8">
                                    <div style="text-align:center">
                                        <p class="fieldInfo" style="font-size:12px"><a
                                                :href="`/user/${userinfo.id}?activeKey=关注列表`">{{ userinfo.followers }}</a>
                                        </p>
                                        <p class="fieldName" style="font-size:12px"><a
                                                :href="`/user/${userinfo.id}?activeKey=关注列表`">关注</a></p>
                                    </div>
                                </a-col>
                                <a-col :span="8">
                                    <div style="text-align:center">
                                        <p class="fieldInfo" style="font-size:12px">{{ userinfo.interviewer }}</p>
                                        <p class="fieldName" style="font-size:12px">访问</p>
                                    </div>
                                </a-col>
                            </a-row>
                        </template>
                        <a-card-meta :title="userinfo.username" :description="userinfo.describe" style="margin-top:10px;">
                            <template #avatar>
                                <a-avatar :src="'/img/userHead/' + userinfo.head" />
                            </template>
                        </a-card-meta>
                    </a-card>
                </a-col>
            </a-row>
        </template>
    </layout>
</template>
<script>
import layout from '../layout/layout.vue'
import editHTML from '../editHTML'
import BlogMultiFunctionInput from '../dynamicComponents/multiFunctionInput.vue'
import comment from '../dynamicComponents/comment.vue'
import userSelector from '../dynamicComponents/userSelector'
import { EllipsisOutlined, CommentOutlined, FireFilled as FireOutlined } from '@ant-design/icons-vue'
import iconInfo from '@/components/UtilComponents/threeIconInfo'
import { notification } from '@/lib/js/tools.js'
import { message } from 'ant-design-vue'
export default {
    name: 'BlogDynamic',
    data() {
        return {
            dynamics: [],
            loadingTopic:true,
            page: 1,
            dynamicType: '-1',
            busy: true,
            loading: true,
            userinfo: this.$store.state.myself,
            user: {
                id: -1
            },
            topics: []
        }
    },
    mounted() {
        
        this.getDynamics(this.page, 15)
        this.$topic.getAllTopicsWithNoThrottle(1, 10, "").then(res => {
            this.loadingTopic = false
            this.topics = res
        })
    },

    methods: {
        onComment(item, index) {
            item.showComment = !item.showComment
        },
        onLike(id, dataReal, filledReal) {
            
            if (this.userinfo.id == null) {
                notification('警告', 'warning', '请先登录')
                return
            }
            this.$goodPoints.onLikeActive(this.userinfo.id, id, 5, 2).then(res => {
                if (res.resultCode == 200) {
                    message.success('点赞成功')
                    filledReal[0] = false
                    dataReal[2]++
                }
            })
        },
        getDynamics(page, limit, uid, type) {
            this.$dynamic.getDynamicInfo(page, limit, uid, type).then(res => {
                this.dynamics = this.dynamics.concat(res.map(e => {
                    e.showAction = false
                    e.nolike = new Set(e.uidSet).has(this.userinfo.id)
                    e.comments = []
                    e.showComment = false
                    
                    e.DynamicInfo.dcontent = e.DynamicInfo.dcontent.replace(/`(@.*:)`/, `<a style='color:#2693ff;cursor:default;'>$1</a>`)
                    
                    return e
                }))
                if (res.length == 0) {
                    this.$message.warning('已全部加载');
                    this.busy = true
                    this.loading = false;
                    return
                }
                this.loading = false;
                this.busy = false
                
            })
        },
        handleInfiniteOnLoad() {
            this.loading = true;
            this.busy = true
            this.getDynamics(++this.page, 15,this.user.id == -1 ? null : this.user.id,this.dynamicType)
        },
        tabChange(key) {
            this.dynamics = []
            this.page = 1
            this.loading = true
            this.getDynamics(this.page, 15, this.user.id == -1 ? null : this.user.id, key)
        },
        userChange(user) {
            this.dynamics = []
            this.loading = true
            this.user = user
            this.getDynamics(this.page, 15, user.id == -1 ? null : user.id, this.dynamicType)
        },
        onAfterSend(val) {
            this.dynamics.splice(0, 0, val)
        }
    },
    components: {
        layout,
        BlogMultiFunctionInput,
        userSelector,
        iconInfo,
        FireOutlined,
        CommentOutlined,
        EllipsisOutlined,
        comment,
        editHTML
    },
};
</script>
<style  scoped>
.card {
    padding: 15px;
    border-radius: 5px;
    background: white;
    margin-top: 16px;

}

.action_div::before {
    content: "";
    display: block;
    position: absolute;
    left: 0px;
    top: -18px;
    border-width: 10px;
    border-style: dashed solid dashed dashed;
    border-color: transparent transparent rgb(247, 245, 245) transparent;
}

.action_div {
    position: absolute;
    padding: 5px;
    width: 90px;
    border: 1px rgb(247, 245, 245) solid;
    background: rgb(247, 245, 245);
    margin-top: 5px;
    box-shadow: rgba(58, 45, 133, 0.25) 0px 48px 100px 0px;
}


.action {
    color: rgba(148, 148, 148, 0.897);
    font-size: 20px;
}

.action:hover {
    color: #83ccef;
}

.view-box {
    width: 100px;
    margin-top: 15px;
    margin-right: 18px;
}

.infinite {
    border-radius: 4px;
    width: 100%;
}

.infinite::-webkit-scrollbar {
    display: none;
}

.article {
    width: 550px;
    margin-left: 5px;
    margin-top: 15px;
    border: solid 1px gainsboro;
    border-radius: 4px;
    padding: 15px;
}

img {
    border-radius: 10px;
    ;
}
</style>