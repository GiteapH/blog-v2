<template>
  <div style="background:rgb(190, 200, 200,0);" v-if="!login">
    <a-button type="primary" style="margin-right: 5px;" ghost>
      <router-link to="/regedit?in">登录</router-link>
    </a-button>
    <a-button ghost type="danger">
      <router-link to="/regedit?up">注册</router-link>
    </a-button>
  </div>
  <div style="width: 300rem;" v-if="login" @mouseleave="onLeave">
    <a-avatar id="avatar" shape="circle" :src="src" size="large" @mouseover="onHover" style="z-index: 2;margin-bottom:10px ;" />
    <UserCard id="card" :describe='describe' :userName='userName' :src='src' :BackImgsrc='BackImgsrc'
      style="margin-top:-10px;display: none;left: -13.5%;"></UserCard>
  </div>
</template>
<script>
import { UserOutlined } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';
import UserCard from './userCard.vue';
import $ from 'jquery'

export default defineComponent({
  props: ['login', 'userName', 'BackImgsrc', 'describe', 'src'],
  data() {
    return {

    };
  },
  components: {
    UserOutlined,
    UserCard
  },
  methods: {
    onHover() {
      $("#card").show("0.5")
    },
    onLeave() {
      $("#card").hide("0.5")
    }
  }
});

</script>
<style>
#components-avatar-demo-badge .ant-avatar {
  margin-top: 0;
  margin-right: 0;
}

#avatar #card {
  transition: all 1s ease;
}
</style>