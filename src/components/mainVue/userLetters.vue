<!--
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-02-19 14:25:56
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-08-23 11:52:34
 * @FilePath: \blog\src\components\mainVue\userLetters.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <layout :itemMenu="['5']" :breadcrumbs="[{ href: '/', menu: '我的消息' }]" :openKeys="['sub2']" background="blbl.jpg">
        <template #content>
            <div style="padding:15px;background: rgba(0, 0, 0, 0.1);border-radius: 15px;">
                <div style="background-color: white;border-radius: 15px;text-align: left;padding:15px">
                    <span style="color:#666666;font-size:15px"> 我的消息</span>
                </div>
                <div style="background-color: white;border-radius: 15px;text-align: left;padding:15px;margin-top:25px;">
                    <a-tabs v-model:activeKey="activeKey" tab-position="left" animated type="editable-card" :hideAdd="true"
                        style="background-color: rgba(0,0,0,0.05);padding:35px;padding-left:0px;border-radius: 15px;height:800px">
                        <a-tab-pane key="1" tab="我的私信" class="tab-nav">
                            <template #closeIcon>
                                <a-badge color="red"/>
                            </template>
                            <myLetters></myLetters>
                        </a-tab-pane>
                    </a-tabs>
                </div>
            </div>
        </template>
    </layout>
</template>
<script>
import { defineComponent } from 'vue';
import layout from '../layout/layout'
import myLetters from '../privateLetterComponents/myLetters'
const count = 3;
export default defineComponent({
    data() {
        return {
            
        };
    },
    components: {
        layout,
        myLetters
    },
    mounted() {

    },
    methods: {
    },
});
</script>
<style>
.ant-tabs-nav-list {
    border-right: solid 2px white;
}
.ant-tabs-card > .ant-tabs-nav .ant-tabs-tab, .ant-tabs-card > div > .ant-tabs-nav .ant-tabs-tab{
    border:none;
    background:none;
}
.ant-tabs-card > .ant-tabs-nav .ant-tabs-tab-active, .ant-tabs-card > div > .ant-tabs-nav .ant-tabs-tab-active{
    color: #1890ff;
    background: #fff;
}

.tab-nav {
    background: white;
    height: 800px;
    padding: 25px;
    border-top-right-radius : 15px;
    border-bottom-right-radius: 15px;
    padding-left: 0px;
}
</style>