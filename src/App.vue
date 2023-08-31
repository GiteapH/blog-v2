<!--
 * @Author: GiteapH 1046664571@qq.com
 * @Date: 2022-08-29 15:05:27
 * @LastEditors: GiteapH 1046664571@qq.com
 * @LastEditTime: 2023-08-22 14:19:26
 * @FilePath: \blog\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view></router-view>
    </div>
  </a-config-provider>
</template>

<script>
import locale from 'antd/es/locale/zh_CN';
export default {
  name: 'app',
  methods:{

  },
  data(){
    return {
      locale:locale
    }
  }

}
</script>