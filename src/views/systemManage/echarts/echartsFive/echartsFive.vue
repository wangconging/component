<template>
  <div>
    <div id="main6" style="width: 600px;height:400px;" />
    <div id="main5" style="width: 600px;height:400px;" />
    <div id="main1" style="width: 600px;height:400px;" />
    <div id="main4" style="width: 600px;height:400px;" />
    <div id="main3" style="width: 600px;height:400px;" />
    <div id="main2" style="width: 600px;height:400px;" />
    <div id="main" style="width: 600px;height:400px;" />
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getEcharts()
      this.getEcharts1()
      this.getEcharts2() // 心电图
      this.getEcharts3()
      this.getEcharts4()
      this.getEcharts5()
      this.getEcharts6()
    })
  },
  methods: {
    getEcharts() {
      const myChart = this.$echarts.init(document.getElementById('main'))
      // 指定图表的配置项和数据
      const option = {
        tooltip: {
          trigger: 'axis',
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true },
            size: '1111px',
            color: 'red'
          },
          size: '111px',
          color: 'red',
          formatter: (a) => {
            var res = ''
            var val = null
            var nameList = a
            for (var i = 0; i < a.length; i++) {
              if (nameList[i].data !== undefined) {
                val = nameList[i].data
                res += nameList[i].seriesName + ':' + nameList[i].data + '%' + '<br>'
              }
            }
            res = res.split('<br>')
            return res[0] + '<br>' + res[1] + 'min: ' + val * 0.9 + '<br>' + 'max: ' + val * 1.1
          }
        },
        title: {
          text: 'ECharts 入门示例'
        },
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          type: 'line',
          // symbol:'circle', // 折线点设定为实心点
          symbolSize: 7, // 设定折线点的大小
          label: {
            normal: {
              // show: true, // 折线上的文字是否显示
              position: 'top'
            }
          },
          // 折线条的样式
          lineStyle: {
            color: '#3aa7ff',
            width: 2
          },
          // 折线拐点的样式
          itemStyle: {
            normal: { // 静止时：
              color: '#3aa7ff'
            },
            emphasis: { // 鼠标经过时：
              color: '#3aa7ff',
              borderColor: '#3aa7ff'
            }
          },
          // 填充区域的样式
          areaStyle: {
            normal: {
              // 填充色渐变
              color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(58, 167, 255, 0.3) '
              },
              {
                offset: 0.5,
                color: 'rgba(58, 167, 255, 0.2) '
              },
              {
                offset: 1,
                color: 'rgba(58, 167, 255, 0) '
              }
              ])
            }
          },
          data: [5, 20, 36, 10, 10, 20]
        }]
        // series: [{
        //   name: '销量',
        //   type: 'line',
        //   data: [5, 20, 36, 10, 10, 20]
        // }]
      }
      // 使用刚指定的配置项和数据显示图
      myChart.setOption(option)
    },
    getEcharts1() {
      const datalist = {
        dys: {
          dysName: ['1F1L1E2#', '1F1L1E3#', '1F1L1E5#', '1F1L1E9#', '1F1L2E2#'],
          dysValue: [
            { value: 335, name: '1F1L1E2#' },
            { value: 310, name: '1F1L1E3#' },
            { value: 234, name: '1F1L1E5#' },
            { value: 135, name: '1F1L1E9#' },
            { value: 158, name: '1F1L2E2#' }
          ]
        }
      }
      const myChart = this.$echarts.init(document.getElementById('main1'))
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
    getEcharts2() {
      const myChart = this.$echarts.init(document.getElementById('main2'))
      var xAxisData = []
      var yAxisData = []
      for (var i = 500; i > 0; i--) {
        xAxisData.push(i + '秒前')
      }
      for (i = 1; i < 501; i++) {
        yAxisData.push(null)
      }
      var totalFlowRateOption = {
        animation: false,
        title: {
          text: '总流量（kbps）'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'cross' }
        },
        grid: {
          left: 50, /* "50px"*/
          right: 15 /* "15px"*/
        },
        legend: {
          data: ['当前流量']
        },
        xAxis: {
          boundaryGap: false,
          data: xAxisData
        },
        yAxis: { boundaryGap: false },
        series: {
          symbol: 'line', /* 去掉小圆点 */
          name: '当前流量',
          type: 'bar',
          data: yAxisData/*,             smooth:true//显示为平滑的曲线*/
        }
      }

      myChart.setOption(totalFlowRateOption)

      setInterval(() => {
        yAxisData.push(Math.round(Math.random() * 1000))
        if (yAxisData.length > 500) {
          yAxisData.shift()
        }
        myChart.setOption(totalFlowRateOption)
      }, 100)
    },
    getEcharts3() {
      const myChart = this.$echarts.init(document.getElementById('main3'))

      var data1 = ['800', '1200', '1000', '840', '1320', '960', '750', '800', '900', '1000',
        '1200', '1102', '1003', '1014', '1015', '856', '917', '818', '919', '920',
        '821', '822', '923', '924', '825', '926', '827', '828', '929', '830',
        '1031', '1232', '1133', '1034', '935', '1036', '937', '1138', '1099', '1040',
        '941', '1042', '1043', '1044', '1045', '1046', '1047', '1248', '1149', '1150',
        '951', '952', '1053', '854', '1055', '956', '857', '1058'];

      var seriesData = []
      for (var i = 0; i < data1.length; i++) {
        var itemStyle = {}
        if (i > data1.length - 2) {
          itemStyle = {
            normal: {
              // 柱形图圆角，初始化效果
              barBorderRadius: [0, 5, 5, 0],
              color: this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#47E0FF'
              }, {
                offset: 1,
                color: '#ABB3FF'
              }])
            }
          }
        } else {
          itemStyle = {
            normal: {
              // 柱形图圆角，初始化效果
              barBorderRadius: [0, 5, 5, 0],
              color: this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#DADEFB'
              }, {
                offset: 1,
                color: '#F0F1FF'
              }])
            }
          }
        }
        seriesData.push({
          value: data1[i],
          itemStyle: itemStyle
        })
      }
      var option = {
        grid: {
          top: '40',
          left: '10',
          right: '45',
          bottom: '50'
        },
        dataZoom: [
          {
            type: 'slider',
            show: true,
            start: 65,
            end: 100,
            yAxisIndex: [0]
          }
        ],
        xAxis: [
          {
            position: 'top',
            type: 'value',
            name: '万方',
            nameTextStyle: {
              padding: [-60, 0, 0, -28]
            },
            axisLine: {// x轴
              show: false,
              lineStyle: {
                color: '#A8A8A8'
              }
            },
            axisTick: {// x轴刻度线
              show: false
            },
            splitLine: {// 网格线
              show: true,
              lineStyle: {
                type: 'dashed'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'category',
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
              '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
              '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
              '31', '32', '33', '34', '35', '36', '37', '38', '99', '40',
              '41', '42', '43', '44', '45', '46', '47', '48', '49', '50',
              '51', '52', '53', '54', '55', '56', '57', '58'],

            axisLine: {       //y轴
              show: false,
              lineStyle: {
                color: '#A8A8A8'
              }
            },
            axisTick: {       //y轴刻度线
              show: false
            },
            splitLine: {     //网格线
              show: false
            },
            axisLabel: {
              formatter: function () {
                return ""
              }
            }

          }
        ],
        series: [
          {
            name: '历史径流',
            type: 'bar',
            barWidth: '60%',
            data: seriesData,
            label: {
              show: true,
              formatter: '{b} : {@score}',
              position: 'insideLeft',
              textStyle: {
                fontSize: 12,
                fontFamily: 'Microsoft YaHei',
                fontWeight: 'bold',
                color: '#555555'
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    },
    getEcharts4() {
      const myChart = this.$echarts.init(document.getElementById('main4'))

      // X轴数据
      var xAxisData = ['16:00', '16:05', '17:10', '17:15', '17:50', '18:05', '18:15', '18:20', '18:30', '18:40']
      // 需要渲染的series数据
      var seriesData = [0.93, 0.69, 0.65, 0.69, 1.21, 1.23, 0.63, 0.62, 1.16, 0.65]
      // 基于准备好的dom，初始化echarts实例
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
          formatter: '{b0}<br/>' + '{a0} : {c0}' + '小时'
        },
        dataZoom: [
          {
            type: 'slider',
            show: false,
            realtime: true,
            startValue: 0,
            endValue: 4, // 初始显示index0-30的数据,可根据你的数据量设置
            filterMode: 'none'
          }
        ],
        xAxis: {
          type: 'category',
          data: xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: seriesData,
          type: 'bar'
        }]
      }

      // 使用刚指定的配置项和数据显示图表
      myChart.setOption(option)
      var startNumber = 0
      // 有多少条数据
      var xAxisDatalen = xAxisData.length
      // len的值,可以根据你的数量量设置,不要超过xAxisDatalen的值,不然不会动
      var len = 5
      var timer = null
      var index = 0
      timer && clearInterval(timer)
      timer = setInterval(() => {
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

        if (index > seriesData.length - 6) {
          index = 0
        }
      }, 1000)

      var indexH = -1
      function getHighlight() {
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
        if (indexH >= seriesData.length) {
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
      var mTime = setInterval(getHighlight, 1000)
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
        mTime = setInterval(getHighlight, 1000)
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: indexH
        })
      })
      myChart.setOption(option)
    },
    getEcharts5() {
      var myChart = this.$echarts.init(document.getElementById(`main5`))
      // 指定图表的配置项和数据
      var option = {
        // backgroundColor: '#050038',
        title: {
          text: '完成率',
          left: 'center',
          top: '100',
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
            radius: '80%',
            center: ['50%', '50%'],
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
            center: ['50%', '50%'],
            radius: ['92%', '93%'], // 外层线粗细
            hoverAnimation: false,
            data: [
              {
                name: '',
                value: 30,
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
            center: ['50%', '50%'],
            radius: ['90%', '95%'], // 进度线粗细
            hoverAnimation: false,
            data: [
              {
                name: '',
                value: 56, // 进度
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
                value: 100 - 20,
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
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    getEcharts6() {
      const datalist = {
        // 七日报警统计
        averageTime: {
          xAxisData: ['1F1L1E1', '1F1L1E2', '1F1L1E3', '1F1L1E4', '1F1L1E5', '1F1L1E6', '1F1L1E7'],
          yAxisData: [3, 4, 3, 4, 3, 4, 3],
          yAxisData2: [4, 5, 8, 9, 4, 7, 8]
        }
      }
      var myChart = this.$echarts.init(document.getElementById(`main6`))
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
        series: [{
          type: 'liquidFill', // 图表类型
          radius: '180%',
          center: ['50%', '50%'],
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
    }
  }
}
</script>

<style>
</style>
