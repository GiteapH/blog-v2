<template>
    <div>
        <slot></slot>
    </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
    props:['html'],
    mounted() {
        this.$nextTick(() => {
            this.$el.innerHTML = this.$props.html
        })
    },
    watch:{
        html:{
            deep:true,
            handler:function(nv,ov){
                this.$el.innerHTML = nv
            }
        }
    }
})
</script>