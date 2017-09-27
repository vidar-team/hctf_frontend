<template>
 <span v-if="mode === 'simple'">
   <template v-if="parsedRules.rules && parsedRules.rules.length > 0" v-for="rule in parsedRules.rules">
     <component :is="rule.type" :rule="rule" :info="info" :mode="mode">
        <!--
          Dynamic Component
          Modify this part may cause reconstruction.
        -->
     </component>
   </template>
   <span v-if="parsedRules.rules.length === 0">
       未设定
   </span>
 </span>
  <div v-else-if="mode === 'edit'">
    <el-row v-if="parsedRules.rules && parsedRules.rules.length > 0" v-for="rule in parsedRules.rules" :key="rule._ruldId" class="rule-view-container">
      <el-col :span="6" :offset=1>
        <component :is="rule.type" :rule="rule" :info="info" mode="view">

        </component>
      </el-col>
      <el-col :span="1" :offset = 1>
        <el-button type="text" @click="removeRule(rule._ruleId)">
          <i class="el-icon-close"></i>
        </el-button>
      </el-col>
    </el-row>
    <el-row v-if="appendMode">
      <el-col :span="6" :offset="1">
        <el-form :inline="true">
          <el-form-item label="规则类型">
            <el-select v-model="form.type">
              <el-option value="category" label="分类通过数量"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="23" :offset="1">
        <template v-if="form.type">
          <component :is="form.type" :info="info" mode="edit" :key="new Date().valueOf()" :count="parsedRules.ruleCount" @save="saveRule">

          </component>
        </template>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="22" :offset=1 style="margin-top: 2rem">
        <el-button size="small" type="primary" @click="appendRule">添加规则</el-button>
        <el-button size="small" type="primary" @click="updateRule">保存更改</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import Rules from '@/utils/rules';
  // load modules
  import Category from './Category.vue'

  export default {
    data() {
      return {
        parsedRules: new Rules([]),
        appendMode: false,
        form: {
          type: "",
        },
      }
    },
    props: ['rules', 'mode', 'info'],
    mounted() {
      this.flushRules();
    },
    watch: {
      rules(){
        this.flushRules();
      }
    },
    methods: {
      flushRules(){
        if (this.rules && this.rules.length > 0) {
          this.parsedRules = new Rules(this.rules);
        }
        else{
          this.parsedRules = new Rules([]);
        }
      },
      removeRule(ruleId){
         this.parsedRules = this.parsedRules.remove(ruleId);
      },
      appendRule(){
        if (this.appendMode){
          return false;
        }
        this.appendMode = true;
      },
      saveRule(rule){
        this.parsedRules = this.parsedRules.append(rule);
        this.appendMode = false;
        this.form.type = "";
      },
      updateRule(rule){
        this.$emit('update', this.parsedRules);
      }
    },
    components: {
      'category': Category
    }
  }
</script>
<style>
  .logic-operator {
    font-weight: bold;
    color: #8664ff;
  }
  .logic-operator-view{
    color: #8664ff;
    font-weight: bold;
    min-width: 2rem;
    display: inline-block;
  }
  .logic-operator-view-placeholder{
    min-width: 2rem;
    display: inline-block;
  }
  .rule-view-container{
    line-height: 2;
    font-size: 120%;
  }
  .rule-view-container i{
    font-size: x-small;
  }
</style>
