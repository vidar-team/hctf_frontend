<template>
  <section>
    <h2>队伍概览</h2>
    <el-table :data="teams" style="width: auto">
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
        width="160">
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
        width="180">
      </el-table-column>
      <el-table-column
        prop="banned"
        label="搞事情"
        width="180">
        <template scope="scope">
          <el-button type="text">BAN!</el-button>
          <el-button type="text">钦点管理员!</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>
<script>
  import User from '@/model/User';
  let UserModel = new User();
  export default {
    data(){
      return {
        teams: []
      }
    },
    async mounted(){
      this.teams = await UserModel.getAllTeams();
    }
  }
</script>
