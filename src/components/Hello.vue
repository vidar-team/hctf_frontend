<template>
  <div class="content">
    <!--<span class="main-notice">{{ $t('root.welcomeMessage') }}</span>-->
    <ranking></ranking>
  </div>
</template>

<script>
  import Ranking from '@/components/User/Ranking';
export default {
  name: 'hello',
  data () {
    return {

    }
  },
  components: {
    Ranking
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main-notice{
    font-size: 10vh;
  }
  .content{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 92vh;
  }
</style>
