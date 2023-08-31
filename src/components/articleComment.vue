<template>
    <div>
        <a-drawer v-model:visible="visible" class="custom-class" size="large" style="" title="评论区" placement="right"
            @after-visible-change="afterVisibleChange">
            <a-spin :spinning="isloading" tip="正在获取最新评论" style="text-align:center;width:100%"></a-spin>
            <comment :comments="comments" ref="comment" @returnRoot="returnRoot" :uid="uid" :aid="aid"></comment>
            <a-divider></a-divider>
            <div style="position: relative;padding:25px;height:200px">
                <emotionInput @ok="(comment) => handleSubmit(comment)"></emotionInput>
                <!-- <a-button :loading="submitting" type="primary" @click="handleSubmit" style="margin-top:20px">
                    发送评论
                </a-button> -->
            </div>
            <!-- asdadiasufvnuaivubduadhuhdhhdhello world what are you doing o shit w i love you so much and i want to look here where are you i come from newyork oh metooo -->
            <a-drawer v-model:visible="ShowDetail" title="评论详情" width="320" :closable="false">
                <a-spin :spinning="detailloading" tip="正在查询详情" style="text-align:center;width:100%"></a-spin>
                <comment v-model:comments="detailcomments" ref="detailcomment" @returnRoot="returnRoot" :uid="uid" :aid="aid" v-if="ShowDetail" :readOnly="true"></comment>
            </a-drawer>
        </a-drawer>
    </div>
</template>
<script>
import dayjs from 'dayjs';
import { LikeFilled, LikeOutlined, DislikeFilled, DislikeOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref, toRefs, onMounted, getCurrentInstance, reactive } from 'vue';
import { message } from 'ant-design-vue'
import comment from './comments.vue'
import cookie from 'js-cookie'
import relativeTime from 'dayjs/plugin/relativeTime';
import { post, get } from '../lib/js/axios'
import { formatDate } from '../lib/js/tools'
import { parseComments } from '../utils/utils'

import emotionInput from './emotionComponents/emotionInput'
import commentsVue from './comments.vue';
dayjs.extend(relativeTime);

export default defineComponent({
    props: {
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
        cType:{
            type:Number,
            default: 1
        }
    },
    data() {
        return {
            ShowDetail: false,
            detailcomments: [],
            detailloading:false
        };
    },
    components: {
        comment,
        LikeFilled,
        LikeOutlined,
        DislikeFilled,
        DislikeOutlined,
        emotionInput
    },
    watch: {
        detailcomments(newVal, oldVal) {
            
            

            let t = setInterval(() => {
                
                this.$refs.detailcomment.$props.comments = newVal
                
                clearInterval(t)
            }, 1000)
        }
    },
    setup(props) {
        const { uid, aid,cType,comments } = toRefs(props);
        const { proxy, data } = getCurrentInstance();
        const visible = ref(false);
        const userInfo = ref()
        const isloading = ref(false)
        const submitting = ref(false);
        const loginId = ref(0)
        const afterVisibleChange = bool => {
            
        };
        const showDrawer = () => {
            visible.value = true;
        };

        const getComment = () => {
            return new Promise((resolve) => {
                isloading.value = true
                get(`/comment/getComments?uid=${uid.value}&aid=${aid.value}&cType=${cType.value}`).then(res => {
                    
                    let data = parseComments(res.data.data)
                    isloading.value = false
                    resolve(data)
                }).catch(err => {
                    isloading.value = false
                    resolve(err)
                })
            })
        }

        const setVal = (val) => {
            
        }
        const handleSubmit = (comment) => {
            if (loginId.value == '') {
                message.warning("请先登录")
                return
            }
            if (comment == '') {
                message.warning("评论为空")
                return;
            }
            submitting.value = true;
            post('/comment/insertComment', {
                uid: uid.value,
                aid: aid.value,
                content: comment,
                fromUid: loginId.value,
                toUid: null,
                date: formatDate(new Date()),
                precid: null,
                ctype:cType.value
            }).then(res => {
                if (res.resultCode == 200) {
                    // let data = userInfo.value
                    submitting.value = false
                    message.success("发表成功")
                    proxy.$emit('showComment')
                } else {
                    message.error('发送异常，请检查网络')
                    submitting.value = false
                }
            }).catch(err => {
                message.error(err)
                submitting.value = false
            })
        };
        onMounted(() => {
            let Id = cookie.get('/user/uid')
            if (Id) {
                loginId.value = Id
            }
            
        })
        return {
            visible,
            afterVisibleChange,
            showDrawer,
            submitting,
            handleSubmit,
            isloading,
            getComment,
            setVal,
            userInfo
        };
    }
});
</script>