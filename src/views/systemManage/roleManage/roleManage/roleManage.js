import { mapGetters } from 'vuex'
import { addRole, removeRole, selectRole, editRole, selectRoleMAndBList, selectMenuByRoleId } from '@/api/roleManageApi.js'
import { mapActions } from 'vuex'
import Cookies from 'js-cookie'
export default {
  name: 'roleManage',
  data() {
    return {
      roleId: '',
      pageStatus: true,
      pageRightContent: {
        height: ''
      },
      selectListData: [],
      tableTrDataIsNull: true,
      dialogEditTitle: '添加角色',
      dialogEditVisible: false,
      dialogEditVisibleChange: false,
      formData: {
        roleName: '',
        roleSort: '',
        menuIds: []
      },
      searchRole: {
        name: ''
      },
      formDataChange: {
        roleName: '',
        roleSort: '',
        status: '',
        menuIds: []
      },
      searchData: {
        roleName: '',
        status: ''
      },
      rules: {
        roleName: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        roleSort: [
          { required: true, message: '必填', trigger: 'blur' }
        ]
      },
      parentMenuId: [],
      defaultProps: {
        children: 'children',
        label: 'menuName'
      },
      defaultExpandAll: false,
      pageLeftIsShow: true,
      windowHeight: {
        height: ''
      },
      treeDatas: [],
      options: [{
        value: '',
        label: '所有'
      }, {
        value: '0',
        label: '正常'
      }, {
        value: '1',
        label: '停用'
      }],
      tableData: {
        data: [],
        Total: 0
      },
      dataList: [],
      pageParameter: {
        roleName: '',
        status: '',
        pageNum: 1,
        pageSize: 10
      },
      recordPageNum: 1,
      recordListLength: 0,
      jurisdictionData: {
      },
      dataTransfer: [],
      value: []
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
  },
  mounted() {
    this.selectRoleMAndBList()
    const $this = this
    this.getroleList(1)
    this.$nextTick(() => {
      this.getWindowHeight()
    })
    window.onresize = () => {
      $this.getWindowHeight()
    }
  },
  methods: {
    ...mapActions('user', [
      'roleInfo'
    ]),
    // 获取页面列表
    getroleList(pageNum) {
      this.pageStatus = true
      this.pageParameter.pageNum = pageNum
      const formData = new FormData()
      Object.keys(this.pageParameter).forEach((key) => {
        formData.append(key, this.pageParameter[key])
      })
      selectRole(formData).then((response) => {
        this.pageStatus = false
        this.tableData.data = response.rows
        this.recordListLength = response.rows.length
        this.tableData.Total = response.total
      }).catch(error => {
        console.log(error)
      })
    },
    // 添加角色: 菜单权限列表选择
    handleCheckChange() {
      const res = this.$refs.tree.getCheckedNodes()
      const arr = []
      res.forEach((item) => {
        arr.push(item.menuId)
      })
      this.formData.menuIds = arr
    },
    // 新增角色按钮
    addRoleInfo() {
      this.dialogEditVisible = true
      this.dialogEditTitle = '添加角色'
    },
    selectRoleMAndBList() {
      this.dataTransfer = []
      const formData = new FormData()
      formData.append('name', '')
      selectRoleMAndBList(formData).then((response) => {
        response.data.menuAppList.forEach(item => {
          this.dataTransfer.push({
            key: item.id,
            label: item.name,
            disabled: false
          })
        })
      }).catch(error => {
        console.log(error)
      })
    },
    // 编辑角色按钮
    changeRoleInfo(index, row) {
      const formData = new FormData()
      formData.append('id', row.roleId)
      selectMenuByRoleId(formData).then((response) => {
        const ids = []
        response.data.roleMenuList.forEach(item => {
          ids.push(item.id)
        })
        this.formDataChange.menuIds = ids
      }).catch(error => {
        console.log(error)
      })
      this.selectRoleMAndBList()
      this.roleId = row.roleId
      this.selectListData = row.buttonIds
      this.formDataChange.roleId = row.roleId
      this.formDataChange.roleName = row.roleName
      this.formDataChange.roleSort = row.roleSort
      this.formDataChange.status = row.status
      this.dialogEditVisibleChange = true
    },
    // 删除单个角色按钮
    deleteRoleInfo(index, row) {
      this.$swal({
        text: '确定要删除角色信息吗？',
        icon: 'warning',
        buttons: {
          cancel: {
            text: '取消',
            visible: true
          },
          confirm: {
            text: '确定'
          }
        }
      }).then((willDelete) => {
        if (willDelete) {
          const formData = new FormData()
          formData.append('ids', row.roleId)
          removeRole(formData).then((response) => {
            if (response.code === 200) {
              this.$swal.success(response.msg)
            } else {
              this.$swal.error(response.msg)
            }
            this.getroleList(this.recordPageNum)
          }).catch(error => {
            console.log(error)
          })
        }
      })
    },
    // 删除多个角色按钮
    deleteAllRoleInfo() {
      this.$swal({
        text: '确定要删除角色信息吗？',
        icon: 'warning',
        buttons: {
          cancel: {
            text: '取消',
            visible: true
          },
          confirm: {
            text: '确定'
          }
        }
      }).then((willDelete) => {
        if (willDelete) {
          const arr = []
          for (const i in this.dataList) {
            arr.push(this.dataList[i].roleId)
          }
          const formData = new FormData()
          formData.append('ids', arr)
          removeRole(formData).then((response) => {
            if (response.code === 200) {
              this.$swal.success(response.msg)
            } else {
              this.$swal.error(response.msg)
            }
            if (this.recordListLength === 1) {
              this.getroleList(this.recordPageNum - 1)
            } else {
              this.getroleList(this.recordPageNum)
            }
          }).catch(error => {
            console.log(error)
          })
        }
      })
    },
    // 切换角色状态
    changeRoleStatus(value, index) {
      this.formDataChange.roleId = value.roleId
      this.formDataChange.roleName = value.roleName
      this.formDataChange.roleSort = value.roleSort
      this.formDataChange.menuIds = value.menuIds
      this.tableData.data[index].status = value.status === '1' ? '0' : '1'
      var text = ''
      if (value.status === '0') {
        text = '确认要停用角色吗?'
      } else {
        text = '确认要启用角色吗?'
      }
      this.$swal({
        text: text,
        icon: 'warning',
        buttons: {
          cancel: {
            text: '取消',
            visible: true
          },
          confirm: {
            text: '确定'
          }
        }
      }).then((willDelete) => {
        if (willDelete) {
          this.tableData.data[index].status = value.status === '1' ? '0' : '1'
          this.formDataChange.status = value.status
          const formData = new FormData()
          Object.keys(this.formDataChange).forEach((key) => {
            formData.append(key, this.formDataChange[key])
          })
          editRole(formData).then((response) => {
            if (response.code === 200) {
              this.$swal.success(response.msg)
            } else {
              this.$swal.error(response.msg)
            }
            this.getroleList(this.recordPageNum)
            this.dialogEditVisibleChange = false
          })
            .catch(error => {
              console.log(error)
            })
        } else {
          this.tableData.data[index].status = value.status
        }
      })
    },
    // 表格change事件
    handleSelectionChange(val) {
      if (val.length !== 0) {
        this.tableTrDataIsNull = false
      } else {
        this.tableTrDataIsNull = true
      }
      this.dataList = val
    },
    // 设置页面高度
    getWindowHeight() {
      this.windowHeight.height = window.innerHeight - 132 + 'px'
      setTimeout(() => {
        this.pageRightContent.height = document.getElementById('rightContentId').offsetHeight - 81 + 'px'
      }, 100)
    },
    // 新增保存按钮
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const formData = new FormData()
          Object.keys(this.formData).forEach((key) => {
            formData.append(key, this.formData[key])
          })
          addRole(formData).then((response) => {
            if (response.code === 200) {
              this.$swal.success(response.msg)
            } else {
              this.$swal.error(response.msg)
            }
            this.getroleList(this.recordPageNum)
            this.dialogEditVisible = false
          })
            .catch(error => {
              console.log(error)
            })
        } else {
          return false
        }
      })
    },
    // 编辑保存按钮
    onSubmitChange(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const formData = new FormData()
          Object.keys(this.formDataChange).forEach((key) => {
            formData.append(key, this.formDataChange[key])
          })
          editRole(formData).then((response) => {
            if (response.code === 200) {
              this.$swal.success(response.msg)
            } else {
              this.$swal.error(response.msg)
            }
            this.getroleList(this.recordPageNum)
            this.dialogEditVisibleChange = false
          })
            .catch(error => {
              console.log(error)
            })
        } else {
          return false
        }
      })
    },
    // 重置: 清空搜索表单
    resetPageInfo() {
      this.pageParameter = {
        roleName: '',
        status: '',
        pageNum: 1,
        pageSize: 10
      }
    },
    // 跳转到分配用户页面
    allotRoleInfo(index, row) {
      this.roleInfo(row)
      Cookies.set('roleId', row.roleId)
      this.$router.push({
        path: '/systemManage/allotRole',
        name: 'AllotRole',
        params: {
          roleId: row.roleId
        }
      })
    },
    handleCurrentChange(val) {
      this.recordPageNum = val
      this.getroleList(val)
    }
  }
}
