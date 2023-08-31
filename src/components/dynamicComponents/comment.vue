<template>
    <div>
        <a-tabs @change="tabChange">
            <a-tab-pane tab="按热度排序" key="1"></a-tab-pane>
            <a-tab-pane tab="按时间排序" key="0"></a-tab-pane>
        </a-tabs>

        <a-row>
            <a-col :span="2" style="margin-left: 5px;">
                <a-avatar :src="'/img/userHead/' + userinfo.head" style="width:70px;height: 70px;"></a-avatar>
            </a-col>
            <a-col :span="19">
                <emotionInput :placeholder="placeholder" style="box-shadow: none;" @ok="handComment">
                </emotionInput>
            </a-col>
        </a-row>
        <a-divider></a-divider>
        <div>
            <a-spin :spinning="isloading" style="width:100%;text-align: center;" tip="正在加载中"></a-spin>
            <comment :comments="comments" ref="comment" @update="getComments" :uid="uid" :aid="aid" disabledDeatil>
            </comment>
        </div>
    </div>
</template>

<script>
import { notification } from '@/lib/js/tools.js'
import { post, get } from '../../lib/js/axios'
import { parseComments, getComments } from '../../utils/utils'
import emotionInput from '../emotionComponents/emotionInput.vue';
import comment from './comments.vue'
export default {
    name: 'BlogComment',
    props: {
        uid: {
            type: String,
            default: ''
        },
        aid: {
            type: String,
            default: ''
        },
        cType: {
            type: Number,
            default: 1
        },
        placeholder: {
            type: String,
            default: "你猜我的评论区在等谁"
        }
    },
    data() {
        return {
            isloading: false,
            comments: [],
            userinfo: this.$store.state.myself,
        };
    },
    mounted() {
        let { aid, cType } = this.$props
        this.getComments(aid, cType)
    },

    methods: {
        tabChange(key) {
            
            this.getComments(this.$props.aid, 2, key)
        },
        getComments(aid, cType, orderColumn=0) {
            this.isloading = true
            get(`/comment/getComments?aid=${aid}&cType=${cType}&orderColumn=${orderColumn}`).then(res => {
                console.log( res.data.data)
                res.data.data = res.data.data.sort((e1,e2)=>{
                    return new Date(e1.date).getTime() - new Date(e2.date).getTime()
                })
                console.log( res.data.data)
                let data = parseComments(res.data.data)
                let comments = getComments(data, this, true, {
                    upaid: aid,
                    cType: 2
                })
                console.log(comments)
                this.comments = comments
                this.isloading = false
                
            }).catch(err => {
                
                this.isloading = false
            })
        },
        handComment(comment) {
            
            if (!this.userinfo.id) {
                notification('失败', 'error', '请先登录')
                return
            }
            if (comment == '' || comment == '\n') {
                notification('失败', 'error', '评论不能为空')
                return;
            }
            post('/comment/insertComment', {
                aid: this.$props.aid,
                content: comment,
                fromUid: this.userinfo.id,
                toUid: null,
                date: this.formatDate(new Date()),
                precid: null,
                ctype: 2
            }).then(res => {
                if (res.resultCode == 200) {
                    // let data = userInfo.value
                    notification('失败', 'success', '发表成功')
                    this.getComments(this.$props.aid, 2)
                } else {
                    notification('失败', 'error', '发生未知错误')
                }
            }).catch(err => {
                notification('失败', 'error', err)
            })
        }
    },

    components: {
        emotionInput,
        comment

    }
};
</script>

<style scoped></style>