import { mapGetters } from 'vuex'
import { listRoleNames, add, edit, resetPwd, remove, selectUserList } from '@/api/userManageApi.js'
import { mapActions } from 'vuex'
import getInitial from '../../../utils/getInitial.js'
export default {
  name: 'userManage',
  data() {
    return {
      passwordAffirm: '',
      pageStatus: true,
      vLoading: true,
      parentDeptId: [],
      keywordSearchVal: '',
      jurisdictionVisible: false,
      loginName: '',
      checkAll: false,
      checkList: [],
      data: [],
      tableTrDataIsNull: true,
      dialogEditTitle: '添加角色',
      dialogEditVisible: false,
      dialogEditVisibleChange: false,
      dialogEditVisiblechangePwd: false,
      formData: {
        roleId: '',
        loginName: '',
        userName: '',
        sex: '',
        password: '',
        avatar: '/touxiang',
        sort: '',
        phone: null
      },
      formDataChange: {
        roleId: '',
        loginName: '',
        userName: '',
        sex: '',
        avatar: '/touxiang',
        status: '',
        userId: '',
        sort: '',
        phone: null
      },
      formDataChangePwd: {
        userId: '',
        passWord: ''
      },
      searchData: {
        userName: '',
        status: '',
        beginTime: '',
        endTime: ''
      },
      rules: {
        userName: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        loginName: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        deptId: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        passwordAffirm: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '必填', trigger: 'blur' }
        ]
      },
      ruleschange: {
        userName: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        loginName: [
          { required: true, message: '必填', trigger: 'blur' }
        ]
      },
      ruleschangePwd: {
        passWord: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        passwordAffirm: [
          { required: true, message: '必填', trigger: 'blur' }
        ]
      },
      defaultProps: {
        children: 'children',
        label: 'deptName'
      },
      defaultExpandAll: false,
      pageLeftIsShow: true,
      windowHeight: {
        height: ''
      },
      pageRightContent: {
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
      roleListData: [],
      pageTreeData: [],
      pageParameter: {
        userName: '',
        status: '',
        beginTime: '',
        endTime: '',
        pageNum: 1,
        pageSize: 10
      },
      recordPageNum: 1,
      recordListLength: 0,
      jurisdictionData: {}
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  watch: {
    keywordSearchVal() {
      // this.searchAddDept(this.keywordSearchVal)
    }
  },
  created() {

  },
  mounted() {
    const $this = this
    this.getUserList(1)
    this.listRoleNames()
    // this.listAll()
    // this.listAllSelect()
    this.$nextTick(() => {
      this.getWindowHeight()
    })
    window.onresize = () => {
      $this.getWindowHeight()
    }
  },
  methods: {
    getDpetInfo(data) {
      this.getUserList(1)
    },
    // 获取用户列表
    getUserList(pageNum) {
      this.pageStatus = true
      this.pageParameter.pageNum = pageNum
      const formData = new FormData()
      Object.keys(this.pageParameter).forEach((key) => {
        formData.append(key, this.pageParameter[key])
      })
      selectUserList(formData).then((response) => {
        this.pageStatus = false
        this.tableData.data = response.rows
        this.recordListLength = response.rows.length
        this.tableData.Total = response.total
      }).catch((error) => {
        console.log(error)
      })
    },
    // 获取角色ID
    listRoleNames() {
      listRoleNames().then((response) => {
        this.roleListData = response.data.RoleList
      })
        .catch(error => {
          console.log(error)
        })
    },
    // 刷新:组织机构
    refreshTree() {
      // this.listAll()
    },
    ...mapActions('user', [
      'roleInfo'
    ]),
    // 页面搜索
    searchDetailInfo() {
      const formData = new FormData()
      Object.keys(this.searchData).forEach((key) => {
        formData.append(key, this.searchData[key])
      })
    },
    // 新增用户
    addRoleInfo() {
      this.dialogEditVisible = true
      this.dialogEditTitle = '添加角色'
    },
    // 编辑用户
    changeInfo(index, row) {
      this.parentDeptId = []
      this.formDataChange.roleId = row.roleId
      this.formDataChange.loginName = row.loginName
      this.formDataChange.userName = row.userName
      this.formDataChange.sex = row.sex
      this.formDataChange.avatar = row.avatar
      this.formDataChange.status = row.status
      this.formDataChange.userId = row.userId
      this.dialogEditVisibleChange = true
    },
    // 删除用户
    deleteInfo(index, row) {
      this.$swal({
        text: '确定要删除用户吗？',
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
          formData.append('userId', row.userId)
          remove(formData).then((response) => {
            if (response.code === 200) {
              this.$swal.success(response.msg)
              if (this.recordListLength === 1) {
                this.getUserList(this.recordPageNum - 1)
              } else {
                this.getUserList(this.recordPageNum)
              }
            } else {
              this.$swal.error(response.msg)
            }
          }).catch(error => {
            console.log(error)
          })
        }
      })
    },
    // 隐藏左边tree
    hidePageLeft() {
      this.pageLeftIsShow === true ? this.pageLeftIsShow = false : this.pageLeftIsShow = true
    },
    // 修改用户状态
    changeStatus(value, index) {
      value.roles ? this.formDataChange.roleId = value.roles.roleId : this.formDataChange.roleId = ''
      this.formDataChange.loginName = value.loginName
      this.formDataChange.userName = value.userName
      this.formDataChange.sex = value.sex
      this.formDataChange.status = value.status
      this.formDataChange.userId = value.userId
      this.tableData.data[index].status = value.status === '1' ? '0' : '1'
      var text = ''
      if (value.status === '0') {
        text = '确认要停用用户吗?'
      } else {
        text = '确认要启用用户吗?'
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
          edit(formData).then((response) => {
            if (response.code === 200) {
              this.$swal.success(response.msg)
            } else {
              this.$swal.error(response.msg)
            }
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
      }, 300)
    },
    onSubmit(formName) { // 新增用户
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.formData.password === this.formData.passwordAffirm) {
            this.formData.sort = getInitial.makePy(this.formData.userName)[0].split('')[0].toUpperCase()
            const formData = new FormData()
            Object.keys(this.formData).forEach((key) => {
              formData.append(key, this.formData[key])
            })
            add(formData).then((response) => {
              if (response.code === 200) {
                this.$swal.success(response.msg)
              } else {
                this.$swal.error(response.msg)
              }
              this.dialogEditVisible = false
              this.getUserList(this.recordPageNum)
            })
              .catch(error => {
                console.log(error)
              })
          } else {
            this.$swal.error('密码两次输入的不一致')
          }
        } else {
          return false
        }
      })
    },
    // 编辑用户
    onSubmitChange(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.formDataChange.sort = getInitial.makePy(this.formDataChange.userName)[0].split('')[0].toUpperCase()
          const formData = new FormData()
          Object.keys(this.formDataChange).forEach((key) => {
            formData.append(key, this.formDataChange[key])
          })
          edit(formData).then((response) => {
            if (response.code === 200) {
              this.$swal.success(response.msg)
            } else {
              this.$swal.error(response.msg)
            }
            this.dialogEditVisibleChange = false
            this.getUserList(this.recordPageNum)
          })
            .catch(error => {
              console.log(error)
            })
        } else {
          return false
        }
      })
    },
    // 修改密码
    onSubmitChangePwd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.formDataChangePwd.passWord === this.formDataChangePwd.passwordAffirm) {
            const formData = new FormData()
            Object.keys(this.formDataChangePwd).forEach((key) => {
              formData.append(key, this.formDataChangePwd[key])
            })
            resetPwd(formData).then((response) => {
              if (response.code === 200) {
                this.$swal.success(response.msg)
              } else {
                this.$swal.error(response.msg)
              }
              this.dialogEditVisiblechangePwd = false
              this.getUserList(this.recordPageNum)
            })
              .catch(error => {
                console.log(error)
              })
          } else {
            this.$swal.error('密码两次输入的不一致')
          }
        } else {
          return false
        }
      })
    },
    // 重置
    resetPageInfo() {
      this.pageParameter = {
        userName: '',
        status: '',
        beginTime: '',
        endTime: '',
        pageNum: 1,
        pageSize: 10
      }
    },
    // 修改密码
    changePassWord(index, row) {
      this.loginName = row.loginName
      this.formDataChangePwd.userId = row.userId
      this.dialogEditVisiblechangePwd = true
    },
    // 弹出框: 提交部门
    submitSection() {
      this.jurisdictionVisible = false
    },
    // 获取部门信息弹出框
    getSectionInfo() {
      this.jurisdictionVisible = true
    },
    // 部门信息选择
    handleNodeClick(data) {
    },
    handleCurrentChange(val) {
      this.recordPageNum = val
      this.getUserList(val)
    }
  }
}
