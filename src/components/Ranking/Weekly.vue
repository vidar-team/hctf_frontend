<template>
  <el-row>
    <el-col :span="20" :offset="2">
      <el-card>
        <ranking expand weekly></ranking>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
  import Ranking from '@/components/User/Ranking'
  export default {
    data(){
      return {}
    },
    components: {
      Ranking
    }
  }
</script>
