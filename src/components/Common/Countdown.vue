<template>
  <div class="countdown">
    <span>
      {{ countdown.days | formatTime }} {{ countdown.days > 1 ? 'Days' : 'Day'}}
      {{ countdown.hours | formatTime}} {{ countdown.hours > 1 ? 'Hours' : 'Hour'}}
      {{ countdown.minutes | formatTime}} {{ countdown.minutes > 1 ? 'Minutes' : 'Minute'}}
      {{ countdown.seconds | formatTime}} {{ countdown.seconds > 1 ? 'Seconds' : 'Second'}}   </span>
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

  .countdown span {
    font-size: xx-large;
  }

  .countdown-title {
    color: #aaa;
  }
</style>
<script>
  export default {
    data() {
      return {
        countdown: {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        },
      }
    },
    computed: {
      countdownTitle() {
        if (new Date() < this.startTime) {
          return this.$t("countdown.untilStart")
        }
        else {
          return this.$t("countdown.untilClose");
        }
      },
      startTime() {
        return new Date(this.$store.state.meta.startTime);
      },
      endTime() {
        return new Date(this.$store.state.meta.endTime);
      }
    },
    async mounted() {
      while (true) {
        if (this.$route.name !== "Index") {
          break;
        }
        this.flush();
        await (() =>
          new Promise(resolve => setTimeout(resolve, 1000)))();
      }
    },
    methods: {
      flush() {
        if (this.startTime && this.endTime) {
          let nowTime = new Date();
          let diff;
          if (nowTime < this.startTime) {
            diff = Math.round(Math.abs(this.startTime.valueOf() - new Date().valueOf()) / 1000);
          }
          else {
            diff = Math.round(Math.abs(this.endTime.valueOf() - new Date().valueOf()) / 1000);
          }

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
    },
    filters: {
      formatTime(str){
        return isNaN(str) ? "--" : str;
      }
    }
  }
</script>
