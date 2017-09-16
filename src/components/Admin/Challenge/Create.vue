<template>
  <el-row>
    <el-col :span="10">
      <el-form>
        <h2>添加 Challenge</h2>
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="URL">
          <el-input placeholder="可用占位符: {teamId}" v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="基准分数">
          <el-input type="number" v-model="form.score"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="Flag">
          <el-input v-model="form.flag"></el-input>
        </el-form-item>
        <el-form-item label="Level">
          <el-cascader
            :options="parsedCategories"
            v-model="form.levelId">
          </el-cascader>
        </el-form-item>
        <el-form-item label="发布时间">
          <el-date-picker
            v-model="form.releaseTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
  import Category from '@/model/admin/Category';
  import Challenge from '@/model/admin/Challenge'
  let CategoryModel = new Category();
  let ChallengeModel = new Challenge();
  export default {
    data() {
      return {
        categories: [],
        loading: false,
        form: {
          levelId: [],
          releaseTime: new Date(new Date().valueOf() + 24*60*60*1000).toISOString(),
          title: "",
          description: "",
          score: 0,
          url: "",
          flag: ""
        }
      }
    },
    async mounted(){
      this.loading = true;
      try{
        this.categories = await CategoryModel.getAllCategories();
      }
      catch (e){
        this.$handleError(e);
      }
      this.loading = false;
    },
    methods: {
      async submit(){
        if (!this.form.title || !this.form.description || !this.form.url || !this.form.score || !this.form.flag || !this.form.releaseTime || this.form.levelId.length === 0){
          return this.$handleError({
            message: "请填写表单全部内容"
          });
        }
        this.loading = true;
        try{
          let challenge = await ChallengeModel.createChallenge(this.form.title, this.form.url, this.form.description, this.form.score, [this.form.flag], this.form.levelId[1], this.form.releaseTime);
        }
        catch (e){
          this.$handleError(e);
        }
        this.loading = false;
      }
    },
    computed: {
      parsedCategories(){
        let parsedCategories = [];
        for (let category of this.categories){
          let parsedCategory = {
            label: category.category_name,
            value: category.category_id,
            children: []
          };
          if (category.levels.length === 0){
            parsedCategory.disabled = true;
          }
          else{
            for (let level of category.levels){
              parsedCategory.children.push({
                value: level.level_id,
                label: level.level_name
              });
            }
          }
          parsedCategories.push(parsedCategory);
        }
        return parsedCategories;
      }
    }
  }
</script>
