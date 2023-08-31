<!--
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2022-08-27 16:25:56
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-08-28 11:16:56
 * @FilePath: \blog\src\components\userCard.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div style="position:absolute;z-index:1;" >
        <a-card hoverable style="width: 300px">
            <template #cover>
                <img alt="美美的背景" :src='BackImgsrc' />
            </template>
            <template #actions>
                <a :href="'/user/'+userinfo.id">
                    <home-outlined key="setting" />
                </a>
                <a :href="'/userLetter'">
                    <message-outlined key="message" />
                </a>
                <poweroff-outlined key="ellipsis" @click="outLogin" />
            </template>
            <a-card-meta :title='userName' :description='describe' style="text-overflow:ellipsis;overflow: hidden;width:200px;;white-space:nowrap">
                <template #avatar>
                    <a-avatar alt="我的帅/美照" :src='src' />
                </template>
            </a-card-meta>
        </a-card>
    </div>
</template>
<script>
import { HomeOutlined, MessageOutlined, PoweroffOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { createVNode } from 'vue';
import { Modal } from 'ant-design-vue';
import cookie from 'js-cookie'
export default {
    props: ['src', 'userName', 'describe', 'BackImgsrc'],
    components: {
        HomeOutlined,
        MessageOutlined,
        PoweroffOutlined,
    },
    data(){
       return{
        userinfo:this.$store.state.myself
       }
    },
    methods: {
        // 退出登录
        outLogin() {
            Modal.confirm({
                title: '提示',
                icon: createVNode(ExclamationCircleOutlined),
                content: '确定退出登录?',
                onOk() {
                    cookie.remove('/user/loginPass')
                    cookie.remove('/user/uid')
                    cookie.remove('/user/token')
                    window.location.reload()
                },
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                onCancel() { },
            });
        }
    }
}
</script>