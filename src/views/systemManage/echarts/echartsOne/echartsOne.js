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
      this.getEcharts1() // 平均维修用时
      this.getEcharts2() // 周报警分布
      this.getEcharts3() // 七日运行TOP5
      this.getEcharts4() // 月度运行时间
      this.getEcharts5() // 子站运行指示
      this.getEcharts6() // 当日报警修复率
    })
    // this.changPageBottom(1)
    this.getWindowHeight()
    this.t = setTimeout(this.time, 1000) // 开始运行
    window.onresize = () => {
      window.location.reload()
    }
  },
  beforeRouteLeave(to, form, next) {
    this.pageIsShow = false
    document.querySelector('html').style.fontSize = '14px'
    // this.changPageBottom(2)
    setTimeout(() => {
      next()
    }, 50)
  },
  methods: {
    getEcharts1() {
      var myChart = this.$echarts.init(document.getElementById('echart1'))
      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#dddc6b'
            }
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
    },
    getEcharts2() {
      var myChart = this.$echarts.init(document.getElementById('echart2'))
      // 指定图表的配置项和数据
      var option = {
        color: ['#d2d17c', '#00b7ee', '#5578cf', '#5ebbeb', '#d16ad8', '#f8e19a', '#00b7ee', '#81dabe', '#5fc5ce'],
        backgroundColor: '',
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        grid: {
          left: 20,
          right: 20,
          top: 0,
          bottom: 20
        },
        legend: {
          top: 10,
          textStyle: {
            fontSize: 10,
            color: 'rgba(255,255,255,.7)'
          },
          data: datalist.dys.dysName
        },
        series: [
          {
            name: '周报警',
            type: 'pie',
            radius: '55%',
            center: ['50%', '55%'],
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
    },
    getEcharts3() { // 七日运行TOP5
      var myChart = this.$echarts.init(document.getElementById('echart3'))
      // 指定图表的配置项和数据
      var category = ['1#', '3#', '5#', '6#', '8#']
      var barData = [431, 581, 1218, 1310, 2142]

      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
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
          splitLine: { show: false },
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
                color: '#2f89cf',
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
    },
    getEcharts4() {
      var myChart = this.$echarts.init(document.getElementById('echart4'))
      var option = {
        //  backgroundColor: '#00265f',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
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
          data: ['1#', '2#', '3#', '4#', '5#', '6#', '7#', '8#', '2#', '3#', '4#', '5#', '6#', '7#', '8#', '2#', '3#', '4#', '5#', '6#', '7#', '8#', '2#', '3#', '4#', '5#', '6#', '7#', '1#', '2#', '3#', '4#', '5#', '6#', '7#', '8#', '2#', '3#', '4#', '5#', '6#', '7#', '8#', '2#', '3#', '4#', '5#', '6#', '7#'],
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
            type: 'bar',
            data: [200, 300, 300, 900, 1500, 1200, 600, 200, 300, 300, 900, 1500, 1200, 600, 200, 300, 300, 900, 1500, 1200, 600, 200, 300, 300, 900, 1500, 1200, 600, 200, 300, 300, 900, 1500, 1200, 600, 200, 300, 300, 900, 1500, 1200, 600, 200, 300, 300, 900, 1500, 1200, 600, 200, 300, 300, 900, 1500, 1200, 600, 200, 300, 300, 900, 1500, 1200, 600, 200, 300, 300, 900, 1500, 1200, 600],
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
    },
    getEcharts5() { //
      var myChart = this.$echarts.init(document.getElementById('echart5'))
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '',
          subtext: '',
          top: 10,
          left: 10
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0,0,0,0.2)'
        },
        visualMap: {
          show: false,
          top: 'middle',
          right: 10,
          color: ['red', 'yellow'],
          calculable: true
        },
        radar: {
          indicator: [
            { text: '子站1', max: 400 },
            { text: '子站2', max: 400 },
            { text: '子站3', max: 400 },
            { text: '子站4', max: 400 },
            { text: '子站5', max: 400 },
            { text: '子站6', max: 400 }
          ],
          name: {
            textStyle: {
              color: 'rgba(255, 255, 255, 0.6)' // 文字颜色
            }
          },
          splitArea: {
            show: false,
            areaStyle: {
              color: ['#d72941', '#f1c35b', '#99c736', '#75813b', '#4e3829']
              // 图表背景网格的颜色
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: ['rgba(255,255,255,0.6)']
              // 图表背景网格线的颜色
            }
          }
        },
        series: datalist.evaluateChart.data
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    getEcharts6() { // 风门开度
      var myChart = this.$echarts.init(document.getElementById('echart6'))
      // 指定图表的配置项和数据
      var option = {
        series: [{
          max: 200,
          type: 'gauge',
          startAngle: 90,
          endAngle: -270,
          pointer: {
            show: false
          },
          color: ['#19ca88', '#37d2d4', '#2e8cff'],
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
            lineStyle: {
              width: 40,
              color: [[1, 'rgba(0,0,0,0.2)']]
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
            value: 200,
            name: '报警总数',
            title: {
              color: ['#19ca88'],
              offsetCenter: ['0%', '12%']
            },
            detail: {
              offsetCenter: ['0%', '30%'],
              formatter: '{value}'
            }
          }, {
            value: 100,
            name: '修复率: 50' + '%' + ' \n ' + '修复总数',
            title: {
              color: ['#37d2d4'],
              offsetCenter: ['0%', '-35%']
            },
            detail: {
              offsetCenter: ['0%', '-12%'],
              // formatter: '{value}' + '修复率' + '(' + '{value}' + '%' + ')'
              formatter: '{value}'
            }
          }
            // ,
            // {
            //   value: 100,
            //   name: '修复率',
            //   title: {
            //     color: ['#2e8cff'],
            //     offsetCenter: ['0%', '26%']
            //   },
            //   detail: {
            //     offsetCenter: ['0%', '40%'],
            //     formatter: '50%'
            //   }
            // }
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
      myChart.setOption(option)
    },
    // ...mapMutations('user', [
    //   'SET_PAGEBOTTOMISSHOW'
    // ]),
    // changPageBottom(type) {
    //   if (type === 1) {
    //     this.SET_PAGEBOTTOMISSHOW(false)
    //   } else {
    //     this.SET_PAGEBOTTOMISSHOW(true)
    //   }
    // },
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
