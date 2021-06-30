<template>
  <div class="page-content">
    <!-- 添加角色弹出框 start -->
    <el-dialog title="添加角色" :visible.sync="dialogEditVisible" width="800px" :close-on-click-modal="false">
      <div class="menu-top-content">
        <el-scrollbar style="height:100%;">
          <el-form ref="formView" :model="formData" :rules="rules" size="mini" label-width="100px" label-position="right">
            <el-form-item label="角色名称:" prop="roleName" style="width: 600px; margin-left: 80px;">
              <el-input v-model="formData.roleName" size="mini" />
            </el-form-item>
            <el-form-item label="显示顺序：" prop="roleSort" style="width: 600px;margin-left: 80px;">
              <el-input v-model="formData.roleSort" type="number" size="mini" />
            </el-form-item>
            <div class="tree-content">
              <span class="menu-title">菜单权限:</span>
            </div>
            <div class="tree-content" style="margin-top: 20px;">
              <el-transfer v-model="formData.menuIds" :data="dataTransfer" :titles="['无权限', '有权限']" />
            </div>
          </el-form>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="onSubmit('formView')">保 存</el-button>&nbsp;
        <el-button size="mini" @click="dialogEditVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 添加弹出框 end -->
    <!-- 编辑角色弹出框 start -->
    <el-dialog title="编辑角色" :visible.sync="dialogEditVisibleChange" width="800px" :close-on-click-modal="false">
      <div class="menu-top-content">
        <el-scrollbar style="height:100%;">
          <el-form ref="formView1" :model="formDataChange" :rules="rules" size="mini" label-width="100px" label-position="right">
            <el-form-item label="角色名称:" prop="roleName" style="width: 600px; margin-left: 80px;">
              <el-input v-model="formDataChange.roleName" size="mini" />
            </el-form-item>
            <el-form-item label="显示顺序：" prop="roleSort" style="width: 600px;margin-left: 80px;">
              <el-input v-model="formDataChange.roleSort" type="number" size="mini" />
            </el-form-item>
            <el-form-item label="状态：" style="width: 600px;margin-left: 80px;">
              <el-switch v-model="formDataChange.status" active-color="#13ce66" inactive-color="#ff4949" active-value="0" inactive-value="1" />
            </el-form-item>
            <div class="tree-content">
              <span class="menu-title">菜单权限:</span>
            </div>
            <div class="tree-content" style="margin-top: 20px;">
              <el-transfer v-model="formDataChange.menuIds" :data="dataTransfer" :titles="['无权限', '有权限']" />
            </div>
          </el-form>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="onSubmitChange('formView1')">保 存</el-button>&nbsp;
        <el-button size="mini" @click="dialogEditVisibleChange = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹出框 end -->
    <div :style="windowHeight" />
    <div id="rightContentId" class="page-right" style="padding-bottom: 50px;">
      <div class="right-title">
        <span class="input-title">角色名称:</span>
        <el-input v-model="pageParameter.roleName" style="width:200px" size="mini" />
        <span class="input-title">角色状态:</span>
        <el-select v-model="pageParameter.status" placeholder="请选择" style="width:200px" size="mini">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-button class="btn-margin" type="primary" size="mini" icon="el-icon-search" round @click="getroleList(1)">搜索</el-button>
        <el-button type="warning" size="mini" icon="el-icon-refresh" round @click="resetPageInfo">重置</el-button>
      </div>
      <div class="right-content" :style="pageRightContent">
        <div>
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="addRoleInfo">新增</el-button>
          <!-- <el-button type="danger" :disabled="tableTrDataIsNull" size="mini" icon="el-icon-close" @click="deleteAllRoleInfo">删除</el-button> -->
        </div>
        <el-table ref="multipleTable" :stripe="true" highlight-current-row :header-cell-style="{background: '#eff3f8'}" :data="tableData.data" style="width: 100%;margin-top: 10px" :default-sort="{prop: 'date', order: 'descending'}" @selection-change="handleSelectionChange">
          <!-- <el-table-column type="selection" width="55" /> -->
          <!-- <el-table-column prop="roleId" label="角色编号" /> -->
          <el-table-column prop="roleName" label="角色名称" sortable />
          <el-table-column prop="roleSort" label="显示顺序" sortable />
          <el-table-column label="角色状态">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.status" active-color="#13ce66" inactive-color="#ff4949" active-value="0" inactive-value="1" @change="changeRoleStatus(scope.row, scope.$index)" />
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" sortable />
          <el-table-column header-align="center" align="center" label="操作" width="380">
            <template slot-scope="scope">
              <el-button type="success" size="mini" icon="el-icon-edit" @click="changeRoleInfo(scope.$index, scope.row)">编辑</el-button>
              <el-button type="primary" size="mini" icon="el-icon-user" @click="allotRoleInfo(scope.$index, scope.row)">分配用户</el-button>
              <el-button type="danger" size="mini" icon="el-icon-close" @click="deleteRoleInfo(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page-wrapper">
          <el-pagination background layout="total, prev, pager, next" :total="tableData.Total" :current-page.sync="pageParameter.pageNum" :page-size="pageParameter.pageSize" @current-change="handleCurrentChange" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import roleManage from './roleManage.js'
export default roleManage
</script>
<style lang="scss" scoped>
.page-content {
  display: flex;
  height: 100%;
  .tree-content {
    display: flex;
    margin-left: 102px;
    .menu-title {
      padding-top: 3px;
      color: #606266;
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
    .tree-content {
      padding: 20px;
    }
  }
  .isShow-pageLeft {
    display: flex;
    align-items: center;
    background: #fafafa;
    .btn-content {
      width: 10px;
      height: 50px;
      line-height: 50px;
      cursor: pointer;
      background: #eee;
    }
    .btn-content:hover {
      background: #ffcc66;
    }
  }
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
      min-width: 1100px;
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
      min-width: 520px;
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
