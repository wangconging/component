<template>
  <div class="page-content">
    <!-- 新增编辑部门-部门选择 start -->
    <el-dialog title="部门选择" :visible.sync="jurisdictionVisible" width="480px" :close-on-click-modal="false">
      <div style="height:440px;">
        <el-scrollbar style="height:100%;">
          <el-form ref="formView2" size="mini" label-width="80px" label-position="right" style="width: 400px;margin-left:40px;">
            <el-form-item label="关键字：">
              <el-input v-model="keywordSearchVal" size="mini" style="width: 250px;" />
              <el-button size="mini" @click="searchAddDept(keywordSearchVal)">搜索</el-button>
            </el-form-item>
          </el-form>
          <div class="grid-content bg-purple grid-body">
            <el-tree ref="tree" :data="data" node-key="deptId" :default-expanded-keys="parentDeptId" :default-checked-keys="parentDeptId" :props="defaultProps" @node-click="handleNodeClick" />
          </div>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="submitSection()">确 认</el-button>&nbsp;
        <el-button size="mini" @click="jurisdictionVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 新增部门-部门选择 end -->
    <!-- 修改密码 start -->
    <el-dialog title="修改密码" :visible.sync="dialogEditVisiblechangePwd" width="450px" :close-on-click-modal="false" style="height: 520px;">
      <div>
        <el-form ref="formViewChangePwd" :model="formDataChangePwd" :rules="ruleschangePwd" size="mini" label-width="100px" label-position="right">
          <el-form-item label="登录名称:">
            <el-input v-model="loginName" size="mini" :disabled="true" style="width: 316.66px;" />
          </el-form-item>
          <el-form-item label="新密码:" prop="passWord">
            <el-input v-model="formDataChangePwd.passWord" type="password" size="mini" style="width: 316.66px;" />
          </el-form-item>
          <el-form-item label="密码确认:" prop="passwordAffirm">
            <el-input v-model="formDataChangePwd.passwordAffirm" type="password" show-password size="mini" style="width: 316.66px;" />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="onSubmitChangePwd('formViewChangePwd')">保 存</el-button>&nbsp;
        <el-button size="mini" @click="dialogEditVisiblechangePwd = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 修改密码 end -->
    <!-- 添加弹出框 start -->
    <el-dialog title="添加用户" :visible.sync="dialogEditVisible" width="1000px" :close-on-click-modal="false">
      <div class="menu-top-content-user">
        <el-form ref="formView" :model="formData" :rules="rules" size="mini" label-width="100px" label-position="right">
          <el-row>
            <el-col :span="10" style="margin-left: 20px;">
              <el-form-item label="用户名称:" prop="userName">
                <el-input v-model="formData.userName" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="10" style="margin-left: 20px;">
              <el-form-item label="登录密码:" prop="password">
                <el-input v-model="formData.password" type="password" show-password size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10" style="margin-left: 20px;">
              <el-form-item label="登录名称:" prop="loginName">
                <el-input v-model="formData.loginName" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="10" style="margin-left: 20px;">
              <el-form-item label="密码确认:" prop="passwordAffirm">
                <el-input v-model="formData.passwordAffirm" type="password" show-password size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10" style="margin-left: 20px;">
              <el-form-item label="用户性别:" prop="sex">
                <el-select v-model="formData.sex" placeholder="请选择" style="width:316.66px" size="mini">
                  <el-option label="男" value="0" />
                  <el-option label="女" value="1" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10" style="margin-left: 20px;">
              <el-form-item label="手机号码:" prop="phone">
                <el-input v-model="formData.phone" type="number" size="mini" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10" style="margin-left: 20px;">
              <el-form-item label="角色:" prop="roleId">
                <el-radio-group v-model="formData.roleId" style="padding-top: 8px;">
                  <el-radio v-for="role in roleListData" :key="role.roleId" style="margin-bottom: 10px;" :label="role.roleId">{{ role.roleName }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="onSubmit('formView')">保 存</el-button>&nbsp;
        <el-button size="mini" @click="dialogEditVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 添加弹出框 end -->
    <!-- 编辑弹出框 start -->
    <el-dialog title="编辑用户" :visible.sync="dialogEditVisibleChange" width="1000px" :close-on-click-modal="false">
      <div class="menu-top-content-user">
        <el-scrollbar style="height:100%;">
          <el-form ref="formView1" :model="formDataChange" :rules="ruleschange" size="mini" label-width="100px" label-position="right">
            <el-row>
              <el-col :span="10" style="margin-left: 20px;">
                <el-form-item label="用户名称:" prop="userName">
                  <el-input v-model="formDataChange.userName" size="mini" />
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-left: 20px;">
                <el-form-item label="用户性别:" prop="sex">
                  <el-select v-model="formDataChange.sex" placeholder="请选择" style="width:316.66px" size="mini">
                    <el-option label="男" value="0" />
                    <el-option label="女" value="1" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10" style="margin-left: 20px;">
                <el-form-item label="登录名称:" prop="loginName">
                  <el-input v-model="formDataChange.loginName" :disabled="true" size="mini" />
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-left: 20px;">
                <el-form-item label="用户状态：">
                  <el-switch v-model="formDataChange.status" active-color="#13ce66" inactive-color="#ff4949" active-value="0" inactive-value="1" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10" style="margin-left: 20px;">
                <el-form-item label="手机号码:" prop="phone">
                  <el-input v-model="formDataChange.phone" type="number" maxlength="13" size="mini" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22" style="margin-left: 20px;">
                <el-form-item label="角色:" prop="roleId" style="">
                  <el-radio-group v-model="formDataChange.roleId">
                    <el-radio v-for="role in roleListData" :key="role.roleId" style="margin-bottom: 10px;" :label="role.roleId">{{ role.roleName }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="onSubmitChange('formView1')">保 存</el-button>&nbsp;
        <el-button size="mini" @click="dialogEditVisibleChange = false">取 消</el-button>
      </div>
    </el-dialog>
    <div id="rightContentId" class="page-right" style="padding-bottom: 50px;">
      <!-- 页面头部搜索框 start -->
      <div class="right-title">
        <span class="input-title">登录名称:</span>
        <el-input v-model="pageParameter.userName" style="width:160px" size="mini" />
        <span class="input-title">用户状态:</span>
        <el-select v-model="pageParameter.status" placeholder="请选择" style="width:160px" size="mini">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <span class="input-title">创建时间:</span>
        <el-date-picker v-model="pageParameter.beginTime" type="date" placeholder="开始日期" style="width: 160px;" value-format="yyyy-MM-dd" size="mini" /> -
        <el-date-picker v-model="pageParameter.endTime" type="date" placeholder="结束日期" style="width: 160px;" value-format="yyyy-MM-dd" size="mini" />
        <el-button class="btn-margin" type="primary" size="mini" icon="el-icon-search" round @click="getUserList(1)">搜索</el-button>
        <el-button type="warning" size="mini" icon="el-icon-refresh" round @click="resetPageInfo">重置</el-button>
      </div>
      <!-- 页面头部搜索框 end -->
      <!-- 页面列表 start -->
      <div class="right-content" :style="pageRightContent">
        <div>
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="addRoleInfo">新增</el-button>
          <!-- <el-button type="danger" :disabled="tableTrDataIsNull" size="mini" icon="el-icon-plus" @click="deleteAllRoleInfo">删除</el-button> -->
        </div>
        <el-table ref="multipleTable" :stripe="true" highlight-current-row :header-cell-style="{background: '#eff3f8'}" :data="tableData.data" style="width: 100%;margin-top: 10px" :default-sort="{prop: 'date', order: 'descending'}" @selection-change="handleSelectionChange">
          <!-- <el-table-column type="selection" width="55" /> -->
          <el-table-column prop="userId" show-overflow-tooltip label="用户ID" />
          <el-table-column prop="loginName" show-overflow-tooltip label="用户名称" sortable />
          <el-table-column prop="userName" show-overflow-tooltip label="用户名称" />
          <el-table-column prop="roleName" show-overflow-tooltip label="角色" />
          <el-table-column prop="phone" show-overflow-tooltip label="手机号" />
          <!-- <el-table-column prop="roleSort" label="手机" /> -->
          <el-table-column label="用户状态">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.status" active-color="#13ce66" inactive-color="#ff4949" active-value="0" inactive-value="1" @change="changeStatus(scope.row, scope.$index)" />
            </template>
          </el-table-column>
          <el-table-column prop="createTime" show-overflow-tooltip label="创建时间" sortable />
          <el-table-column header-align="center" align="center" label="操作" width="380">
            <template slot-scope="scope">
              <el-button type="success" size="mini" icon="el-icon-edit" @click="changeInfo(scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" size="mini" icon="el-icon-close" @click="deleteInfo(scope.$index, scope.row)">删除</el-button>
              <el-button type="warning" size="mini" icon="el-icon-user" @click="changePassWord(scope.$index, scope.row)">重置密码</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page-wrapper">
          <el-pagination background layout="total, prev, pager, next" :total="tableData.Total" :current-page.sync="pageParameter.pageNum" :page-size="pageParameter.pageSize" @current-change="handleCurrentChange" />
        </div>
      </div>
      <!-- 页面列表 end -->
    </div>
  </div>
</template>
<script>
import userManage from './userManage.js'
export default userManage
</script>
<style lang="scss" scoped>
// .el-radio-group {
//   padding-top: 8px;
// }
.page-content {
  display: flex;
  height: 100%;
  .tree-content {
    .menu-title {
      padding-top: 80px;
      color: #606266;
      font-size: 14px;
      font-weight: 600;
    }
  }
  .page-left {
    position: relative;
    // overflow-x: auto;
    width: 200px;
    min-width: 190px;
    .title-text {
      // position: fixed;
      padding-left: 15px;
      width: 190px;
      height: 50px;
      line-height: 50px;
      color: #676a6c;
      border-bottom: 1px solid #ccc;
      text-align: left;
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
      margin-bottom: 10px;
      margin-left: 1%;
      padding: 15px;
      width: 98%;
      border-radius: 8px;
      box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
      background: #fff;
      min-height: 620px;
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
.menu-top-content-user {
  height: 220px;
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
