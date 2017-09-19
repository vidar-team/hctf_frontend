<template>
  <el-row>
    <el-col :span="2">
      <div class="grid-content"></div>
    </el-col>
    <el-col :span="20">
      <div class="grid-content">
        <el-alert
          :title="$t('banned.banTitle')"
          type="error"
          :description="$t('banned.banDescription')"
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
<script>
  export default {}
</script>
