<template>
  <div v-loading="loading">
    <h2>分类管理</h2>
    <el-tabs>
      <template v-for="category in categories">
        <el-tab-pane :label="category.category_name">
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
                      <span>...</span>
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

            </el-table>
            <hr>
            <el-button type="primary" size="small">添加 Level</el-button>
            <el-button type="primary" size="small" @click="addCategory">添加分类</el-button>
          </template>
        </el-tab-pane>
      </template>
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
  let CategoryModel = new Category();
  export default {
    data(){
      return {
        categories: [],
        nameFilter: "",
        loading: false
      }
    },
    computed: {
      categoryNames(){
        return Array.from(this.categories, i => i["category_name"]);
      }
    },
    mounted(){
      this.loadCategories();
    },
    methods: {
      async loadCategories(){
        this.loading = true;
        try{
          this.categories = await CategoryModel.getAllCategories();
        }
        catch (e){
          this.$handleError(e);
        }
        this.loading = false;
      },
      async addCategory(){
        try{
          let categoryName = (await this.$prompt('请输入分类名', '用户输入', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          })).value;

        }
        catch (e){
          this.$handleError(e);
        }
      },
      hasPassed(t){
        return new Date(t) < new Date();
      }
    }
  }
</script>
