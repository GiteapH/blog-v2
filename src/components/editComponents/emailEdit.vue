<template>
    <a-row>
        <a-col :span="16">
            <p class="justify-p">邮箱</p>
        </a-col>
        <a-col :span="4">
            <p>{{ userinfo.email }}</p>
        </a-col>
        <a-col :span="4">
            <a class="user_btn" @click="updateInfo('email')">更换邮箱</a>
        </a-col>
        <el-dialog v-model="emialVisiblity" title="更换邮箱" width="20%" center>
            <div v-show="steps[0]">
                <el-input class="input" disabled v-model="userinfo.email" />
                <a-input-search v-model:value="codeValues[0]" placeholder="请输入验证码" size="large" style="">
                    <template #enterButton>
                        <a-button type="primary" warning :loading="codeEnterLoading[0]" :disabled="onReadSec[0]||codeEnterLoading[0]"
                            @click="sendCode(0)">{{ Codes[0]}}</a-button>
                    </template>
                </a-input-search>
                <a-button type="primary" danger class="step" :disabled="codeValues[0] == ''&&nextStepLoading[0]" @click="next(0)"
                    :loading="nextStepLoading[0]">下一步</a-button>
            </div>
            <div v-show="steps[1]">
                <el-input class="input" v-model="newEmail" placeholder="请输入您需要更换的邮箱" />
                <a-input-search v-model:value="codeValues[1]" placeholder="请输入新邮箱验证码" size="large">
                    <template #enterButton>
                        <a-button type="primary" warning :loading="codeEnterLoading[1]" :disabled="onReadSec[1]||codeEnterLoading[1]"
                            @click="sendCode(1)">{{ Codes[1]}}</a-button>
                    </template>
                </a-input-search>
                <a-button type="primary" danger class="step" :disabled="codeValues[1] == '' || newEmail == ''"
                    @click="next(1)" :loading="nextStepLoading[1]">提交</a-button>
            </div>
            <div v-show="steps[2]">
                <p>提交成功</p>
                <a-button type="primary" danger class="step" @click="next(2)">完成</a-button>
            </div>
            <template #footer>
                <span class="dialog-footer">
                </span>
            </template>
        </el-dialog>
    </a-row>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import { PlusOutlined, ManOutlined, WomanOutlined, RobotOutlined, EditOutlined } from '@ant-design/icons-vue'
import { notification } from '@/lib/js/tools.js'
import $ from 'jquery'
export default defineComponent({
    props: {
        userinfo: {
            default: {},
            type: Object
        }
    },
    data() {
        return {
            emialVisiblity: false,
            codeValues: ['', ''],
            Codes: ['点击获取验证码', '点击获取验证码'],
            onReadSec: [false, false],
            codeEnterLoading: [false, false],
            nextStepLoading: [false, false],
            newEmail: '',
            steps: [true, false, false]
        };
    },
    methods: {
        updateInfo(info) {
            this.emialVisiblity = true
        },
        next(step) {
            this.nextStepLoading[step] = true
            if (step == 2) {
                this.steps[0] = true
                this.steps[step] = false
                this.emaillVisiblity = false
            }
            this.$tools.checkCode(this.userinfo.email, this.codeValues[step]).then(truth => {
                if (truth) {

                    if (step == 0) {
                        this.steps[step + 1] = true
                        this.steps[step] = false
                    }
                    // 修改邮箱信息
                    if (step == 1) {
                        this.$users.updateUserData(null, this.newEmail, null, null, this.userinfo.email).then(res => {
                            this.steps[step + 1] = true
                            this.steps[step] = false
                        })
                    }
                }
                this.nextStepLoading[step] = false
            }).catch(e => {
                this.nextStepLoading[step] = false
            })
        },
        sendCode(step) {
            this.codeEnterLoading[step] = true
            let mail = ''
            if (step == 1) {
                // 验证新邮箱
                if (!/^[a-zA-Z0-9][a-zA-Z0-9_]+\@[a-zA-Z0-9]+\.(com|cn|net|com.cn)$/i.test(this.newEmail)) {
                    notification("警告", "warning", "邮箱不符合规范(以字母开头，3-18字符，可使用英文数字下划线)")
                    this.onReadSec[step] = false
                    this.codeEnterLoading[step] = false
                    return
                }
            }
            if (step == 0) {
                mail = this.$props.userinfo.email
            } else {
                mail = this.newEmail
            }
            this.$tools.getCode("重置邮箱", mail, this.$props.userinfo.email, this.$props.userinfo.username).then(res => {
                this.codeEnterLoading[step] = false
                let time = 59
                let inter = setInterval(() => {
                    if (time == step) {
                        this.onReadSec[step] = false
                        this.Codes[step] = '点击获取验证码'
                        time = 59
                        clearInterval(inter)
                    } else {
                        this.onReadSec[step] = true
                        this.Codes[step] = time + "s后可获取验证码"
                        time--
                        
                    }
                }, 1000)

            }).catch(e => {
                
                this.codeEnterLoading[step] = false
            })

        }

    },
    mounted() {

    },
    components: {

    },
})

</script>

<style>
.step {
    margin-top: 35px;
    text-align: center;
    justify-content: center;
    width: 100%
}

.input {
    margin-bottom: 18px;
}
</style>