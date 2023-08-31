<template>
    <a-row>
        <a-col :span="16">
            <p class="justify-p">密码</p>
        </a-col>
        <a-col :span="4">
            
        </a-col>
        <a-col :span="4">
            <a class="user_btn" @click="updatePass('pass')">重置密码</a>
        </a-col>
        <el-dialog v-model="passlVisiblity" title="重置密码" width="20%" center>
            <div v-show="steps[0]">
                <el-input class="input" disabled v-model="userinfo.email" />
                <a-input-search v-model:value="codeValue" placeholder="请输入验证码" size="large" style="">
                    <template #enterButton>
                        <a-button type="primary" warning :loading="codeEnterLoading"
                            :disabled="onReadSec && !codeEnterLoading" @click="sendCode(0)">{{ code }}</a-button>
                    </template>
                </a-input-search>
                <a-button type="primary" danger class="step" :disabled="codeValue == ''" @click="next(0)"
                    :loading="nextStepLoading[0]">下一步</a-button>
            </div>
            <div v-show="steps[1]">
                <el-input v-model="pass_new" type="password" placeholder="请输入新密码" style="margin-bottom:18px"
                    show-password />
                <passStrength v-model:password="pass_new" style="margin-top:15px;margin-bottom:15px"></passStrength>
                <el-input v-model="pass_new_check" type="password" placeholder="请确认与新密码是否一致" style="margin-bottom:18px"
                    show-password />
                <a-button type="primary" danger class="step" :disabled="pass_new == '' || pass_new_check == ''"
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
import md5 from 'js-md5'
import passStrength from '../passStrength.vue'
export default defineComponent({
    props: {
        userinfo: {
            default: {},
            type: Object
        }
    },
    data() {
        return {
            passlVisiblity: false,
            codeValue: '',
            code: '点击获取验证码',
            onReadSec: false,
            codeEnterLoading: false,
            nextStepLoading: [false, false],
            newEmail: '',
            steps: [true, false, false],
            pass_new: '',
            pass_new_check: ''
        };
    },
    methods: {
        updatePass(info) {
            this.passlVisiblity = true
            
        },
        next(step) {
            this.nextStepLoading[step] = true
            if (step == 0) {
                this.$tools.checkCode(this.userinfo.email, this.codeValue).then(truth => {
                    if (truth) {

                        if (step == 0) {
                            this.steps[step + 1] = true
                            this.steps[step] = false
                        }
                    }
                })
            }
            // 修改密码信息
            if (step == 1) {
                // 密码是否符合规范
                let rgx = /^(?![a-zA-Z]+$)(?!\d+$)(?![^\da-zA-Z\s]+$).{8,30}$/
                try {
                    if (this.pass_new != this.pass_new_check) {
                        throw "两次密码输入不一致"
                    }
                    else if (!rgx.test(this.pass_new)) {
                        throw "由字母、数字、特殊字符,任意2种组成"
                    }
                    else if (this.pass_new.length < 8) {
                        throw "密码不能少于8字数"
                    }
                    else if (this.pass_new.length > 30) {
                        throw "密码不能多于30字数"
                    }
                    else {
                        this.$users.updateUserData(null, null, md5(this.pass_new), null, this.userinfo.email).then(res => {
                            this.steps[step + 1] = true
                            this.steps[step] = false
                        })
                    }
                } catch (errMessage) {
                    notification("错误", "error", errMessage)
                }
            }
            if (step == 2) {
                this.steps[0] = true
                this.steps[step] = false
                this.passlVisiblity = false
            }

            this.nextStepLoading[step] = false
        },
        sendCode(step) {
            this.codeEnterLoading = true
            let mail = this.$props.userinfo.email
            this.$tools.getCode("修改密码", mail, mail, this.$props.userinfo.username).then(res => {
                this.codeEnterLoading = false
                let time = 59
                let inter = setInterval(() => {
                    if (time == step) {
                        this.onReadSec = false
                        this.code = '点击获取验证码'
                        time = 59
                        clearInterval(inter)
                    } else {
                        this.onReadSec = true
                        this.code = time + "s后可获取验证码"
                        time--
                    }
                }, 1000)

            }).catch(e => {
                this.codeEnterLoading = false
            })

        }

    },
    mounted() {
        
    },
    components: {
        passStrength
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