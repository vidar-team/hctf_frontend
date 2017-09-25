<template>

</template>
<script>
  export default {
    data(){
      return {
        endTime: new Date(),
        countdown: {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        }
      }
    },
    props: ['time'],
    mounted(){

    },
    watch: {
      time(){
        this.endTime = time;
      }
    },
    methods: {
      flush(){
        let diff = Math.abs(this.endTime.valueOf() - new Date().valueOf());
      }
    }
  }
</script>
