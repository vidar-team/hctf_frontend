<template>
  <div class="chart-container">
    <chart :options="data" v-loading="loading" v-if="!isEmpty()"></chart>
    <div v-else>
      Not Available
    </div>
  </div>
</template>
<style scoped>
  .echarts{
    width: 100%;
  }
</style>
<script>
  import Team from '@/model/Team';
  import ECharts from 'vue-echarts/components/ECharts.vue'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/legend'

  let TeamModel = new Team();

  export default {
    data(){
      return {
        data: {
          title: {
            text: "Scores"
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: [

            ]
          },
          xAxis: {
            type: "time",
            boundaryGap: false,
          },
          yAxis: {
            type: "value"
          },
          series: [

          ]
        },
        loading: false,
        teamData: []
      }
    },
    components: {
      chart: ECharts
    },
    props: ['teams'],
    watch: {
      async teams(){
        let series = [];
        let legend = [];
        if (this.teams.length > 0){
          this.loading = true;
          let teams = await TeamModel.select(this.teams);
          this.teamData = teams;
          for (let team of teams){
            let data = [];
            let score = 0;
            legend.push(team.team_name);
            // 共同起点
            let startTime = new Date("2017-09-29T03:11:11.000Z");
            data.push({
              name:`${startTime.getFullYear()}-${startTime.getMonth() + 1}-${startTime.getDate()} ${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}`,
              value: [
                startTime, 0
              ]
            });
            for (let log of team.logs){
              let time = new Date(log.created_at);
              score += parseFloat(log.score);
              data.push({
                name: `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
                value: [
                  time,
                  score
                ]
              })
            }
            series.push({
              name: team.team_name,
              type: 'line',
              data: data
            });
          }
        }
        this.data.legend.data = legend;
        this.data.series = series;
        this.loading = false;
      }
    },
    methods: {
      isEmpty(){
        return !this.teamData.some(i => {
          return !!i.score
        })
      }
    }
  }
</script>
