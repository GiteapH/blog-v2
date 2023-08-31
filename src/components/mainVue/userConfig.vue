<template>
    <layout :breadcrumbs="breadcrumbs" :itemMenu="['7']" :openKeys="['sub2']">
        <template #content>
            <div style="background-color:white;padding:20px;border-radius: 10px;width: 800px;" id='editInfo'>
                <h2 style="font-weight:700;">基本信息</h2>
                <el-divider />
                <a-form ref="formRef" name="custom-validation" :model="formState" :rules="rules" v-bind="layout"
                    @finish="handleFinish" @validate="handleValidate" labelAlign="left" style=""
                    :labelCol="{ span: 3, offset: 0 }" @finishFailed="handleFinishFailed">
                    <a-form-item has-feedback label="头像" name="head">
                        <a-spin tip="正在上传" :spinning="spinning">
                            <a-upload v-model:file-list="fileList" name="file" list-type="picture-card"
                                class="avatar-uploader" :show-upload-list="false"
                                :action="`http://localhost:28019/api/v1/upload/file?originalPath=${userinfo.head}`"
                                :before-upload="beforeUpload" @change="handleChange">
                                <img v-if="true" id="userPic" :src="'/img/userHead/' + userinfo.head" alt="avatar"
                                    style="width:101.77px">
                                <div v-else>
                                    <loading-outlined v-if="loading"></loading-outlined>
                                    <plus-outlined v-else></plus-outlined>
                                    <div class="ant-upload-text">Upload</div>
                                </div>
                            </a-upload>
                        </a-spin>
                    </a-form-item>
                    <a-form-item has-feedback label="用户ID" name="id">
                        <a-typography-paragraph copyable style="padding-right:15px">{{
                            userinfo.id
                        }}</a-typography-paragraph>
                    </a-form-item>
                    <a-form-item has-feedback label="用户昵称" name="describe">
                        <p v-show="!items[0]" class="p 0">{{ userinfo.username }}
                            <img src="/img/webImg/编辑.png"
                                style="padding-left:6px;width:25px;display:none;cursor:point;margin-bottom:5px"
                                class="s1" />
                        </p>
                        <a-input v-show="items[0]" v-model:value="formState.nickName" @blur="onBlur(0)" />
                    </a-form-item>
                    <a-form-item has-feedback label="性别" name="sex">
                        <p v-show="!items[1]" class="p 1">{{
                            userinfo.gender == 0 ? "男" : (userinfo.gender == 1 ? "女" :
                                "保密")
                        }}
                            <img src="/img/webImg/Select-3.png"
                                style="padding-left:6px;width:25px;display:none;cursor:point;margin-bottom:5px"
                                class="s2" />
                        </p>
                        <a-select v-show="items[1]" v-model:value="formState.gender" @change="genderChange"
                            @select="items[1] = false" @blur="items[1] = false">
                            <a-select-option value="0">
                                <ManOutlined style="color:lightskyblue;margin-right:5px" /> 男
                            </a-select-option>
                            <a-select-option value="1">
                                <WomanOutlined style="color:pink;margin-right:5px" /> 女
                            </a-select-option>
                            <a-select-option value="2">
                                <RobotOutlined style="color:gainsboro;margin-right:5px" /> 无可奉告
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item has-feedback label="个人简介" name="describe">
                        <p v-show="!items[2]" class="p 2">{{ userinfo.describe }}
                            <img src="/img/webImg/编辑.png"
                                style="padding-left:6px;width:25px;display:none;cursor:point;margin-bottom:5px"
                                class="s3" />
                        </p>
                        <a-input v-show="items[2]" v-model:value="formState.describe" @blur="onBlur(2)" />
                    </a-form-item>
                </a-form>
            </div>
            <div style="background-color:white;padding:20px;border-radius: 10px;margin-top: 15px;width: 70%;">
                <h2 style="font-weight:700;">账号设置</h2>
                <el-divider />
                <emailEdit :userinfo="userinfo"></emailEdit>
                <el-divider />
                <a-row>
                    <a-col :span="16">
                        <p class="justify-p">手机</p>
                    </a-col>
                    <a-col :span="4">
                        <p>18601590125</p>
                    </a-col>
                    <a-col :span="4">
                        <a class="user_btn">修改手机号</a>
                    </a-col>
                </a-row>
                <el-divider />
                <a-row>
                    <a-col :span="16">
                        <p class="justify-p">QQ</p>
                    </a-col>
                    <a-col :span="4">
                        <p v-show="userinfo.qq">{{ userinfo.qq }}</p>
                        <p v-show="!userinfo.qq" style="color:rgba(0,0,0,0.4)">暂未设置</p>
                    </a-col>
                    <a-col :span="4">
                        <a class="user_btn" @click="setQQ">设置qq号码</a>
                    </a-col>
                </a-row>
                <el-divider />
                <a-row>
                    <a-col :span="16">
                        <p class="justify-p">登录日志</p>
                    </a-col>
                    <a-col :span="4">

                    </a-col>
                    <a-col :span="4">
                        <a class="user_btn">查看日志</a>
                    </a-col>
                </a-row>
                <el-divider />
                <passEdit :userinfo="userinfo"></passEdit>
                <el-divider />
            </div>
            <div style="background-color:white;padding:20px;border-radius: 10px;margin-top: 15px;width: 70%;">
                <h2 style="font-weight:700;">标签管理</h2>
                <el-divider />
                <tagsEdit :userinfo="userinfo"></tagsEdit>
                <!-- <div>
                    <span :style="{ marginRight: '8px' }">不感兴趣的标签:</span>
                    <template v-for="tag in tags" :key="tag">
                        <a-checkable-tag :checked="selectedTags.indexOf(tag) > -1"
                            @change="checked => handleChange(tag, checked)">
                            {{ tag }}
                        </a-checkable-tag>
                    </template>
                </div> -->
            </div>
        </template>
    </layout>
</template>
<script>
import { ElMessageBox } from 'element-plus'
import { defineComponent, reactive, ref, onMounted } from 'vue'
import { PlusOutlined, ManOutlined, WomanOutlined, RobotOutlined, EditOutlined } from '@ant-design/icons-vue'
import $ from 'jquery'
import layout from '../layout/layout.vue'
import { notification } from '@/lib/js/tools.js'
import emailEdit from '../editComponents/emailEdit'
import passEdit from '../editComponents/passEdit'
import tagsEdit from '../editComponents/tagsEdit'
export default defineComponent({
    data() {
        return {
            spinning: false,
            userinfo: this.$store.state.myself,
            breadcrumbs: [{
                menu: "信息编辑",
                href: '/'
            }],
            items: [false, false, false],
            formRef: '',
            formState: {
                describe: '',
                gender: '',
                nickName: ''
            },
            rules: {
            },
            layout: {
                labelCol: {
                    span: 4,
                },
                wrapperCol: {
                    span: 14,
                },
            },

        };
    },
    methods: {
        checkAge(_rule, value) {
        },
        validatePass(_rule, value) {
        },
        validatePass2(_rule, value) {
        },
        handleFinish(values) {
        },
        handleFinishFailed(errors) {
        },
        handleValidate(...args) {
        },
        setQQ() {
            ElMessageBox.prompt('请输入您的qq号码', '设置qq号', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern:
                    /[1-9][0-9]{4,10}/,
                inputErrorMessage: 'qq号码不正确',
            })
                .then(({ value }) => {
                    this.$users.updateUserData(null, null, null, null, this.userinfo.email, value).then(res => {
                        this.userinfo.qq = value
                    })
                })
        },
        onBlur(type) {
            this.items[type] = false
            if (this.formState.nickName != this.userinfo.username || this.formState.describe != this.userinfo.describe) {
                this.$users.updateUserData(this.formState.nickName, null, null, this.formState.describe, this.userinfo.email).then(() => {
                    switch (type) {
                        case 0: {
                            this.userinfo.username = this.formState.nickName
                            break
                        }
                        case 2: {
                            this.userinfo.describe = this.formState.describe
                            break;
                        }
                    }
                })
            }
        },
        genderChange(value) {
            this.$users.updateUserInfo({
                gender: this.formState.gender,
                uid: this.userinfo.id
            }).then(() => {
                this.userinfo.gender = this.formState.gender
            })
        },
        handleChange({ file }) {
            if (file.status == 'uploading') {
                this.spinning = true
            }
            if (file.status == 'done') {
                this.spinning = false
                let res = file.response
                if (res.resultCode == 200) {
                    this.$users.updateUserData(null, null, null, null, this.userinfo.email, null, res.data)
                    this.userinfo.head = res.data
                } else {
                    notification("错误", "error", "上传失败:" + res.message)
                }
            }
        }
    },
    mounted() {
        $(".p").hover((self) => {
            $($(self)[0].target.children).show()
            $($(self)[0].target.children).click(() => {
                this.items[$(self)[0].target.classList[1]] = true
            })
        })
        $(".p").mouseleave((self) => {
            $($(self)[0].target.children).hide()
        })
        let { describe, gender, username } = this.userinfo
        this.formState = {
            describe: describe,
            gender: gender,
            nickName: username
        }
    },
    components: {
        layout, PlusOutlined, ManOutlined, WomanOutlined, RobotOutlined, EditOutlined, emailEdit, passEdit,  tagsEdit
    },
})

</script>

<style>
#editInfo .ant-form-item-label>label {
    color: rgba(0, 0, 0, 0.349)
}

.justify-p {
    width: 70px;
    text-align: justify;
    text-align-last: justify;
    color: rgba(0, 0, 0, 0.349)
}

.user_btn {
    color: #1890ff
}
</style>