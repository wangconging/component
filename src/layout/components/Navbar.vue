<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <error-log class="errLog-container right-menu-item hover-effect" />
      </template>
      <!-- <el-badge v-model="untableData.Total" class="bell-style">
        <i class="el-icon-bell" @click="toSmsInfo" />
      </el-badge> -->
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img src="../../assets/images/user-img.gif" class="user-avatar">
          <span class="title-userName">{{ userName }}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog title="消息提醒" :visible.sync="elinnerVisible" width="1200px" :close-on-click-modal="false">
      <div class="right-content" style="padding:0 20px">
        <el-table ref="multipleTable" :stripe="true" highlight-current-row :header-cell-style="{background: '#eff3f8'}" :data="tableData.data" style="width: 100%;margin-top: 10px" :default-sort="{prop: 'date', order: 'descending'}">
          <!-- <el-table-column type="selection" width="55" /> -->
          <el-table-column prop="eqCode" fixed show-overflow-tooltip align="center" label="设备编码" />
          <el-table-column prop="elCode" show-overflow-tooltip align="center" label="零件编码" />
          <el-table-column prop="smType" fixed show-overflow-tooltip align="center" label="消息类型" />
          <el-table-column prop="smContent" fixed show-overflow-tooltip align="center" label="消息内容" />
          <el-table-column prop="smLevel" show-overflow-tooltip align="center" label="消息等级" />
          <el-table-column prop="status" show-overflow-tooltip align="center" label="状态" />
          <el-table-column prop="workNo" show-overflow-tooltip align="center" label="任务编号" />
          <el-table-column prop="workStatus" show-overflow-tooltip align="center" label="任务状态" />
          <el-table-column prop="showCreateDate" show-overflow-tooltip align="center" label="创建时间" />
          <el-table-column header-align="center" fixed="right" align="center" label="操作" width="200">
            <template slot-scope="scope">
              <el-button type="success" size="mini" icon="el-icon-edit" @click="editStatus(scope.$index, scope.row)">确认</el-button>
            </template>
          </el-table-column>
        </el-table>
        <br>
        <div class="foot-div">
          <el-pagination background layout="total, prev, pager, next" :total="tableData.Total" :current-page.sync="pageParameter.pageNum" :page-size="pageParameter.pageSize" @current-change="handleCurrentChange" />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { updateStatus } from '@/api/smsUserApi.js'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Cookies from 'js-cookie'
// import router from '@/router'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog
  },
  data() {
    return {
      elinnerVisible: false,
      userName: '',
      num: 23,
      pageParameter: {
        userId: '',
        status: '',
        pageNum: 1,
        pageSize: 10
      },
      tableData: {
        data: [],
        Total: 0
      },
      untableData: {
        data: [],
        Total: 0
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device',
      'name'
    ])
  },
  created() {
    // this.userName = JSON.parse(Cookies.get('userData')).user.userName
  },
  methods: {
    editStatus(index, row) {
      const formData = new FormData()
      formData.append('smId', row.smId)
      updateStatus(formData).then((response) => {
        if (response.code === 200) {
          this.$swal.success(response.msg)
        } else {
          this.$swal.error(response.msg)
        }
        this.getSmsList(1)
        this.getunSmsList(1)
      })
    },
    getunSmsList(pageNum) {
      this.pageParameter.pageNum = pageNum
      this.pageParameter.userId = JSON.parse(Cookies.get('userData')).user.userId
      this.pageParameter.status = '未读'
      const formData = new FormData()
      Object.keys(this.pageParameter).forEach((key) => {
        formData.append(key, this.pageParameter[key])
      })
    },
    toSmsInfo() {
      // router.push('systemManage/smsInfo')
      this.elinnerVisible = true
    },
    ...mapMutations([
      'SET_TOKEN'
    ]),
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    handleCurrentChange(val) {
      this.getSmsList(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .right-content {
    .foot-div {
      width: 100px;
      height: 80px;
      margin: 0 auto;
    }
  }
  .bell-style {
    height: 40px;
    margin-right: 10px;
    margin-top: -15px;
    cursor: pointer;
  }
  .bell-style:hover {
    background: rgba(0, 0, 0, 0.045);
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    // position: relative;
    float: right;
    height: 100%;
    line-height: 50px;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        display: flex;
        align-items: center;
        height: 50px;
        line-height: 50px;
        margin-top: 5px;
        padding-bottom: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
        .title-userName {
          max-width: 120px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-left: 6px;
          font-size: 15px;
        }
      }
    }
  }
}
</style>
