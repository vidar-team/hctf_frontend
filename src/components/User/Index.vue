<template>
  <el-card v-loading="loading">
    <h2> {{ team.team_name }} </h2>
    <div>
      <p>Total score: {{ team.score }}</p>
      <p>Token: <span class="token">{{ team.token }}</span></p>
    </div>
  </el-card>
</template>
<style scoped>
  .token{
    background-color: #e7e7e7;
  }
</style>
<script>
  import User from '../../model/Team';
  let UserModel = new User();
  export default {
    data(){
      return {
        team: {},
        loading: false
      }
    },
    async mounted(){
      this.loading = true;
      try{
        this.team = await UserModel.getTeamInfo();
      }
      catch (e){
        this.$handleError(e);
      }
      this.loading = false;
    }
  }
</script>
