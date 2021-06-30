<template>
  <div class="page">
    <div :id="pageId" class="graph-container" style="position: relative;" />
  </div>
</template>

<script>
import G6 from '@antv/g6/build/g6'
import { initBehavors } from '@/behavior'
export default {
  props: {
    height: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    },
    data: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      pageId: 'mountNode',
      graph: null
    }
  },
  created() {
    // initBehavors()
  },
  mounted() {
    this.initG6()
  },
  methods: {
    initG6() {
      const data = {
        // 点集
        nodes: [{
          'name': '测试节点',
          'label': '测试节点',
          'size': ['170', '34'],
          'type': 'node',
          'x': 287,
          'y': 119,
          'shape': 'customNode',
          'color': '#1890ff',
          'image': 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
          'stateImage': '/static/img/ok.463ab0e4.svg',
          'inPoints': [
            [0, 0.5]
          ],
          'outPoints': [
            [1, 0.5]
          ],
          'offsetX': 102,
          'offsetY': 18,
          'id': 'node2'
        }, {
          'name': '测试节点',
          'label': '测试节点',
          'size': ['170', '34'],
          'type': 'node',
          'x': 465,
          'y': 313,
          'shape': 'customNode',
          'color': '#1890ff',
          'image': 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
          'stateImage': '/static/img/ok.463ab0e4.svg',
          'inPoints': [
            [0, 0.5]
          ],
          'outPoints': [
            [1, 0.5]
          ],
          'offsetX': 109,
          'offsetY': 12,
          'id': 'node9'
        }],
        // 边集
        edges: [{
          'id': 'edge76',
          'source': 'node2',
          'target': 'node9',
          'sourceId': 'node2',
          'targetId': 'node9',
          'start': {
            'x': 0,
            'y': 17
          },
          'end': {
            'x': 0,
            'y': -17
          },
          'shape': 'customEdge',
          'type': 'edge',
          'startPoint': {
            'x': 303.05670103092785,
            'y': 136.5
          },
          'endPoint': {
            'x': 448.94329896907215,
            'y': 295.5
          }
        }]
      }
      const nodes = data.nodes
      this.nodeEach(nodes)
      const graph = new G6.Graph({
        // 1.画图挂载容器id
        container: 'mountNode',
        // 1.1容器宽高
        width: 800,
        height: 600,
        fitView: true,
        fitViewPadding: [20, 40, 50, 20],
        // 节点在默认状态下的样式配置（style）和其他配置
        defaultNode: {
          // 节点上的标签文本配置
          labelCfg: {
            // 节点上的标签文本样式配置
            style: {
              fill: '#000', // 节点标签文字颜色
              fontSize: 11
            }
          }
        },
        // 边默认的属性，包括边的一般属性和样式属性（style）。
        defaultEdge: {
          shape: 'line',
          color: '#000',
          endArrow: true,
          startArrow: true,
          labelCfg: {
            autoRotate: true
          },
          style: {// 箭头
            endArrow: {
              path: 'M 4,0 L -4,-4 L -4,4 Z',
              d: 4
            }
          }
        }
      })
      // 读取 data 中的数据源到图上
      graph.data(data)
      // 渲染图
      graph.render()
      fitView: true // 设置是否将图适配到画布中；
      // fitViewPadding: [20, 40, 50, 20]//画布上四周的留白宽度。
    },
    // 节点遍历，确定图形
    nodeEach(nodes) {
      nodes.forEach(node => {
        if (!node.style) {
          node.style = {}
        }
        switch (node.class) { // 根据节点数据中的 class 属性配置图形
          case 'c0': {
            node.shape = 'circle'
            node.size = 40 // class = 'c0' 时节点图形为 circle
            break
          }
          case 'c1': {
            node.shape = 'rect' // class = 'c1' 时节点图形为 rect
            node.size = [80, 40] // class = 'c1' 时节点大小
            node.style = {
              stroke: '#00CC00',
              fill: '#00CC00',
              radius: 45
            }
            break
          }
          case 'c2': {
            node.shape = 'ellipse'   // class = 'c1' 时节点图形为 ellipse
            node.size = [80, 40]   // class = 'c2' 时节点大小
            break
          }
          case 'c3': {
            node.shape = 'diamond'   // class = 'c1' 时节点图形为 ellipse
            node.size = [60, 60]   // class = 'c2' 时节点大小
            break
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.page {
  margin-left: 200px;
  margin-right: 200px;
}
</style>
