<!--
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-08-27 11:33:25
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-08-27 17:09:33
 * @FilePath: \blog\src\components\mainVue\userHistory.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <layout :breadcrumbs="breadcrumbs">
        <template #content>
            <div style="padding:15px;background:white">
                <el-row style="margin-bottom:20px;" justify="space-around">
                    <el-col :span="14" style="font-size:25px;font-weight:800;">
                        <ClockCircleTwoTone style="font-size:25px;margin-right: 10px;"></ClockCircleTwoTone>历史记录
                    </el-col>
                    <el-col :span="10">
                        <el-row :gutter="12">
                            <el-col :span="12">
                                <el-input v-model="search" placeholder="搜索历史" :prefix-icon="SearchOutlined"
                                    @keyup.enter="onsearch" />
                            </el-col>
                            <el-col :span="12">
                                <el-button type="primary" :disabled="histories.length == 0" @click="clear">清空历史</el-button>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <a-empty v-if="histories.length == 0">
                </a-empty>
                <el-timeline v-else>
                    <el-timeline-item v-for="(item,idx) in histories" :key="item" v-loading="load"
                        :timestamp="judgeDate(item.hdate,)" hollow type="primary" placement="top">
                        <el-row>
                            <el-col :span="3">
                                <a-image style="border-radius: 10px;" :width="110"
                                    :src="`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?${random}`">
                                    <template #placeholder>
                                        <a-image style="border-radius: 10px;"
                                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
                                            :width="110" :preview="false" />
                                    </template>
                                </a-image>
                            </el-col>
                            <el-col :span="19">
                                <a :href="item.href"
                                    style="margin-bottom: 15px;width:100%;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;font-size: 15px;font-weight: 800;">
                                    {{ item.title }}</a>
                                <p style="margin-bottom:20px">{{ item.tinymes }}</p>
                                <el-row>
                                    <el-col :span="12"
                                        style="font-size:12px;color:rgb(185, 182, 182);font-weight: 200;height: 20px;">
                                        登陆设备<AppleFilled style="margin-left:5px"></AppleFilled>
                                    </el-col>
                                    <el-col :span="12">
                                        <span  style="font-size:12px;color:rgb(146, 146, 146);font-weight: 200;height: 20px;"><EyeFilled style="margin-right:5px"></EyeFilled>{{ item.watched }}</span>
                                        <a-divider type="vertical"></a-divider>
                                        <span v-for="tag in item.classSys" :key="tag"
                                            style="font-size:12px;color:rgb(146, 146, 146);font-weight: 200;height: 20px;margin-right: 10px;">
                                            {{ tag }}
                                        </span>
                                    </el-col>
                                </el-row>
                                <el-divider style="margin:4px auto"></el-divider>
                            </el-col>
                            <el-col :span="2">
                                <a-button shape="circle"
                                    style="border: none;margin: auto auto;height: 100%;font-size: 20px;">
                                    <template #icon>
                                        <DeleteOutlined @click="clearById(item.hid,idx)" />
                                    </template>
                                </a-button>
                            </el-col>
                        </el-row>
                    </el-timeline-item>
                </el-timeline>
            </div>
        </template>
    </layout>
</template>
<script setup>
import { getURL } from '@/lib/js/tools';
import { ClockCircleTwoTone, SearchOutlined, AppleFilled, EyeFilled, DeleteOutlined } from '@ant-design/icons-vue';
import { getCurrentInstance, onMounted, ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import layout from '../layout/layout'

const { proxy } = getCurrentInstance()
const userinfo = proxy.$store.state.myself
const histories = ref([])
const search = ref('')
const load = ref(true)
onMounted(() => {
    proxy.$history.selectHistory(userinfo.id).then(res => {
        histories.value = res.map(e => {
            let per = e.classper == "" ? [] : e.classper.replace(/^\s+|\s+$/g, '').split(" ")
            let sys = e.classsys == "" ? [] : e.classsys.replace(/^\s+|\s+$/g, '').split(" ")
            e.classSys = [...per, ...sys]
            e.href = getURL('/articleView', parseInt(Math.random() * 15869), e.aid)
            return e
        })
    }).finally(() => {
        load.value = false
    })
})

const clearById = (id,idx) => {
    ElMessageBox.confirm(
        '确认删除历史信息吗？',
        '警告',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            proxy.$history.delete(id).then(() => {
                ElMessage({
                    type: 'success',
                    message: '删除成功',
                })
            })
            histories.value.splice(idx, 1)
        })
}

const clear = () => {
    ElMessageBox.confirm(
        '确认清空历史信息吗？',
        '警告',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            proxy.$history.deleteAll(userinfo.id).then(() => {
                ElMessage({
                    type: 'success',
                    message: '删除成功',
                })
                histories.value = []
            })
        })
}

const onsearch = () => {
    load.value = true
    proxy.$history.search(userinfo.id, search.value).then(res => {
        histories.value = res
    }).finally(() => {
        load.value = false
    })
}
</script>
<style></style>