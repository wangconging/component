<template>
  <div>
    <div id="main" style="width: 1200px;height:400px;" />
  </div>

</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {
    }
  },
  created() { },
  mounted() {
    this.$nextTick(() => {
      this.getEcharts()
    })
  },
  methods: {
    getEcharts() {
      var myChart = echarts.init(document.getElementById('main'))

      var XIdx = []
      var data = [54, 86, 46, 45, 77, 96, 89, 88, 23, 38,
        3, 66, 98, 43, 73, 76, 44, 16, 21, 14,
        71, 8, 61, 65, 1, 68, 33, 69, 49, 24
      ]
      for (var i = 1; i <= data.length; i++) {
        XIdx.push(i)
      }
      var option = {
        backgroundColor: 'white',
        grid: {
          top: 20,
          left: 20,
          right: 20,
          bottom: 20,
          containLabel: true // 轴上的数值
        },
        xAxis: {
          type: 'category',
          data: XIdx
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
          trigger: 'axis'
        },
        series: [{
          name: '人',
          type: 'line',
          data: data
        }]
      }
      myChart.setOption(option)
      var index = 0 // 播放所在下标
      var mTime = setInterval(() => {
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: index
        })
        index++
        if (index > data.length) {
          index = 0
        }
      }, 1000)
    }
  }
}
</script>

<style>
</style>
