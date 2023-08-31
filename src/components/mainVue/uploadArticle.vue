<template>
    <layout :breadcrumbs="breadcrumbs">
        <template #content>
            <div class="shadow" style="height:50px;">
                <div class="fontHead">
                    <h1
                        style="line-height:50px;font-size: 30px;font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;font-weight: 500;margin-left: 15px;">
                        文章编辑</h1>
                </div>
            </div>
            <content style="margin-top:15px"></content>
        </template>
    </layout>
</template>
<script>
import { ReadOutlined, UserOutlined, InfoCircleOutlined, BulbOutlined, UploadOutlined, StarOutlined, HistoryOutlined, SoundOutlined } from '@ant-design/icons-vue';
import Avatar from '../avatar.vue'
import classify from '../classifyTag.vue'
import { defineComponent, ref } from 'vue';
import workList from '../article.vue'
import content from '../upLoadform.vue'
import $ from 'jquery'
import { post } from '../../lib/js/axios'
import cookie from 'js-cookie'
import layout from '../layout/layout'


export default defineComponent({
    data() {
        return {
            breadcrumbs: [{
                href: "/",
                menu: location.search==''?'文章创作': "文章编辑"
            }],
            onSave: false,
            onHand: false,
            classCount: '10',
            value: '',
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
        workList,
        classify,
        content,
        layout
    },
    methods: {
        // 搜索框点击搜索
        onSearch(value) {
            
        },
        // 搜索框聚焦
        onFocus() {
            
            $('#search').css({
                'width': '300px'
            })
        },
        // 搜索框失焦
        onBlur() {
            
            $('#search').css({
                'width': '200px'
            })
        },
        // 更新count
        creaseCount(count) {
            
            this.classCount += count
        }
    }
});

</script>
<style>
.shadow {
    border: solid 1px gainsboro;
    /* Font & Text */
    font-family: Lato, "Helvetica Neue", Arial, Helvetica, sans-serif;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: normal;
    line-height: 19.999px;
    text-align: start;
    vertical-align: baseline;
    /* Color & Background */
    color: rgb(76, 73, 72);
    /* Box */
    height: 55.4219px;
    background-color: #fff;
    border-radius: 6px;
    /* Positioning */
    position: static;
    /* Miscellaneous */
    /* Effects */
    outline-offset: 0px;
    box-sizing: border-box;
}

</style>