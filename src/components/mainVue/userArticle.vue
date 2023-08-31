<template>
    <layout :breadcrumbs="breadcrumbs">
        <template #content>
            <div class="shadow" style="height:50px;">
                <div class="fontHead">
                    <h1 style="line-height:50px;font-size: 30px;font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;font-weight: 500;margin-left: 15px;">
                        发布管理</h1>
                </div>
            </div>
            <div class="shadowDiv hover" style="margin-top: 15px;display: block;">
                <h2>文章列表</h2>
                <userList></userList>
            </div>
        </template>
    </layout>
</template>
<script>
import { ReadOutlined, UserOutlined, InfoCircleOutlined, BulbOutlined, UploadOutlined, StarOutlined, HistoryOutlined, SoundOutlined } from '@ant-design/icons-vue';
import Avatar from '../avatar.vue'
import { defineComponent, ref } from 'vue';
import { post } from '../../lib/js/axios'
import $ from 'jquery'
import cookie from 'js-cookie'
import userList from '../useraArtList.vue'
import layout from '../layout/layout'
export default defineComponent({
    data() {
        return {
            breadcrumbs: [{
                href: "/",
                menu: "我的创作"
            }],
            onSave: false,
            onHand: false,
            classCount: '10',

        };
    },
    mounted() {

    },
    components: {
        SoundOutlined,
        HistoryOutlined,
        StarOutlined,
        UploadOutlined,
        BulbOutlined,
        ReadOutlined,
        UserOutlined,
        InfoCircleOutlined,
        Avatar,
        layout,
        userList
    },
    methods: {

    }
});
</script>
<style>
.shadowDiv {
    border: solid 1px gainsboro;
    /* Font & Text */
    font-family: Lato, "Helvetica Neue", Arial, Helvetica, sans-serif;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: normal;
    text-align: start;
    vertical-align: baseline;
    /* Color & Background */
    color: rgb(76, 73, 72);
    /* Box */
    background-color: #fff;
    border-radius: 6px;
    padding: 20px;
    /* Positioning */
}
</style>