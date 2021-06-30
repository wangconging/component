import { mapState } from 'vuex'
import datalist from './data.js'
export default {
  data() {
    return {
      pageIsShow: true,
      list: '',
      nowTime: '',
      t: null,
      windowHeight: {
        height: ''
      }
    }
  },
  updated() {
    this.pageIsShow = true
  },
  computed: {
    ...mapState({
      pageBottomIsShow: state => state.user.pageBottomIsShow
    })
  },
  created() {
    this.list = datalist
    var whei = document.body.clientWidth
    document.querySelector('html').style.fontSize = whei / 20 + 'px'
    window.onresize = () => {
      var whei = document.body.clientWidth
      document.querySelector('html').style.fontSize = whei / 20 + 'px'
      this.getWindowHeight()
    }
  },
  mounted() {
    this.getBg()
    this.$nextTick(() => {
      this.getEcharts1() // 报 警 统 计(W)
      this.getEcharts2() // 报 警 分 布 TOP5(W)
      this.getEcharts3() // 月 度 运 行 时 间
      this.getEcharts4() // 子 站 运 行 统 计(W)
      this.getEcharts5() // 张力器运行 TOP5
      this.getEcharts6() // 当日报警修复率
      var element = document.getElementById('box')
      element.scrollIntoView()
    })
    // window.onresize = () => {
    //   window.location.reload()
    // }
    this.getWindowHeight()
    this.t = setTimeout(this.time, 1000) // 开始运行
  },
  beforeRouteLeave(to, form, next) {
    this.pageIsShow = false
    document.querySelector('html').style.fontSize = '14px'
    setTimeout(() => {
      next()
    }, 50)
  },
  methods: {
    // 报 警 统 计(W)
    getEcharts1() {
      var myChart = this.$echarts.init(document.getElementById('echart1'))
      // 指定图表的配置项和数据
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
            var res = ''
            var res2 = ''
            var nameList = a
            for (var i = 0; i < a.length; i++) {
              if (nameList[i].data !== undefined) {
                if (i === 0) {
                  res += nameList[0].seriesName + ' : ' + nameList[0].data + '<br>'
                } else {
                  res2 += nameList[1].seriesName + ' : ' + nameList[1].data
                }
              }
            }
            res2 = res2.split('<br>')
            res = res.split('<br>')
            return res[0] + '次' + '<br>' + res2[0] + '次'
          }
        },
        legend: {
          top: '0%',
          data: ['超下限', '超上限'],
          textStyle: {
            color: 'rgba(255,255,255,.5)',
            fontSize: '12'
          }
        },
        grid: {
          left: '10',
          top: '30',
          right: '10',
          bottom: '10',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            textStyle: {
              color: 'rgba(255,255,255,.6)',
              fontSize: 12
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,.2)'
            }
          },
          data: datalist.averageTime.xAxisData
        }, {
          axisPointer: { show: false },
          axisLine: { show: false },
          position: 'bottom',
          offset: 20
        }],
        yAxis: [{
          type: 'value',
          axisTick: { show: false },
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,.1)'
            }
          },
          axisLabel: {
            textStyle: {
              color: 'rgba(255,255,255,.6)',
              fontSize: 12
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255,.1)'
            }
          }
        }],
        series: [
          {
            name: '超下限',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(1, 132, 213, 0.4)'
                }, {
                  offset: 0.8,
                  color: 'rgba(1, 132, 213, 0.1)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)'
              }
            },
            itemStyle: {
              normal: {
                color: '#0184d5',
                borderColor: 'rgba(221, 220, 107, .1)',
                borderWidth: 12
              }
            },
            data: datalist.averageTime.yAxisData
            // markPoint: {
            //   data: [
            //     { type: 'max', name: '最大值' },
            //     { type: 'min', name: '最小值' }
            //   ]
            // },
            // markLine: {
            //   data: [
            //     { type: 'average', name: '平均值' }
            //   ]
            // }
          },
          {
            name: '超上限',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(37, 198, 135, 0.4)'
                }, {
                  offset: 0.8,
                  color: 'rgba(37, 198, 135, 0.1)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)'
              }
            },
            itemStyle: {
              normal: {
                color: '#27d08a',
                borderColor: 'rgba(221, 220, 107, .1)',
                borderWidth: 12
              }
            },
            data: datalist.averageTime.yAxisData2
            // markPoint: {
            //   data: [
            //     { name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }
            //   ]
            // },
            // markLine: {
            //   data: [
            //     { type: 'average', name: '平均值' },
            //     [{
            //       symbol: 'none',
            //       x: '90%',
            //       yAxis: 'max'
            //     }, {
            //       symbol: 'circle',
            //       label: {
            //         position: 'start',
            //         formatter: '最大值'
            //       },
            //       type: 'max',
            //       name: '最高点'
            //     }]
            //   ]
            // }
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
      window.addEventListener('resize', () => {
        myChart.resize()
      })
      var index = 0
      var mTime = setInterval(() => {
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: index
        })
        index++
        if (index > datalist.averageTime.yAxisData.length) {
          index = 0
        }
      }, 1800)
    },
    // 报 警 分 布 TOP5(W)
    getEcharts2() {
      var myChart = this.$echarts.init(document.getElementById('echart2'))
      // 指定图表的配置项和数据
      var option = {
        color: ['#d2d17c', '#00b7ee', '#5578cf', '#5ebbeb', '#d16ad8', '#f8e19a', '#00b7ee', '#81dabe', '#5fc5ce'],
        backgroundColor: '',
        tooltip: {
          borderColor: 'rgba(0,0,0,0.5)',
          trigger: 'item',
          backgroundColor: 'rgba(0,0,0,0.2)',
          textStyle: {
            color: 'yellow',
            decoration: 'none',
            fontFamily: 'Verdana, sans-serif',
            fontSize: 12,
            fontStyle: 'italic',
            fontWeight: 'bold'
          },
          formatter: '{b0}<br/>' + '{a0} : {c0}' + '次'
        },
        grid: {
          left: 20,
          right: 20,
          top: 0,
          bottom: 20
        },
        legend: {
          top: 40,
          orient: 'vertical',
          left: 'left',
          textStyle: {
            fontSize: 10,
            color: 'rgba(255,255,255,.7)'
          }
        },
        series: [
          {
            label: {
              show: false,
              position: 'center'
            },
            top: 35,
            name: '周报警',
            type: 'pie',
            radius: '80%',
            center: ['50%', '40%'],
            data: datalist.dys.dysValue,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
      window.addEventListener('resize', () => {
        myChart.resize()
      })
      var index = -1
      function getHighlight() {
        index++
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: index
        })
        // 设置默认选中高亮部分
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: index
        })
        if (index > 0) {
          myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: index - 1
          })
        }
        if (index >= datalist.dys.dysValue.length) {
          index = -1
          myChart.on('mouseout', (e) => {
            myChart.dispatchAction({
              type: 'highlight',
              seriesIndex: 0,
              dataIndex: 0
            })
          })
        }
      }
      var mTime = setInterval(getHighlight, 2000)
      myChart.on('mouseover', (e) => {
        clearInterval(mTime)
        // 当检测到鼠标悬停事件，取消默认选中高亮
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: index
        })
        // 高亮显示悬停的那块
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 1,
          dataIndex: e.dataIndex
        })
      })
      // 检测鼠标移出后显示之前默认高亮的那块
      myChart.on('mouseout', (e) => {
        mTime = setInterval(getHighlight, 2000)
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: index
        })
      })
    },
    // 月 度 运 行 时 间
    getEcharts3() {
      var yList = [200, 300, 300, 900, 900, 400, 1500, 1500, 1200, 600, 200, 300, 300, 1200, 1500, 1200, 600, 200, 800, 300, 1200, 600, 700, 800, 300, 900, 1500, 1200, 600, 700, 300, 300, 1500, 1200, 600, 800, 300, 300, 900, 900, 1500, 1200, 600, 400, 900, 900, 1500, 1200, 600, 200, 500, 300, 900, 900, 900, 1500, 1500, 1200, 600, 200, 300, 300, 1200, 1500, 1200, 600, 200, 300, 300, 1200, 600, 200, 300, 300, 900, 1500, 1200, 600, 200, 300, 300, 1500, 1200, 600, 300, 300, 300, 900, 900, 1500, 1200, 600, 300, 900, 900, 1500, 1200, 700]
      var xList = ['1F1L1E1#', '1F1L1E2#', '1F1L1E3#', '1F1L1E4#', '1F1L1E5#', '1F1L1E6#', '1F1L1E7#', '1F1L1E8#', '1F1L1E22#', '1F1L1E23#', '1F1L1E24#', '1F1L1E25#', '1F1L1E26#', '1F1L1E27#', '1F1L1E28#', '1F1L1E32#', '1F1L1E33#', '1F1L1E34#', '1F1L1E35#', '1F1L1E36#', '1F1L1E37#', '1F1L1E38#', '1F1L1E42#', '1F1L1E43#', '1F1L1E44#', '1F1L1E45#', '1F1L1E46#', '1F1L1E47#', '1F1L1E51#', '1F1L1E52#', '1F1L1E53#', '1F1L1E54#', '1F1L1E55#', '1F1L1E56#', '1F1L1E57#', '1F1L1E58#', '1F1L1E62#', '1F1L1E63#', '1F1L1E64#', '1F1L1E65#', '1F1L1E66#', '1F1L1E67#', '1F1L1E68#', '1F1L1E72#', '1F1L1E73#', '1F1L1E74#', '1F1L1E75#', '1F1L1E76#', '1F1L1E77#', '1F1L1E1#', '1F1L1E2#', '1F1L1E3#', '1F1L1E4#', '1F1L1E5#', '1F1L1E6#', '1F1L1E7#', '1F1L1E8#', '1F1L1E22#', '1F1L1E23#', '1F1L1E24#', '1F1L1E25#', '1F1L1E26#', '1F1L1E27#', '1F1L1E28#', '1F1L1E32#', '1F1L1E33#', '1F1L1E34#', '1F1L1E35#', '1F1L1E36#', '1F1L1E37#', '1F1L1E38#', '1F1L1E42#', '1F1L1E43#', '1F1L1E44#', '1F1L1E45#', '1F1L1E46#', '1F1L1E47#', '1F1L1E51#', '1F1L1E52#', '1F1L1E53#', '1F1L1E54#', '1F1L1E55#', '1F1L1E56#', '1F1L1E87#', '1F1L1E88#', '1F1L1E02#', '1F1L1E93#', '1F1L1E64#', '1F1L1E95#', '1F1L1E66#', '1F1L1E87#', '1F1L1E68#', '1F1L1E72#', '1F1L1E73#', '1F1L1E74#', '1F1L1E75#', '1F1L1E76#', '1F1L1E87#']
      var myChart = this.$echarts.init(document.getElementById('echart3'))
      var option = {
        dataZoom: [
          {
            type: 'slider',
            show: false,
            realtime: true,
            startValue: 0,
            endValue: 24, // 初始显示index0-30的数据,可根据你的数据量设置
            filterMode: 'none'
          }
        ],
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
          formatter: '{b0}<br/>' + '{a0} : {c0}' + '小时'
        },
        grid: {
          left: '0%',
          top: '10px',
          right: '0%',
          bottom: '4%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: xList,
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,.1)',
              width: 1,
              type: 'solid'
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
          }
        }],
        yAxis: [{
          type: 'value',
          axisLabel: {
            // formatter: '{value} %'
            show: true,
            textStyle: {
              color: 'rgba(255,255,255,.6)',
              fontSize: '12'
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,.1	)',
              width: 1,
              type: 'solid'
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255,.1)'
            }
          }
        }],
        series: [
          {
            name: '时长',
            type: 'bar',
            data: yList,
            barWidth: '35%', // 柱子宽度
            // barGap: 1, //柱子之间间距
            itemStyle: {
              normal: {
                color: '#2f89cf',
                opacity: 1,
                barBorderRadius: 5
              }
            }
          }
        ]
      }
      myChart.setOption(option)
      window.addEventListener('resize', () => {
        myChart.resize()
      })
      var startNumber = 0
      // 有多少条数据
      var xAxisDatalen = xList.length
      // len的值,可以根据你的数量量设置,不要超过xAxisDatalen的值,不然不会动
      var len = 25
      var timer = null
      var index = 0 // 播放所在下标
      timer && clearInterval(timer)
      function getCarousel() {
        // timer = setInterval(() => {
        if (startNumber === xAxisDatalen - len) {
          startNumber = 0
        }
        myChart.dispatchAction({
          type: 'dataZoom',
          startValue: startNumber,
          endValue: startNumber + len
        })
        startNumber++
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: index
        })
        index++
        if (index > yList.length - 26) {
          index = 0
        }
        // }, 1000)
      }
      var mTime = setInterval(getCarousel, 1000)
      myChart.on('mouseover', (e) => {
        clearInterval(mTime)
        // 当检测到鼠标悬停事件，取消默认选中高亮
      })
      // 检测鼠标移出后显示之前默认高亮的那块
      myChart.on('mouseout', (e) => {
        mTime = setInterval(getCarousel, 1000)
      })
      // var startNumber = 0
      // // 有多少条数据
      // var xAxisDatalen = xList.length
      // // len的值,可以根据你的数量量设置,不要超过xAxisDatalen的值,不然不会动
      // var len = 25
      // var timer = null
      // var index = 0 // 播放所在下标
      // timer && clearInterval(timer)
      // timer = setInterval(() => {
      //   if (startNumber === xAxisDatalen - len) {
      //     startNumber = 0
      //   }
      //   myChart.dispatchAction({
      //     type: 'dataZoom',
      //     startValue: startNumber,
      //     endValue: startNumber + len
      //   })
      //   startNumber++
      //   myChart.dispatchAction({
      //     type: 'showTip',
      //     seriesIndex: 0,
      //     dataIndex: index
      //   })
      //   index++
      //   if (index > yList.length - 26) {
      //     index = 0
      //   }
      // }, 1000)
    },
    // 子 站 运 行 统 计(W)
    getEcharts4() {
      var yList = [
        { value: 1048, name: '1F1LE18#' },
        { value: 735, name: '1F6LE38#' },
        { value: 580, name: '1F2LE48#' },
        { value: 484, name: '1F3LE58#' },
        { value: 300, name: '1F1LE98#' }
      ]
      var myChart = this.$echarts.init(document.getElementById('echart4'))
      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          borderColor: 'rgba(0,0,0,0.5)',
          trigger: 'item',
          backgroundColor: 'rgba(0,0,0,0.2)',
          textStyle: {
            color: 'yellow',
            decoration: 'none',
            fontFamily: 'Verdana, sans-serif',
            fontSize: 12,
            fontStyle: 'italic',
            fontWeight: 'bold'
          },
          formatter: '{b0}<br/>' + '{a0} : {c0}' + '小时'
        },

        legend: {
          top: 70,
          orient: 'vertical',
          left: 'left',
          textStyle: {
            fontSize: 10,
            color: 'rgba(255,255,255,.7)'
          }
        },
        series: [
          {
            top: 50,
            name: '时长',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['50%', '40%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '10',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: yList
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
      window.addEventListener('resize', () => {
        myChart.resize()
      })
      var index = -1
      function getHighlight() {
        index++
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: index
        })
        // 设置默认选中高亮部分
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: index
        })
        if (index > 0) {
          myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: index - 1
          })
        }
        if (index >= yList.length) {
          index = -1
          myChart.on('mouseout', (e) => {
            myChart.dispatchAction({
              type: 'highlight',
              seriesIndex: 0,
              dataIndex: 0
            })
          })
        }
      }
      var mTime = setInterval(getHighlight, 2800)
      //  mTime = setInterval(() => {
      //   ()
      //   // 当检测到鼠标悬停事件，取消默认选中高亮
      // }, 300)

      myChart.on('mouseover', (e) => {
        clearInterval(mTime)
        // 当检测到鼠标悬停事件，取消默认选中高亮
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: index
        })
        // 高亮显示悬停的那块
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 1,
          dataIndex: e.dataIndex
        })
      })
      // 检测鼠标移出后显示之前默认高亮的那块
      myChart.on('mouseout', (e) => {
        mTime = setInterval(getHighlight, 2800)
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: index
        })
      })
      // var index = 0 // 播放所在下标
      // var mTime = setInterval(() => {
      //   myChart.dispatchAction({
      //     type: 'showTip',
      //     seriesIndex: 0,
      //     dataIndex: index
      //   })
      //   index++
      //   if (index > yList.length) {
      //     index = 0
      //   }
      // }, 2000)
    },
    // 张力器运行 TOP5
    getEcharts5() {
      var myChart = this.$echarts.init(document.getElementById('echart5'))
      // 指定图表的配置项和数据
      var category = ['1F1L1E11#', '1F1L1E33#', '1F1L1E55#', '1F1L1E66#', '1F1L1E78#']
      var barData = [431, 581, 1218, 1310, 2142]
      var colorList = ['#5fc5ce', '#81dabe', '#00b7ee', '#d2d17c', '#d16ad8']
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
          formatter: '{b0}<br/>' + '{a0} : {c0}' + '小时'
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
            name: '时长',
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
      window.addEventListener('resize', () => {
        myChart.resize()
      })
      var index = 0 // 播放所在下标
      // var mTime = setInterval(() => {
      //   console.log(index)
      // }, 2200)
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
      myChart.on('mouseover', (e) => {
        clearInterval(mTime)
        // 当检测到鼠标悬停事件，取消默认选中高亮
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: indexH
        })
        // 高亮显示悬停的那块
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 1,
          dataIndex: e.dataIndex
        })
      })
      // 检测鼠标移出后显示之前默认高亮的那块
      myChart.on('mouseout', (e) => {
        mTime = setInterval(getHighlight, 2200)
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: indexH
        })
      })
    },
    // 当日报警修复率
    getEcharts6() {
      var myChart = this.$echarts.init(document.getElementById('echart6'))
      var option = {
        // backgroundColor: '#050038',
        title: {
          text: '修复率',
          left: 'center',
          top: '80',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 20,
            color: 'rgb(0,0,0)'
          },
          subtext: '50%', // 副标题
          subtextStyle: {
            fontWeight: 'bold',
            fontSize: 40,
            color: 'rgb(0,0,0)'
          }
        },
        series: [
          {
            type: 'liquidFill', // 图表类型
            radius: '50%',
            center: ['50%', '40%'],
            data: [
              0.5
            ], // data个数代表波浪数
            backgroundStyle: {
              borderWidth: 1,
              color: '#F4F9FF'
            },
            label: {
              normal: {
                show: false, // 不显示label  用副标题代替了
                formatter: (0.5 * 100).toFixed(0) + '%',
                textStyle: {
                  fontSize: 38,
                  color: 'black'
                }
              }
            },
            color: [ // color一定要是个数组，每一项对应一个波浪，可以给每个波浪单独配置颜色
              {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 1,
                    color: 'rgba(255,255,255,1)'
                  },
                  {
                    offset: 0,
                    color: 'rgba(103,205,251,1)'
                  }
                ],
                globalCoord: false
              },
              {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 1,
                    color: 'rgba(187,248,252,0.5)'
                  },
                  {
                    offset: 0,
                    color: 'rgba(30,134,245,1)'
                  }
                ],
                globalCoord: false
              },
              {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 1,
                    color: 'rgba(180,251,255,0.66)'
                  },
                  {
                    offset: 0,
                    color: 'rgba(128,122,254,0.66)'
                  }
                ],
                globalCoord: false
              }
            ],
            outline: {
              show: false
            }
          },
          // 外层线
          {
            type: 'pie',
            center: ['50%', '40%'],
            radius: ['62%', '63%'], // 外层线粗细
            hoverAnimation: false,
            data: [
              {
                name: '',
                value: 50,
                labelLine: {
                  show: false
                },
                itemStyle: {
                  color: '#67CDFB'
                },
                emphasis: {
                  labelLine: {
                    show: false
                  },
                  itemStyle: {
                    // color: '#5886f0'
                  }
                }
              }
            ]
          },
          // 进度线
          {
            type: 'pie',
            center: ['50%', '40%'],
            radius: ['60%', '65%'], // 进度线粗细
            hoverAnimation: false,
            data: [
              {
                name: '',
                value: 50, // 进度
                labelLine: {
                  show: false
                },
                itemStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 2,
                    colorStops: [
                      // !! 在此添加渐变过程色 !!
                      { offset: 0, color: '#33E2ED' },
                      { offset: 1, color: '#807AFE' }
                    ]
                  }
                },
                emphasis: {
                  labelLine: {
                    show: false
                  },
                  itemStyle: {
                    // color: '#5886f0'
                  }
                }
              },
              {
                // 画剩余的刻度圆环
                name: '',
                value: 100 - 50,
                itemStyle: {
                  color: 'rgba(0,0,0,0)'
                },
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                },
                emphasis: {
                  labelLine: {
                    show: false
                  },
                  itemStyle: {
                    color: '#050038'
                  }
                }
              }
            ]
          }
        ]
      }
      myChart.setOption(option)
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
    // 设置页面高度
    time() {
      clearTimeout(this.t) // 清除定时器
      const dt = new Date()
      const y = dt.getFullYear()
      const mt = dt.getMonth() + 1
      const day = dt.getDate()
      const h = dt.getHours() // 获取时
      const m = dt.getMinutes() // 获取分
      const s = dt.getSeconds() // 获取秒
      this.nowTime = y + '年' + mt + '月' + day + '日' + h + '时' + m + '分' + s + '秒'
      // document.getElementById('showTime').innerHTML
      // console.log(y + '年' + mt + '月' + day + '-' + h + '时' + m + '分' + s + '秒')
      this.t = setTimeout(this.time, 1000) // 设定定时器，循环运行
    },
    getWindowHeight() {
      this.windowHeight.height = window.innerHeight - 132 + 'px'
    },
    getBg() {
      var num = 200
      var w = window.innerWidth
      var h = window.innerHeight
      var _x = 0
      var _y = 0
      var _z = 150
      var dtr = (d) => {
        return d * Math.PI / 180
      }
      var rnd = () => {
        return Math.sin(Math.floor(Math.random() * 360) * Math.PI / 180)
      }
      var cam = {
        obj: {
          x: _x,
          y: _y,
          z: _z
        },
        dest: {
          x: 0,
          y: 0,
          z: 1
        },
        dist: {
          x: 0,
          y: 0,
          z: 200
        },
        ang: {
          cplane: 0,
          splane: 0,
          ctheta: 0,
          stheta: 0
        },
        zoom: 1,
        disp: {
          x: w / 2,
          y: h / 2,
          z: 0
        },
        upd: () => {
          cam.dist.x = cam.dest.x - cam.obj.x
          cam.dist.y = cam.dest.y - cam.obj.y
          cam.dist.z = cam.dest.z - cam.obj.z
          cam.ang.cplane = -cam.dist.z / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z)
          cam.ang.splane = cam.dist.x / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z)
          cam.ang.ctheta = Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z) / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.y * cam.dist.y + cam.dist.z * cam.dist.z)
          cam.ang.stheta = -cam.dist.y / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.y * cam.dist.y + cam.dist.z * cam.dist.z)
        }
      }

      var trans = {
        parts: {
          sz: (p, sz) => {
            return {
              x: p.x * sz.x,
              y: p.y * sz.y,
              z: p.z * sz.z
            }
          },
          rot: {
            x: (p, rot) => {
              return {
                x: p.x,
                y: p.y * Math.cos(dtr(rot.x)) - p.z * Math.sin(dtr(rot.x)),
                z: p.y * Math.sin(dtr(rot.x)) + p.z * Math.cos(dtr(rot.x))
              }
            },
            y: (p, rot) => {
              return {
                x: p.x * Math.cos(dtr(rot.y)) + p.z * Math.sin(dtr(rot.y)),
                y: p.y,
                z: -p.x * Math.sin(dtr(rot.y)) + p.z * Math.cos(dtr(rot.y))
              }
            },
            z: (p, rot) => {
              return {
                x: p.x * Math.cos(dtr(rot.z)) - p.y * Math.sin(dtr(rot.z)),
                y: p.x * Math.sin(dtr(rot.z)) + p.y * Math.cos(dtr(rot.z)),
                z: p.z
              }
            }
          },
          pos: (p, pos) => {
            return {
              x: p.x + pos.x,
              y: p.y + pos.y,
              z: p.z + pos.z
            }
          }
        },
        pov: {
          plane: (p) => {
            return {
              x: p.x * cam.ang.cplane + p.z * cam.ang.splane,
              y: p.y,
              z: p.x * -cam.ang.splane + p.z * cam.ang.cplane
            }
          },
          theta: (p) => {
            return {
              x: p.x,
              y: p.y * cam.ang.ctheta - p.z * cam.ang.stheta,
              z: p.y * cam.ang.stheta + p.z * cam.ang.ctheta
            }
          },
          set: (p) => {
            return {
              x: p.x - cam.obj.x,
              y: p.y - cam.obj.y,
              z: p.z - cam.obj.z
            }
          }
        },
        persp: (p) => {
          return {
            x: p.x * cam.dist.z / p.z * cam.zoom,
            y: p.y * cam.dist.z / p.z * cam.zoom,
            z: p.z * cam.zoom,
            p: cam.dist.z / p.z
          }
        },
        disp: (p, disp) => {
          return {
            x: p.x + disp.x,
            y: -p.y + disp.y,
            z: p.z + disp.z,
            p: p.p
          }
        },
        steps: (_obj_, sz, rot, pos, disp) => {
          var _args = trans.parts.sz(_obj_, sz)
          _args = trans.parts.rot.x(_args, rot)
          _args = trans.parts.rot.y(_args, rot)
          _args = trans.parts.rot.z(_args, rot)
          _args = trans.parts.pos(_args, pos)
          _args = trans.pov.plane(_args)
          _args = trans.pov.theta(_args)
          _args = trans.pov.set(_args)
          _args = trans.persp(_args)
          _args = trans.disp(_args, disp)
          return _args
        }
      };

      (() => {
        'use strict'
        var threeD = function (param) {
          this.transIn = {}
          this.transOut = {}
          this.transIn.vtx = (param.vtx)
          this.transIn.sz = (param.sz)
          this.transIn.rot = (param.rot)
          this.transIn.pos = (param.pos)
        }

        threeD.prototype.vupd = function () {
          this.transOut = trans.steps(

            this.transIn.vtx,
            this.transIn.sz,
            this.transIn.rot,
            this.transIn.pos,
            cam.disp
          )
        }

        var Build = function () {
          this.vel = 0.04
          this.lim = 360
          this.diff = 200
          this.initPos = 100
          this.toX = _x
          this.toY = _y
          this.go()
        }

        Build.prototype.go = function () {
          this.canvas = document.getElementById('canv')
          this.canvas.width = window.innerWidth
          this.canvas.height = window.innerHeight
          this.$ = canv.getContext('2d')
          this.$.globalCompositeOperation = 'source-over'
          this.varr = []
          this.dist = []
          this.calc = []

          for (var i = 0, len = num; i < len; i++) {
            this.add()
          }

          this.rotObj = {
            x: 0,
            y: 0,
            z: 0
          }
          this.objSz = {
            x: w / 5,
            y: h / 5,
            z: w / 5
          }
        }

        Build.prototype.add = function () {
          this.varr.push(new threeD({
            vtx: {
              x: rnd(),
              y: rnd(),
              z: rnd()
            },
            sz: {
              x: 0,
              y: 0,
              z: 0
            },
            rot: {
              x: 20,
              y: -20,
              z: 0
            },
            pos: {
              x: this.diff * Math.sin(360 * Math.random() * Math.PI / 180),
              y: this.diff * Math.sin(360 * Math.random() * Math.PI / 180),
              z: this.diff * Math.sin(360 * Math.random() * Math.PI / 180)
            }
          }))
          this.calc.push({
            x: 360 * Math.random(),
            y: 360 * Math.random(),
            z: 360 * Math.random()
          })
        }

        Build.prototype.upd = function () {
          cam.obj.x += (this.toX - cam.obj.x) * 0.05
          cam.obj.y += (this.toY - cam.obj.y) * 0.05
        }

        Build.prototype.draw = function () {
          this.$.clearRect(0, 0, this.canvas.width, this.canvas.height)
          cam.upd()
          this.rotObj.x += 0.1
          this.rotObj.y += 0.1
          this.rotObj.z += 0.1

          for (var i = 0; i < this.varr.length; i++) {
            for (var val in this.calc[i]) {
              if (this.calc[i].hasOwnProperty(val)) {
                this.calc[i][val] += this.vel
                if (this.calc[i][val] > this.lim) this.calc[i][val] = 0
              }
            }

            this.varr[i].transIn.pos = {
              x: this.diff * Math.cos(this.calc[i].x * Math.PI / 180),
              y: this.diff * Math.sin(this.calc[i].y * Math.PI / 180),
              z: this.diff * Math.sin(this.calc[i].z * Math.PI / 180)
            }
            this.varr[i].transIn.rot = this.rotObj
            this.varr[i].transIn.sz = this.objSz
            this.varr[i].vupd()
            if (this.varr[i].transOut.p < 0) continue
            var g = this.$.createRadialGradient(this.varr[i].transOut.x, this.varr[i].transOut.y, this.varr[i].transOut.p, this.varr[i].transOut.x, this.varr[i].transOut.y, this.varr[i].transOut.p * 2)
            this.$.globalCompositeOperation = 'lighter'
            g.addColorStop(0, 'hsla(255, 255%, 255%, 1)')
            g.addColorStop(0.5, 'hsla(' + (i + 2) + ',85%, 40%,1)')
            g.addColorStop(1, 'hsla(' + (i) + ',85%, 40%,.5)')
            this.$.fillStyle = g
            this.$.beginPath()
            this.$.arc(this.varr[i].transOut.x, this.varr[i].transOut.y, this.varr[i].transOut.p * 2, 0, Math.PI * 2, false)
            this.$.fill()
            this.$.closePath()
          }
        }
        Build.prototype.anim = function () {
          window.requestAnimationFrame = (function () {
            return window.requestAnimationFrame ||
              function (callback, element) {
                window.setTimeout(callback, 1000 / 60)
              }
          })()
          var anim = function () {
            this.upd()
            this.draw()
            window.requestAnimationFrame(anim)
          }.bind(this)
          window.requestAnimationFrame(anim)
        }

        Build.prototype.run = function () {
          this.anim()
        }
        var app = new Build()
        app.run()
      })()
    }
  }
}
