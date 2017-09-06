<template>
  <section>
    <h2>队伍概览</h2>
    <el-table :data="teams" style="width: auto" v-loading="loading">
      <el-table-column
        prop="teamName"
        label="队伍名"
        width="160">
      </el-table-column>
      <el-table-column
        prop="email"
        label="Email"
        width="160">
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码"
        width="80">
        <template scope="scope">
            <el-button type="text">重置</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="lastLoginTime"
        label="上次登陆时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="signUpTime"
        label="注册时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="score"
        label="分数"
        width="80">
      </el-table-column>
      <el-table-column
        prop="admin"
        label="管理"
        width="80">
      </el-table-column>
      <el-table-column
        prop="banned"
        label="封禁"
        width="80">
      </el-table-column>
      <el-table-column
        prop="banned"
        label="搞事情"
        width="180">
        <template scope="scope">
          <el-button type="text" @click="banTeam(scope.row.id)">BAN!</el-button>
          <el-button type="text" @click="setAdmin(scope.row.id)">钦点管理员!</el-button>
        </template>
      </el-table-column>
    </el-table>
    <template v-if="total > 20">
      <div class="block">
        <el-pagination
          layout="prev, pager, next"
          total="total"
          current-page="currentPage"
          @current-change="loadTeamData">
        </el-pagination>
      </div>
    </template>
  </section>
</template>
<style scoped>
  .el-pagination{
    padding: 3px 0px 0px;
  }
</style>
<script>
  import Team from '@/model/admin/Team';
  let TeamModel = new Team();
  export default {
    data(){
      return {
        teams: [],
        total: 0,
        loading: false,
        currentPage: 1
      }
    },
    async mounted(){
      this.loadTeamData(1);
    },
    methods: {
      async loadTeamData(page = 1){
        this.loading = true;
        try{
          let teamsInfo = await TeamModel.getAllTeams(page);
          this.teams = teamsInfo.teams;
          this.total = teamsInfo.total;
        }
        catch (e){
          this.$handleError(e);
        }
        this.loading = false;
      },
      async banTeam(teamId){
        this.loading = true;
        try{
          await TeamModel.banTeam(teamId);
          this.loadTeamData(this.currentPage);
        }
        catch (e){
          this.$handleError(e);
        }
        this.loading = false;
      },
      async setAdmin(teamId){
        try{
          await this.$confirm('此操作将赋予该用户管理员权限, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          });
          this.loading = true;
          await TeamModel.setAdmin(teamId);
          this.loadTeamData(this.currentPage);
        }
        catch (e){
          this.$handleError(e);
        }
        this.loading = false;
      }
    }
  }
</script>
