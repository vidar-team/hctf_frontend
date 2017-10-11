<template>
  <el-row class="content">
    <el-col :span="24" style="padding-bottom: 2rem;">
      <el-card>
        <countdown></countdown>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card style="margin-bottom: 2rem;">
        <ranking @change="updateTopTeams"></ranking>
      </el-card>
      <el-card>
        <bulletin></bulletin>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card>
          <recent-logs :teams="topTeams"></recent-logs>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
  import Ranking from '@/components/User/Ranking';
  import Countdown from '@/components/Common/Countdown';
  import RecentLogs from '@/components/Common/RecentLogs';
  import Bulletin from '@/components/Common/Bulletin';

  export default {
    name: 'hello',
    data() {
      return {
        topTeams: []
      }
    },
    components: {
      Ranking,
      Countdown,
      RecentLogs,
      Bulletin
    },
    methods: {
      updateTopTeams(topTeams){
        this.topTeams = topTeams;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main-notice {
    font-size: 10vh;
  }

  .content {
    height: 92vh;
  }

  .content .el-col {
    padding: 0 1rem;
  }
</style>
