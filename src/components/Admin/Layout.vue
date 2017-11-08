<template>
  <el-row>
    <el-col :span="4">
      <div class="grid-content">
        <el-menu default-active="/admin/index" :default-openeds="defaultOpeneds" :router="true">
          <el-menu-item index="/admin/index">管理后台</el-menu-item>
          <el-menu-item index="/admin/config">系统设置</el-menu-item>
          <el-menu-item index="/admin/bulletin">公告设置</el-menu-item>
          <el-submenu index="/admin/team">
            <template slot="title">队伍管理</template>
            <el-menu-item index="/admin/team/list">队伍概览</el-menu-item>
          </el-submenu>
          <el-submenu index="/admin/challenge">
            <template slot="title">Challenge 管理</template>
            <el-menu-item index="/admin/challenge/category">分类管理</el-menu-item>
            <el-menu-item index="/admin/challenge/add">添加 Challenge</el-menu-item>
            <el-menu-item index="/admin/challenge/list">Challenge 概览</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </el-col>
    <el-col :span="20">
      <div class="main-container">
        <router-view class="el-card main-container-children"></router-view>
      </div>
    </el-col>
  </el-row>
</template>
<style scoped>
  .main-container {
    position: relative;
  }

  .main-container-children {
    margin: auto 1rem;
    padding: 1rem;
    width: auto !important;
  }
</style>
<script>
  export default {
    data() {
      return {
        defaultOpeneds: ['/admin/team', '/admin/challenge']
      }
    },
    mounted(){

    }
  }
</script>
