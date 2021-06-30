<template>
  <div id="editor">
    <codeShow :code1="code1" :code2="code2" />
    <codeShow :code1="code1" />
  </div>
</template>

<script>
import codeShow from '@/components/myComponents/codeShow/codeShow'

export default {
  components: {
    codeShow
  },
  data() {
    return {
      code2: `<template>
  <div id="editor">
    <codeShow :code="code" :code1="code1" />
    <codeShow :code="code" />
  </div>
</template>`,
      code1: `  
<style>
  div,
  pre,
  code {
    margin: 0;
    padding: 0;
  }
  .code-content {
    margin-top: 20px;
    margin-left: 2%;
    width: 96%;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  .code-isShow {
    margin-top: 20px;
    margin-left: 2%;
    width: 96%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    color: #409eff;
    cursor: pointer;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .code-isHide {
    margin-left: 2%;
    width: 96%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    color: #409eff;
    cursor: pointer;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
</style>`
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>
