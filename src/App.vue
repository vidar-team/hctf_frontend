<template>
  <div id="app">
    <el-menu theme="light" default-active="/" class="top-nav" mode="horizontal" :router=true>
      <el-menu-item index="/">
        HCTF
      </el-menu-item>
      <el-menu-item index="/user/register" class="float-right">
        注册

      </el-menu-item>
      <el-menu-item index="/user/login" class="float-right">
        登录

      </el-menu-item>

    </el-menu>
    <div class="main-container">
      <router-view></router-view>
    </div>
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
  .el-menu {
    margin: 0 auto 1rem auto;
    box-shadow: #aaa 1px 1px 1px 0px;
  }

</style>
