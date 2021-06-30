<template>
  <!-- 子组件 -->
  <div>
    <button type="success" @click="byValueToChildrenTwoPage">子传子</button>
    <div>
      bus传来的值: {{ value }}
    </div>
    <div class="children-content">
      <h3>
        我是子组件
      </h3>
      <div class="children-title">
        父组件传来的值: {{ parentpagevalue }}
      </div>
      <div>
        <el-button plain @click="sendValueToParend">Send</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    parentpagevalue: { // 父组件传来的值
      type: String,
      default: ''
    }
  },
  data() {
    return {
      value: '',
      message: '我是来自子组件的消息'
    }
  },
  mounted() {
    this.$bus.on('parameterName', (value) => {
      this.value = value
    })
  },
  methods: {
    byValueToChildrenTwoPage() {
      this.$bus.emit('parameter', 123)
      console.log(123)
    },
    sendValueToParend() {
      this.$emit('childFn', this.message)
    }
  }
}
</script>

<style>
.children-content {
  width: 300px;
  height: 150px;
  margin: 0 auto;
  margin-top: 100px;
  padding: 20px;
  border: 1px solid lightblue;
}
.children-title {
  height: 60px;
  line-height: 60px;
}
</style>
