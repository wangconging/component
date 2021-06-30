<template>
  <div class="page-content" style="min-width: 500px;height: 600px;">
    <el-dialog title="新增流程" :visible.sync="jurisdictionVisible" width="600px" :close-on-click-modal="false" append-to-body>
      <div class="menu-top-content">
        <el-form ref="formView" :model="formData" size="mini" label-width="100px" label-position="right" :rules="rules">
          <el-form-item label="流程：" prop="name">
            <el-input v-model="formData.name" size="mini" style="width: 360px;" />
          </el-form-item>
          <el-form-item label="编码：" prop="name">
            <el-input v-model="formData.code" size="mini" style="width: 360px;" />
          </el-form-item>
          <el-form-item label="版本：" prop="name">
            <el-input v-model="formData.version" size="mini" style="width: 360px;" />
          </el-form-item>
          <!-- <el-form-item v-if="inputIsShow" label="图标">
            <el-input v-model="formData.icon" size="mini" style="width: 360px;" @focus="getIcons" @blur="loseIcons" />
          </el-form-item>
          <div style="height: 220px;">
            <transition name="el-zoom-in-center">
              <div v-if="iconsIsShow" class="icon-content">
                <div class="icon-center">
                  <el-scrollbar style="height:100%">
                    <div v-for="(item, index) in elementIcons" :key="index" class="icon-icons" @click="handleClipboard(generateElementIconCode(item),$event)">
                      <i :class="'el-icon-' + item" />
                    </div>
                  </el-scrollbar>
                </div>
              </div>
            </transition>
          </div> -->
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="submitBtn('formView')">确 认</el-button>&nbsp;
        <el-button size="mini" @click="jurisdictionVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-scrollbar style="height:560px;">
      <el-table :data="tableData" highlight-current-row style="min-width: 500px">
        <el-table-column prop="name" label="流程" />
        <el-table-column prop="code" label="编码" />
        <el-table-column prop="version" label="版本" />
      </el-table>
    </el-scrollbar>
    <div class="add-btn">
      <div>
        <el-button type="success" icon="el-icon-plus" circle @click="addFolw" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        version: [
          { required: true, message: '必填', trigger: 'blur' }
        ]
      },
      formData: {
        name: '',
        code: '',
        version: '',
        icon: ''
      },
      jurisdictionVisible: false,
      tableData: [{
        name: '流程1',
        code: 'F1D29',
        version: '1.1'
      }, {
        name: '流程2',
        code: 'F1D29',
        version: '1.1'
      }, {
        name: '流程3',
        code: 'F1D29',
        version: '1.1'
      }, {
        name: '流程4',
        code: 'F1D29',
        version: '1.1'
      }, {
        name: '流程5',
        code: 'F1D29',
        version: '1.1'
      }, {
        name: '流程6',
        code: 'F1D29',
        version: '1.1'
      }, {
        name: '流程7',
        code: 'F1D29',
        version: '1.1'
      }, {
        name: '流程8',
        code: 'F1D29',
        version: '1.1'
      }, {
        name: '流程9',
        code: 'F1D29',
        version: '1.1'
      }, {
        name: '流程10',
        code: 'F1D29',
        version: '1.1'
      }, {
        name: '流程11',
        code: 'F1D29',
        version: '1.1'
      }, {
        name: '流程12',
        code: 'F1D29',
        version: '1.1'
      }, {
        name: '流程13',
        code: 'F1D29',
        version: '1.1'
      }, {
        name: '流程14',
        code: 'F1D29',
        version: '1.1'
      }, {
        name: '流程15',
        code: 'F1D29',
        version: '1.1'
      }, {
        name: '流程16',
        code: 'F1D29',
        version: '1.1'
      }, {
        name: '流程17',
        code: 'F1D29',
        version: '1.1'
      }, {
        name: '流程18',
        code: 'F1D29',
        version: '1.1'
      }, {
        name: '流程19',
        code: 'F1D29',
        version: '1.1'
      }, {
        name: '流程20',
        code: 'F1D29',
        version: '1.1'
      }
      ]
    }
  },
  created() {
  },
  methods: {
    submitBtn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.tableData.push(this.formData)
          console.log(this.formData)
          this.formData = {
            name: '',
            code: '',
            version: ''
          }
          this.jurisdictionVisible = false
        } else {
          return false
        }
      })
    },
    addFolw() {
      this.jurisdictionVisible = true
    }
  }
}
</script>

<style scoped>
.page-content {
}
.add-btn {
  padding: 50px 0 0 82px;
  width: 200px;
  height: 100%;
  /* border-top: 1px solid #dfd6dc;
  border-right: 1px solid #dfd6dc; */
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.icon-content {
  height: 220px;
}
.icon-content .icon-center {
  padding-right: 2px;
  margin-left: 92px;
  overflow-x: auto;
  width: 368px;
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
</style>
