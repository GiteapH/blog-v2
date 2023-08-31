<template>
    <div v-infinite-scroll="handleInfiniteOnLoad" class="infinite-container" :infinite-scroll-disabled="busy"
        :infinite-scroll-distance="10">
        <ul style="list-style: none;">
            <li v-for="(item, index) in userList" :class="'user-card ' + (index == activeIdx ? 'user-active' : '')"
                :key="item.username" @click="cardClick(item, index, $event)">
                <el-row>
                    <el-col :span="5">
                        <a-badge dot :status="item.status == true||item.subordinateUid==0 ? 'success' : 'default'" :offset="[-3, 40]">
                            <a-avatar style="margin-top: 0px;" :src="'/img/userHead/' + item?.head"></a-avatar>
                        </a-badge>
                    </el-col>
                    <el-col :span="16">
                        <p style="line-height: 25px;text-align: left;font-size: 16px;">{{ item?.username }}<span style="color:#66c5fd;font-size: 7px;margin-left: 5px;"> {{judgeDate(item?.connectDate)}}</span></p>
                        <p style="text-overflow:ellipsis;width:100%;overflow: hidden;white-space:nowrap;line-height: 25px;text-align: left;color:grey">
                            {{ item?.lastContent }}</p>
                    </el-col>
                    <el-col :span="3">
                        <a-badge :count="item.unreadNum" size="small"/>
                        <CloseCircleFilled @click="closeConnect(item.connectId,item.principalUid,item.subordinateUid,index)" style="color:grey;position: absolute;top:1px;right:5px" v-show="index == activeIdx"></CloseCircleFilled>
                    </el-col>
                </el-row>
            </li>
            <a-spin :spinning="loading && busy"></a-spin>
        </ul>
    </div>
</template>
<script>
import { judgeDate } from '@/lib/js/tools'
import connectReq from '@/api/requests/connect'
import { defineComponent } from 'vue'
import {CloseCircleFilled} from '@ant-design/icons-vue'
export default defineComponent({
    props: {
        listValue: {
            default: [],
            type: Array
        }
    },
    data() {
        return {
            userList: [],
            loginUser: this.$store.state.myself,
            page: 1,
            loading: false,
            busy: true,
            activeIdx: 0,
            size:0
        }
    },
    model: {
        prop: 'listValue',
        event: 'handleInfiniteOnLoad'
    },
    components:{
        CloseCircleFilled
    },
    watch: {
        listValue: {
            handler(n) {
                if (n.back) {
                    
                    this.userList = n
                }
            },
            deep: true
        }
    },
    mounted() {
        this.getList(null, 15, this.page, this.loginUser.id).then((res)=>{
            this.size = res.size
            this.$emit("change", res.list[0])
        })
    },
    methods: {
        closeConnect(connectId,principalUid,subordinateUid,idx){
            connectReq.closeConnect({
                connectId: connectId,
                principalUid:principalUid,
                subordinateUid:subordinateUid
            }).then(res=>{
                this.userList.splice(idx,1)
            })
        },
        getList(orderName, limit, page, principal) {
            return new Promise((resolve) => {
                this.$connect.getConnectList(orderName, limit, page, principal).then(res => {
                    
                    this.userList = this.userList.concat(res.list);
                    this.loading = false
                    this.busy = false
                    this.$emit('update', this.userList);
                    resolve(res)
                }).catch(err => {
                    
                })
            })
        },
        handleInfiniteOnLoad() {
            this.loading = true;
            this.busy = true
            if (this.userList.length ==this.size) {
                this.$message.warning('已全部加载');
                this.loading = false;
                return;
            }
            this.getList(null, 15, ++this.page, this.loginUser.id)
        },
        cardClick(item, index, event) {
            if (index != this.activeIdx) {
                this.activeIdx = index
                item.unreadNum = 0
                this.$emit("change", item)
            }
        }
    }
})
</script>
<style>
.user-list {
    overflow: scroll;
    height: 800px;
    width: 100%;
    border-right: gainsboro solid 1px;
}

.infinite-container {
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    overflow: scroll;
    height: 660px;
    width: 100%;
    background: white;
    border-right: gainsboro solid 1px;
}

.infinite-container::-webkit-scrollbar{
    display: none;
}

.loading-container {
    position: absolute;
    bottom: 40px;
    width: 100%;
    text-align: center;
}

.user-card {
    padding-top: 10px;
    padding-bottom: 10px;
    height: auto;
}

.user-card:hover {
    background: gainsboro;
}

.user-active {
    background: gainsboro;
}
</style>