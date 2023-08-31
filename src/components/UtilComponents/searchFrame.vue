<!--
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2023-03-29 14:15:19
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-08-25 21:10:32
 * @FilePath: \blog\src\components\UtilComponents\searchFrame.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <div class="frame">
            <slot name="input">
            </slot>
            <div style="position: absolute;width:80%;margin: 10px auto;background-color: white;padding-top: 10px;padding-bottom: 10px;box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;" v-show="show">
                <a-divider orientation="left" orientation-margin="5px" style="color:orangered;font-size:12px">搜索内容</a-divider>
                <a-row v-for="item in infos" class="search_item" @mousedown.prevent="update(item.searchContent)">
                    <a-col :span="22">
                        <editHTML :html="item.searchContentHTML"></editHTML>
                    </a-col>
                    <a-col :span="2">
                        <a-tag color="#cd201f"  v-if="item.priority > 50">
                            <template #icon>
                                <FireOutlined/>
                            </template>
                            热
                        </a-tag>
                    </a-col>
                </a-row>
                <a-empty v-if="infos.length == 0" description="无搜索数据"> </a-empty>
                <a-divider orientation="left" orientation-margin="5px" style="color:orangered;font-size:12px">搜索历史</a-divider>
                <a-row v-for="item in histories" class="search_item" @mousedown.prevent="update(item)">
                    <a-col :span="22">
                        <p>{{ item }}</p>
                    </a-col>
                  
                </a-row>
            </div>
        </div>
    </div>
</template>

<script>
import { FireOutlined } from '@ant-design/icons-vue';
import editHTML from '../editHTML'
import cookie from 'js-cookie'
export default {
    name: 'BlogSearchFrame',
    props: {
        value: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            show: false,
            histories:[],
            infos: []
        };
    },

    watch: {
        value: {
            deep: true,
            handler: function (nv, ov) {
                if (nv.length != 0) {
                    this.show = true
                    this.$search.info(this.$props.value).then(res => {
                        
                        this.infos = res.map(e=>{
                            e.searchContentHTML = e.searchContent.replace(this.$props.value.toLowerCase() ,`<span style="color:#0382e6">${this.$props.value}</span>`)
                            return e
                        })
                    })
                } else {
                    this.show = false
                }
            }
        }
    },
    mounted() {
        let history = cookie.get('/history')
        this.histories = history==null?[]:history.split(",")
    },
    components: {
        FireOutlined,
        editHTML
    },
    methods: {
        onLenUpdate(type, len) {
            this.$emit('lenUpdate', type, len)
        },
        update(val,e){
            this.$emit('update',val)
            this.show = false
        }
    },
};
</script>

<style scoped>
.frame {
    /* padding: 10px; */
    background: white;
    border-radius: 8px;
}

.search_item {
    background: white;
    color: black;
    font-size: 15px;
    padding: 5px;
}

.search_item:hover {
    background: rgb(240, 237, 237);
}
</style>