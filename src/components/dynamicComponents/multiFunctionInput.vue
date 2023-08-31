<template>
    <div style="padding:15px;border-radius: 5px;background: white;">
        <transition>
            <div class="topic" v-show="showTopic">
                <CloseOutlined @click="showTopic = false" style="position: absolute;right:2px;top:2px;cursor:pointer;">
                </CloseOutlined>
                <a-input v-model:value="topic" @change="onChange" placeholder="查询的主题" style="border-radius: 18px;">
                    <template #prefix>
                        <search-outlined type="user" />
                    </template>
                </a-input>
                <div style="margin-top:15px" class="infinite" v-infinite-scroll="handleInfiniteOnLoad"
                    :infinite-scroll-disabled="busy" :infinite-scroll-distance="0">
                    <a-row>
                        <a-col :span="3">
                            <PlusCircleTwoTone :style="{ fontSize: '13.5px', paddingLeft: '5px', margin: '0 auto' }" />
                        </a-col>
                        <a-col :span="21">
                            <p style="color:#008ac5;font-weight:800;font-size:12px;line-height:20px;cursor:pointer" @click="open=true">添加新话题
                            </p>
                        </a-col>
                    </a-row>
                    <a-modal v-model:visible="open" title="创建话题" ok-text="创建" cancel-text="取消" @ok="submitTopic">
                        <a-divider orientation="left" orientationMargin="5px" style="color:grey;font-size:12px;font0-weight:600">话题名称</a-divider>
                        <a-input v-model:value="topicName" show-count :maxlength="45" />
                        <a-divider orientation="left" orientationMargin="5px" style="color:grey;font-size:12px;font0-weight:600">话题内容</a-divider>
                        <a-textarea  v-model:value="topicContent" show-count :maxlength="300" />
                    </a-modal>
                    <div v-for=" (t, index) in ts" class="topic_item" :key="t.tTopic" @click="addTopic(index)">
                        <a-row>
                            <a-col :span="4">
                                <svg t="1679213071078" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="2301" width="20" height="20">
                                    <path
                                        d="M568.886857 0C820.242286 0 1024 203.757714 1024 455.113143v455.113143A113.773714 113.773714 0 0 1 910.226286 1024h-455.131429C203.776 1024 0 820.242286 0 568.886857V455.131429C0 203.757714 203.757714 0 455.113143 0h113.773714z m145.188572 212.48a53.979429 53.979429 0 0 0-64.804572 33.974857l-1.243428 4.022857-31.872 118.4-2.267429-0.182857-2.285714-0.054857-99.401143-0.018286 24.32-90.368a53.668571 53.668571 0 0 0-38.144-65.755428 53.979429 53.979429 0 0 0-64.786286 33.956571l-1.261714 4.022857-31.817143 118.144-158.866286 0.018286a42.605714 42.605714 0 0 0-42.697143 42.514286c0 22.089143 16.932571 40.246857 38.582858 42.313143l4.114285 0.182857h135.990857l-38.125714 141.696h-97.865143a42.605714 42.605714 0 0 0-42.697143 42.532571c0 22.089143 16.932571 40.246857 38.582858 42.313143l4.114285 0.182857h74.971429l-23.844572 88.777143a53.668571 53.668571 0 0 0 38.125715 65.755429 53.979429 53.979429 0 0 0 64.804571-33.956572l1.243429-4.022857 31.36-116.553143h104.009143l-23.844572 88.777143a53.668571 53.668571 0 0 0 38.125714 65.755429 53.979429 53.979429 0 0 0 64.786286-33.956572l1.243429-4.022857 31.36-116.553143h138.368a42.605714 42.605714 0 0 0 42.697143-42.496 42.587429 42.587429 0 0 0-38.582858-42.313143l-4.114285-0.201143-115.474286-0.018285 85.321143-317.074286a53.668571 53.668571 0 0 0-38.125714-65.773714zM573.44 456.411429l-37.668571 140.434285h-102.765715l37.668572-140.434285h102.765714z m225.28-87.771429a43.885714 43.885714 0 1 0 0 87.771429 43.885714 43.885714 0 0 0 0-87.771429z"
                                        fill="#1296db" p-id="2302"></path>
                                </svg>
                            </a-col>
                            <a-col :span="20">
                                <p style="width:100%;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">{{
                                    t.ttopic }}</p>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="12">
                                <p style="font-size: 10px;color:#bab7b6;">{{ t.tpartake }}人参与</p>
                            </a-col>
                            <a-col :span="12">
                                <p style="font-size: 10px;color:#bab7b6;">{{
                                    t.tvisit }}人访问</p>
                            </a-col>
                        </a-row>
                    </div>
                    <a-spin :spinning="loadingTopic && topic != ''" tip="加载中..."
                        style="width:100%;text-align: center;"></a-spin>
                </div>
            </div>
        </transition>
        <transition>
            <div style="height:32px;margin-bottom:18px">
                <a-button v-show="!showTopic" type="primary" size="small " @click="openTopic" v-if="!selectTopic"
                    style="margin-bottom: 16px;background-color: gainsboro;border: none;border-radius: 20px;">
                    <template #icon>
                        <search-outlined type="user" />
                    </template>
                    选择话题
                </a-button>
                <div style="color: #008ac5;width:260px" v-else>
                    <a-row>
                        <a-col :span="3">
                            <svg t="1679213071078" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                style="color: #008ac5" p-id="2301" width="20" height="20">
                                <path
                                    d="M568.886857 0C820.242286 0 1024 203.757714 1024 455.113143v455.113143A113.773714 113.773714 0 0 1 910.226286 1024h-455.131429C203.776 1024 0 820.242286 0 568.886857V455.131429C0 203.757714 203.757714 0 455.113143 0h113.773714z m145.188572 212.48a53.979429 53.979429 0 0 0-64.804572 33.974857l-1.243428 4.022857-31.872 118.4-2.267429-0.182857-2.285714-0.054857-99.401143-0.018286 24.32-90.368a53.668571 53.668571 0 0 0-38.144-65.755428 53.979429 53.979429 0 0 0-64.786286 33.956571l-1.261714 4.022857-31.817143 118.144-158.866286 0.018286a42.605714 42.605714 0 0 0-42.697143 42.514286c0 22.089143 16.932571 40.246857 38.582858 42.313143l4.114285 0.182857h135.990857l-38.125714 141.696h-97.865143a42.605714 42.605714 0 0 0-42.697143 42.532571c0 22.089143 16.932571 40.246857 38.582858 42.313143l4.114285 0.182857h74.971429l-23.844572 88.777143a53.668571 53.668571 0 0 0 38.125715 65.755429 53.979429 53.979429 0 0 0 64.804571-33.956572l1.243429-4.022857 31.36-116.553143h104.009143l-23.844572 88.777143a53.668571 53.668571 0 0 0 38.125714 65.755429 53.979429 53.979429 0 0 0 64.786286-33.956572l1.243429-4.022857 31.36-116.553143h138.368a42.605714 42.605714 0 0 0 42.697143-42.496 42.587429 42.587429 0 0 0-38.582858-42.313143l-4.114285-0.201143-115.474286-0.018285 85.321143-317.074286a53.668571 53.668571 0 0 0-38.125714-65.773714zM573.44 456.411429l-37.668571 140.434285h-102.765715l37.668572-140.434285h102.765714z m225.28-87.771429a43.885714 43.885714 0 1 0 0 87.771429 43.885714 43.885714 0 0 0 0-87.771429z"
                                    fill="#1296db" p-id="2302"></path>
                            </svg>
                        </a-col>
                        <a-col :span="15">
                            <p style="font-size: 15px;cursor:pointer" @click="showTopic = true">{{ selectTopic.ttopic }}</p>
                        </a-col>
                        <a-col :span="1">
                            <CloseCircleFilled style="color: #008ac5;cursor:pointer" @click="selectTopic = ''">
                            </CloseCircleFilled>
                        </a-col>
                    </a-row>
                </div>
            </div>
        </transition>


        <a-textarea style="border: none;" v-model:value="dynamicContent" placeholder="分享动态吧" auto-size />

        <div class="art_user" v-if="showArt">
            <p style="color:grey;font-size: 12px;">请选择你需要@的人,请不要在文本中间进行@操作,否则无法进行查询！+</p>
            <mention ref="mention" keyboard=""></mention>
        </div>
        <a-row style="margin-top: 18px;">
            <a-col :span="13">
                <a-row>
                    <a-col :span="4">
                        <SmileOutlined class="ant-icon"></SmileOutlined>
                    </a-col>
                    <a-col :span="4">
                        <PictureOutlined class="ant-icon" @click="lists.picture = !lists.picture"></PictureOutlined>
                        <div class="clearfix" v-show="lists.picture">
                            <CloseOutlined style="position:absolute;right:15px;font-size:16px;cursor:pointer"
                                @click="lists.picture = false"></CloseOutlined>
                            <storePicture :limit="6" ref="pics"></storePicture>
                        </div>
                    </a-col>
                    <a-col :span="4">
                        <UserOutlined class="ant-icon" @click="dynamicContent += '@'"></UserOutlined>
                    </a-col>
                    <a-col :span="4">
                        <ClockCircleOutlined class="ant-icon"></ClockCircleOutlined>
                    </a-col>
                </a-row>
            </a-col>
            <a-col :span="11">
                <div>
                    <a-row>
                        <a-col :span="5">
                            <p style="color:#c0c0c0;" v-show="dynamicContent != ''">{{ dynamicContent.length }}<a-divider
                                    type="vertical" /></p>
                        </a-col>
                        <a-col :span="10" style="text-align: right;padding-right: 18px;">
                            <PrivateDropdown :menus="['允许评论', '禁止评论', '允许精选评论']" @update="val => responseType = val">
                            </PrivateDropdown>
                        </a-col>
                        <a-col :span="6">
                            <a-button
                                :style="{ background: (dynamicContent == '' ? '#9be3f9' : '#00a1d6'), color: 'white', 'margin-top': '-9px', 'border-radius': '5px', border: 'none' }"
                                :disabled="dynamicContent == ''" @click="send">发布</a-button>
                        </a-col>
                    </a-row>
                </div>
            </a-col>
        </a-row>
    </div>
</template>
<script>
import { SearchOutlined, PlusCircleTwoTone, CloseCircleFilled, SmileOutlined, PictureOutlined, UserOutlined, ClockCircleOutlined, CloseOutlined } from '@ant-design/icons-vue'
import PrivateDropdown from '../UtilComponents/private-dropdown.vue';
import inputHTMLDiv from '../UtilComponents/inputHTMLDiv.vue';
import storePicture from '../UtilComponents/storePicture.vue';
import { getBase64, notification, throttle } from '@/lib/js/tools'
import { uploadFiles } from '@/lib/js/axios'
import mention from '../dynamicComponents/mention'
import topicReq from '@/api/requests/topic'
import { message } from 'ant-design-vue';
export default {
    name: 'BlogMultiFunctionInput',
    watch: {
        dynamicContent: {
            deep: true,
            handler: function (nv = "", ov) {
                if (nv.endsWith('@')) {
                    this.showArt = true
                    this.ating = true
                    this.$nextTick(() => {
                        this.$refs.mention.keyboard = ""
                    })
                } else {
                    if (nv.indexOf('@') == -1) {
                        this.showArt = false
                        this.ating = false
                        return
                    }
                    this.showArt = true
                    this.ating = true
                    this.$nextTick(() => {
                        if (this.ating) {
                            if (nv.endsWith(' ')) {
                                this.showArt = false
                            } else {


                                this.$refs.mention.keyboard = nv.substring(nv.lastIndexOf('@') + 1)
                                this.showArt = true
                            }
                        }
                    })
                }
            }
        }
    },
    data() {
        return {
            userinfo: this.$store.state.myself,
            showTopic: false,
            responseType: 0,
            menu: '允许评论',
            dynamicContent: '',
            ating: false,
            showArt: false,
            lists: {
                picture: false,
                smile: false,
                at: false,
                click: false
            },
            fileList: [],
            previewVisible: false,
            previewImage: '',
            topic: '',
            tg: 1,
            ts: [],
            busy: true,
            loadingTopic: true,
            selectTopic: '',
            open:false,
            topicName:"",
            topicContent:""
        };
    },

    mounted() {

    },

    methods: {
        submitTopic(){
            topicReq.createTopic(this.topicName,this.topicContent,this.userinfo.id).then(res=>{
                message.success("创建话题成功")
                console.log(res)
                this.open = false
                this.ts.push(res)
            })
        },
        openTopic() {
            this.showTopic = true
            this.Throttle()
        },
        handleInfiniteOnLoad() {
            this.tg++
            this.Throttle(1500)
        },
        menuUpdate(menuName) {
            this.menu = menuName

        },
        async handlePreview(file) {
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
            }
            this.previewImage = file.url || file.preview;
            this.previewVisible = true;
        },
        handleChange({ fileList: newFileList }) {
            this.fileList = newFileList;
        },
        handleCancel() {
            this.previewVisible = false;
        },
        addFile(file) {
            return new Promise((resolve, reject) => {

                this.fileList.push(file)
                resolve('')
            })
        },
        onChange() {
            this.ts = []
            this.tg = 1
            this.Throttle()
        },
        Throttle(wait = 1500) {
            this.loadingTopic = true
            try {
                throttle(this.$topic.getAllTopics, wait)([this.tg, 15, this.topic]).promise.then(res => {
                    this.ts = this.ts.concat(res)
                    this.loadingTopic = false
                    this.busy = false
                    if (res.length == 0) this.busy = true
                })
            } catch (e) {
                this.loadingTopic = false
            }
        },
        addTopic(idx) {
            this.selectTopic = this.ts[idx]
            this.showTopic = false
        },
        reset() {
            this.dynamicContent = ""
            this.selectTopic = null
        },
        send() {

            let files = this.$refs.pics.fileList

            if (files.length > 0)
                uploadFiles(files).then((src = []) => {
                    this.sendDynamic(src)
                })
            else
                this.sendDynamic()
        },
        sendDynamic(src = []) {
            let srcs = src.join(',')
            this.$dynamic.sendDynamic(this.dynamicContent, new Date(), 0, this.userinfo.id, this.responseType, this.selectTopic?.tid ?? null, srcs == "" ? null : srcs).then(res => {
                this.reset()
                res.username = this.userinfo.username
                res.id = this.userinfo.id
                res.describe = this.userinfo.describe
                res.head = this.userinfo.head
                this.$emit('afterSend', {
                    "topicInfo": this.selectTopic,
                    "DynamicInfo": res,
                    "uidSet": []
                })
            })
        }
    },
    components: {
        PrivateDropdown, inputHTMLDiv, PlusCircleTwoTone,
        SearchOutlined, SmileOutlined, PictureOutlined, UserOutlined, ClockCircleOutlined, CloseOutlined, CloseCircleFilled,
        storePicture, mention
    }
};
</script>
<style scoped>
.ant-icon {
    color: rgb(168, 168, 168);
    font-size: 19px;
}

.ant-icon:hover {
    color: #00aeec;
}

.topic {
    position: absolute;
    background: white;
    z-index: 1;
    padding: 18px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
}

.ant-input-affix-wrapper>input.ant-input {
    padding: 0;
    border: none;
    outline: none;
    background: gainsboro;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.8s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.clearfix {
    position: absolute;
    padding: 25px;
    background: rgb(247, 247, 247);
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    z-index: 3;
    border-radius: 10px;
    display: flex;
    top: 30px;
    left: -20px;
    width: 400px;
}

.clearfix::before {
    content: '';
    width: 25px;
    height: 25px;
    background: rgb(247, 247, 247);
    transform: rotate(45deg);
    position: absolute;
    top: -5px;
    left: 17px;
    border: solid 1px whitesmoke;
    z-index: 0;
}

.topic_item {
    border-radius: 5px;
    transition: all ease .1s;
    padding: 8px;
}

.topic_item:hover {
    background: #dfdfdf;
}

.infinite {
    overflow: scroll;
    height: 400px;
}

.art_user {
    position: absolute;
    padding: 10px;
    background: whitesmoke;
    z-index: 999;
    border-radius: 8px;
    width: 250px;
    height: 350px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

}
</style>