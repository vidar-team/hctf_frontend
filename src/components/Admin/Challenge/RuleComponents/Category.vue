<template>
  <span v-if="mode === 'simple'">
    <span v-if="rule.logicOperator" class="logic_operator">
      {{rule.logicOperator | parseLogicOperator}}
    </span>
    分类 {{categoryName}} 的通过数量 {{rule.compare.compareOperator | parseCompareOperator}} {{rule.compare.compareTo}}
  </span>
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
        return this.info.find(i => i.category_id === this.rule.compare.targetId)["category_name"]
      }
    },
    mixins: [RulesMixin]
  }
</script>
