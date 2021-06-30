<template>
  <div class="page-content">
    <div :style="windowHeight" />
    <div id="rightContentId" v-loading="exportStatus" class="page-right" style="padding-bottom: 60px;" element-loading-text="拼命导出中，请勿切换页面!" element-loading-background="rgba(0, 0, 0, 0.8)">
      <div class="right-title">
        <span class="input-title">登录地址:</span><el-input v-model="pageParameter.ipaddr" style="width:160px" size="mini" />
        <span class="input-title">登录名称:</span><el-input v-model="pageParameter.loginName" style="width:160px" size="mini" />
        <span class="input-title">登录状态:</span>
        <el-select v-model="pageParameter.status" placeholder="请选择" style="width:160px" size="mini">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <span class="input-title">登录时间:</span><el-date-picker v-model="pageParameter.beginTime" value-format="yyyy-MM-dd" type="date" placeholder="开始日期" style="width: 160px;" size="mini" /> - <el-date-picker v-model="pageParameter.endTime" value-format="yyyy-MM-dd" type="date" placeholder="结束日期" style="width: 160px;" size="mini" />
        <el-button class="btn-margin" type="primary" size="mini" icon="el-icon-search" round @click="getList(1)">搜索</el-button>
        <el-button type="warning" size="mini" icon="el-icon-refresh" round @click="resetPageInfo">重置</el-button>
      </div>
      <div class="right-content" :style="pageRightContent">
        <div>
          <!-- <el-button type="danger" :disabled="tableTrDataIsNull" size="mini" icon="el-icon-close" @click="deleteAllRoleInfo">删除</el-button> -->
          <el-button v-if="jurisdictionData.remove" type="danger" size="mini" icon="el-icon-delete" @click="emptyBtn">清空</el-button>
          <el-button type="warning" size="mini" icon="el-icon-position" @click="exportExcel">导出</el-button>
        </div>
        <el-table ref="multipleTable" highlight-current-row :header-cell-style="{background: '#eff3f8'}" :data="tableData.data" style="width: 100%;margin-top: 10px" :default-sort="{prop: 'date', order: 'descending'}">
          <!-- <el-table-column type="selection" width="55" /> -->
          <el-table-column prop="infoId" label="访问编号" />
          <el-table-column prop="loginName" show-overflow-tooltip label="登录名称" sortable />
          <el-table-column prop="ipaddr" show-overflow-tooltip label="登录地址" sortable />
          <el-table-column prop="loginLocation" show-overflow-tooltip label="登录地点" sortable />
          <el-table-column prop="browser" show-overflow-tooltip label="浏览器" sortable />
          <el-table-column prop="os" show-overflow-tooltip label="操作系统" sortable />
          <el-table-column prop="status" label="登录状态" sortable>
            <template slot-scope="scope">
              <span v-if="scope.row.status === '1'" class="status-abnormal-login">{{ scope.row.status === '0' ? '正常' : '停用' }}</span>
              <span v-if="scope.row.status === '0'" class="status-normal-login">{{ scope.row.status === '0' ? '正常' : '停用' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="msg" show-overflow-tooltip label="操作信息" sortable />
          <el-table-column prop="loginTime" show-overflow-tooltip label="登录时间" sortable />
          <el-table-column v-if="jurisdictionData.remove" header-align="center" align="center" label="操作" width="380">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteLoginLog(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page-wrapper">
          <el-pagination background :current-page.sync="pageParameter.pageNum" :page-size="pageParameter.pageSize" layout="total, prev, pager, next" :total="tableData.Total" @current-change="handleCurrentChange" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import loginLog from './loginLog.js'
export default loginLog
</script>
<style lang="scss" scoped>
.page-content {
  display: flex;
  height: 100%;
  .tree-content {
    display: flex;
    margin-left: 102px;
    width: 400px;
    .menu-title {
      padding-top: 3px;
      color:#606266;
      font-size: 14px;
      font-weight: 600;
    }
  }
  .page-left {
    overflow-x: auto;
    width: 200px;
    min-width: 190px;
    .title-text {
      padding-left: 16px;
      height: 50px;
      line-height: 50px;
      color: #676a6c;
      border-bottom: 1px solid #ccc;
    }
    .tree-content{
      padding: 20px;
    }
  }
  .isShow-pageLeft {
    display: flex;
    align-items: center;
    background: #fafafa;
    .btn-content{
    width: 10px;
    height: 50px;
    line-height: 50px;
    Cursor : pointer;
    background: #eee;
    }
    .btn-content:hover{
    background: #ffcc66;
    }
  }
  .page-right {
    background: rgb(243, 243, 244);
    width: 100%;
    .right-title{
      padding: 10px 0;
      margin-top: 10px;
      margin-left: 1%;
      width: 98%;
      border-radius: 8px;
      box-shadow: 1px 1px 3px rgba(0,0,0,.2);
      background: #fff;
      min-width: 1300px;
      .input-title{
        color: #333;
        font-size: 12px;
        margin: 0 5px 0 15px;
      }
      .btn-margin{
        margin-left: 12px;
      }
    }
    .right-content{
      margin-top: 10px;
      margin-left: 1%;
      padding: 15px;
      width: 98%;
      border-radius: 8px;
      box-shadow: 1px 1px 3px rgba(0,0,0,.2);
      background: #fff;
      min-height: 520px;
    }
  }
}
.el-icon-edit-outline:hover, .el-icon-arrow-down:hover, .el-icon-refresh:hover {
  color: darkturquoise;
}
.el-checkbox__inner {
  display: none !important;
}
</style>

<style>
.status-abnormal-login{
  padding: 4px 6px;
  color: #fff;
  font-size: 12px;
  background: #F56C6C;
  border-radius: 5px;
}
.status-normal-login{
  padding: 4px 6px;
  color: #fff;
  font-size: 12px;
  background: #409EFF;
  border-radius: 5px;
}
.list-content{
  list-style: none;
  font-size: 12px;
  color: #666;
}
.list-content li .list-title{
  width: 90px;
  margin-right: 20px;
}
.list-content .list-code{
  display: flex;
  justify-content: left;
  padding-right: 40px;
  margin-bottom: 33px;
}
.list-content .list-code .list-content-code {
  width: 1000px;
  padding: 12px;
  border: 1px solid #ccc;
}
.list-content .list-text{
  height: 40px;
}
.list-content .list-status{
  padding: 3px 5px;
  color: #fff;
  background: #409EFF;
  font-size: 12px;
  border-radius: 2px;
}
.page-wrapper {
  margin-top: 13px;
  display: flex;
  justify-content: center;
}
.el-select-dropdown__list {
  padding: 20px 0;
}
.el-dialog__body{
  padding: 30px 0;
}
.menu-top-content{
  height: 482px;
}

.grid-body {
  margin-left: 10%;
  width: 80%;
  padding: 20px;
  border: 1px solid #ebeef5;
}
.icon-content{
   height: 220px;
}
.icon-content .icon-center {
  padding-right: 2px;
  margin-left: 175px;
  overflow-x:auto;
  width: 510px;
  height: 210px;
  box-sizing: border-box;
}
.icon-content .icon-center .icon-icons{
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  Cursor : pointer;
  box-sizing: border-box;
}
.icon-content .icon-center .icon-icons:hover{
  background: #409EFF;
}
.icon-content .icon-center .icon-icons:hover i{
  color: #fff;
}
.el-table th, .el-table td{
  padding: 7px 0;
}
.el-dialog__header{
  background: #f8f8f8;
  border-bottom: 1px solid #ebeef5;
}
.el-dialog__footer {
  padding: 15px 10px 15px;
  border-top: 1px solid #c7c7c7;
  background: #f0f4f7;
}
.el-scrollbar__wrap{
  overflow-x: hidden;
}
.el-table th, .el-table td{
  padding: 7px 0;
}
</style>
