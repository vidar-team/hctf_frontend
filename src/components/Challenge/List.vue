<template>
  <el-card v-loading="loading">
    <el-tabs v-model="activeTabName">
      <template v-for="categoryName in categoryNames">
        <el-tab-pane :label="categoryName" :name="categoryName">
            <span v-if="Object.keys(categories[categoryName]).length === 0">
              {{ $t('challenge.emptyTip') }}
            </span>
            <div v-for="levelName in Object.keys(categories[categoryName])" class="challenge-container">
              <h2>Level - {{levelName}}</h2>
              <challenge-view v-for="challenge in categories[categoryName][levelName]" :key="challenge.challenge_id" :challenge="challenge"></challenge-view>
            </div>
        </el-tab-pane>
      </template>
    </el-tabs>
  </el-card>
</template>
<script>
  import Challenge from '@/model/Challenge';
  import View from '@/components/Challenge/View.vue';
  let ChallengeModel = new Challenge();
  export default {
    data(){
      return {
        categories: [],
        activeTabName: "",
        loading: false
      };
    },
    async mounted(){
      this.loadChallenges();
    },
    components: {
      "ChallengeView": View
    },
    computed: {
      categoryNames(){
        return Object.keys(this.categories);
      }
    },
    methods: {
      async loadChallenges(){
        this.loading = true;
        try{
          this.categories = await ChallengeModel.getValidChallenges();
          this.activeTabName = this.categoryNames[0];
        }
        catch (e){
          this.$handleError(e);
        }
        this.loading = false;
      }
    }
  }
</script>
