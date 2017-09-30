<template>
  <div class="chart-container">
    <chart :options="data"></chart>
  </div>
</template>
<style scoped>
  .echarts{
    width: 100%;
  }
</style>
<script>
  import ECharts from 'vue-echarts/components/ECharts.vue'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/legend'

  export default {
    data(){
      return {
        data: {
          title: {
            text: "11111"
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:['1']
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: ["1", "2", "3", "4", "5"]
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              name: "1",
              type: "line",
              data: [23, 45, 111, 222, 111]
            }
          ]
        }
      }
    },
    components: {
      chart: ECharts
    }
  }
</script>
