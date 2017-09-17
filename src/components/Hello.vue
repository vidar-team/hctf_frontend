<template>
  <el-row class="hello">
    <el-col :span="20" :offset="1" style="font-size: 10vh">{{ $t('root.welcomeMessage') }}</el-col>
  </el-row>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {

    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
