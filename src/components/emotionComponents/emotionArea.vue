<template>
    <div>
        <div class="emotion-box" :style="{ height: height + 'px' }">
            <div class="emotion-box-line" v-for="(line, i) in list" :key="i">
                <Emotion class="emotion-item" v-for="(item, j) in line" :key="j" @click="clickHandler(i*8+j)">
                    {{ item }}
                </Emotion>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, toRefs, reactive } from 'vue'
import Emotion from './emotion'
export default defineComponent({
    setup(props,content) {
        let data = reactive({
            list: [
                ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴'],
                ['睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过'],
                ['酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢'],
                ['饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂'],
                ['疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见'],
                ['擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠'],
                ['鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀'],
                ['西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰',],
                ['凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀'],
                ['足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强'],
                ['弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你'],
                ['NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈'],
                ['磕头', '回头', '跳绳', '挥手', '激动', '街舞', '左太极', '右太极'],
            ],
            height: props.height || 200
        })
        return {
            ...toRefs(data)
        }
    },
    methods: {
        clickHandler(item) {
            let emotion = `#${item};`
            this.$emit('emotion', emotion)
        }
    },
    mounted() {

    },
    components: {
        Emotion
    }
})
</script>

<style scoped>
.emotion-box {
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
    overflow: hidden;
    overflow-y: auto;
    background: white;
    position: relative;
}

.emotion-box::-webkit-scrollbar {
    width: 5px;
    height: 3px !important;
    background-color: #F5F5F5;
}

/*定义滑块 内阴影+圆角*/
.emotion-box::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, .15);
}

.emotion-box-line {
    display: flex;
}

.emotion-item {
    flex: 1;
    text-align: center;
    cursor: pointer;
    margin: 5px;
}
</style>
