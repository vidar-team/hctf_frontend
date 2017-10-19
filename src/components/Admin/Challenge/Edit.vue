<template>
  <el-tabs v-model="activeTabName">
    <el-tab-pane label="概览" name="overview" v-loading="loading">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input style="width: 293px" v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" style="width: 293px" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="开放时间">
          <el-date-picker
            v-model="form.releaseTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="一些功能">
          <el-button type="text">修订基准分数</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitOverview">保存</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import Challenge from '@/model/admin/Challenge';
  let ChallengeModel = new Challenge();
  export default {
    data(){
      return {
        activeTabName: "overview",
        form: {
          title: "",
          description: "",
          releaseTime: ""
        },
        loading: false
      }
    },
    methods: {
      async submitOverview(){
        if (!this.form.title || !this.form.description || !this.form.releaseTime){
          return this.$handleError({
            message: "信息均不能为空"
          });
        }
        try{
          if (new Date(this.form.releaseTime) <= new Date()){
            await this.$confirm('开放时间小于当前时间，创建后将立即可见，生产环境不建议进行此操作，确认继续?', '危险操作确认', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            });
          }
        }
        catch (e){

        }
        this.loading = true;
        try{
          await ChallengeModel.editChallenge(this.$route.query.challengeId, this.form.title, this.form.description, this.form.releaseTime);
        }
        catch (e){
          this.$handleError(e);
        }
        this.loading = false;
      }
    },
    async mounted(){
      if (!this.$route.query.challengeId){
        this.$router.push({
          name: "Admin-Challenge-Category"
        })
      }
      this.loading = true;
      let challengeInfo = await ChallengeModel.getChallengeInfo(this.$route.query.challengeId);
      this.loading = false;
      this.form.title = challengeInfo.title;
      this.form.description = challengeInfo.description;
      this.form.releaseTime = challengeInfo.release_time;
    }
  }
</script>
