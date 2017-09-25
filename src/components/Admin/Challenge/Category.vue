<template>
  <div v-loading="loading">
    <h2>分类管理</h2>
    <el-tabs closable @tab-remove="removeCategory" v-model="activeTabName">
      <template v-for="category in categories">
        <el-tab-pane :label="category.category_name" :name="''+category.category_id">
          <template>
            <el-table
              :data="category.levels"
              style="width: auto">
              <el-table-column type="expand">
                <template scope="scope">
                  <el-form label-position="left" inline class="table-expand">
                    <el-form-item label="Level ID">
                      <span>{{ scope.row.level_id }}</span>
                    </el-form-item>
                    <el-form-item label="Level 名">
                      <span>{{ scope.row.level_name }}</span>
                    </el-form-item>
                    <el-form-item label="发布时间">
                      <span>{{ scope.row.release_time }}</span>
                    </el-form-item>
                    <el-form-item label="状态">
                      <span style="color: cadetblue" v-if="hasPassed(scope.row.release_time)">已发布</span>
                      <span style="color: hotpink" v-else>未发布</span>
                    </el-form-item>
                    <el-form-item label="开放规则">
                      <rules :rules="scope.row.rules" mode="simple" :info="categories"></rules>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column
                label="Level ID"
                prop="level_id">
              </el-table-column>
              <el-table-column
                label="Level 名"
                prop="level_name">
              </el-table-column>
              <el-table-column
                label="发布时间"
                prop="release_time">
              </el-table-column>
              <el-table-column
                label="操作"
                prop="release_time">
                <template scope="scope">
                  <el-button type="text" @click="editLevel(scope.row.level_id)">编辑</el-button>
                  <el-button type="text" style="color: red" @click="removeLevel(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <hr>
            <el-button type="primary" size="small" @click="addLevel(category.category_id)">添加 Level</el-button>

          </template>
        </el-tab-pane>
      </template>
      <br>
      <el-dialog title="新增 Level" :visible.sync="levelFormVisible">
        <el-form>
          <el-form-item label="Level 名">
            <el-input type="text" v-model="form.levelName"></el-input>
          </el-form-item>
          <el-form-item label="开放时间">
            <el-date-picker
              v-model="form.releaseTime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="levelFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="createLevel">确 定</el-button>
        </div>
      </el-dialog>
      <el-button type="primary" size="small" @click="addCategory">添加分类</el-button>
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
  import Category from '@/model/admin/Category';
  import Level from '@/model/admin/Level'
  import Rules from './RuleComponents/Rules.vue';

  let CategoryModel = new Category();
  let LevelModel = new Level();
  export default {
    data() {
      return {
        categories: [],
        activeTabName: "",
        nameFilter: "",
        loading: false,
        levelFormVisible: false,
        form: {
          levelName: "",
          releaseTime: "",
          categoryId: ""
        }
      }
    },
    computed: {
      categoryNames() {
        return Array.from(this.categories, i => i["category_name"]);
      }
    },
    components: {
      Rules
    },
    mounted() {
      this.loadCategories();
    },
    methods: {
      async createLevel(){
        if (!this.form.levelName || !this.form.releaseTime || !this.form.categoryId){
          return this.$handleError({
            message: "请填写表单所有项目"
          })
        }
        try{
          if (this.form.releaseTime <= new Date()){
            await this.$confirm('开放时间小于当前时间，创建后将立即可见，生产环境不建议进行此操作，确认继续?', '危险操作确认', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            });
          }
          this.loading = true;
          let newLevel = await LevelModel.createLevel(this.form.categoryId, this.form.levelName, this.form.releaseTime);
          this.categories.filter(i => i.category_id === this.form.categoryId)[0].levels.push(newLevel);
          this.levelFormVisible = false;
          this.form.categoryId = this.form.releaseTime = this.form.levelName = "";
        }
        catch (e){
          this.$handleError(e);
        }
        this.loading = false;
      },
      async loadCategories() {
        this.loading = true;
        try {
          this.categories = await CategoryModel.getAllCategories();
          this.activeTabName = "" + (this.categories[0] && this.categories[0]["category_id"]);
        }
        catch (e) {
          this.$handleError(e);
        }
        this.loading = false;
      },
      async addCategory() {
        try {
          let categoryName = (await this.$prompt('请输入分类名', '用户输入', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          })).value;
          this.loading = true;
          let newCategory = await CategoryModel.createCategory(categoryName);
          this.categories.push(newCategory);
        }
        catch (e) {
          this.$handleError(e);
        }
        this.loading = false;
      },
      async removeCategory(categoryId) {
        categoryId = parseInt(categoryId);
        let category = this.categories.find(i => i["category_id"] === categoryId);
        if (category["challenges"].length > 0) {
          return this.$handleError({
            message: "无法删除，该分类下仍有 Challenge"
          })
        }
        if (category["levels"].length > 0) {
          return this.$handleError({
            message: "无法删除，该分类下仍有 Level"
          })
        }
        try {
          // TODO
          return this.$handleError({
            message: "本功能没有实现"
          });
        }
        catch (e) {
          this.$handleError(e);
        }
      },
      addLevel(categoryId) {
        this.levelFormVisible = true;
        this.form.categoryId = categoryId;
      },
      async removeLevel(level) {
        let categoryId = level.category_id;
        let category = this.categories.find(i => i.category_id === categoryId);
        if (category.challenges.find(i => i.level_id === level.level_id)) {
          return this.$handleError({
            message: "无法删除，该 Level 下仍有 Challenge"
          })
        }
        this.loading = true;
        try {
          await LevelModel.deleteLevel(level.level_id);
          this.loadCategories();
        }
        catch (e) {
          this.$handleError(e);
        }
        this.loading = false;
      },
      editLevel(levelId) {
        this.$router.push({
          name: "Admin-Challenge-Level",
          query: {
            id: levelId
          }
        })
      },
      hasPassed(t) {
        return new Date(t) < new Date();
      }
    }
  }
</script>
