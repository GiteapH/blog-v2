<!--
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2022-08-30 09:35:27
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-08-26 15:03:25
 * @FilePath: \blog\src\components\cascader.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <a-cascader 
    v-model:value="value" 
    :options="options" placeholder="已定义类型" 
    :show-search="{ filter }"
    @focus="{onBlur}"
    :field-names="{ label: 'categoryName', value: 'categoryId', children: 'sonCategories' }"/>
</template>
<script>
import { defineComponent, ref,getCurrentInstance, onMounted } from 'vue';

export default defineComponent({
    setup() {
        let input = ''
        const options = ref([])
        const value = ref([])
        let {proxy} = getCurrentInstance()
        const onBlur = (value)=>{
            
        }
        const getTags = ()=>{
            proxy.$tags.getCategories().then(res=>{
                options.value = res
            })
        }
        const filter = (inputValue, path) => {
            input = inputValue
            return path.some(option => option.categoryName.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
        };
        onMounted(()=>{
            getTags()
        })
        return {
            value,
            options,
            filter,
            getTags
        };
    },

});
</script>