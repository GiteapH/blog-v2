<template>
    <layout :headMenu="['-1']" :breadcrumbs="[{ href: '/dynamic', menu: '搜索' }]" :isCenter="false"
        background="bunting-flag.png">
        <template #content>
            <div class="search">
                <searchFrame v-bind:value="key" @update="val=>key=val">
                    <template #input>
                        <a-row>
                            <a-col :span="1">
                                <SearchOutlined style="color:#00aeec;font-size:25px;padding-top:5px;padding-left:5px;" />
                            </a-col>
                            <a-col :span="19">
                                <a-row>
                                    <a-col :span="20">
                                        <a-input v-model:value="key" :bordered="false" class="search_input" @blur.prevent="onBlur"
                                            placeholder="Borderless" allow-clear />
                                    </a-col>
                                    <a-col :span="4">
                                        <CloseCircleOutlined class="close" v-show="showClose" />
                                    </a-col>
                                </a-row>
                            </a-col>
                            <a-col :span="4">
                                <a-button type="primary" class="search_btn" @click="onSearch"
                                    @keyup.enter="onSearch">搜索</a-button>
                            </a-col>
                        </a-row>
                    </template>
                </searchFrame>
            </div>
            <tabs @change="tabChange" :len="len"></tabs>
            <div style="background:white;margin-top:25px;height:auto;padding:18px;">
                <div style="margin-bottom:10px;">
                    <a-row>
                        <a-col :span="22">
                            <radioButton v-bind:value="bindOne" @change="val => bindOne = val" :tags="tags"></radioButton>
                        </a-col>
                        <a-col :span="2">
                            <a-button v-show="order.length != 0" @click="showMore = !showMore">{{ showMore ? '收起' : '展开'
                            }}筛选</a-button>
                        </a-col>
                    </a-row>
                </div>
                <div style="margin-bottom:10px;" v-show="order.length != 0 && showMore">
                    <radioButton v-bind:value="bindTwo" @change="val => bindTwo = val" :tags="order"></radioButton>
                </div>
                <searchContent v-bind:type="type" :len="len" v-bind:bindTwo="bindTwo" v-bind:bindOne="bindOne"
                    @lenUpdate="onLenUpdate">
                </searchContent>
            </div>
        </template>
    </layout>
</template>

<script>
import { SearchOutlined, CloseCircleFilled as CloseCircleOutlined } from '@ant-design/icons-vue';
import layout from '../layout/layout.vue'
import tabs from '../UtilComponents/tabs'
import radioButton from '../UtilComponents/radioButton'
import searchFrame from '../UtilComponents/searchFrame'
import { getOrder, getMainTags } from '@/utils/utils'
import searchContent from '../searchComponents/searchContent'
import searchReq from '@/api/requests/search'
import cookie from 'js-cookie'
export default {
    name: 'BlogSearch',
    data() {
        return {
            key: this.$route.query.key,
            showClose: false,
            bindOne: {
                name: '',
                key: 0
            },
            bindTwo: {
                name: '',
                key: 0
            },
            type: this.$route.query?.type ?? 0,
            len: [0, 0, 0, 0],
            tags: [],
            order: getOrder(this.$route.query?.type ?? 0),
            showMore: false
        };
    },
    mounted() {
        this.getTags()
    },
    methods: {
        onBlur() {
            

        },
        onSearch() {
            if(cookie.get('/history')==null){
                
                cookie.set('/history',this.key,{
                    expires:7
                })
            }else{
                
                cookie.set('/history',cookie.get('/history')+","+this.key,{
                    expires:7
                })
            }
            searchReq.updateHot(this.key)
            this.$router.push({
                path: '/search',
                query: {
                    key: this.key,
                    type: this.type
                }
            })
        },
        onLenUpdate(type, len) {
            this.len[type] = len
            
        },
        tabChange(val) {
            this.type = val
            this.$router.push({
                path: '/search',
                query: {
                    key: this.key,
                    type: val
                }
            })
            this.getTags()
            this.order = getOrder(val)
        },
        onFocus() {
            this.showClose = true
        },
        getTags() {
            if (this.type == 0) {
                this.tags = []
                this.$articles.getTags().then(res => {
                    let i = 0
                    this.tags.push({
                        name: '全部类型',
                        key: i++
                    })
                    for (let tag in res) {
                        this.tags.push({
                            name: tag,
                            key: i++
                        })
                    }
                    
                })
            } else {
                this.tags = getMainTags(this.type)
            }
        }
    },
    components: {
        layout,
        SearchOutlined,
        CloseCircleOutlined,
        tabs,
        searchContent,
        radioButton,
        searchFrame
    }
};
</script>

<style scoped>
.close {
    color: rgba(0, 0, 0, 0.1);
    padding: 10px;
    display: none;
    transition: ease all 0.5s;
}

.search_input {
    background: white;
    transition: all ease 0.5s;
    height: 40px;
    font-size: 20px;
    width: 100%
}

.search {
    width: 700px;
    margin: 0 auto;
    background: white;
    border-radius: 15px;
    transition: all ease 0.5s;
    padding: 5px;
    border: 1px rgb(216, 211, 211) solid;
    position: sticky;
    top: 10px;
    z-index: 9999;

}

.search:hover {
    border: 1px #00aeec solid;
}

.search_input:hover {
    background: white;
}

.search_btn {
    width: 100%;
    transition: all ease 0.5s;
    background-color: #00aeec;
    border-radius: 10px;
    height: 40px;
}

.search_btn:hover {
    width: 100%;
    background-color: #2cbcf0;

}
</style>