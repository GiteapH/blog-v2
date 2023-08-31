<template>
    <div>
        <artilceFlex v-if="type==0" :len="len[0]" v-bind:bindOne="bindOne" v-bind:bindTwo="bindTwo" @lenUpdate="val=>onLenUpdate(0,val)"></artilceFlex>
        <userFlex v-if="type==1" :len="len[1]" v-bind:bindOne="bindOne" v-bind:bindTwo="bindTwo" @lenUpdate="val=>onLenUpdate(1,val)"></userFlex>
    </div>
</template>

<script>
import artilceFlex from './articleFlex.vue'
import userFlex from './userFlex.vue'
export default {
    name: 'BlogSearchContent',
    props:{
        type:{
            type:Number,
            default:0
        },
        len:{
            type:Array,
            default:[]
        },
        bindOne:{
            type:Object,
            default:{
                name:'',
                key:0
            }
        },
        bindTwo:{
            type:Object,
            default:{
                name:'',
                key:0
            }
        }
    },
    data() {
        return {

        };
    },

    mounted() {

    },
    components:{
        artilceFlex,
        userFlex
    },
    methods: {
        onLenUpdate(type,len){
            this.$emit('lenUpdate',type,len)
        }
    },
};
</script>

<style scoped></style>