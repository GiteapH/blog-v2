<template>
    <div>
        <a-row>
            <a-col :span="1">
                <a-button shape="circle" style="border:none" :disabled="page == 1" @click="prev">
                    <template #icon>
                        <LeftOutlined />
                    </template>
                </a-button>
            </a-col>
            <a-col :span="22">
                <a-spin :spinning="userList.initLoading" style="width:100%;text-align: center;"></a-spin>
                <a-row>
                    <a-col :span="3" v-for="user in userList.list" :key="user.id" style="text-align: center;"
                        @click="onClick(user)">
                        <transition>
                            <a-badge dot>
                                <a-avatar v-if="user.username != '全部'" shape="square" :src="'/img/userHead/' + user.head"
                                    :class="user.id == activeId ? 'active_img' : ''">

                                </a-avatar>

                                <a-avatar v-else shape="square" style="background-color: #1890ff" :class="user.id == activeId ? 'active_img' : ''">
                                    <template #icon><UserOutlined /></template>
                                </a-avatar>
                            </a-badge>
                        </transition>
                        <transition>
                            <p style="width:100%;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;font-size:18px;margin-top:5px"
                                :class="user.id == activeId ? 'active_p' : ''">{{ user.username }}</p>
                        </transition>
                    </a-col>
                </a-row>
            </a-col>
            <a-col :span="1">
                <a-button shape="circle" style="border:none" :disabled="page == parseInt(userList.total / 8 + 1)"
                    @click="next">
                    <template #icon>
                        <RightOutlined />
                    </template>
                </a-button>
            </a-col>
        </a-row>
    </div>
</template>
<script>
import { LeftOutlined, RightOutlined,UserOutlined } from '@ant-design/icons-vue'
export default {
    name: 'BlogUserSelector',

    data() {
        return {
            userList: {
                initLoading: true,
                list: [],
                total: 0,
            },
            activeId: -1,
            userinfo: this.myself,
            page: 1
        };
    },

    mounted() {
        this.getUserList(this.page, this.page == 1 ? 7 : 8, 14)
    },

    methods: {
        getUserList(page, limit, uid) {
            this.userList.list = []
            this.userList.initLoading = true
            if (this.page == 1) {
                this.userList.list.push({
                    username: '全部',
                    id: -1
                })
            }
            this.$FanReq.getFansList(14, page, limit, 0).then(res => {
                this.userList.list = this.userList.list.concat(res)
                this.userList.total = res[0]?.size ?? 0
                this.userList.initLoading = false

            })
        },
        onClick(user) {
            this.activeId = user.id
            this.$emit('change', user);
        },
        prev() {
            this.page--
            this.getUserList(this.page, this.page == 1 ? 7 : 8, 14)
        },
        next() {
            this.page++
            this.getUserList(this.page, 8, 14)
        }
    },
    components: {
        LeftOutlined, RightOutlined,UserOutlined
    }
};
</script>
<style  scoped>
.active_p {
    color: rgb(47, 175, 250);
}

.active_img {
    border: 1px solid rgb(47, 175, 250);
    border-radius: 50%;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.8s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>