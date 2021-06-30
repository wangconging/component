<template>
  <!-- 父组件 -->
  <div>
    <div style="border: 1px solid red" @click="byValue">父组件传值BUS</div>
    <div>
      <!-- 给子组件传值 :parentpagevalue="parentPageValue" -->
      <childrenPage :parentpagevalue="parentPageValue" @childFn="parentFn" />
      <childrenTwo />
    </div>
    <div class="parent-text">
      子组件传来的值:{{ message }}
    </div>
  </div>
</template>

<script>
import childrenPage from './components/childrenPage.vue'
import childrenTwo from './components/childrenTwo'
export default {
  components: { childrenPage, childrenTwo },
  data() {
    return {
      parentPageValue: '我是来自父组件的消息',
      message: ''
    }
  },
  mounted() {
    console.log(this.$parent)
  },
  methods: {
    parentFn(payload) {
      this.message = payload
    },
    byValue() {
      this.$bus.emit('parameterName', 123)
      console.log(123)
    }
  }
}
</script>

<style>
.parent-text {
  margin: 0 auto;
  margin-top: 15px;
  width: 300px;
  height: 150px;
  line-height: 150px;
  text-align: center;
  border: 1px solid lightblue;
}
</style>
