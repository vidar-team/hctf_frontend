<template>
  <el-card v-loading="loading">
    <h2> {{ team.team_name }} </h2>
    <div>
      <span>Total score: {{ team.score }}</span>
    </div>
  </el-card>
</template>
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
