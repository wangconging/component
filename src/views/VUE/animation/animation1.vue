<template>
  <div id="demo">
    <animation :show="show" />
    <button @click="show = !show">
      Toggle
    </button>
  </div>
</template>

<script>
import animation from '@/components/animation'
export default {
  components: {
    animation
  },
  data() {
    return {
      show: false
    }
  }
}
</script>

<style >
.content {
  width: 500px;
  height: 100px;
  line-height: 100px;
  background: coral;
  margin: 0 auto;
  color: #fff;
  font-size: 20px;
  text-align: center;
}
/* 动画相关样式 */
/* 入场之前状态 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
