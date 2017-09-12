<template>
 <span v-if="mode === 'simple'">
   <template v-if="parsedRules.rules.length > 0" v-for="rule in parsedRules.rules">
     <component :is="rule.type" :rule="rule" :info="info" :mode="mode">

     </component>
   </template>
   <span v-if="parsedRules.length === 0">
       未设定
   </span>
 </span>
</template>
<style>
  .logic_operator {
    font-weight: bold;
    color: #8664ff;
  }
</style>
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
      if (this.rules.length > 0) {
        this.parsedRules = new Rules(this.rules);
      }
    },
    components: {
      'category': Category
    }
  }
</script>
