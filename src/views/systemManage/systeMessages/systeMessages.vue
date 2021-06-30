<template>
  <div v-loading="pageStatus" class="page-content">
    <div :style="windowHeight" />
    <div id="rightContentId" class="page-right" style="padding-bottom: 60px;">
      <div class="right-title">
        <span class="input-title">零件编号:</span><el-input v-model="pageParameter.smType" style="width:200px" size="mini" />
        <el-button class="btn-margin" type="primary" size="mini" icon="el-icon-search" round @click="getroleList(1)">搜索</el-button>
        <el-button type="warning" size="mini" icon="el-icon-refresh" round @click="resetPageInfo">重置</el-button>
      </div>
      <div class="right-content" :style="pageRightContent">
        <div>
          <el-button type="primary" size="mini" icon="el-icon-document-add" :disabled="isDisabled" @click="addEqweight">生成任务</el-button>
        </div>
        <el-table ref="multipleTable" :stripe="true" highlight-current-row :header-cell-style="{background: '#eff3f8'}" :data="tableData.data" style="width: 100%;margin-top: 10px" :default-sort="{prop: 'date', order: 'descending'}" @row-click="clickPresentTr" @selection-change="handleSelectionChange">
          <!-- <el-table-column type="selection" width="55" /> -->
          <el-table-column prop="smId" label="消息编号" />
          <el-table-column prop="smType" label="消息类型" sortable />
          <el-table-column prop="smContent" label="消息内容" sortable />
          <el-table-column prop="status" label="状态" sortable />
          <el-table-column prop="workNo" label="任务编号" sortable />
          <el-table-column prop="workStatus" label="任务状态" sortable />
          <el-table-column header-align="center" align="center" label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="success" size="mini" icon="el-icon-view" :disabled="scope.row.workStatus === '待处理'" @click="toDetailsPage(scope.$index, scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page-wrapper">
          <el-pagination background layout="total, prev, pager, next" :total="tableData.Total" :current-page.sync="pageParameter.pageNum" :page-size="pageParameter.pageSize" @current-change="handleCurrentChange" />
        </div>
        <el-dialog title="维修类型选择" :visible.sync="dialogAddEqweight" width="600px" :close-on-click-modal="false">
          <div class="menu-top-content" style="height: 312px;">
            <el-form ref="formView" :model="infoItem" :rules="eqweightRules" size="mini" label-width="130px" label-position="right">
              <el-form-item label="设备编码:" prop="reFlag" style="width: 600px; margin-left: 80px;">
                <template>
                  <el-radio v-model="infoItem.reFlag" label="厂家维保">厂家维保</el-radio>
                  <el-radio v-model="infoItem.reFlag" label="设备维修">设备维修</el-radio>
                </template>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" size="mini" @click="onSubmit('formView')">保 存</el-button>&nbsp;
            <el-button size="mini" @click="dialogChScore = false">取 消</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import systeMessages from './systeMessages.js'
export default systeMessages
</script>
<style lang="scss" scoped>
.page-content {
  display: flex;
  height: 100%;
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
      min-width: 1100px;
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
.stay-upkeep{
  padding: 4px 6px;
  color: #fff;
  font-size: 12px;
  background: #409EFF;
  border-radius: 5px;
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
.audit-info{
  margin-top: 20px;
  width: 100%;
  text-align: center;
}
.audit-label{
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
