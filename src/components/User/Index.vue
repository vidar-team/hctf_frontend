<template>
  <el-card v-loading="loading">
    <h2> {{ team.team_name }} </h2>
    <div>
      <p>{{ $t('user.totalScore') }}: {{ team.score }}</p>
      <p>Token: <span class="token">{{ team.token }}</span></p>
      <p>{{ $t('user.ranking') }}: {{team.ranking}} </p>
    </div>
  </el-card>
</template>
<style scoped>
  .token {
    font-family: Consolas, monospace;
  }
</style>
<script>
  import Team from '@/api/Team';

  export default {
    data() {
      return {
        team: {},
        loading: false
      }
    },
    async mounted() {
      this.loading = true;
      try {
        this.team = await Team.getTeamInfo();
      }
      catch (e) {
        this.$handleError(e);
      }
      this.loading = false;
    },
    methods: {}
  }
</script>
