<template>
  <div v-loading="pageStatus" class="page-content">
    <div :style="windowHeight" />
    <div id="rightContentId" class="page-right" style="padding-bottom: 60px;">
      <div class="right-title">
        <span class="input-title">服务名称:</span>
        <el-input v-model="pageParameter.ssName" style="width:200px" size="mini" />
        <el-button class="btn-margin" type="primary" size="mini" icon="el-icon-search" round @click="getList(1)">搜索</el-button>
        <el-button type="warning" size="mini" icon="el-icon-refresh" round @click="resetPageInfo">重置</el-button>
      </div>
      <div class="right-content" :style="pageRightContent">
        <el-table ref="multipleTable" highlight-current-row :header-cell-style="{background: '#eff3f8'}" :data="tableData.data" style="width: 100%;margin-top: 10px" :default-sort="{prop: 'date', order: 'descending'}">
          <el-table-column prop="sssId" label="日志编号" sortable />
          <el-table-column prop="ssName" show-overflow-tooltip label="服务名称" sortable />
          <el-table-column prop="ssConnect" show-overflow-tooltip label="服务描述" sortable />
          <el-table-column prop="runInterval" show-overflow-tooltip label="设备运行间隔" sortable />
          <el-table-column prop="ssDate" show-overflow-tooltip label="上个运行时间" sortable />
        </el-table>
        <div class="page-wrapper">
          <el-pagination background :current-page.sync="pageParameter.pageNum" :page-size="pageParameter.pageSize" layout="total, prev, pager, next" :total="tableData.Total" @current-change="handleCurrentChange" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import serverLog from './serverLog.js'
export default serverLog
</script>
<style lang="scss" scoped>
.page-content {
  display: flex;
  height: 100%;
  .page-right {
    background: rgb(243, 243, 244);
    width: 100%;
    .right-title {
      padding: 10px 0;
      margin-top: 10px;
      margin-left: 1%;
      width: 98%;
      border-radius: 8px;
      box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
      background: #fff;
      min-width: 1300px;
      .input-title {
        color: #333;
        font-size: 12px;
        margin: 0 5px 0 15px;
      }
      .btn-margin {
        margin-left: 12px;
      }
    }
    .right-content {
      margin-top: 10px;
      margin-left: 1%;
      padding: 15px;
      width: 98%;
      border-radius: 8px;
      box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
      background: #fff;
      min-height: 520px;
    }
  }
}
.el-icon-edit-outline:hover,
.el-icon-arrow-down:hover,
.el-icon-refresh:hover {
  color: darkturquoise;
}
.el-checkbox__inner {
  display: none !important;
}
</style>

<style>
.status-abnormal-operation {
  padding: 4px 6px;
  color: #fff;
  font-size: 12px;
  background: #f56c6c;
  border-radius: 5px;
}
.status-normal-operation {
  padding: 4px 6px;
  color: #fff;
  font-size: 12px;
  background: #409eff;
  border-radius: 5px;
}
.status-amend-operation {
  padding: 4px 6px;
  color: #fff;
  font-size: 12px;
  background: #67c23a;
  border-radius: 5px;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}

.list-content {
  list-style: none;
  font-size: 12px;
  color: #666;
}
.list-content li .list-title {
  width: 90px;
  margin-right: 20px;
}
.list-content .list-code {
  display: flex;
  justify-content: left;
  padding-right: 40px;
  margin-bottom: 33px;
}
.list-content .list-code .list-content-code {
  width: 1000px;
  padding: 12px;
  border: 1px solid #ccc;
  background: rgb(245, 245, 245);
}
.list-content .list-text {
  height: 40px;
}
.list-content .list-status {
  padding: 3px 5px;
  color: #fff;
  background: #409eff;
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
.el-dialog__body {
  padding: 30px 0;
}
.menu-top-content {
  height: 482px;
}

.grid-body {
  margin-left: 10%;
  width: 80%;
  padding: 20px;
  border: 1px solid #ebeef5;
}
.icon-content {
  height: 220px;
}
.icon-content .icon-center {
  padding-right: 2px;
  margin-left: 175px;
  overflow-x: auto;
  width: 510px;
  height: 210px;
  box-sizing: border-box;
}
.icon-content .icon-center .icon-icons {
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  box-sizing: border-box;
}
.icon-content .icon-center .icon-icons:hover {
  background: #409eff;
}
.icon-content .icon-center .icon-icons:hover i {
  color: #fff;
}
.el-table th,
.el-table td {
  padding: 7px 0;
}
.el-dialog__header {
  background: #f8f8f8;
  border-bottom: 1px solid #ebeef5;
}
.el-dialog__footer {
  padding: 15px 10px 15px;
  border-top: 1px solid #c7c7c7;
  background: #f0f4f7;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.el-table th,
.el-table td {
  padding: 7px 0;
}
</style>
