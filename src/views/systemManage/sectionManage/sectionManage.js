import { mapGetters } from 'vuex'
import { remove, add, selectList, edit } from '@/api/sectionManageApi.js'
import { buttonList } from '@/api/buttonJurisdictionApi.js'
import Cookies from 'js-cookie'
export default {
  name: 'sectionManage',
  data() {
    return {
      pageStatus: true,
      pageRightContent: {
        height: ''
      },
      dataTreeAllList: [],
      deptName: '',
      haschildren: true,
      keywordSearchVal: '',
      higherMenuName: '总公司',
      inputIsShow: true,
      parentDeptId: [],
      searchData: {
        deptName: ''
      },
      jurisdictionVisible: false,
      readonly: true,
      iconsIsShow: false,
      dialogEditTitle: '新增',
      dialogEditVisible: false,
      options: [{
        value: '',
        label: '所有'
      }, {
        value: '0 ',
        label: '正常'
      }, {
        value: ' 1',
        label: '停用'
      }],
      formData: {
        parentId: 0,
        remark: '',
        deptName: '',
        orderNum: '',
        status: ''
      },
      rules: {
        deptName: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        orderNum: [
          { required: true, message: '必填', trigger: 'blur' }
        ]
      },
      defaultExpandAll: false,
      input: '',
      currentRole: 'adminDashboard',
      windowHeight: {
        height: ''
      },
      defaultProps: {
        children: 'children',
        label: 'deptName'
      },
      multipleSelection: [],
      tableTrData: [],
      dataAllList: [],
      menuName: '',
      jurisdictionData: {
        // add: false,
        // edit: false,
        // remove: true,
        // allocate: false
      }
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ]),
    tableTrDataIsNull() {
      if (this.tableTrData.length === 0) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    keywordSearchVal() {
      this.searchAddInfo(this.keywordSearchVal)
    }
  },
  created() {
    this.getButtonJurisdiction()
    // this.listAll()
    // this.getTreeDatalist()
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  },
  mounted() {
    const $this = this
    this.$nextTick(() => {
      this.getWindowHeight()
    })
    window.onresize = () => {
      $this.getWindowHeight()
    }
  },
  methods: {
    // 获取按钮权限
    getButtonJurisdiction() {
      const formData = new FormData()
      formData.append('menuId', Cookies.get('menuId_sidebar'))
      buttonList(formData).then((response) => {
        this.jurisdictionData = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    // 新增编辑 部门选择
    handleNodeClick(data) {
      this.deptName = data.deptName
      this.formData.parentId = data.deptId
    },
    // 页面部门列表数据
    listAll() {
      this.pageStatus = true
      const formData = new FormData()
      formData.append('deptName', this.keywordSearchVal)
      selectList(formData).then((response) => {
        this.pageStatus = false
        this.dataAllList = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    // 新增编辑 部门选择数据
    getTreeDatalist() {
      selectList().then((response) => {
        this.dataTreeAllList = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    // 添加提交菜单名称
    submitMenuName() {
      this.higherMenuName = this.deptName
      this.jurisdictionVisible = false
    },
    // 图标列表
    getMenuInfo() {
      this.jurisdictionVisible = true
    },
    generateElementIconCode(symbol) {
      return `el-icon-${symbol}`
    },
    handleClipboard(text, event) {
      this.formData.icon = text
    },
    // 新增部门按钮
    addInfo() {
      this.keywordSearchVal = ''
      this.formData = {
        parentId: 0,
        remark: '',
        deptName: '',
        orderNum: '',
        status: ''
      }
      this.higherMenuName = '总公司'
      this.dialogEditTitle = '新增部门'
      this.dialogEditVisible = true
    },
    // 编辑部门按钮
    changeInfo(index, row) {
      this.keywordSearchVal = ''
      this.listAll()
      this.parentDeptId = []
      this.parentDeptId.push(row.deptId)
      this.formData.deptId = row.deptId
      this.formData.parentId = row.parentId
      this.formData.remark = row.remark
      this.formData.deptName = row.deptName
      this.formData.orderNum = row.orderNum
      this.formData.status = row.status
      this.dialogEditTitle = '编辑部门'
      this.dialogEditVisible = true
    },
    // 表格change事件
    handleSelectionChange(val) {
      if (val.length > 1) {
        this.$refs.multipleTable.clearSelection()
        this.$refs.multipleTable.toggleRowSelection(val.pop())
      } else {
        this.multipleSelection = val.pop()
      }
    },
    // 单击表格
    handleRowClick(row, column, event) {
      this.tableTrData = []
      this.tableTrData.push(row)
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    // 设置页面高度
    getWindowHeight() {
      this.windowHeight.height = window.innerHeight - 132 + 'px'
      setTimeout(() => {
        this.pageRightContent.height = document.getElementById('rightContentId').offsetHeight - 91 + 'px'
      }, 100)
    },
    // 保存新增、编辑部门
    onSubmit(formName) {
      if (this.dialogEditTitle === '新增部门') {
        this.$refs[formName].validate(valid => {
          if (valid) {
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
              this.listAll()
            })
              .catch(error => {
                console.log(error)
              })
          } else {
            return false
          }
        })
      } else if (this.dialogEditTitle === '编辑部门') {
        this.$refs[formName].validate(valid => {
          if (valid) {
            const formData = new FormData()
            Object.keys(this.formData).forEach((key) => {
              formData.append(key, this.formData[key])
            })
            edit(formData).then((response) => {
              if (response.code === 200) {
                this.$swal.success(response.msg)
              } else {
                this.$swal.error(response.msg)
              }
              this.dialogEditVisible = false
              this.listAll()
            })
              .catch(error => {
                console.log(error)
              })
          } else {
            return false
          }
        })
      }
    },
    // 删除
    deleteData(index, row) {
      this.$swal({
        text: '确定删除该数据吗？',
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
          remove(row.deptId).then((response) => {
            if (response.code === 200) {
              this.$swal.success(response.msg)
            } else {
              this.$swal.error(response.msg)
            }
            this.dataAllList = []
            this.listAll()
          }).catch(error => {
            console.log(error)
          })
        }
      })
    },
    // 页面搜索
    searchInfo() {
      const formData = new FormData()
      Object.keys(this.searchData).forEach((key) => {
        formData.append(key, this.searchData[key])
      })
      selectList(formData).then((response) => {
        this.dataAllList = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    // 弹出框搜索
    searchAddInfo(searchInfo) {
      const formData = new FormData()
      formData.append('deptName', searchInfo)
      selectList(formData).then((response) => {
        this.dataTreeAllList = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    // 重置
    resetPageInfo() {
      this.searchData.deptName = ''
    }
  }
}
