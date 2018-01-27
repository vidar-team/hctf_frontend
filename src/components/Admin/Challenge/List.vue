<template>
  <el-table :data="challenges">
    <el-table-column type="expand">
      <template slot-scope="scope">
        <el-form label-position="left" inline class="table-expand">
          <el-form-item label="Level ID">
            <span>{{ scope.row.level_id }}</span>
          </el-form-item>
          <el-form-item label="描述">
            <span>{{ scope.row.description }}</span>
          </el-form-item>
          <el-form-item label="基准分数">
            <span>{{ scope.row.score }}</span>
          </el-form-item>
          <el-form-item label="URL">
            <span>{{ scope.row.url }}</span>
          </el-form-item>
          <el-form-item label="发布时间">
            <span>{{ scope.row.release_time }}</span>
          </el-form-item>
          <el-form-item label="动态 Flag">
            <span>{{ scope.row.is_dynamic_flag }}</span>
          </el-form-item>
          <el-form-item label="最小解决时间">
            <span>{{ JSON.parse(scope.row.config).minimumSolveTime === 0 ? '不限制' : JSON.parse(scope.row.config).minimumSolveTime + '秒'}}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      prop="challenge_id"
      label="Challenge ID"
    >
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
    >
    </el-table-column>
    <el-table-column
      label="操作"
    >
      <template slot-scope="scope">
        <el-button type="text" @click="editChallenge(scope.row.challenge_id)">编辑</el-button>
        <el-button type="text" style="color: red" @click="deleteChallenge(scope.row.challenge_id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
  import Challenge from '@/api/admin/Challenge';
  let ChallengeModel = new Challenge();
  export default {
    data(){
      return {

      }
    },
    props: ["challenges"],
    methods: {
      editChallenge(challengeId) {
        this.$router.push({
          name: "Admin-Challenge-Edit",
          query: {
            challengeId: challengeId
          }
        })
      },
      async deleteChallenge(challengeId) {
        this.loading = true;
        try {
          await this.$confirm('本操作将会删除该问题及其所有关联Flag、关联答题记录，全部队伍的分数将会重新计算，生产环境下不建议进行此操作，是否确认？', '危险操作确认', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          });
          await ChallengeModel.deleteChallenge(challengeId);
          this.loadLevelInfo(this.$route.query.id);
        }
        catch (e) {
          this.$handleError(e);
        }
        this.loading = false;
      },
    }
  }
</script>
