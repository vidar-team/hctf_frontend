<template>
  <div class="countdown">
    <span>{{ countdown.days }} Days {{ countdown.hours }} Hours {{ countdown.minutes }} Minutes {{ countdown.seconds }} Seconds</span>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        endTime: new Date("2017-11-11T03:11:11.000Z"),
        countdown: {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        }
      }
    },
    props: ['time'],
    async mounted(){
      while(true){
        if (this.$route.name !== "Index"){
          break;
        }
        this.flush();
        await (() =>
          new Promise(resolve => setTimeout(resolve, 1000))
        )();
      }
    },
    watch: {
      time(){
        this.endTime = time;
      }
    },
    methods: {
      flush(){
        let diff = Math.round(Math.abs(this.endTime.valueOf() - new Date().valueOf())/1000);
        let days = Math.floor(diff / 86400);
        diff = diff % 86400;
        let hours = Math.floor(diff / 3600);
        diff = diff % 3600;
        let minutes = Math.floor(diff / 60);
        diff = diff - minutes * 60;
        let seconds = diff;

        this.countdown.days = days;
        this.countdown.hours = hours;
        this.countdown.minutes = minutes;
        this.countdown.seconds = seconds;
      }
    }
  }
</script>
