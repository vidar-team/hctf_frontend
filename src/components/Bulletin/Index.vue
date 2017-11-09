<template>
  <el-row>
    <el-col :span="16" :offset="4">
      <el-card v-for="bulletin in bulletins" :key="bulletin.bulletin_id" class="bulletin-container">
        <h2>{{ bulletin.title }}</h2>
        <div v-html="bulletin.content">
         
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<style>
  .bulletin-container{
    margin-bottom: 1rem;
  }
</style>
<script>
  import Bulletin from '@/model/Bulletin';
  let BulletinModel = new Bulletin();
  export default {
    data(){
      return {
        bulletins: []
      };
    },
    async mounted(){
      try {
        this.bulletins = await BulletinModel.getAllBulletins();
      }
      catch (e){
        this.$handleError(e);
      }
    },
    methods: {

    }
  }
</script>
