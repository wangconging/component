<template>
  <div>
    <div class="box">
      <div class="box-text">日期</div>
      <el-time-select v-model="value" :picker-options="{start: '08:30', step: '00:15',end: '18:30'}" placeholder="选择时间" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: ''
    }
  },
  mounted() {

  },
  methods() { }
}
</script>

<style>
.el-input__inner {
  border-left-style: none !important;
  border-radius: 0 5px 5px 0 !important;
}
.box {
  display: flex;
  margin-top: 100px;
  margin-left: 100px;
}
.box-text{
  width: 80px;
  text-align: center;
  height: 36px;
  line-height: 36px;
  border: 1px solid #dbdee5;
   border-radius:  5px 0 0 5px !important;
}
</style>
