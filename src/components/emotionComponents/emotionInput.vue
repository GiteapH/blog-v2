<template>
    <div style=" border-radius: 10px;box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);background: var(--searchbgcolor);padding:10px;">
        <div class="_video-comment-input">
            <a-textarea :placeholder="placeholder" v-model:value="content" @keyup.enter="handlePublish" show-word-limit
                type="textarea" @focus="isShowEmotion = false" auto-size></a-textarea>
            <img src="/img/webImg/发布.png" alt="发布" @click="handlePublish" style="margin-left:15px">
        </div>
        <el-row>
            <el-col :span="2">
                <img src="/img/webImg/表情.png" alt="表情" @click="isShowEmotion = !isShowEmotion"
                    style="margin:10px;width:25px;">
            </el-col>
            <el-col :span="15">
                <Emotion v-show="isShowEmotion" class="emotion" @emotion="(i) => content += i" :height="150"
                    style="margin-right:200px;margin-top:0px;z-index:9999"></Emotion>
            </el-col>
            <el-col :span="6">
                <slot name="close"></slot>
            </el-col>
        </el-row>

    </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity';
import Emotion from './emotionArea.vue'



export default {
    name: 'Input',
    props: {
        placeholder: {
            default: '请留下你精彩的评论',
            type: String
        }
    },
    components: {
        Emotion
    },
    setup(props, content) {
        let data = reactive({
            content: '',
            isShowEmotion: false
        })
        const handlePublish = () => {
            content.emit('ok', data.content)
            data.content = ''
            data.isShowEmotion = false
        }
        return {
            ...toRefs(data),
            handlePublish
        }
    }
};
</script>

<style>
div ._video-comment-input {
    width: 100%;
    padding: 15px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
}

div ._video-comment-input>input {
    outline: none;
    border: 0;
    width: 88%;
    font-size: 16px;
    background: inherit;
    color: var(--maincolor);
    margin-left: 13px;
}

div ._video-comment-input>img {
    width: 25px;
    height: 25px;
    margin: auto;
    cursor: pointer;
}

div>.emotion {
    position: relative;
    width: 400px;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
}
</style>
