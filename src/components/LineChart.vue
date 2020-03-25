<template>
  <chart :options="lineChartOptions" />
</template>

<script>
import { Chart } from 'highcharts-vue'

export default {
  name: 'LineChart',
  components: { Chart },
  props: {
    seriesData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      lineChartOptions: {
        title: {
          text: 'Cash over series of games',
        },
        yAxis: {
          title: {
            text: 'Cash',
          },
        },
        xAxis: {},
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false,
            },
            pointStart: 1,
          },
        },
        series: [],
      },
    }
  },
  watch: {
    seriesData: {
      handler() {
        this.lineChartOptions.series = []
        this.seriesData?.length && this.populateSeries()
      },
      immediate: true,
    },
  },
  mounted() {
    /*this.seriesData?.length && */
    /*this.populateSeries()*/
  },
  methods: {
    populateSeries() {
      // this.lineChartOptions.series.push({
      //   name: 'cash',
      //   data: this.seriesData[0],
      // })
      this.seriesData.forEach(data => this.lineChartOptions.series.push(data))
    },
  },
}
</script>
