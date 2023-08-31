<template>
    <div class="container">
        <div class="tabs">
            <input type="radio" id="radio-1" name="tabs" :checked="checked==0"/>
            <label class="tab" for="radio-1" @click="onClick(0)">文章
                <span class="notification">{{ len[0]>99?'99+':len[0] }}</span>
            </label>
            <input type="radio" id="radio-2" name="tabs" :checked="checked==1" />
            <label class="tab" for="radio-2" @click="onClick(1)">用户
                <span class="notification">{{ len[1]>99?'99+':len[1] }}</span>
            </label>
            <input type="radio" id="radio-3" name="tabs" :checked="checked==2"/>
            <label class="tab" for="radio-3" @click="onClick(2)" >主题
                <span class="notification">{{ len[2]>99?'99+':len[2] }}</span>
            </label>
            <input type="radio" id="radio-4" name="tabs" :checked="checked==3" />
            <label class="tab" for="radio-4" @click="onClick(3)" >动态
                <span class="notification">{{ len[3]>99?'99+':len[3] }}</span>
            </label>
            <span class="glider"></span>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        len:{
            type:Array,
            default:[]
        },
    },
    name: 'BlogTabs',
    data() {
        return {
            checked:this.$route.query?.type??0
        };
    },
    watch:{
        checked(nv,ov){
            
            this.$emit('change',nv)
        }
    },
    mounted() {

    },

    methods: {
        onClick(val){
            this.checked = val
        }
    },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap");


.container {
    position: relative;
    display: block;
    width:100%;
    align-items: center;
    justify-content: center;
    margin-top:15px;
}

.tabs {
    display: flex;
    position: relative;
    background-color: #fff;
    box-shadow: 0 0 1px 0 rgba(24, 94, 224, 0.15), 0 6px 12px 0 rgba(24, 94, 224, 0.15);
    border-radius: 99px;
}

.tabs * {
    z-index: 2;
}

input[type="radio"] {
    display: none;
}

.tab {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 54px;
    width: 200px;
    font-size: 1.25rem;
    font-weight: 500;
    border-radius: 99px;
    cursor: pointer;
    transition: color 0.15s ease-in;
}

.notification {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    margin-left: 0.75rem;
    border-radius: 50%;
    background-color: #e6eef9;
    transition: 0.15s ease-in;
}

input[type="radio"]:checked+label {
    color: #185ee0;
}

input[type="radio"]:checked+label>.notification {
    background-color: #185ee0;
    color: #fff;
}

input[id="radio-1"]:checked~.glider {
    transform: translateX(0);
}

input[id="radio-2"]:checked~.glider {
    transform: translateX(100%);
}

input[id="radio-3"]:checked~.glider {
    transform: translateX(200%);
}

input[id="radio-4"]:checked~.glider {
    transform: translateX(300%);
}

.glider {
    position: absolute;
    display: flex;
    height: 54px;
    width: 200px;
    background-color: #e6eef9;
    z-index: 1;
    border-radius: 99px;
    transition: 0.25s ease-out;
}

@media (max-width: 700px) {
    .tabs {
        transform: scale(0.6);
    }
}
</style>