<template>
  <section>
    <h2>队伍概览</h2>
    <el-form :inline="true" @keyup.enter.native="search" @submit.native.prevent>
      <el-form-item>
        <el-input placeholder="搜索" style="width: 293px;" v-model="form.keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="search">执行</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="teams" style="width: 100%" v-loading="loading" ref="multipleTable"
              @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="team_name"
        label="队伍名"
        width="120">
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
        <template slot-scope="scope">
          <el-button type="text" @click="resetPassword(scope.row.team_id)">重置</el-button>
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
        <template slot-scope="scope">
          {{scope.row.admin}}
        </template>
      </el-table-column>
      <el-table-column
        prop="banned"
        label="封禁"
        width="80">
        <template slot-scope="scope">
          {{scope.row.banned}}
        </template>
      </el-table-column>
      <el-table-column
        prop="banned"
        label="搞事情"
      >
        <template slot-scope="scope">
          <el-button type="text" @click="banTeam(scope.row.team_id)" v-if="!scope.row.banned">BAN!</el-button>
          <el-button type="text" @click="unbanTeam(scope.row.team_id)" v-else>UNBAN!</el-button>
          <el-button type="text" @click="setAdmin(scope.row.team_id)">钦点管理员!</el-button>
        </template>
      </el-table-column>
    </el-table>
    <template v-if="total > 20">
      <div class="block">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :current-page="currentPage"
          @current-change="loadTeamData">
        </el-pagination>
      </div>
    </template>
    <div class="operations">
      <el-button type="danger" size="small" @click="banManyTeams">批量封禁</el-button>
    </div>
  </section>
</template>
<style scoped>
  .el-pagination {
    padding: 3px 0 0;
  }

  .operations {
    margin-top: 5px;
  }
</style>
<script>
  import Team from '@/model/admin/Team';

  let TeamModel = new Team();
  export default {
    data() {
      return {
        teams: [],
        selectedTeamIds: [],
        form: {
          keyword: ""
        },
        total: 0,
        loading: false,
        currentPage: 1
      }
    },
    async mounted() {
      this.loadTeamData(1);
    },
    methods: {
      async loadTeamData(page = 1) {
        this.loading = true;
        try {
          let teamsInfo = await TeamModel.getAllTeams(page);
          this.teams = teamsInfo.teams;
          this.total = teamsInfo.total;
        }
        catch (e) {
          this.$handleError(e);
        }
        this.loading = false;
      },
      async banTeam(teamId) {
        this.loading = true;
        try {
          await TeamModel.banTeam(Array.isArray(teamId) ? teamId : [teamId]);
          this.loadTeamData(this.currentPage);
        }
        catch (e) {
          this.$handleError(e);
        }
        this.loading = false;
      },
      async unbanTeam(teamId) {
        this.loading = true;
        try {
          await TeamModel.unbanTeam(Array.isArray(teamId) ? teamId : [teamId]);
          this.loadTeamData(this.currentPage);
        }
        catch (e) {
          this.$handleError(e);
        }
        this.loading = false;
      },
      async banManyTeams() {
        try {
          if (this.selectedTeamIds.length >= 10) {
            await this.$confirm('此操作将封禁大量队伍, 是否继续?', '危险操作确认', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            });
          }
          this.banTeam(this.selectedTeamIds);
        }
        catch (e) {
        }
      },
      async setAdmin(teamId) {
        try {
          await this.$confirm('此操作将赋予该用户管理员权限, 是否继续?', '危险操作确认', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          });
          this.loading = true;
          await TeamModel.setAdmin(Array.isArray(teamId) ? teamId : [teamId]);
          this.loadTeamData(this.currentPage);
        }
        catch (e) {
          this.$handleError(e);
        }
        this.loading = false;
      },
      async resetPassword(teamId) {
        try {
          await this.$confirm('此操作将强制重置该队伍密码, 是否继续?', '危险操作确认', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          });
          let result = await TeamModel.resetPassword(teamId);
          this.$alert(`密码已经被重置为 ${result["newPassword"]}`, '操作完成', {
            confirmButtonText: '我已经保存新密码',
          });
        }
        catch (e) {
          this.$handleError(e);
        }
      },
      async search(e){
        this.loading = true;
        try{
          let teams = await TeamModel.search(this.form.keyword);
          this.teams = teams;
          this.total = 0; // disable pagination
        }
        catch (e) {
          this.$handleError(e);
        }
        this.loading = false;
      },
      handleSelectionChange(rows) {
        this.selectedTeamIds = Array.from(rows, i => i.team_id);
      }
    }
  }
</script>
