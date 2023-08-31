<!--
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-02-20 10:54:57
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-08-25 18:47:38
 * @FilePath: \blog\src\components\privateLetterComponents\myLetters.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- 私信用户列表 -->
<template>
    <div>
        <div
            style="background-color: rgb(243, 243, 243);text-align: center;height:748px;line-height: 50px;box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;padding-left: 0px;border: solid ghostwhite 1px;">
            <el-row style="margin-top:0px;">
                <el-col :span="5">
                    <div
                        style="color:#666666;font-size:15px;border-right: gainsboro solid 1px;border-bottom: gainsboro solid 1px;">
                        近期消息</div>
                    <userList @change="userChange" v-bind:listValue="userList" @update="val => userList = val"></userList>
                </el-col>
                <el-col :span="19"
                    style="color:#666666;font-size:15px;">
                    <div style="border-right: gainsboro solid 1px;border-bottom: gainsboro solid 1px;">
                        {{ selectUser.username }}
                    </div>
                    <messageBox :toUser="selectUser" ref="messageBox" @update="onUpdate"></messageBox>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import userList from './letterUserList'
import messageBox from './messageBox'
import connectReq from '@/api/requests/connect'
export default defineComponent({
    data() {
        return {
            selectUser: '',
            userList: []
        }
    },
    watch: {
        userList: {
            handler(n) {
                
                if (!n.back) {
                    this.$refs.messageBox.userList = n
                } else {

                }
            },
            deep: true
        }
    },
    async mounted() {
        let upuid = this.$route.query.upuid
        let user = this.$route.query.user
        if(upuid!=null&&user!=null){
            await connectReq.startConnect({
                connectDate:new Date(),
                lastContent:"",
                principalUid:user,
                subordinateUid:upuid,
                weight:0
            }).then(userList=>{
                
                this.userList = userList
            })
        }
    },
    methods: {
        userChange(item) {
            this.selectUser = item
            // this.$refs.messageBox.toUid = item
        },
        onUpdate(listStatus) {
            this.userList = listStatus
        }
    },
    components: {
        userList,
        messageBox
    }
})
</script>
<style></style>
