<template>
  <div v-loading="pageStatus" class="page-content">
    <!-- 新增编辑部门-部门选择 start -->
    <el-dialog title="部门选择" :visible.sync="jurisdictionVisible" width="480px" :close-on-click-modal="false">
      <div style="height:440px;">
        <el-scrollbar style="height:100%;">
          <el-form size="mini" label-width="80px" label-position="right" style="width: 400px;margin-left:40px;">
            <el-form-item label="关键字：">
              <el-input v-model="keywordSearchVal" :maxlength="10" size="mini" style="width: 250px;" />
              <el-button size="mini" @click="searchAddInfo(keywordSearchVal)">搜索</el-button>
            </el-form-item>
          </el-form>
          <div class="grid-content bg-purple grid-body">
            <el-tree ref="tree" :data="dataTreeAllList" node-key="deptId" :default-expanded-keys="parentDeptId" :default-checked-keys="parentDeptId" :props="defaultProps" @node-click="handleNodeClick" />
          </div>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="submitMenuName()">确 认</el-button>&nbsp;
        <el-button size="mini" @click="jurisdictionVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 新增部门-部门选择 end -->
    <!-- 新增部门 start -->
    <el-dialog :title="dialogEditTitle" :visible.sync="dialogEditVisible" width="800px" :close-on-click-modal="false">
      <div class="menu-top-content-section">
        <el-form ref="formView" :model="formData" size="mini" label-width="100px" label-position="right" style="height: 206px;">
          <el-form-item label="上级部门：" style="width: 600px; margin-left: 80px;">
            <el-input v-model="higherMenuName" size="mini" />
          </el-form-item>
          <el-form-item label="部门名称：" prop="deptName" style="width: 600px;margin-left: 80px;">
            <el-input v-model="formData.deptName" size="mini" />
          </el-form-item>
          <el-form-item label="显示排序：" prop="orderNum" style="width: 600px;margin-left: 80px;">
            <el-input v-model="formData.orderNum" type="number" size="mini" />
          </el-form-item>
          <el-form-item label="备注：" style="width: 600px; margin-left: 80px;">
            <el-input v-model="formData.remark" size="mini" />
          </el-form-item>
          <el-form-item label="部门状态" prop="status" style="width: 600px;margin-left: 80px;">
            <el-radio v-model="formData.status" label="0">正常</el-radio>
            <el-radio v-model="formData.status" label="1">停用</el-radio>
          </el-form-item>
        </el-form>
        <div class="menu-top" @click="getMenuInfo" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="onSubmit('formView')">保 存</el-button>&nbsp;
        <el-button size="mini" @click="dialogEditVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 新增部门 end -->
    <div :style="windowHeight" />
    <div id="rightContentId" class="page-right" style="padding-bottom: 60px;">
      <div class="right-title">
        <span class="input-title">部门名称:</span>
        <el-input v-model="searchData.deptName" style="width:200px" size="mini" />
        <!-- <span class="input-title">部门状态:</span>
        <el-select v-model="searchData.status" placeholder="请选择" style="width:200px" size="mini">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select> -->
        <el-button class="btn-margin" type="primary" size="mini" icon="el-icon-search" round @click="searchInfo()">搜索</el-button>
        <el-button type="warning" size="mini" icon="el-icon-refresh" round @click="resetPageInfo">重置</el-button>
      </div>
      <div class="right-content" :style="pageRightContent">
        <div>
          <el-button v-if="jurisdictionData.add" type="primary" size="mini" icon="el-icon-plus" @click="addInfo">新增</el-button>
          <!-- <el-button type="success" size="mini" icon="el-icon-edit-outline">修改</el-button> -->
          <!-- <el-button type="warning" size="mini" icon="el-icon-sort">展开/折叠</el-button> -->
        </div>
        <div style="ovflow-x: hidden;height: 625px;">
          <el-scrollbar style="height:100%">
            <el-table
              ref="multipleTable"
              lazy
              :stripe="true"
              :tree-props="{children: 'children',haschildren : haschildren}"
              row-key="deptId"
              highlight-current-row
              :header-cell-style="{background: '#eff3f8'}"
              :data="dataAllList"
              style="width: 100%;margin-top: 10px"
              :default-sort="{prop: 'date', order: 'descending'}"
              @selection-change="handleSelectionChange"
              @row-click="handleRowClick"
            >
              <el-table-column prop="deptName" show-overflow-tooltip label="部门名称" />
              <el-table-column prop="orderNum" show-overflow-tooltip label="排序" sortable />
              <el-table-column show-overflow-tooltip label="状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.status === '1'" class="menu-styles">{{ scope.row.status === '0' ? '正常' : '停用' }}</span>
                  <span v-if="scope.row.status === '0'" class="button-styles">{{ scope.row.status === '0' ? '正常' : '停用' }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="remark" show-overflow-tooltip label="备注" />
              <el-table-column prop="createTime" show-overflow-tooltip label="创建时间" />
              <el-table-column v-if="jurisdictionData.edit || jurisdictionData.remove" header-align="center" align="center" label="操作" width="280">
                <template slot-scope="scope">
                  <el-button v-if="jurisdictionData.edit" type="success" size="mini" icon="el-icon-edit" @click="changeInfo(scope.$index, scope.row)">编辑</el-button>
                  <el-button v-if="jurisdictionData.remove" type="danger" size="mini" icon="el-icon-close" @click="deleteData(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import sectionManage from './sectionManage.js'
export default sectionManage
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
      // height: 60px;
      // line-height: 60px;
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
.el-select-dropdown__list {
  padding: 20px 0;
}
.menu-styles{
  padding: 4px 6px;
  color: #fff;
  font-size: 12px;
  background: #F56C6C;
  border-radius: 5px;
}
.button-styles{
  padding: 4px 6px;
  color: #fff;
  font-size: 12px;
  background: #409EFF;
  border-radius: 5px;
}
.el-dialog__body{
  padding: 30px 0;
}
.menu-top-content-section{
  position: relative;
}
.menu-top-content-section .menu-top{
  position: absolute;
  top: 0;
  right: 120px;
  width: 500px;
  height: 28px;
  background: rgba(0, 0, 0, .1);
  Cursor : text
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
</style>
