<template>
  <div style="background: rgb(17,52,102);">
    <div id="main4" style="width:400px;height:400px;" />
    <div id="main" style="width:400px;height:400px;" />
    <div id="main2" style="width:400px;height:400px;" />
    <div id="main3" style="width:400px;height:400px;" />
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
    this.getEcharts()
    this.getEchartsTwo()
    this.getEchartsThree()
    this.getEchartsFour()
  },
  methods: {
    getEcharts() {
      var myChart = echarts.init(document.getElementById('main'))
      const option = {
        // tooltip: {
        //   formatter: '{a} <br/>{b} : {c}' + '%'
        // },
        series: [{
          name: 'Pressure',
          type: 'gauge',
          progress: {
            show: false // 进度值范围颜色
          },
          pointer: {
            shadowColor: '#fff', // 默认透明
            shadowBlur: 5,
            itemStyle: {
              color: 'auto' // 箭头跟着刻度颜色变化
            }
          },

          axisLine: { // 坐标轴线
            lineStyle: { // 属性lineStyle控制线条样式
              color: [[0.18, '#ff4500'], [0.82, 'lime'], [1, '#1e90ff']],
              width: 3,
              shadowColor: '#fff', // 默认透明
              shadowBlur: 8
            }
          },
          axisLabel: { // 坐标轴小标记刻度
            fontWeight: 'bolder',
            color: '#fff',
            shadowColor: '#fff', // 默认透明
            shadowBlur: 10
            // distance: -60 //刻度值的位置
          },
          axisTick: { // 坐标轴小标记
            length: 15, // 属性length控制线长
            lineStyle: { // 属性lineStyle控制线条样式
              color: 'auto',
              shadowColor: '#fff', // 默认透明
              shadowBlur: 10
            }
          },
          splitLine: { // 坐标轴大分隔线
            length: 25, // 属性length控制线长
            lineStyle: {// 属性lineStyle（详见lineStyle）控制线条样式
              width: 3,
              color: '#fff',
              shadowColor: '#fff', // 默认透明
              shadowBlur: 10
            }
          },
          itemStyle: {
            shadowColor: 'rgba(0,138,255,0.45)',
            shadowBlur: 10,
            shadowOffsetX: 2,
            shadowOffsetY: 2
          },
          detail: {
            valueAnimation: true,
            formatter: '{value} %',
            color: '#fff',
            fontSize: 26,
            offsetCenter: [0, '70%']
          },
          title: { // 设置仪表盘中间显示文字样式
            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              fontSize: 22,
              fontStyle: 'italic',
              color: '#fff'
            }
          },
          data: [{
            value: 66.66,
            name: 'OEE'
          }]
        }]
      }
      const time = setInterval(() => {
        option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0
        myChart.setOption(option)
      }, 1500)
      myChart.setOption(option)
    },
    getEchartsTwo() {
      var myChart = echarts.init(document.getElementById('main2'))
      var data = { // 显示的数据
        'name': '良率',
        'num': 92
      }
      var max = 100 // 最大馆藏量
      var option = {
        angleAxis: {
          show: false,
          max: max * 3 / 2, // 这里将极坐标最大值转换成仪表盘的最大值，(360度除以240度)
          type: 'value',
          startAngle: 210, // 极坐标初始角度，从第一象限算起，大约在7-8点钟角度之间
          splitLine: {
            show: false // 隐藏坐标
          }
        },
        barMaxWidth: 18, // 圆环宽度
        radiusAxis: { // 隐藏坐标
          show: false,
          type: 'category'
        },
        polar: { // 设置圆环位置和大小
          center: ['50%', '50%'],
          radius: '296'
        },
        series: [{
          type: 'bar',
          data: [{ // 上层圆环，用于显示真实数据
            value: data.num,
            itemStyle: {
              color: { // 图形渐变颜色方法，四个数字分别代表，右，下，左，上，offset表示0%到100%
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1, // 从左到右 0-1
                y2: 0,
                colorStops: [{
                  offset: 0,
                  color: '#CD48AE' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#2CABFC' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              },
              shadowColor: 'rgba(255, 255, 255, 0.2)', // 加白色阴影产生高亮效果
              shadowBlur: 10
            }
          }],
          barGap: '-100%', // 柱间距离,用来将上下两层圆环重合
          coordinateSystem: 'polar', // 类型，极坐标
          roundCap: true, // 顶端圆角
          z: 2 // 圆环层级，和zindex相似
        }, { // 下层圆环，用于显示最大值
          type: 'bar',
          data: [{
            value: max,
            itemStyle: {
              color: '#265195',
              shadowColor: 'rgba(0, 0, 0, 0.2)', // 加白色阴影产生高亮效果
              shadowBlur: 5,
              shadowOffsetY: 2
            }
          }],
          barGap: '-100%', // 柱间距离,用来将上下两层圆环重合
          coordinateSystem: 'polar', // 类型，极坐标
          roundCap: true, // 顶端圆角
          z: 1 // 圆环层级，和zindex相似
        },
        { // 仪表盘
          type: 'gauge',
          radius: '95%',
          startAngle: 210, // 起始角度，同极坐标
          endAngle: -30, // 终止角度，同极坐标
          max: max,
          splitNumber: 5, // 分割线个数（除原点外）
          axisLine: { // 坐标轴线
            show: false
          },
          pointer: {
            show: false
          },
          axisLabel: {
            // 坐标轴数字
            textStyle: {
              fontSize: 8,
              color: '#13B5FC'
            }

          },
          axisTick: { // 坐标轴标记
            length: 10,
            lineStyle: {
              color: '#13B5FC'
            }
          },
          splitLine: { // 分隔线
            length: 5,
            lineStyle: {
              width: 1
            }
          },
          title: { // 标题，显示'馆藏量'
            textStyle: {
              color: '#fff',
              shadowColor: '#fff',
              fontSize: 30
            },
            offsetCenter: ['0', '-35%'] // 位置偏移
          },
          detail: { // 仪表盘数值
            formatter: (params) => {
              var name = data.num.toString()
              var list = ''
              for (var i = 0; i < name.length; i++) {
                list += '{value|' + name[i] + '}' // 每个数字用border隔开
                if (i !== name.length - 1) {
                  list += '{margin|}' // 添加margin值
                }
              }
              list += '{margin|}' + '%'
              console.log(list)
              return [list]
            },
            color: '#fff',
            offsetCenter: ['0', '5%'],
            rich: {  // 编辑富文本样式
              value: {
                width: 36,
                height: 42,
                borderColor: '#02A0F0',
                borderWidth: 2,
                borderRadius: 5,
                lineHeight: 1000,
                fontSize: 36,
                padding: [10, 0, 4, 0],
                color: '#fff',
                shadowColor: 'rgb(2,157,239)',
                shadowBlur: 5
              },
              margin: {
                width: 8,
                height: 42
              }
            }

          },
          data: [{
            value: data.num,
            name: data.name,
            color: 'red'
          }]
        }
        ]
      }
      myChart.setOption(option)
      setInterval(() => {
        data.num = parseInt(Math.random() * max)
        option.series[2].data[0].value = data.num
        option.series[0].data[0].value = data.num
        myChart.setOption(option)
      }, 1500)

      myChart.setOption(option)
    },
    getEchartsThree() {
    },
    getEchartsFour() {
      var myChart = this.$echarts.init(document.getElementById('main4'))
      var category = ['1#', '3#', '5#']
      var barData = [431, 581, 1218]
      var colorList = ['#00b7ee', '#d2d17c', '#d16ad8']
      var option = {
        tooltip: {
          borderColor: 'rgba(0,0,0,0.5)',
          trigger: 'axis',
          backgroundColor: 'rgba(0,0,0,0.2)',
          textStyle: {
            color: 'yellow',
            decoration: 'none',
            fontFamily: 'Verdana, sans-serif',
            fontSize: 12,
            fontStyle: 'italic',
            fontWeight: 'bold'
          },
          formatter: (a) => {
            console.log(a[0].axisValue)
            var res = ''
            var nameList = a
            for (var i = 0; i < a.length; i++) {
              if (nameList[i].data !== undefined) {
                if (i === 0) {
                  console.log(nameList[0])
                  res += nameList[0].name + ' : ' + nameList[0].data + '<br>'
                }
              }
            }
            res = res.split('<br>')
            console.log(res)
            return res[0] + '次' + '<br>'
            // return res[0] + '次' + '<br>' + res2[0] + '次'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,.2)'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0,
            rotate: 50,
            show: true,
            splitNumber: 15,
            textStyle: {
              color: 'rgba(255,255,255,.6)',
              fontSize: '12'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['rgba(255,255,255,.2)'],
              width: 1,
              type: 'solid'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: category,
          splitLine: {
            show: true,
            lineStyle: {
              color: ['rgba(255,255,255,.2)'],
              width: 1,
              type: 'solid'
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,.2)'
            }
          },
          axisTick: {
            show: false
          },
          offset: 10,
          nameTextStyle: {
            fontSize: 15
          },
          axisLabel: {
            interval: 0,
            show: true,
            splitNumber: 15,
            textStyle: {
              color: 'rgba(255,255,255,.6)',
              fontSize: '12'
            }
          }
        },
        series: [
          {
            name: '数量',
            type: 'bar',
            data: barData,
            barWidth: 14,
            barGap: 10,
            smooth: true,
            label: {
              normal: {
                show: true,
                position: 'right',
                offset: [5, -2],
                textStyle: {
                  color: '#2f89cf',
                  fontSize: 13
                }
              }
            },
            itemStyle: {
              normal: {
                barBorderRadius: 20,
                color: (params) => { // 给出颜色组
                  return colorList[params.dataIndex]
                },
                // shadowColor: 'rgba(35,149,229,0.8)',
                // shadowBlur: 20,
                areaStyle: { type: 'default' }
              }
            }
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
      var index = 0 // 播放所在下标
      var indexH = -1
      function getHighlight() {
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: index
        })
        if (index >= barData.length) {
          index = 0
        }
        index++

        indexH++
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: indexH
        })
        // 设置默认选中高亮部分
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: indexH
        })
        if (indexH > 0) {
          myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: indexH - 1
          })
        }
        if (indexH >= barData.length) {
          indexH = -1
          myChart.on('mouseout', (e) => {
            myChart.dispatchAction({
              type: 'highlight',
              seriesIndex: 0,
              dataIndex: 0
            })
          })
        }
      }
      var mTime = setInterval(getHighlight, 2200)
    }
  }
}
</script>

<style>
</style>
