<template>
  <div class="homePage-title" :style="windowHeight">
    <div>欢迎</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      windowHeight: {
        height: ''
      }
    }
  },
  mounted() {
    this.getWindowHeight()
  },
  methods: {
    // 设置页面高度
    getWindowHeight() {
      this.windowHeight.height = window.innerHeight - 132 + 'px'
    }

  }
}
</script>
<style>
.homePage-title {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 66px;
  font-weight: 700;
  color: #409Eff;
  background: #EEEFF1;
}
.el-scrollbar__wrap{
  overflow-x: hidden;
}
</style>
