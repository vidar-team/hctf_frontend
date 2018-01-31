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
    </el-col>
    <el-col :span="12">
      <el-card>
        <recent-logs :teams="topTeams"></recent-logs>
      </el-card>
      <!--<el-card class="bulletin-container">-->
        <!--<bulletin></bulletin>-->
      <!--</el-card>-->
      <!--<el-card class="logo-container">-->
        <!--<img src="http://kotori.qiniudn.com/Vidar.png">-->
      <!--</el-card>-->
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
      /**
       * 更新 Top 20 队伍名单
       * @param topTeams
       */
      updateTopTeams(topTeams) {
        this.topTeams = topTeams;
      }
    }
  }
</script>
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

  .logo-container{
    text-align: center;
  }
  .logo-container img{
    display: block;
    margin: auto;
  }
  .bulletin-container{
    margin-top: 1rem;
  }
</style>
