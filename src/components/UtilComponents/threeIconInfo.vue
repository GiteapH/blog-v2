<template>
    <div>
        <a-row>
            <a-col :span="24 / size" v-show="types[0]" :class="'listIcon '+(disabled?'':'hover')">
                <CustomerServiceOutlined @click="onShare" />{{ dataReal[0] }}
            </a-col>
            <a-col :span="24 / size" v-show="types[1]" :class="'listIcon '+(disabled?'':'hover')">
                <CommentOutlined @click="onComment" />{{ dataReal[1] }}
            </a-col>
            <a-col :span="24 / size" v-show="types[2]" :class="'listIcon '+(disabled?'':'hover')">
                <LikeOutlined @click="onLike" v-if="filledReal[0]" />
                <LikeFilled v-else></LikeFilled>
                {{ dataReal[2] }}

            </a-col>
            <a-col :span="24 / size" v-show="types[3]" :class="'listIcon '+(disabled?'':'hover')">
                <DislikeOutlined v-if="filledReal[1]" @click="onDislike" />
                <DislikeFilled v-else></DislikeFilled>
                {{ dataReal[3] }}
            </a-col>
            <a-col :span="24 / size" v-show="types[4]" :class="'listIcon '+(disabled?'':'hover')">
                <StarOutlined @click="onStar" v-if="filledReal[2]" />
                <StarFilled v-else></StarFilled>
                {{ dataReal[4] }}
            </a-col>
            <a-col :span="24 / size" v-show="types[5]" :class="'listIcon '+(disabled?'':'hover')">
                <EyeOutlined @click="onWatch" />{{ dataReal[5] }}
            </a-col>
        </a-row>
    </div>
</template>

<script>
import { CustomerServiceOutlined, CommentOutlined, LikeOutlined, DislikeOutlined, StarOutlined, EyeOutlined,LikeFilled,DislikeFilled,StarFilled } from '@ant-design/icons-vue'
export default {
    props: {
        types: {
            default: [true, true, true, false, false, false],
            type: Object
        },
        data: {
            default: [0, 0, 0, 0, 0, 0],
            type: Array
        },
        filled:{
            default: [true,true,true],
            type: Object
        },
        disabled:{
            type:Boolean,
            default:false
        }
    },
    components: {
        CustomerServiceOutlined, CommentOutlined, LikeOutlined, DislikeOutlined, StarOutlined, EyeOutlined,LikeFilled,DislikeFilled,StarFilled
    },
    name: 'BlogThreeIconInfo',

    data() {
        return {
            size: 3,
            dataReal:[],
            filledReal:[]
        };
    },

    mounted() {
        let count = 0
        for (let i of this.$props.types) {
            if (i) count++

        }
        this.size = count

        let {data,filled} = this.$props
        this.dataReal = data
        this.filledReal = filled
    },

    methods: {
        onComment() {
            if(this.$props.disabled){
                return
            }
            this.$emit('onComment',this.dataReal,this.filledReal)
        },
        onLike() {
            if(this.$props.disabled){
                return
            }
            this.$emit('onLike',this.dataReal,this.filledReal)
        },
        onDislike() {
            if(this.$props.disabled){
                return
            }
            this.$emit('onDislike',this.dataReal,this.filledReal)
        },
        onStar() {
            if(this.$props.disabled){
                return
            }
            this.$emit('onStar',this.dataReal,this.filledReal)
        },
        onWatch() {
            if(this.$props.disabled){
                return
            }
            this.$emit('onWatch',this.dataReal,this.filledReal)
        }
    },
};
</script>

<style scoped>
.listIcon {
    color: rgb(133, 133, 133);
}

.hover:hover {
    color: rgb(55, 157, 253);
}
</style>