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
   <span v-if="parsedRules.length === 0">
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
    <el-row>
      <el-col :span="22" :offset=1 style="margin-top: 2rem">
        <el-button size="small" type="primary">添加规则</el-button>
        <el-button size="small" type="primary">保存更改</el-button>
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
        parsedRules: [],
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
        if (this.rules && this.rules.length > 0 && this.parsedRules.rules === undefined) {
          this.parsedRules = new Rules(this.rules);
        }
      },
      removeRule(ruleId){
         this.parsedRules = this.parsedRules.remove(ruleId);
         console.log(this.parsedRules.toString());
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
