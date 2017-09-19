<template>
  <el-card>
    <el-form>
      <el-form-item>
        <el-input :placeholder="$t('challenge.submitFlagPlaceholder')" class="submit-flag"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">{{ $t('challenge.submit') }}</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<style>
  .submit-flag input::placeholder{
    font-family: Consolas, monospace;
  }
  .submit-flag input:-ms-input-placeholder{
    font-family: Consolas, monospace;
  }
  .submit-flag input::-webkit-input-placeholder{
    font-family: Consolas, monospace;
  }
</style>
<script>
  export default {

  }
</script>
