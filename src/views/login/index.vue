<template>
  <div class="satic-area">
    <div class="login-container" :style="windowHeight">
      <el-form ref="loginForm" :model="loginForm" class="login-form" autocomplete="on" label-position="left">
        <div class="title-container">
          <h3 class="title">组 件</h3>
        </div>
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input ref="username" v-model="loginForm.username" style="z-index: 9999;" placeholder="账号" name="username" type="text" tabindex="1" autocomplete="on" />
        </el-form-item>
        <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input :key="passwordType" ref="password" v-model="loginForm.password" style="z-index: 9999;" :type="passwordType" placeholder="密码" name="password" tabindex="2" autocomplete="on" @keyup.native="checkCapslock" @blur="capsTooltip = false" @keyup.enter.native="handleLogin" />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
        </el-tooltip>
        <el-button :loading="loading" type="primary" style="z-index: 9999;width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登 录</el-button>
      </el-form>
    </div>
    <div class="dynamic-area1" />
    <div class="dynamic-area2" />
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      windowHeight: {
        paddingTop: ''
      },
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      margin_top: {
        marginTop: ''
      }
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    this.getWindowHeight()
    this.getMarginTop()
  },
  mounted() {
    const $this = this
    window.onresize = () => {
      $this.getWindowHeight()
    }
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {
    getWindowHeight() {
      this.windowHeight.paddingTop = (window.innerHeight - 400) / 2 + 'px'
      console.log((window.innerHeight - 400) / 2)
    },
    getMarginTop() {
      this.margin_top.marginTop = (window.innerHeight - 350) / 2 + 'px'
    },
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>
<style>
.test {
  z-index: 999999;
  transform: translateZ(100);
  background: red;
  pointer-events: none;
}
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.satic-area {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../../assets/images/poster-about.jpg) no-repeat center;
  background-size: cover;
  transform-style: preserve-3d;
}

.dynamic-area1 {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: url(../../assets/images/poster-drop-animate2.png) repeat-x 0px 0px;
  background-size: cover;
  animation: posterDrop1 6000s linear infinite;
  pointer-events: none;
  transform: translateZ(1);
}

@keyframes posterDrop1 {
  from {
    background-position: 0 0;
  }

  to {
    background-position: 4000% 0;
  }
}

.dynamic-area2 {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: url(../../assets/images/poster-drop-animate1.png) repeat-x 0px 0px;
  background-size: cover;
  animation: posterDrop2 8000s linear infinite;
  pointer-events: none;
  transform: translateZ(1);
}

@keyframes posterDrop2 {
  from {
    background-position: 0 0;
  }

  to {
    background-position: 30000% 0;
  }
}
</style>
<style lang="scss">
/* 修复input 背景不协调 和光标变色 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #454545;
      height: 47px;
      caret-color: #454545;

      &:-webkit-autofill {
        // box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $bg !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgb(232, 240, 254);
    border-radius: 5px;
    color: #454545;
  }
}
</style>
<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  transform: translateZ(1000);
  // padding-top: 260px;
  z-index: 9999;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  // background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    height: 400px;
    max-width: 100%;
    padding: 90px 30px 0 30px;
    background: rgba(0, 0, 0, 0.5);
    margin: 0 auto;
    overflow: hidden;
    box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.4);
    z-index: 9999;
    transform: translateZ(10000);
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 28px;
      color: #fff;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: 900;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
