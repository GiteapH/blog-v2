<template>
    <div>
        <div style="display: flex;flex-wrap: wrap;justify-content: space-between;">
            <a-row v-for="item in data" style="width:30%;margin-bottom:18px;margin-top: 15px;">
                <a-col :span="3">
                    <img :src="`/img/userHead/${item.head}`" style="width:50%">
                </a-col>
                <a-col :span="18" style="margin-left:1rem">
                    <h2>{{ item.username }}</h2>
                    <p style="color:gray">{{ item.fans }}粉丝 · {{ item.submits }}发布· {{ item.goods }}点赞 · {{ item.interviewer }}访问
                        · {{ item.collections }}条收藏
                    </p>
                    <p style="color:#bfbfbf;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">{{ item.describe
                    }}</p>
                    <a-row>
                        <a-button @click="addFan(item)" style="border-radius: 5px;background-color: #00aeec;color:white" v-if="!item.fanItem">+关注</a-button>
                        <a-button @click="removeFan(item)" style="border-radius: 5px;background-color: #dfdfdf;" v-else>已关注</a-button>
                    </a-row>
                </a-col>
            </a-row>
        </div>
        <a-spin :spinning="loading" style="width:100%;text-align:center "></a-spin>
        <a-pagination v-model:current="currentPage" :total="len" @change="onChange" style="margin-top:10px;">
        </a-pagination>
    </div>
</template>
<script>
import { formatDate, getURL, notification } from '@/lib/js/tools'
import { get } from '@/lib/js/axios'
export default {
    name: 'BlogArticleFlex',
    props: {
        bindOne: {
            type: Object,
            default: {
                name: '',
                key: 0
            }
        }
    },
    watch: {
        bindOne: {
            deep: true,
            handler: function (nv) {
                
                this.order = nv.key
                this.getUsers(1, nv.key)
            }
        },
        len(nv){
            
            this.$emit('lenUpdate',nv)
        },
        $route(to, from) {
            this.currentPage = 1
            this.getUsers(1,this.order)
        },

    },
    data() {
        return {
            data: [],
            loading: false,
            currentPage: 1,
            len:0,
            order:0,
            userinfo: this.$store.state.myself
        };
    },

    mounted() {
        
        this.getUsers(1, 1)
    },

    methods: {
        onChange(page) {
            this.currentPage = page
            this.getUsers(this.currentPage, 1)
        },
        getUsers(pageNumber, orderPath) {
            this.data = []
            this.loading = true
            get('/user/getUsers', {
                pageNumber: pageNumber,
                orderPath: orderPath,
                key: this.$route.query.key == '' ? null : this.$route.query.key,
                loginUid:this.userinfo.id
            }).then(({ data }) => {
                this.data = data.data.list
                this.loading = false
                this.len = data.data.size
            }).catch(e => {
                this.loading = false
            })
        },
        addFan(item) {
            this.$users.addFan(this.userinfo.id, item.id).then(res => {
                if (res) {
                    notification('成功','success','关注成功')
                    item.fanItem = true

                    
                }
            }).catch(err => {
                notification('错误','error',err)
            })

        }
    },
};
</script>

<style scoped></style>