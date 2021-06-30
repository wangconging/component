<template>
  <div>
    <div id="main" style="width:1200px;height:400px;" />
    <div id="mainOne" style="width: 1200px;height:400px;" />
    <div id="mainTwo" style="width: 1200px;height:400px;" />
    <div id="container" />
  </div>
</template>

<script>
import * as echarts from 'echarts'
import G6 from '@antv/g6/build/g6'
export default {
  data() {
    return {
    }
  },
  created() { },
  mounted() {
    this.getEchartsTwo()
    // this.getTreeEchart()
    // this.getEchart()
    setInterval(() => {
      // this.getEchart()
    }, 10000)

    // this.getEchart1()
  },
  methods: {
    getEchartsTwo() {
      var x = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      var y = [0, 50, 100, 150, 200, 150, 100]
      var series = [{
        name: '总量',
        type: 'line',
        label: {
          normal: {
            show: true,
            position: 'top',
            formatter: (params) => {
              console.log(123)
              if (y.length - 1 === params.dataIndex) {
                return params.value
              } else if (y.length - 2 === params.dataIndex) {
                return params.value
              } else {
                return ''
              }
            }
          }
        },
        data: y
      }]
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
          formatter: '{a0}:{c0}g'
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          data: x
        }],
        yAxis: [{
          type: 'value'
        }],
        series: series
      }
      var effectScatterData = [0, 50, 100, 150, 200, { value: 150, symbolSize: 10 }, 100]
      var effectScatter = {
        type: 'effectScatter',
        coordinateSystem: 'cartesian2d',
        data: effectScatterData, // 2d坐标系
        symbolSize: 0,
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke'
        },
        hoverAnimation: true,
        itemStyle: {
          normal: {
            color: 'red',
            shadowBlur: 10,
            shadowColor: '#333'
          }
        },
        zlevel: 1
      }
      option.series.push(effectScatter)
      var myChart = echarts.init(document.getElementById('main'))
      myChart.setOption(option)
    },
    getEchart() {
      var x = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      var series = [{
        name: '总量',
        type: 'line',
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        },
        data: [0, 50, 100, 150, 200, 150, 100]
      }]
      var option = {
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          data: x
        }],
        yAxis: [{
          type: 'value'
        }],
        series: series
      }
      var effectScatterData = [0, 50, 100, 150, 200, { value: 150, symbolSize: 10 }, 100]
      var effectScatter = {
        type: 'effectScatter',
        coordinateSystem: 'cartesian2d',
        data: effectScatterData, // 2d坐标系
        symbolSize: 0,
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke'
        },
        hoverAnimation: true,
        itemStyle: {
          normal: {
            color: 'red',
            shadowBlur: 10,
            shadowColor: '#333'
          }
        },
        zlevel: 1
      }
      option.series.push(effectScatter)
      var myChart = echarts.init(document.getElementById('main'))
      myChart.setOption(option)
    },
    getEchartTest() {
      // 基于准备好的dom，初始化echarts实例
      var totalFlowRate = echarts.init(document.getElementById('main'))
      document.getElementById('main').setAttribute('_echarts_instance_', '')
      totalFlowRate.clear()
      var xAxisData = ['2021/3/15 0:00:01', '2021/3/15 0:00:02', '2021/3/15 0:00:03', '2021/3/15 0:00:04', '2021/3/15 0:00:05', '2021/3/15 0:00:06', '2021/3/15 0:00:07', '2021/3/15 0:00:08', '2021/3/15 0:00:09', '2021/3/15 0:00:10', '2021/3/15 0:00:11', '2021/3/15 0:00:12', '2021/3/15 0:00:13', '2021/3/15 0:00:14', '2021/3/15 0:00:15', '2021/3/15 0:00:16', '2021/3/15 0:00:17', '2021/3/15 0:00:18', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01', '2021/3/15 0:00:01']
      var yAxisData = []
      // for (var i = 10; i > 0; i--) {
      //   xAxisData.unshift(i)
      // }
      // for (i = 1; i < 61; i++) {
      //   yAxisData.unshift(null)
      // }
      console.log('xAxisData')
      console.log(xAxisData)
      console.log('yAxisData')
      console.log(yAxisData)
      var totalFlowRateOption = {
        animation: false,
        title: {
          text: '总流量（kbps）' /* ,left:"110px" */
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'cross' }
        },
        grid: {
          left: 50, /* "50px" */
          right: 15 /* "15px" */
        },
        legend: {
          data: ['当前流量']
        },
        xAxis: {
          boundaryGap: false,
          data: xAxisData
        },
        yAxis: {
          boundaryGap: false,
          max: 1000,
          min: 0
        },
        series: {
          // symbol: 'none', /* 去掉小圆点 */
          name: '当前流量',
          type: 'scatter',
          data: yAxisData
          /*, smooth:true//显示为平滑的曲线*/
        }
      }

      totalFlowRate.setOption(totalFlowRateOption)

      setInterval(() => {
        yAxisData.push(Math.round(Math.random() * 1000))
        if (yAxisData.length > 60) {
          xAxisData = []
          yAxisData = []
          this.getEchart()
          // this.getEchart()
          // totalFlowRate.resize()
          // yAxisData = []
        }
        totalFlowRate.setOption(totalFlowRateOption, true, true)
      }, 1000)
    },
    getTreeEchart() {
      G6.registerNode('card-node', {
        draw: function drawShape(cfg, group) {
          const r = 2
          const color = '#5B8FF9'
          const w = cfg.size[0]
          const h = cfg.size[1]
          const shape = group.addShape('rect', {
            attrs: {
              x: -w / 2,
              y: -h / 2,
              width: w, // 200,
              height: h, // 60
              stroke: color,
              radius: r,
              fill: '#fff' // 背景颜色
            },
            name: 'main-box',
            draggable: true
          })

          group.addShape('rect', {
            attrs: {
              x: -w / 2,
              y: -h / 2,
              width: w, // 200,
              height: h / 2, // 60
              fill: color,
              radius: [r, r, 0, 0]
            },
            name: 'title-box',
            draggable: true
          })
          graph.node(node => {
            console.log(node)
            if (node.flag === 1) {
              return {
                style: {
                  fill: '#fff',
                  stroke: '#ea7171'
                }
              }
            }
            return {
              style: {
                fill: '#2db7f5',
                stroke: '#ea7171'
              }
            }
          })

          // title text
          group.addShape('text', {
            attrs: {
              textBaseline: 'top',
              x: -w / 2 + 8,
              y: -h / 2 + 2,
              lineHeight: 20,
              text: cfg.name,
              fill: '#fff' // 上方文字颜色
            },
            name: 'title'
          })
          cfg.children &&
            group.addShape('marker', {
              attrs: {
                x: w / 2,
                y: 0,
                r: 6,
                cursor: 'pointer',
                symbol: G6.Marker.collapse,
                stroke: '#666', // 连接点颜色
                lineWidth: 1,
                fill: '#fff' // 连接点背景
              },
              name: 'collapse-icon'
            })
          group.addShape('text', {
            attrs: {
              textBaseline: 'top',
              x: -w / 2 + 8,
              y: -h / 2 + 24,
              lineHeight: 20,
              text: cfg.name,
              fill: 'rgba(0,0,0, 1)'
            },
            name: `description`
          })
          return shape
        },
        setState(name, value, item) {
          if (name === 'collapsed') {
            const marker = item.get('group').find((ele) => ele.get('name') === 'collapse-icon')
            const icon = value ? G6.Marker.expand : G6.Marker.collapse
            marker.attr('symbol', icon)
          }
        }
      })

      const data = {
        id: 'A',
        name: '工厂',
        children: [
          {
            id: 'A1',
            name: '车间',
            children: [{ id: 'A11', name: '产线' }, { id: 'A12', name: '产线1' }, { id: 'A13', name: '产线2' }, { id: 'A14', name: '产线3' }]
          },
          {
            id: 'A2',
            name: '车间2',
            children: [
              {
                id: 'A21',
                name: '产线4',
                children: [{
                  name: '设备1',
                  id: 'A211',
                  children: [
                    { id: 'A233', name: '张力器1', flag: 1 },
                    { id: 'A234', name: '张力器2', flag: 1 }
                  ]
                }, {
                  name: '设备2',
                  id: 'A212'
                }
                ]
              },
              {
                name: '产线5',
                id: 'A22'
              }
            ]
          }
        ]
      }

      const container = document.getElementById('container')
      const width = container.scrollWidth
      const height = container.scrollHeight || 500

      const graph = new G6.TreeGraph({
        container: 'container',
        width,
        height,
        modes: {
          default: ['drag-canvas']
        },
        defaultNode: {
          type: 'card-node',
          size: [100, 40]
        },
        defaultEdge: {
          type: 'cubic-horizontal',
          style: {
            endArrow: true
          }
        },
        layout: {
          type: 'indented',
          direction: 'LR',
          dropCap: false,
          indent: 200,
          getHeight: () => {
            return 60
          }
        }
      })

      graph.data(data)
      graph.render()
      graph.fitView()
      graph.on('node:click', (e) => {
        if (e.target.get('name') === 'collapse-icon') {
          e.item.getModel().collapsed = !e.item.getModel().collapsed
          graph.setItemState(e.item, 'collapsed', e.item.getModel().collapsed)
          graph.layout()
        }
      })

      if (typeof window !== 'undefined') {
        window.onresize = () => {
          if (!graph || graph.get('destroyed')) return
          if (!container || !container.scrollWidth || !container.scrollHeight) return
          graph.changeSize(container.scrollWidth, container.scrollHeight)
        }
      }
    },
    getEchart1() {
      // 基于准备好的dom，初始化echarts实例
      var totalFlowRate = echarts.init(document.getElementById('mainOne'))
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
          text: '总流量（kbps）' /* ,left:"110px" */
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'cross' }
        },
        grid: {
          left: 50, /* "50px" */
          right: 15 /* "15px" */
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
          symbol: 'none', /* 去掉小圆点 */
          name: '当前流量',
          type: 'line',
          data: yAxisData
          /*, smooth:true//显示为平滑的曲线*/
        }
      }

      totalFlowRate.setOption(totalFlowRateOption)

      setInterval(() => {
        yAxisData.push(Math.round(Math.random() * 1000))
        if (yAxisData.length > 500) {
          yAxisData.shift()
        }
        totalFlowRate.setOption(totalFlowRateOption)
      }, 100)
    }
  }
}
</script>

<style>
</style>
