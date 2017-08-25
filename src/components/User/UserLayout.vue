<template>
  <el-row>
    <el-col :span="2">
      <div class="grid-content"></div>
    </el-col>
    <el-col :span="20">
      <div class="grid-content">
        <router-view>

        </router-view>
      </div>
    </el-col>
    <el-col :span="2">
      <div class="grid-content"></div>
    </el-col>
  </el-row>
</template>
