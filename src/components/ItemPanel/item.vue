<template>
  <div>
    <el-dialog title="新增节点" :visible.sync="jurisdictionVisible" width="600px" :close-on-click-modal="false" append-to-body>
      <div class="menu-top-content">
        <el-form ref="formView" :model="formData" size="mini" label-width="100px" label-position="right" :rules="rules">
          <el-form-item label="节点名称：" prop="name">
            <el-input v-model="formData.name" size="mini" style="width: 360px;" />
          </el-form-item>
          <el-form-item label="节点类型：" prop="label">
            <el-select v-model="formData.label" placeholder="请选择" style="width: 360px;" @change="getNodeType">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="菜单标识:">
            <el-input v-model="formData.url" size="mini" style="width: 360px;" />
          </el-form-item> -->
          <el-form-item label="节点颜色:">
            <el-color-picker v-model="formData.color" />
          </el-form-item>
          <el-form-item v-if="inputIsShow" label="图标：">
            <el-input v-model="formData.stateImage" size="mini" style="width: 360px;" @focus="getIcons" @blur="loseIcons" />
          </el-form-item>
          <div style="height: 220px;">
            <transition name="el-zoom-in-center">
              <div v-if="iconsIsShow" class="icon-content">
                <div class="icon-center">
                  <el-scrollbar style="height:100%">
                    <div v-for="(item, index) in iconsList" :key="index" class="icon-icons" @click="handleClipboard(generateElementIconCode(item),$event)">
                      <!-- <i :class="'el-icon-' + item" /> -->
                      <!-- <span style="padding: 5px;display: inline-blok; width: 40px; height: 40px;"> -->
                      <img v-cloak :src="item" alt="" width="30" height="30">
                      <!-- </span> -->
                    </div>
                  </el-scrollbar>
                </div>
              </div>
            </transition>
          </div>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="submitBtn('formView')">确 认</el-button>&nbsp;
        <el-button size="mini" @click="jurisdictionVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- <div>
      <el-button icon="el-icon-plus" type="primary" size="mini" style="margin-left: 20px" @click="addNode">新增</el-button>
    </div> -->
    <div style="height: 100px; display: flex;">
      <div class="add-btn">
        <el-button icon="el-icon-plus" circle @click="addNode" />
      </div>
      <el-scrollbar style="height:100%;">
        <ul class="node-list">
          <li v-for="(item,index) in list" :key="index" class="getItem" :data-shape="item.shape" :data-type="item.type" :data-size="item.size" draggable @dragstart="handleDragstart" @dragend="handleDragEnd($event,item)">
            <span class="pannel-type-icon" :style="{background:'url('+item.image+')'}" />
            {{ item.name }}
          </li>
        </ul>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import eventBus from '@/utils/eventBus'
import icons from './icons.js'
export default {
  data() {
    return {
      iconsIsShow: false,
      inputIsShow: true,
      // elementIcons: [
      //   '/static/img/close.d18d59d7.svg'
      // ],
      iconsList: [],
      elementIcons: icons,
      options: [{
        value: '单输出节点',
        label: '单输出节点'
      }, {
        value: '双输出节点',
        label: '双输出节点'
      }, {
        value: '单输出大型节点',
        label: '单输出大型节点'
      }, {
        value: '双输出大型节点',
        label: '双输出大型节点'
      }],
      formData: {
        name: '',
        label: '',
        size: '170*34',
        type: 'node',
        x: 0,
        y: 0,
        shape: 'customNode',
        color: '#409EFF',
        // image: 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
        stateImage: '',
        inPoints: [[0, 0.5]],
        outPoints: [[1, 0.5]]
      },
      rules: {
        name: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        label: [
          { required: true, message: '必填', trigger: 'blur' }
        ]
      },
      jurisdictionVisible: false,
      page: null,
      command: null,
      offsetX: 0,
      offsetY: 0,
      list: [
        {
          name: '单输出节点',
          label: '单输出节点',
          size: '170*34',
          // type: 'node',
          type: 'begin',
          x: 0,
          y: 0,
          shape: 'customNode',
          color: 'aqua',
          // image: 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
          stateImage: icons.okSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]]
        },
        {
          name: '双输出节点',
          label: '双输出节点',
          size: '170*34',
          type: 'node',
          x: 0,
          y: 0,
          shape: 'customNode',
          color: '#1890ff',
          // image:'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
          stateImage: icons.closeSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.4], [1, 0.6]]
        },
        {
          name: '双输出节点',
          label: '双输出节点',
          size: '170*34',
          type: 'node',
          x: 0,
          y: 0,
          shape: 'customNode',
          color: '#1890ff',
          // image:'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
          stateImage: icons.closeSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.4], [1, 0.6]]
        },
        {
          name: '双输出节点',
          label: '双输出节点',
          size: '170*34',
          type: 'node',
          x: 0,
          y: 0,
          shape: 'customNode',
          color: '#1890ff',
          // image:'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
          stateImage: icons.closeSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.4], [1, 0.6]]
        },
        {
          name: '双输出节点',
          label: '双输出节点',
          size: '170*34',
          type: 'node',
          x: 0,
          y: 0,
          shape: 'customNode',
          color: '#1890ff',
          // image:'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
          stateImage: icons.closeSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.4], [1, 0.6]]
        },
        {
          name: '双输出节点',
          label: '双输出节点',
          size: '170*34',
          type: 'node',
          x: 0,
          y: 0,
          shape: 'customNode',
          color: '#1890ff',
          // image:'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
          stateImage: icons.closeSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.4], [1, 0.6]]
        },
        {
          name: '双输出节点',
          label: '双输出节点',
          size: '170*34',
          type: 'node',
          x: 0,
          y: 0,
          shape: 'customNode',
          color: '#1890ff',
          // image:'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
          stateImage: icons.closeSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.4], [1, 0.6]]
        },
        {
          name: '双输出节点',
          label: '双输出节点',
          size: '170*34',
          type: 'node',
          x: 0,
          y: 0,
          shape: 'customNode',
          color: '#1890ff',
          // image:'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
          stateImage: icons.closeSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.4], [1, 0.6]]
        },
        {
          name: '双输出节点',
          label: '双输出节点',
          size: '170*34',
          type: 'node',
          x: 0,
          y: 0,
          shape: 'customNode',
          color: '#1890ff',
          // image:'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
          stateImage: icons.closeSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.4], [1, 0.6]]
        },
        {
          name: '双输出节点',
          label: '双输出节点',
          size: '170*34',
          type: 'node',
          x: 0,
          y: 0,
          shape: 'customNode',
          color: '#1890ff',
          // image:'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
          stateImage: icons.closeSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.4], [1, 0.6]]
        },
        {
          name: '双输出节点',
          label: '双输出节点',
          size: '170*34',
          type: 'node',
          x: 0,
          y: 0,
          shape: 'customNode',
          color: '#1890ff',
          // image:'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
          stateImage: icons.closeSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.4], [1, 0.6]]
        },
        {
          name: '双输出节点',
          label: '双输出节点',
          size: '170*34',
          type: 'node',
          x: 0,
          y: 0,
          shape: 'customNode',
          color: '#1890ff',
          // image:'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
          stateImage: icons.closeSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.4], [1, 0.6]]
        },
        {
          name: '双输出节点',
          label: '双输出节点',
          size: '170*34',
          type: 'node',
          x: 0,
          y: 0,
          shape: 'customNode',
          color: '#1890ff',
          // image:'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
          stateImage: icons.closeSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.4], [1, 0.6]]
        },
        {
          name: '双输出节点',
          label: '双输出节点',
          size: '170*34',
          type: 'node',
          x: 0,
          y: 0,
          shape: 'customNode',
          color: '#1890ff',
          // image:'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
          stateImage: icons.closeSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.4], [1, 0.6]]
        },
        {
          name: '双输出节点',
          label: '双输出节点',
          size: '170*34',
          type: 'node',
          x: 0,
          y: 0,
          shape: 'customNode',
          color: '#1890ff',
          // image:'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
          stateImage: icons.closeSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.4], [1, 0.6]]
        },
        {
          name: '双输出节点',
          label: '双输出节点',
          size: '170*34',
          type: 'node',
          x: 0,
          y: 0,
          shape: 'customNode',
          color: '#1890ff',
          // image:'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
          stateImage: icons.closeSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.4], [1, 0.6]]
        },
        {
          name: '双输出节点',
          label: '双输出节点',
          size: '170*34',
          type: 'node',
          x: 0,
          y: 0,
          shape: 'customNode',
          color: '#1890ff',
          // image:'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
          stateImage: icons.closeSvg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.4], [1, 0.6]]
        }
      ]
    }
  },
  created() {
    this.bindEvent()
    this.getIconsList()
  },
  methods: {
    getIconsList() {
      const iconsList = []
      console.log(this.elementIcons)
      for (var item in this.elementIcons) {
        console.log(this.elementIcons[item])
        iconsList.push(this.elementIcons[item])
      }
      this.iconsList = iconsList
      console.log(this.iconsList)
    },
    generateElementIconCode(symbol) {
      console.log(symbol)
      const img = symbol.split('.')
      const name = img[0].split('/')
      console.log(icons.closeSvg)
      return symbol
      // return `${'../../assets/icons/' + name[3] + '.' + img[2]}`
    },
    getIcons() {
      this.iconsIsShow = true
    },
    loseIcons() {
      setTimeout(() => {
        this.iconsIsShow = false
      }, 200)
    },
    handleClipboard(text, event) {
      this.formData.stateImage = text
    },
    getNodeType(type) {
      console.log(type)
      if (type === '单输出节点') {
        this.formData.size = '170*34'
        this.formData.outPoints = [[1, 0.5]]
      } else if (type === '双输出节点') {
        this.formData.size = '170*34'
        this.formData.outPoints = [[1, 0.4], [1, 0.6]]
      } else if (type === '单输出大型节点') {
        this.formData.size = '340*34'
        this.formData.outPoints = [[1, 0.5]]
      } else if (type === '双输出大型节点') {
        this.formData.size = '340*34'
        this.formData.outPoints = [[1, 0.4], [1, 0.6]]
        console.log(this.formData.outPoints)
      }
    },
    addNode() {
      this.jurisdictionVisible = true
    },
    submitBtn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.formData.label = this.formData.name
          this.list.push(this.formData)
          console.log(this.formData)
          this.formData = {
            name: '',
            label: '',
            size: '170*34',
            type: 'node',
            x: 0,
            y: 0,
            shape: 'customNode',
            color: '#409EFF',
            // image: 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
            stateImage: '',
            inPoints: [[0, 0.5]],
            outPoints: [[1, 0.5]]
          }
          this.jurisdictionVisible = false
        } else {
          return false
        }
      })
    },
    handleDragstart(e) { // 鼠标开始拖动事件
      this.offsetX = e.offsetX
      this.offsetY = e.offsetY
    },
    handleDragEnd(e, item) { // 鼠标结束拖动事件
      const data = {}
      Object.assign(data, item)
      data.offsetX = this.offsetX
      data.offsetY = this.offsetY
      if (this.page) {
        const graph = this.page.graph
        // const size = e.target.dataset.size.split('*')
        const xy = graph.getPointByClient(e.x, e.y)
        data.x = xy.x
        data.y = xy.y
        data.size = item.size.split('*')
        data.type = 'node'
        this.command.executeCommand('add', [data])
      }
    },
    bindEvent() {
      eventBus.$on('afterAddPage', page => {
        this.page = page
        this.command = page.command
      })
    }
  }
}
</script>

<style scoped>
.add-btn {
  padding: 0 25px;
  height: 100px;
  display: flex;
  align-items: center;
  border-right: 1px solid #dfe6ec;
}
.node-list {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
}
.itempannel {
  height: 100%;
  position: absolute;
  left: 0px;
  z-index: 2;
  background: #f7f9fb;
  width: 200px;
  padding-top: 8px;
  border-right: 1px solid #e6e9ed;
}
.itempannel ul {
  padding: 0px;
  padding-left: 16px;
}
.itempannel li {
  color: rgba(0, 0, 0, 0.65);
  border-radius: 4px;
  width: 160px;
  height: 28px;
  line-height: 26px;
  padding-left: 8px;
  border: 1px solid rgba(0, 0, 0, 0);
  list-style-type: none;
}
.itempannel li:hover {
  background: white;
  border: 1px solid #ced4d9;
  cursor: move;
}

.itempannel .pannel-type-icon {
  width: 16px;
  height: 16px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 8px;
}
</style>
<style>
.menu-top-content {
  display: flex;
  justify-content: center;
}

.el-dialog__header {
  background: #f8f8f8;
  border-bottom: 1px solid #ebeef5;
}
.el-dialog__footer {
  padding: 15px 10px 15px;
  border-top: 1px solid #c7c7c7;
  background: #f0f4f7;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.icon-content {
  height: 220px;
}
.icon-content .icon-center {
  padding-right: 2px;
  margin-left: 92px;
  overflow-x: auto;
  width: 368px;
  height: 210px;
  box-sizing: border-box;
}
.icon-content .icon-center .icon-icons {
  padding-top: 5px;
  display: inline-block;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  box-sizing: border-box;
}
.icon-content .icon-center .icon-icons:hover {
  background: rgba(0, 0, 0, 0.22);
}
.icon-content .icon-center .icon-icons:hover i {
  color: #fff;
}
</style>
