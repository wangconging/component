<template>
  <div>
    <transition name="fade">
      <p v-if="show" class="content">hello</p>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
  },
  methods: {
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
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* 过度定义 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s;
}
</style>
