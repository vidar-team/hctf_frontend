<template>
  <el-row>
    <el-col :span="2">
      <div class="grid-content"></div>
    </el-col>
    <el-col :span="20">
      <div class="grid-content">
        <h2 class="not_found_message" title="FLAG NOT HERE">
          HTTP/1.1 404 Not Found
        </h2>
      </div>
    </el-col>
    <el-col :span="2">
      <div class="grid-content"></div>
    </el-col>
  </el-row>
</template>
<style>
  .not_found_message {
    text-align: center;
    font-size: 5rem;
    color: #aaa;
    font-family: Consolas, monospace;
  }
</style>
