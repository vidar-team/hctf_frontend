<template>
  <span v-if="mode === 'simple'">
    <span v-if="rule.logicOperator" class="logic-operator">
      {{rule.logicOperator | parseLogicOperator}}
    </span>
    <span>分类 {{categoryName}} 的通过数量 {{rule.compare.compareOperator | parseCompareOperator}} {{rule.compare.compareTo}}</span>
  </span>
  <div v-else-if="mode === 'view'">
    <div v-if="rule.logicOperator" class="logic-operator-view">
      {{rule.logicOperator | parseLogicOperator}}
    </div>
    <div v-else class="logic-operator-view-placeholder">

    </div>
    <span class="rule-body">分类 {{categoryName}} 的通过数量 {{rule.compare.compareOperator | parseCompareOperator}} {{rule.compare.compareTo}}</span>
  </div>
  <div v-else-if="mode === 'edit'" class="rules-editor-container">
    <el-form :inline="true">
      <el-form-item label="逻辑运算符">
        <el-select size="small" v-model="form.logicOperator">
          <el-option label="且 / AND" value="and"></el-option>
          <el-option label="或 / OR" value="or"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择分类">
        <el-select size="small" v-model="form.categoryId">
          <el-option v-for="category in info" :label="category.category_name" :value="category.category_id" :key="category.category_id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="比较运算符">
        <el-select size="small" v-model="form.compareOperator">
          <el-option label="大于" value="gt"></el-option>
          <el-option label="等于" value="eq"></el-option>
          <el-option label="小于" value="lt"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数量">
        <el-input size="small" type="number" v-model="form.compareTo"></el-input>
      </el-form-item>
      <br>
      <el-form-item>
        <el-button type="primary" size="small" @click="saveRule">添了个加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import RulesMixin from './RulesMixin'
  export default {
    data(){
      return {
        form: {
          logicOperator: "",
          compareOperator: "",
          categoryId: "",
          compareTo: ""
        }
      }
    },
    props: ['rule', 'mode', 'info', 'count'],
    mounted(){

    },
    computed: {
      categoryName(){
        let category = this.info.find(i => i.category_id === this.rule.compare.targetId);
        if (category){
          return category["category_name"];
        }
        return false;
      },
    },
    mixins: [RulesMixin],
    methods: {
      saveRule(){
        if (!this.form.compareOperator || !this.form.categoryId || !this.form.compareTo){
          return this.$handleError({
            message: "请填写所有项目"
          });
        }
        if (this.count > 0){
          if (!this.form.logicOperator){
            return this.$handleError({
              message: "必须设定逻辑运算符"
            });
          }
        }
        let rule = {
          type: "category",
          compare: {
            targetId: this.form.categoryId,
            compareOperator: this.form.compareOperator,
            compareTo: parseInt(this.form.compareTo)
          }
        };
        if (this.count > 0){
          rule.logicOperator = this.form.logicOperator;
        }
        this.$emit("save", rule);
      }
    }
  }
</script>
