<template>
  <el-row>
    <el-col :span="4">
      <div class="grid-content"></div>
    </el-col>
    <el-col :span="16">
      <div class="grid-content">
        <router-view>

        </router-view>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="grid-content"></div>
    </el-col>
  </el-row>
</template>
