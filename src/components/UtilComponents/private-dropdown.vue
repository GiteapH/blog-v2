<template>
    <div>
        <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click.prevent>
                {{ menus[key] }}
                <DownOutlined />
            </a>
            <template #overlay>
                <a-menu @click="menuChange">
                    <a-menu-item v-for="(item,index) in menus " :key="index">
                        <a>{{ item }}</a>
                    </a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
    </div>
</template>
<script>
import {DownOutlined} from '@ant-design/icons-vue'
export default {
    name: 'PrivateDropdown',
    props:{
        menus:{
            type:Array,
            default:[]
        }
    },
    data() {
        return {
            key:0
        };
    },

    mounted() {

    },

    methods: {
        menuChange(key){
            
            this.key = key.key
            this.$emit('update', key.key);
        }
    },

    components:{
        DownOutlined
    }
};
</script>
<style  scoped></style>