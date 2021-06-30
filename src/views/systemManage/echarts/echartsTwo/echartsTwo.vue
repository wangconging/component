<template>
  <div>
    <div id="main" style="width: 800px;height:400px;" />
    <div id="main1" style="width: 800px;height:400px;" />
    <div id="main2" style="width: 800px;height:400px;" />
    <el-button type="primary" style="margin-left: 16px;" @click="drawer = true">
      点我打开
    </el-button>
    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false" :modal="false" :size="size">
      <div style="padding: 20px;">
        <div />
        <el-row>
          <el-col :span="18">
            <el-form ref="form" :model="formData" label-width="100px" label-position="right" size="mini">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="子站：">
                    <el-input v-model="formData.factoryName" size="mini" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="张力器：">
                    <el-input v-model="formData.factoryName" size="mini" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="开始时间：">
                    <el-input v-model="formData.factoryName" size="mini" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="结束时间：">
                    <el-input v-model="formData.factoryName" size="mini" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" style="margin-left: 16px;" size="mini" @click="drawer = true">
              搜索
            </el-button>
          </el-col>
        </el-row>

        <el-table size="mini" stripe header-cell-class-name="custom-table-header" :data="tableData" highlight-current-row style="width: 100%; margin-top: 10px;">
          <el-table-column prop="date" label="子站编码" />
          <el-table-column prop="name" label="张力器编码" />
          <el-table-column prop="address" label="张力下限" />
          <el-table-column prop="date" label="张力上限" />
          <el-table-column prop="date" label="张力值" />
          <el-table-column prop="name" label="报警内容" />
          <el-table-column prop="address" label="报警时间" />
        </el-table>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '  1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '  1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: ' 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '  1516 弄'
      }],
      formData: {
        factoryName: '',
        factoryId: '',
        factoryWorkShopId: '',
        lineName: '',
        remarks: '',
        workShopName: ''
      },
      drawer: false
    }
  },
  created() { },
  mounted() {
    this.getEchart2()
    this.getEchart1()
    this.getEchart()
  },
  methods: {
    getEchart() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'))
      var dataBySeries = [
        [12, 23, 54, 6], // series 0 的数据
        [34, 34433, 2223, 21122, 1232, 34] // series 1 的数据
      ]
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: ''
        },
        brush: {
          toolbox: ['lineX', 'clear'],
          xAxisIndex: 0,
          throttleType: 'debounce',
          throttleDelay: 1000,
          // xAxisIndex: 'all',
          brushLink: 'all',
          outOfBrush: {
            colorAlpha: 0.1
          }
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'line',
          data: [0, 5, 5, 5, 5, 0, 0, 0, 5, 20, 36, 10]
        }]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
      myChart.on('brushSelected', function (params) {
        // var brushComponent = params.batch[0]

        // var sum = 0 // 统计选中项的数据值的和

        // for (var sIdx = 0; sIdx < brushComponent.selected.length; sIdx++) {
        //   // 对于每个 series：
        //   var dataIndices = brushComponent.selected[sIdx].dataIndex

        //   for (var i = 0; i < dataIndices.length; i++) {
        //     var dataIndex = dataIndices[i]
        //     sum += dataBySeries[sIdx][dataIndex]
        //   }
        // }
        console.log(params) // 用某种方式输出统计值。
      })
    },
    getEchart1() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main1'))
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        xAxis: {
          min: 1,
          max: 86400,
          minInterval: 1
        },
        brush: {
          toolbox: ['lineX', 'clear'],
          xAxisIndex: 0,
          throttleType: 'debounce',
          throttleDelay: 1000,
          // xAxisIndex: 'all',
          brushLink: 'all',
          outOfBrush: {
            colorAlpha: 0.1
          }
        },
        yAxis: {},
        series: [{
          symbolSize: 5,
          data: [
            [10000.0, 333.04],
            [20000, 333.95],
            [60000, 111.58],
            [9.05, 8.81],
            [11.0, 8.33],
            [40000, 7.66],
            [30000, 6.81],
            [10.0, 6.33],
            [14.0, 8.96],
            [12.5, 6.82],
            [9.15, 227.20],
            [11.5, 7.20],
            [3.03, 4.23],
            [12.2, 7.83],
            [2.02, 4.47],
            [1.05, 3.33],
            [4.05, 4.96],
            [6.03, 7.24],
            [12.0, 6.26],
            [12.0, 8.84],
            [7.08, 5.82],
            [5.02, 5.68]
          ],
          type: 'scatter'
        }]
      }

      myChart.setOption(option)
      myChart.on('brushSelected', function (params) {
        // var brushComponent = params.batch[0]

        // var sum = 0 // 统计选中项的数据值的和

        // for (var sIdx = 0; sIdx < brushComponent.selected.length; sIdx++) {
        //   // 对于每个 series：
        //   var dataIndices = brushComponent.selected[sIdx].dataIndex

        //   for (var i = 0; i < dataIndices.length; i++) {
        //     var dataIndex = dataIndices[i]
        //     sum += dataBySeries[sIdx][dataIndex]
        //   }
        // }
        console.log(params) // 用某种方式输出统计值。
      })
    },
    getEchart2() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main2'))
      const option = {
        series: [{
          type: 'gauge',
          startAngle: 90,
          endAngle: -270,
          pointer: {
            show: false
          },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: {
              borderWidth: 1,
              borderColor: '#464646'
            }
          },
          axisLine: {
            lineStyle: { // 属性lineStyle控制线条样式
              color: [[1, '#666666']],
              width: 40
            }
          },
          splitLine: {
            show: false,
            distance: 0,
            length: 10
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false,
            distance: 50
          },
          data: [{
            value: 20,
            name: 'Perfect',
            title: {
              offsetCenter: ['0%', '-30%']
            },
            detail: {
              offsetCenter: ['0%', '-20%']
            }
          },
          {
            value: 40,
            name: 'Good',
            title: {
              offsetCenter: ['0%', '0%']
            },
            detail: {
              offsetCenter: ['0%', '10%']
            }
          },
          {
            value: 60,
            name: 'Commonly',
            title: {
              offsetCenter: ['0%', '30%']
            },
            detail: {
              offsetCenter: ['0%', '40%']
            }
          }
          ],
          title: {
            fontSize: 14
          },
          detail: {
            width: 50,
            height: 14,
            fontSize: 14,
            color: 'auto',
            borderColor: 'auto',
            borderRadius: 20,
            borderWidth: 1,
            formatter: '{value}%'
          }
        }]
      }

      setInterval(function () {
        option.series[0].pointer.show = false
        option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0
        option.series[0].data[1].value = (Math.random() * 100).toFixed(2) - 0
        option.series[0].data[2].value = (Math.random() * 100).toFixed(2) - 0
        myChart.setOption(option, true)
      }, 2000)
    }
  }
}
</script>

<style>
</style>
