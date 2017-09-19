<template>
  <el-card>
    <el-form v-loading="loading">
      <el-form-item>
        <el-input :placeholder="$t('challenge.submitFlagPlaceholder')" class="submit-flag" v-model="form.flag" @keyup.enter.native="submit"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">{{ $t('challenge.submit') }}</el-button>
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
  import Challenge from '@/model/Challenge';
  let ChallengeModel = new Challenge();
  export default {
    data(){
      return {
        form: {
          flag: ""
        },
        loading: false
      }
    },
    methods: {
      async submit(){
        if (!this.form.flag){
          return this.$handleError({
            message: this.$t("challenge.pleaseFillTheForm")
          });
        }
        this.loading = true;
        try{
          let result = await ChallengeModel.submitFlag(this.form.flag);
          this.form.flag = "";
          this.$message({
            showClose: true,
            message: this.$t("challenge.flagCorrect", [result.score]),
            type: 'success'
          });
        }
        catch (e){
          this.$handleError(e);
        }
        this.loading = false;
      }
    }
  }
</script>
