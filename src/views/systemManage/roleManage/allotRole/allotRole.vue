<template>
  <div class="page-content">
    <!-- 添加角色弹出框 start -->
    <el-dialog title="选择用户" :visible.sync="dialogEditVisible" width="1100px" :close-on-click-modal="false">
      <div class="menu-top-content">
        <div class="right-title">
          <span class="input-title">登录名称:</span><el-input v-model="pageParameterAdd.loginName" style="width:200px" size="mini" />
          <span class="input-title">用户名称:</span>
          <el-input v-model="pageParameterAdd.userName" style="width:200px" size="mini" />
          <el-button class="btn-margin" type="primary" size="mini" icon="el-icon-search" round @click="addRoleInfo(1)">搜索</el-button>
          <el-button type="warning" size="mini" icon="el-icon-refresh" round @click="resetPageInfoAdd">重置</el-button>
        </div>
        <el-table ref="multipleTable" highlight-current-row :header-cell-style="{background: '#eff3f8'}" :data="tableDataAdd.data" style="width: 100%;margin-top: 10px" :default-sort="{prop: 'date', order: 'descending'}" @selection-change="handleSelectionChangeAdd">
          <el-table-column type="selection" width="55" />
          <el-table-column prop="loginName" label="登录名称" sortable />
          <el-table-column prop="userName" label="用户名称" sortable />
          <!-- <el-table-column prop="roleSort" label="邮箱" sortable /> -->
          <el-table-column label="用户状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status === '1'" class="status-abnormal-allot">{{ scope.row.status === '0' ? '正常' : '停用' }}</span>
              <span v-if="scope.row.status === '0'" class="status-normal-allot">{{ scope.row.status === '0' ? '正常' : '停用' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" sortable />
        </el-table>
        <div class="page-wrapper">
          <el-pagination background :current-page.sync="pageParameterAdd.pageNum" :page-size="pageParameterAdd.pageSize" layout="total, prev, pager, next" :total="tableDataAdd.Total" @current-change="handleCurrentChangeAdd" />
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="onSubmitAdd('formView')">确 定</el-button>&nbsp;
        <el-button size="mini" @click="dialogEditVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 添加弹出框 end -->
    <div :style="windowHeight" />
    <div class="page-right">
      <div class="right-title">
        <span class="input-title">登录名称:</span><el-input v-model="pageParameter.loginName" style="width:200px" size="mini" />
        <span class="input-title">用户名称:</span>
        <el-input v-model="pageParameter.userName" style="width:200px" size="mini" />
        <el-button class="btn-margin" type="primary" size="mini" icon="el-icon-search" round @click="getroleList(1)">搜索</el-button>
        <el-button type="warning" size="mini" icon="el-icon-refresh" round @click="resetPageInfo">重置</el-button>
      </div>
      <div class="right-content">
        <div>
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="addRoleInfo(1)">新增</el-button>
          <el-button type="danger" :disabled="tableTrDataIsNull" size="mini" icon="el-icon-close" @click="cancelUserInfoAll">批量取消授权</el-button>
        </div>
        <el-table ref="multipleTable" highlight-current-row :header-cell-style="{background: '#eff3f8'}" :data="tableData.data" style="width: 100%;margin-top: 10px" :default-sort="{prop: 'date', order: 'descending'}" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column prop="loginName" label="登录名称" sortable />
          <el-table-column prop="userName" label="用户名称" />
          <!-- <el-table-column prop="roleSort" label="邮箱" /> -->
          <el-table-column label="用户状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status === '1'" class="status-abnormal-allot">{{ scope.row.status === '0' ? '正常' : '停用' }}</span>
              <span v-if="scope.row.status === '0'" class="status-normal-allot">{{ scope.row.status === '0' ? '正常' : '停用' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" sortable />
          <el-table-column header-align="center" align="center" label="操作" width="380">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" icon="el-icon-close" @click="cancelUserInfo(scope.$index, scope.row)">取消授权</el-button>
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
import allotRole from './allotRole.js'
export default allotRole
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
      min-height: 680px;
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
.status-abnormal-allot{
  padding: 4px 6px;
  color: #fff;
  font-size: 12px;
  background: #F56C6C;
  border-radius: 5px;
}
.status-normal-allot{
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
.menu-top-content{
  padding: 0 20px;
  height: 580px;
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
