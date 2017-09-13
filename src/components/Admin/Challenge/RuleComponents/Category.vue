<template>
  <span v-if="mode === 'simple'">
    <span v-if="rule.logicOperator" class="logic-operator">
      {{rule.logicOperator | parseLogicOperator}}
    </span>
    分类 {{categoryName}} 的通过数量 {{rule.compare.compareOperator | parseCompareOperator}} {{rule.compare.compareTo}}
  </span>
  <div v-else-if="mode === 'view'">
    <div v-if="rule.logicOperator" class="logic-operator-view">
      {{rule.logicOperator | parseLogicOperator}}
    </div>
    <div v-else class="logic-operator-view-placeholder">

    </div>
    分类 {{categoryName}} 的通过数量 {{rule.compare.compareOperator | parseCompareOperator}} {{rule.compare.compareTo}}
  </div>
  <div v-else-if="mode === 'edit'" class="rules-editor-container">

  </div>
</template>
<script>
  import RulesMixin from './RulesMixin'
  export default {
    data(){
      return {}
    },
    props: ['rule', 'mode', 'info'],
    mounted(){

    },
    computed: {
      categoryName(){
        let category = this.info.find(i => i.category_id === this.rule.compare.targetId)
        if (category){
          return category["category_name"];
        }
        return false;
      }
    },
    mixins: [RulesMixin]
  }
</script>
