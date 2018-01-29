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
        <challenge-list :challenges="level.challenges"></challenge-list>
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
    width: 100px;
    color: #99a9bf;
  }

  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
<script>
  import Level from '@/api/admin/Level';
  import Category from '@/api/admin/Category';
  import Rules from './RuleComponents/Rules.vue';
  import ChallengeList from './List.vue';

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
      Rules,
      ChallengeList
    },
    methods: {
      async loadLevelInfo(levelId) {
        this.loading = true;
        try {
          this.level = await Level.getLevelInfo(levelId);
          this.info = await Category.getAllCategories();
          this.form.levelName = this.level.level_name;
          try {
            this.form.releaseTime = new Date(this.level.release_time).toISOString();
          }
          catch (e) {
            this.form.releaseTime = "";
          }
        }
        catch (e) {
          this.$handleError(e);
        }
        this.loading = false;
      },
      async update() {
        this.loading = true;
        try {
          let level = await Level.setReleaseTime(this.level.level_id, this.form.releaseTime);
          if (this.form.levelName !== this.level.level_name) {
            level = await Level.setLevelName(this.level.level_id, this.form.levelName);
          }
        }
        catch (e) {
          this.$handleError(e);
        }
        this.loading = false;
      },
      async updateRule(rules) {
        this.loading = true;
        try {
          await Level.setRules(this.level.level_id, rules.toString());
        }
        catch (e) {
          this.$handleError(e);
        }
        this.loading = false;
      },
    }
  }
</script>
