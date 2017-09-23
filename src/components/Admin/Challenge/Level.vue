<template>
  <div>
    <h2>Level 设定</h2>
    <el-tabs v-model="activeTabName">
      <el-tab-pane label="概览" name="overview">
        <el-form ref="form" :model="form" label-width="80px" v-loading="loading">
          <el-form-item label="Level 名">
            <el-input v-model="form.levelName" style="width: 193px"></el-input>
          </el-form-item>
          <el-form-item label="开放时间">
            <el-date-picker
              v-model="form.releaseTime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button @click="update">提交更改</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="Challenge 管理">
        <el-table :data="level.challenges">
          <el-table-column type="expand">
            <template scope="scope">
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
            <template scope="scope">
              <el-button type="text" @click="">编辑</el-button>
              <el-button type="text" style="color: red" @click="deleteChallenge(scope.row.challenge_id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="开放条件设置" name="rules" v-loading="loading">
        <rules mode="edit" :rules="this.level.rules" :info="info" @update="updateRule"></rules>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style>
  .table-expand {
    font-size: 0;
  }
  .table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
<script>
  import Level from '@/model/admin/Level';
  import Category from '@/model/admin/Category';
  import Challenge from '@/model/admin/Challenge';
  import Rules from './RuleComponents/Rules.vue';
  let LevelModel = new Level();
  let CategoryModel = new Category();
  let ChallengeModel = new Challenge();
  export default {
    data() {
      return {
        activeTabName: "overview",
        level: {},
        rules: [],
        info: [],
        form: {
          levelName: "",
          releaseTime: undefined
        },
        loading: false
      }
    },
    async mounted() {
      if (!this.$route.query.id) {
        this.$handleError({
          message: "请选择 Level"
        });
        this.$router.push({
          name: "Admin-Challenge-Category"
        });
      }
      this.loadLevelInfo(this.$route.query.id);
    },
    components: {
      Rules
    },
    methods: {
      async loadLevelInfo(levelId) {
        this.loading = true;
        try {
          this.level = await LevelModel.getLevelInfo(levelId);
          this.info = await CategoryModel.getAllCategories();
          this.form.levelName = this.level.level_name;
          try{
            this.form.releaseTime = new Date(this.level.release_time).toISOString();
          }
          catch (e){
            this.form.releaseTime = "";
          }
        }
        catch (e) {
          this.$handleError(e);
        }
        this.loading = false;
      },
      async update(){
        this.loading = true;
        try{
          let level = await LevelModel.setReleaseTime(this.level.level_id, this.form.releaseTime);
          if (this.form.levelName !== this.level.level_name){
            level = await LevelModel.setLevelName(this.level.level_id, this.form.levelName);
          }
        }
        catch (e){
          this.$handleError(e);
        }
        this.loading = false;
      },
      async updateRule(rules){
        this.loading = true;
        try{
          await LevelModel.setRules(this.level.level_id, rules.toString());
        }
        catch (e){
          this.$handleError(e);
        }
        this.loading = false;
      },
      async deleteChallenge(challengeId){
        this.loading = true;
        try{
          await this.$confirm('本操作将会删除该问题及其所有关联Flag、关联答题记录，全部队伍的分数将会重新计算，生产环境下不建议进行此操作，是否确认？', '危险操作确认', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          });
          await ChallengeModel.deleteChallenge(challengeId);
          this.loadLevelInfo(this.$route.query.id);
        }
        catch (e){
          this.$handleError(e);
        }
        this.loading = false;
      }
    }
  }
</script>
