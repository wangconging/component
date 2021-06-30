<template>
  <div style="margin-bottom: 20px;">
    <div v-show="isShow" class="code-isShow" @click="codeIsShow">显示代码</div>
    <div v-show="!isShow" class="code-content">
      <el-collapse-transition>
        <div v-show="!isShow">
          <pre v-highlight><code style="background: rgb(247, 247, 247); padding-left: 20px;">{{ code1 }}</code></pre>
        </div>
      </el-collapse-transition>
      <el-collapse-transition>
        <div v-show="!isShow">
          <pre v-highlight><code style="background: rgb(247, 247, 247); padding-left: 20px;">{{ code2 }}</code></pre>
        </div>
      </el-collapse-transition>
      <el-collapse-transition>
        <div v-show="!isShow">
          <pre v-highlight><code style="background: rgb(247, 247, 247); padding-left: 20px;">{{ code3 }}</code></pre>
        </div>
      </el-collapse-transition>
    </div>
    <div v-show="!isShow" class="code-isHide" @click="codeIsShow">隐藏代码</div>
  </div>
</template>

<script>
export default {
  props: {
    code1: {
      type: String,
      default: ''
    },
    code2: {
      type: String,
      default: ''
    },
    code3: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isShow: true
    }
  },
  methods: {
    codeIsShow() {
      this.isShow = !this.isShow
    }
  }
}
</script>

<style>
div,
pre,
code {
  margin: 0;
  padding: 0;
}
.code-content {
  margin-top: 20px;
  margin-left: 1%;
  width: 98%;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.code-isShow {
  margin-top: 20px;
  margin-left: 1%;
  width: 98%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: #409eff;
  cursor: pointer;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background: #fff;
}
.code-isHide {
  margin-left: 1%;
  width: 98%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: #409eff;
  cursor: pointer;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background: #fff;
}
</style>
