<template>
  <div id="app">
    <el-menu theme="light" default-active="/" class="top-nav" mode="horizontal" :router=true>
      <el-menu-item index="/">
        HCTF
      </el-menu-item>
      <el-menu-item index="/user/reg" class="float-right">
        注册

      </el-menu-item>
      <el-menu-item index="/user/login" class="float-right">
        登录

      </el-menu-item>

    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  .float-right {
    float: right !important;
  }
  body {
    margin: 0;
  }
</style>
