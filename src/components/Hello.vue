<template>
  <el-row class="content">
    <el-col :span="24" style="padding-bottom: 2rem;">
      <el-card>
        <countdown></countdown>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card>
        <ranking></ranking>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card>
          <recent-logs></recent-logs>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
  import Ranking from '@/components/User/Ranking';
  import Countdown from '@/components/Common/Countdown';
  import RecentLogs from '@/components/Common/RecentLogs';

  export default {
    name: 'hello',
    data() {
      return {}
    },
    components: {
      Ranking,
      Countdown,
      RecentLogs
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
