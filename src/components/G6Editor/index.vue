<template>
  <div id="mountNode" :style="{width:width}">
    <div class="editor">
      <div class="header-content">
        <div style="width: 100%;">
          <item-panel />
        </div>
        <div style="width: 580px;">
          <toolbar />
        </div>
      </div>
      <div class="bottom-container">
        <div class="split-pane-wrapper" ref="outer">
          <div class="pane pane-left" :style="{ width: leftOffsetPercent, paddingRight: `${this.triggerWidth / 2}px` }">
            <FlowList />
          </div>
          <div class="pane-trigger-con" @mousedown="handleMousedown" :style="{ left: triggerLeft, width: `${triggerWidth}px` }"></div>
          <div class="pane pane-right" :style="{ left: leftOffsetPercent, paddingLeft: `${this.triggerWidth / 2}px` }">
            <detail-panel />
            <minimap />
            <page :height="height" :width="width" :data="data" />
          </div>
        </div>

      </div>
    </div>
    <Flow />
  </div>
</template>

<script>
import Toolbar from '../Toolbar'
import ItemPanel from '../ItemPanel'
import DetailPanel from '../DetailPanel'
import Minimap from '../Minimap'
import Page from '../Page'
import Flow from '../Flow'
import FlowList from '../flowList'
import ContextMenu from '../ContextMenu'
import Editor from '@/components/Base/Editor'
import command from '@/command'
export default {
  name: 'G6Editor',
  components: {
    Toolbar,
    ItemPanel,
    DetailPanel,
    Minimap,
    Page,
    ContextMenu,
    FlowList,
    Flow
  },
  props: {
    height: {
      type: Number,
      default: document.documentElement.clientHeight
    },
    width: {
      type: Number,
      default: document.documentElement.clientWidth
    },
    triggerWidth: {
      type: Number,
      default: 8
    },
    min: {
      type: Number,
      default: 0.12
    },
    max: {
      type: Number,
      default: 0.8
    }
    // ,
    // data: {
    //   type: Object,
    //   default: () => { }
    // }
  },
  created() {
    this.init()
  },
  data() {
    return {
      value: 0.12,
      canMove: false,
      initOffset: 0,
      data: {},
      editor: {},
      command: null
    }
  },
  computed: {
    leftOffsetPercent() {
      return `${this.value * 100}%`
    },
    triggerLeft() {
      return `calc(${this.value * 100}% - ${this.triggerWidth / 2}px)`
    }
  },
  methods: {
    handleClick() {
      this.leftOffset -= 0.02
    },
    handleMousedown(event) {
      document.addEventListener('mousemove', this.handleMousemove)
      document.addEventListener('mouseup', this.handleMouseup)
      this.initOffset = event.pageX - event.srcElement.getBoundingClientRect().left
      this.canMove = true
    },
    handleMousemove(event) {
      if (!this.canMove) return
      const outerRect = this.$refs.outer.getBoundingClientRect()
      let offsetPercent = (event.pageX - this.initOffset + this.triggerWidth / 2 - outerRect.left) / outerRect.width
      if (offsetPercent < this.min) offsetPercent = this.min
      if (offsetPercent > this.max) offsetPercent = this.max
      this.value = offsetPercent
      // this.$emit('input', offsetPercent)
      // this.$emit('update:value', offsetPercent)
    },
    handleMouseup() {
      this.canMove = false
    },
    init() {
      this.data = {
        "nodes": [{
          "name": "测试节点",
          "label": "测试节点",
          "size": ["170", "34"],
          "type": "node",
          "x": 274,
          "y": 141,
          "shape": "customNode",
          "color": "#1890ff",
          // "image": "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",
          "stateImage": "/static/img/ok.463ab0e4.svg",
          "inPoints": [
            [0, 0.5]
          ],
          "outPoints": [
            [1, 0.5]
          ],
          "offsetX": 47,
          "offsetY": 14,
          "id": "node2"
        }, {
          "name": "测试节点",
          "label": "测试节点",
          "size": ["170", "34"],
          "type": "node",
          "x": 294,
          "y": 281,
          "shape": "customNode",
          "color": "#1890ff",
          // "image": "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",
          "stateImage": "/static/img/ok.463ab0e4.svg",
          "inPoints": [
            [0, 0.5]
          ],
          "outPoints": [
            [1, 0.5]
          ],
          "offsetX": 65,
          "offsetY": 12,
          "id": "node16"
        }, {
          "name": "测试节点",
          "label": "测试节点",
          "size": ["170", "34"],
          "type": "node",
          "x": 567,
          "y": 212,
          "shape": "customNode",
          "color": "#1890ff",
          // "image": "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",
          "stateImage": "/static/img/ok.463ab0e4.svg",
          "inPoints": [
            [0, 0.5]
          ],
          "outPoints": [
            [1, 0.5]
          ],
          "offsetX": 106,
          "offsetY": 16,
          "id": "node78"
        }],
        "edges": [{
          "id": "edge76",
          "source": "node2",
          "target": "node16",
          "sourceId": "node2",
          "targetId": "node16",
          "start": {
            "x": 0,
            "y": 17
          },
          "end": {
            "x": 0,
            "y": -17
          },
          "shape": "customEdge",
          "type": "edge",
          "startPoint": {
            "x": 276.5,
            "y": 158.5
          },
          "endPoint": {
            "x": 291.5,
            "y": 263.5
          }
        }, {
          "id": "edge128",
          "source": "node2",
          "target": "node78",
          "sourceId": "node2",
          "targetId": "node78",
          "start": {
            "x": 0,
            "y": 17
          },
          "end": {
            "x": 0,
            "y": -17
          },
          "shape": "customEdge",
          "type": "edge",
          "startPoint": {
            "x": 346.21830985915494,
            "y": 158.5
          },
          "endPoint": {
            "x": 494.78169014084506,
            "y": 194.5
          }
        }]
      }
      this.editor = new Editor()
      this.command = new command(this.editor)
    }
  }
}
</script>

<style scoped>
.header-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid #dfe6ec;
}
.editor {
  position: relative;
  width: 100%;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
.bottom-container {
  position: relative;
}
.split-pane-wrapper {
  height: 700px;
  width: 100%;
  position: relative;
}
.pane {
  position: absolute;
  top: 0;
  height: 700px;
}
.pane-trigger-con {
  height: 700px;
  background: #dfe6ec;
  position: absolute;
  top: 0;
  z-index: 100;
  user-select: none;
  cursor: col-resize;
}
.pane-left {
  /* background: palevioletred; */
}
.pane-right {
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 99;
}
</style>
