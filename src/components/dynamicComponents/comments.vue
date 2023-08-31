<template>
    <div>
        <a-comment v-for="(item, index) in ((inner || readOnly) ? commentsValue : comments)" :key="index">
            <template #actions>
                <span key="comment-basic-like" v-if="!readOnly">
                    <a-tooltip title="Like">
                        <template v-if="item.points.has(parseInt(loginId))">
                            <LikeFilled @click="like(item)" />
                        </template>
                        <template v-else>
                            <LikeOutlined @click="like(item, false)" />
                        </template>
                    </a-tooltip>
                    <span style="padding-left: 8px; cursor: auto">
                        {{ item.points.size == 0 ? '' : item.points.size }}
                    </span>
                </span>
                <span key="comment-basic-dislike" v-if="!readOnly">
                    <a-tooltip title="Dislike">
                        <template v-if="item.dislikes.has(parseInt(loginId))">
                            <DislikeFilled @click="dislike(item)" />
                        </template>
                        <template v-else>
                            <DislikeOutlined @click="dislike(item, false)" />
                        </template>
                    </a-tooltip>
                    <span style="padding-left: 8px; cursor: auto">
                        {{ item.dislikes.size == 0 ? '' : item.dislikes.size }}
                    </span>
                </span>
                <span key="comment-basic-reply-to" @click="replay(item, index)" v-show="!readOnly">回复</span>
                <span key="comment-basic-reply-to" @click="showComments(item)"
                    v-show="item.toUid != null && !disabledDeatil"><a>查看评论详情</a></span>
            </template>
            <div v-show='item.visible' :style="{ 'position': 'relative', 'padding': '25px', 'height': '200px' }">
                <emotionInput @ok="(comment) => Submit(item, comment)">
                    <template #close>
                        <a-row>
                            <a-col :span="24">
                                <a-checkbox v-model:checked="item.needDynamic">同时发布动态</a-checkbox>
                            </a-col>
                            <a-col>
                                <a-button @click="close(item)" style="margin-top:10px">
                                    关闭回复
                                </a-button>
                            </a-col>
                        </a-row>
                    </template>
                </emotionInput>
                <!-- <a-textarea class="replay" v-model:value="value" :rows="4" />
          <a-button type="primary" @click="Submit(item)" style="margin-top:20px">
            发送评论
          </a-button> -->
            </div>
            <template #author><a>{{ item.author }}</a></template>
            <template #avatar>
                <a-avatar :src="item.head" />
            </template>
            <template #content>
                <!-- <p id="commentContent">{{ item.comment }}</p> -->
                <configHtml :html="item.comment" style="margin-top:15px"></configHtml>
            </template>
            <template #datetime>
                <a-tooltip :title="dayjs(new Date(item.date)).format('YYYY-MM-DD HH:mm:ss')">
                    <span>{{ getBeforeTime(new Date(item.date),true)}}前发布</span>
                </a-tooltip>
            </template>
            <!-- :inner="true" -->
            <comment :comments="item.children" ref="comment" :uid="uid" :aid="aid" :inner="true" :readOnly="readOnly"
                :disabledDeatil="disabledDeatil" @update="callback">
            </comment>
        </a-comment>
    </div>
</template>
<script>
import dayjs from 'dayjs';
import { LikeFilled, LikeOutlined, DislikeFilled, DislikeOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref, onMounted, toRefs, getCurrentInstance, watch } from 'vue';
import relativeTime from 'dayjs/plugin/relativeTime';
import { message } from 'ant-design-vue'
import cookie from 'js-cookie'
import { post, get, put, del } from '@/lib/js/axios'
import $ from 'jquery'
import { parseComments, getComments } from '@/utils/utils'
import configHtml from '../editHTML.vue'

import emotionInput from '../emotionComponents/emotionInput'
dayjs.extend(relativeTime);
export default defineComponent({
    data() {
        return {
            ShowDetail: true
        };
    },
    props: {
        readOnly: {
            type: Boolean,
            default: false
        },
        inner: {
            type: Boolean,
            default: false
        },
        comments: {
            type: Object,
            default: () => ({})
        },
        uid: {
            type: String,
            default: ''
        },
        aid: {
            type: String,
            default: ''
        },
        disabledDeatil: {
            type: Boolean,
            default: false
        }
    },

    name: 'comment',
    components: {
        LikeFilled,
        LikeOutlined,
        DislikeFilled,
        DislikeOutlined,
        configHtml,
        emotionInput
    },
    directives: {
        focus: {
            // 指令的定义
            mounted(el, binding) {
                if (binding.value)
                    el.focus()
                else
                    el.blur()
            }
        }
    },
    setup(props) {
        const self = getCurrentInstance()
        const { uid, aid } = toRefs(props);
        const likes = ref(0);
        const dislikes = ref(0);
        const loginId = ref(0)
        const value = ref('')
        let index = ref(0)
        let submitting = false
        let commentsValue = ref([])
        watch(() => { props.comments },
            (nV, old) => {
                
                commentsValue.value = props.comments
                
                self.proxy.$forceUpdate()
            }, { deep: true })
        const Submit = async (item, comment) => {
            try {
                
                if (loginId.value) {
                    
                    // 回复\
                    
                    await item.replay(loginId.value, comment,item.needDynamic)
                    self.proxy.$emit('update', uid.value, aid.value, 2)
                }
                else
                    message.info("请先登录")
            } catch (err) {
                
            }
        }
        const callback = (uid, aid, cType) => {
            self.proxy.$emit('update', uid, aid, cType)
        }
        onMounted(() => {
            let Id = cookie.get('/user/uid')
            if (Id) {
                loginId.value = parseInt(Id)
            }
            
            // 

            
            commentsValue.value = props.comments
            // 
        })

        const like = (item, flag = true) => {
            if (loginId.value == 0) {
                message.warning('请先登录')
                return
            }
            if (!flag) {
                self.appContext.config.globalProperties.$goodPoints.onLikeActive(loginId.value, item.cid, 0, 1).then(res => {
                    if (res.resultCode == 200) {
                        message.success('点赞成功')
                        item.dislikes.delete(loginId.value)
                        item.points.add(loginId.value)
                    }
                })
            } else {
                self.appContext.config.globalProperties.$goodPoints.deleteLike(loginId.value, item.cid, 0, 1).then(res => {
                    if (res.resultCode == 200) {
                        message.success('取消点赞')
                        item.points.delete(loginId.value)
                    } else {
                        message.error("操作失败")
                    }
                })
            }
            self.proxy.$forceUpdate()
        };
        const dislike = (item, flag = true) => {
            if (loginId.value == 0) {
                message.warning('请先登录')
                return
            }
            if (!flag) {
                
                self.appContext.config.globalProperties.$goodPoints.onLikeActive(loginId.value, item.cid, 1, 1).then(res => {
                    if (res.resultCode == 200) {
                        message.success('点踩成功')
                        item.points.delete(loginId.value)
                        item.dislikes.add(loginId.value)
                    } else {
                        message.error("操作失败")
                    }
                })
            } else {
                self.appContext.config.globalProperties.$goodPoints.deleteLike(loginId.value, item.cid, 1, 1).then(res => {
                    if (res.resultCode == 200) {
                        message.success('取消点踩')
                        item.dislikes.delete(loginId.value)
                    } else {
                        message.error("操作失败")
                    }
                })
            }
            self.proxy.$forceUpdate()
        };
        const replay = (item, idx) => {
            let id = cookie.get('/user/uid')
            index.value = idx
            
            if (!id) {
                message.error("请先登录")
            } else {
                item.visible = true
            }
            
        }

        const close = (item) => {
            item.visible = false
        }
        return {
            likes,
            dislikes,
            close,
            like,
            dislike,
            dayjs,
            replay,
            value,
            Submit,
            loginId,
            commentsValue,
            submitting,
            index,
            callback
        };
    },
    methods: {
        showComments(item) {
            item.showDetailComments()
        }
    }
});
</script>