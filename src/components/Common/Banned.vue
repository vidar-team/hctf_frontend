<template>
  <el-row>
    <el-col :span="2">
      <div class="grid-content"></div>
    </el-col>
    <el-col :span="20">
      <div class="grid-content">
        <el-alert
          title="账号已被封停"
          type="error"
          description="由于您难以描述的操作，您的账号已经被封停。"
          :closable="false"
          show-icon>
        </el-alert>
      </div>
    </el-col>
    <el-col :span="2">
      <div class="grid-content"></div>
    </el-col>
  </el-row>
</template>
