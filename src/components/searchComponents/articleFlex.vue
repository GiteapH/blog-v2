<template>
    <div>
        <div style="display: flex;flex-wrap: wrap;justify-content: space-between;">
            <a-row v-for="item in data" style="width:40%;margin-bottom:18px;margin-top: 15px;" :key="item.aid">
                <a-col :span="5">
                    <img src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" style="width:100%">
                </a-col>
                <a-col :span="18" style="margin-left:1rem">
                    <h2><a :href="item.href">{{ item.content }}</a></h2>
                    <p style="color:gray">{{ item.Tags }} {{ item.watched }}观看 · {{ item.like }}点赞 · {{ item.comments }}条评论
                        · {{ item.collections }}条收藏
                    </p>
                    <p style="color:#bfbfbf">{{ item.content }}</p>
                    <a-row>
                        <a-col :span="2">
                            <a-avatar :src="`/img/userHead/${item.avatar}`" style="width:25px;height:25px"></a-avatar>
                        </a-col>
                        <a-col>
                            {{ item.name }}
                        </a-col>
                    </a-row>
                </a-col>
            </a-row>
            <a-empty v-if="data.length == 0" description="无搜索内容" style="width:100%;text-align:center"> </a-empty>
        </div>
        <a-spin :spinning="loading" style="width:100%;text-align:center "></a-spin>
        <a-pagination v-model:current="currentPage" :total="len" @change="onChange" style="margin-top:10px;">
        </a-pagination>
    </div>
</template>

<script>
import { formatDate, getURL } from '@/lib/js/tools'
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
        },
        bindTwo: {
            type: Object,
            default: {
                name: '',
                key: 0
            }
        }
    },
    watch: {
        $route(to, from) {
            this.currentPage = 1
            this.getLen(this.tag)
            this.getArticles(1,this.order,this.tag)
        },
        bindTwo: {
            deep: true,
            handler: function (nv) {
                this.order = nv.key
                this.getArticles(1, nv.key, this.tag)
            }
        },
        bindOne: {
            deep: true,
            handler: function (nv) {
                
                this.tag = nv.name == '全部类型' ? "" : nv.name
                this.getArticles(1, this.order, this.tag)
                this.getLen(this.tag)
            }
        },
        len(nv) {
            
            this.$emit('lenUpdate', nv)
        }
    },
    data() {
        return {
            data: [],
            loading: false,
            currentPage: 1,
            tag: '',
            order: '',
            len: 0
        };
    },

    mounted() {
        this.getLen()
        this.getArticles(1, 1)
    },

    methods: {
        getLen(tag) {
            get('/article/getAllActLen', {
                tag: tag,
                key: this.$route.query.key
            }).then(res => {
                this.len = res.data.data.len
            })
        },
        onChange(page) {
            this.currentPage = page
            this.getArticles(this.currentPage, 1)
        },
        getArticles(pageNumber, orderPath, tag) {
            this.data = []
            this.loading = true
            get('/article/getUsers2Article', {
                pageNumber: pageNumber,
                orderPath: orderPath,
                tag: tag == '' ? null : tag,
                key: this.$route.query.key == '' ? null : this.$route.query.key
            }).then(({ data }) => {
                this.data = []
                for (let info of data.data) {
                    this.data.push({
                        collections: info.collected,
                        comments: info.comments,
                        watched: info.watched,
                        like: info.like,
                        name: info.username,
                        href: getURL('/articleView', info.id, info.aid),
                        title: info.title,
                        avatar: info.head,
                        time: formatDate(info.date),
                        content: info.tinymes,
                        actions: [{
                            type: 'EyeOutlined',
                            text: info.watched
                        }, {
                            type: 'LikeOutlined',
                            text: info.like
                        }, {
                            type: 'MessageOutlined',
                            text: info.comments
                        }, {
                            type: 'StarOutlined',
                            text: info.collected
                        }],
                        // info.comments
                        Tags: info.classsys == "" ? '' : info.classsys.replace(/^\s+|\s+$/g, '').split(" ")[0] + "",
                    });
                }
                this.loading = false
            }).catch(e => {
                this.loading = false
            })
        }
    },
};
</script>

<style scoped></style>