<template>
  <div class="app">
    <h3>{{ $store.state.name }}</h3>
    <img alt="Vue logo" src="./assets/logo.png" />
  </div>
  <router-link to="/login">登录</router-link>
  <router-link to="/main">首页</router-link>
  <router-view></router-view>

  <el-button>哈哈哈</el-button>
  <el-button type="primary">hhhh</el-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
//按需引入(局部引入)
// import {ElButton} from 'element-plus'
//方式一.引入样式
// import 'element-plus/theme-chalk/base.css'
// import 'element-plus/theme-chalk/el-button.css'
// 方式二.安装babel插件 自动引入
export default defineComponent({
  name: "App",
  // components:{
  //   ElButton
  // }
});
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
