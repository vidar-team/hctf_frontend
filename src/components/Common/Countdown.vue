<template>
  <div class="countdown">
    <span>
      {{ countdown.days }} {{ countdown.days > 1 ? 'Days' : 'Day'}}
      {{ countdown.hours }} {{ countdown.hours > 1 ? 'Hours' : 'Hour'}}
      {{ countdown.minutes }} {{ countdown.minutes > 1 ? 'Minutes' : 'Minute'}}
      {{ countdown.seconds }} {{ countdown.seconds > 1 ? 'Seconds' : 'Second'}}   </span>
    <div class="countdown-title">{{ countdownTitle }}</div>
  </div>
</template>
<style>
  .countdown {
    text-align: center;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .countdown span{
    font-size: xx-large;
  }
  .countdown-title{
    color: #aaa;
  }
</style>
<script>
  export default {
    data(){
      return {
        startTime: new Date("2017-11-11T00:00:00.000Z"),
        endTime: new Date("2017-11-13T00:00:00.000Z"),
        countdown: {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        },
      }
    },
    computed: {
      countdownTitle(){
        if (new Date() < this.startTime){
          return this.$t("countdown.untilStart")
        }
        else{
          return this.$t("countdown.untilClose");
        }
      }
    },
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
    methods: {
      flush(){
        let diff = Math.round(Math.abs(this.startTime.valueOf() - new Date().valueOf())/1000);
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
