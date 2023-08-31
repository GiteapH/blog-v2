el-col<!-- 私信用户列表 -->
<template>
    <div class="chat-content">
        <div style="padding:15px">
            <a-spin :spinning="loading"></a-spin>
            <!-- recordContent 聊天记录数组-->
            <div v-for="(time, index) in times" :key="index">
                <p stlye="color:#666666;font-size:15px">{{ judgeDate(time) }}</p>

                <div v-for="(itemc, indexc) in recordContent[time]" :key="indexc">
                    <!-- 对方 -->
                    <div v-if="itemc.pushContent == null">
                        <div class="word" v-if="!itemc.sender">
                            <img :src="'/img/userHead/' + itemc?.head">
                            <div class="info">
                                <div class="info-content" v-if="itemc.isPush == 0">
                                    <editHTML :html="itemc.content"></editHTML>
                                </div>
                            </div>
                        </div>
                        <!-- 我的 -->
                        <div class="word-my" v-else>
                            <div class="info">
                                <!-- &&!sendStatus[itemc.sendTime.getTime()] -->
                                <!-- " -->
                                <img style="width:20px;height:20px;margin-right: 8px;" src="/img/webImg/感叹号.png"
                                    v-if="itemc.sendFlag && sendStatus.indexOf(itemc.sendTime) != -1 && sendLoading.indexOf(itemc.sendTime) == -1">
                                <!--  -->
                                <LoadingOutlined style="text-align: center;margin-right: 8px;"
                                    v-if="sendLoading.indexOf(itemc.sendTime) != -1"></LoadingOutlined>
                                <div class="info-content">
                                    <editHTML :html="itemc.content"></editHTML>
                                </div>
                            </div>
                            <img :src="'/img/userHead/' + itemc?.head">
                        </div>
                    </div>
                    <div v-else>
                        <div class="push">
                            <h1>
                                {{ itemc.pushContent.title }}
                            </h1>
                            <a-row>
                                <a-col :span="15">
                                    <a>
                                        <p id="content">
                                            {{ itemc.pushContent.tinymes }}
                                        </p>
                                    </a>
                                    <div style="display: inline-flex;height:20px;margin-top:20px;">
                                        <p class="operation-b-img">
                                            <EyeOutlined />
                                            <span class="num ">{{ itemc.pushContent.watched }}次阅读</span>
                                        </p>
                                        <p class="operation-b-img">
                                            <LikeOutlined />
                                            <span class="num ">{{ itemc.pushContent.like }}人觉得不错</span>
                                        </p>

                                        <span style="color:grey;margin-right:16px;">|</span>
                                        <a target="_blank" href="https://blog.csdn.net/weixin_44350337"
                                            style="margin-left:15px">
                                            <UserOutlined />
                                            <span>{{ itemc.username }}</span>
                                        </a>
                                    </div>
                                </a-col>
                                <a-col :span="5" style="margin-left:1rem">
                                    <div class="operation-c">
                                        <span class="el-popover__reference-wrapper">
                                            <p class="feedback el-popover__reference" style="margin-left:16px;">
                                                <img class="dian" width="180"
                                                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png">
                                            </p>
                                        </span>
                                    </div>
                                </a-col>
                            </a-row>
                            <el-divider></el-divider>
                            <span>
                                <editHTML :html="itemc.username + ' : ' + itemc.content"></editHTML>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--  -->
        <emotionInput @ok="(comment) => Submit(comment)" placeholder="请输入内容"
            style="width: 858px;background: white;border-radius: 0px;margin-top:50px;box-shadow: none;position: absolute;bottom:0px;padding:0px;z-index: 1;border: gainsboro solid 1px;"
            v-if="showInput">
        </emotionInput>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import editHTML from '../editHTML.vue'
import { judgeDate, notification } from '@/lib/js/tools'
import emotionInput from '../emotionComponents/emotionInput'
import $ from 'jquery'
import { UpOutlined, DownOutlined, LikeOutlined, DislikeOutlined, UserOutlined, EyeOutlined, MessageOutlined, LoadingOutlined, } from '@ant-design/icons-vue'
export default defineComponent({
    props: {
        toUser: {
            type: Object
        },
    },
    watch: {
        toUser(newVal, oldVal) {
            
            if (newVal.subordinateUid != 0) {
                this.showInput = true
            } else {
                this.showInput = false
            }
            this.getMessages(this.loginUser.id, newVal.id, newVal.connectId)
        },
        userList: {
            handler(n, o) {
                
                // n.status==null表示传过来
                if (n.back == false) {
                    if (this.this.websockets[this.loginUser.id].readyState == 1) {
                        this.websockets[this.loginUser.id].send(JSON.stringify({
                            cmd: 'search',
                            userIds: n.map(e => {
                                return e.id
                            }),
                            fromUid: this.loginUser.id
                        }))
                    }
                }
                else {
                    this.$emit('update', n);
                }
            },
            deep: true
        }
    },
    data() {
        return {
            showInput: true,
            recordContent: [],
            times: [],
            loginUser: this.$store.state.myself,
            loading: false,
            websockets: {},
            userList: [],
            sendStatus: [],
            sendLoading: []
        }
    },
    unmounted: function () {
        this.websocketclose();
    },
    mounted() {
        // this.getMessages(this.loginUser.id, this.$props.toUid)

        let i = setInterval(() => {
            this.websockets[this.loginUser.id] = this.initWebSocket(this.loginUser.id)
            this.toBottom()
            clearInterval(i)
        }, 1000)
    },
    methods: {
        getMessages(fromUid, toUid, connectId) {
            this.recordContent = []
            this.times = []
            this.loading = true
            this.$letters.getMessages(fromUid, toUid, connectId).then(res => {
                this.recordContent = res
                for (let time in res) {
                    for (let item of this.recordContent[time]) {
                        item.content = item.content.replace(/\#(\d+);/g, `<img style="width:25px;height:25px;background:rgba(0,0,0,0)" src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/$1.gif"/>`)
                        // item.content = `<p>${item.content}</p>`
                    }
                    this.times.push(time)
                }
                this.loading = false
            }).catch(e => {
                this.loading = false
            })
        },
        userChange(item) {
            this.selectUser = item
            
        },
        Submit(comment) {
            if (comment == '' || comment == "\n") {
                notification('错误', 'error', '输入为空')
                return
            }
            
            let last = new Date(this.times[this.times.length - 1]).getTime()
            let now = new Date().getTime()
            
            let addTime = 0
            if (now - last <= 2 * 60 * 1000) {
                addTime = last
                
            } else {
                addTime = now
                
            }
            let content = {
                "content": comment,
                "fromUid": this.loginUser.id,
                "isPush": 0,
                "toId": this.$props.toUser.id,
                "sendTime": new Date(now),
                "pushContent": null,
                "username": this.loginUser.username,
                "head": this.loginUser.head,
                "sender": true,
                "sendFlag": true,
                "cmd": "send",
                "connectId": this.$props.toUser.connectId
            }
            this.toBottom()
            content.sendTime = content.sendTime.getTime()
            this.sendStatus.push(now)
            this.sendLoading.push(now)
            let i = setInterval(() => {
                this.sendLoading.splice(this.sendStatus.indexOf(now))
                clearInterval(i)
            }, 500)
            
            this.websockets[this.loginUser.id].send(JSON.stringify(content))
            content.content = content.content.replace(/\#(\d+);/g, `<img style="width:25px;height:25px;background:rgba(0,0,0,0)" src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/$1.gif"/>`)
            if (addTime == last)
                this.recordContent[this.times[this.times.length - 1]].push(content)
            else {
                this.recordContent[new Date(now)] = [content]
                this.times.push(new Date(now))
            }
        },
        initWebSocket: function (userId) {
            // 建立连接
            var url = "ws://localhost:28019/socket/" + userId;
            let websock = new WebSocket(url);
            websock.onopen = this.websocketonopen;
            websock.onerror = this.websocketonerror;
            websock.onmessage = this.websocketonmessage;
            websock.onclose = this.websocketclose;
            return websock;
        },
        // 连接成功后调用
        websocketonopen: function (e) {
            
            this.$nextTick(() => {
                
                this.websockets[this.loginUser.id].send(JSON.stringify({
                    cmd: 'search',
                    userIds: this.userList.map(e => {
                        return e.id
                    }),
                    fromUid: this.loginUser.id
                }))
            })
        },
        // 发生错误时调用
        websocketonerror: function (e) {
            
            
        },
        // 接收后端消息
        // vue 客户端根据返回的cmd类型处理不同的业务响应
        websocketonmessage: function (e) {
            
            let data = JSON.parse(e.data)
            let time = data.time
            let mes = data.message
            
            //处理订阅信息
            if (data.cmd == "add") {
                let newInfo = JSON.parse(data.data)
                newInfo.sender = false
                // 接收方  接收id为当前用户列表方 发送为远程用户方
                //TODO 新消息
                // 发送方为列表选中用户
                if (data.fromUid == this.$props.toUser.id) {
                    let last = new Date(this.times[this.times.length - 1]).getTime()
                    let now = new Date(newInfo.sendTime)
                    let addTime = 0
                    if (now - last <= 2 * 60 * 1000) {
                        addTime = last
                    } else {
                        addTime = now
                    }
                    if (addTime == last)
                        this.recordContent[this.times[this.times.length - 1]].push(newInfo)
                    else {
                        this.recordContent[new Date(now)] = [newInfo]
                        this.times.push(new Date(now))
                    }
                }
                // 更新用户列表
                for (let user of this.userList) {
                    if (user.id == data.fromUid) {
                        user.lastContent = newInfo.content
                        user.connectDate = new Date(newInfo.sendTime)
                        user.unreadNum++
                    }
                }
                this.toBottom()

            } else if (data.cmd == "rep") {
                //TODO 发送结果
                if (mes == '发送成功')
                    this.sendStatus.splice(this.sendStatus.indexOf(time), 1)

            } else if (data.cmd == 'search') {
                this.userList.forEach(value => {
                    value.status = data.onlineStatus[value.id]
                })
                this.userList.back = true
            }else if(data.cmd == 'newUserLogin'){
                if(data.fanEach){
                    notification(data.messageType,'success',`您的关注:<a style="font-size:18px;color:#9a85ed" href="/user/${data.newUserInfo.id}"> ${data.newUserInfo.username} </a>上线了`,'tl',true)
                }
                for (let user of this.userList) {
                    if (user.id == data.newUserInfo.id) {
                        user.status = true
                    }
                }
            }else if(data.cmd == 'newUserLoginOut'){
                if(data.fanEach){
                    notification(data.messageType,'success',`您的关注:<a style="font-size:18px;color:#9a85ed" href="/user/${data.newUserInfo.id}"> ${data.newUserInfo.username} </a>下线了`,'tl',true)
                }
                for (let user of this.userList) {
                    if (user.id == data.newUserInfo.id) {
                        user.status = false
                    }
                }
            }
        },
        // 关闭连接时调用
        websocketclose: function (e) {
            
        },
        toBottom() {
            this.$nextTick(() => {
                let div = document.querySelector('.chat-content')
                $(div).scroll(() => {
                    
                })
                
                div.scrollTop = div.scrollHeight
                
            })

        }
    },
    components: {
        UpOutlined,
        editHTML,
        emotionInput,
        DownOutlined,
        LikeOutlined,
        DislikeOutlined,
        UserOutlined,
        EyeOutlined,
        LoadingOutlined,
        MessageOutlined
    }
})
</script>
<style>
.push {
    background-color: white;
    border-radius: 10px;
    padding: 15px;
    text-align: left;
    width: 100%;
}

.push:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.chat-content {
    width: 100%;
    background: rgb(243, 243, 243);
    overflow: scroll;
    height: 660px;
    padding-bottom: 150px;
}

.chat-content::-webkit-scrollbar {
    display: none;
}


.chat-content .word {
    display: flex;
    margin-bottom: 20px;
}

.chat-content .word img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.chat-content .word .info {
    margin-left: 10px;
}

.chat-content .word .info .info-content {
    font-size: 14px;
    background: #24db76;
    color: white;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 14px;
    line-height: 40px;
    position: relative;
    font-size: 14px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-weight: 600;
    margin-top: 8px;
    border-radius: 8px;
}

.chat-content .word .info .info-content::before {
    position: absolute;
    left: -8px;
    top: 8px;
    content: '';
    border-right: 10px solid #24db76;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
}

.chat-content .word-my {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
}

.chat-content .word-my img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.chat-content .word-my .info {
    width: 90%;
    margin-left: 10px;
    text-align: right;
}

.chat-content .word-my .info .time {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
    height: 20px;
    line-height: 20px;
    margin-top: -5px;
    margin-right: 10px;
}

.chat-content .word-my .info .info-content {
    max-width: 70%;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 14px;
    line-height: 40px;
    float: right;
    margin-right: 10px;
    position: relative;
    margin-top: 8px;
    color: white;
    font-size: 14px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-weight: 600;
    background: #A3C3F6;
    border-radius: 8px;
    text-align: left;
}

.chat-content .word-my .info .info-content::after {
    position: absolute;
    right: -8px;
    top: 8px;
    content: '';
    border-left: 10px solid #A3C3F6;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
}
</style>
