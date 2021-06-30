import elementIcons from './element-icons'
import { mapGetters } from 'vuex'
import { listAll, addMenu, remove, editMenu, selectAllAppMenu } from '@/api/menuManageApi.js'
export default {
  name: 'MenuManage',
  data() {
    return {
      menuIdInfo: '',
      pageStatus: true,
      pageRightContent: {
        height: ''
      },
      MENUID: '',
      checkMenuUrlIsTrue: false,
      options: [{
        value: '00',
        label: '查看'
      }, {
        value: '0',
        label: '新增'
      }, {
        value: '1',
        label: '编辑'
      }, {
        value: '2',
        label: '删除'
      }, {
        value: '3',
        label: '编辑策略'
      }, {
        value: '4',
        label: '生成任务单'
      }, {
        value: '5',
        label: '添加任务'
      }, {
        value: '6',
        label: '设备维修'
      }, {
        value: '7',
        label: '维修确认'
      }, {
        value: '8',
        label: '维保申请'
      }, {
        value: '9',
        label: '维保审核'
      }, {
        value: '10',
        label: '维保确认'
      }, {
        value: '11',
        label: '维保评价'
      }, {
        value: '12',
        label: '申请'
      }, {
        value: '13',
        label: '审核'
      }, {
        value: '14',
        label: 'bom'
      }, {
        value: '15',
        label: '保养'
      }, {
        value: '16',
        label: '点检'
      }, {
        value: '17',
        label: 'Spc'
      }, {
        value: '18',
        label: '打开'
      }, {
        value: '19',
        label: '下载'
      }, {
        value: '20',
        label: '导入'
      }, {
        value: '21',
        label: '导出'
      }, {
        value: '22',
        label: '强制结束'
      }, {
        value: '23',
        label: '新增保养'
      }, {
        value: '24',
        label: '设备保养'
      }, {
        value: '25',
        label: '保养确认'
      }, {
        value: '26',
        label: '提交'
      }, {
        value: '27',
        label: '取消'
      }, {
        value: '28',
        label: '确认'
      },
      {
        value: '29',
        label: '忽略'
      }],
      keywordSearchVal: '',
      higherMenuName: '主目录',
      treeDatas: [],
      inputIsShow: true,
      parentMenuId: [],
      searchMenuInfo: '',
      jurisdictionVisible: false,
      readonly: true,
      iconsIsShow: false,
      elementIcons,
      dialogEditTitle: '新增',
      dialogEditVisible: false,
      formData: {
        name: '',
        orderNum: '',
        url: ''
      },
      rules: {
        name: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        orderNum: [
          { required: true, message: '必填', trigger: 'blur' }
        ]
      },
      defaultExpandAll: false,
      pageLeftIsShow: true,
      input: '',
      currentRole: 'adminDashboard',
      windowHeight: {
        height: ''
      },
      defaultProps: {
        children: 'children',
        label: 'menuName'
      },
      multipleSelection: [],
      tableTrData: [],
      menuAllList: [],
      menuName: '',
      jurisdictionData: {
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
    'formData.menuType': {
      handler() {
        if (this.formData.menuType === '1') {
          this.inputIsShow = false
        } else {
          this.inputIsShow = true
        }
      }
    },
    keywordSearchVal() {
      this.searchAddMenuch(this.keywordSearchVal)
    }
  },
  created() {
    this.menuListAll()
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
    // 页面列表
    menuListAll() {
      this.pageStatus = true
      const formData = new FormData()
      formData.append('name', this.searchMenuInfo)
      selectAllAppMenu(formData).then((response) => {
        this.pageStatus = false
        this.menuAllList = response.data.menuAppList
      }).catch(error => {
        console.log(error)
      })
    },

    // 新增编辑菜单信息 点击获取菜单信息
    handleNodeClick(data) {
      this.menuName = data.menuName
      this.formData.parentId = data.menuId
    },
    // 添加提交菜单名称
    submitMenuName() {
      if (this.menuName !== '') {
        this.higherMenuName = this.menuName
        this.jurisdictionVisible = false
      } else {
        this.$message.error('请选择菜单！')
      }
    },
    // 图标列表
    getMenuInfo() {
      this.jurisdictionVisible = true
    },
    // input获取焦点时触发
    getIcons() {
      this.iconsIsShow = true
    },
    loseIcons() {
      setTimeout(() => {
        this.iconsIsShow = false
      }, 200)
    },
    generateElementIconCode(symbol) {
      return `el-icon-${symbol}`
    },
    handleClipboard(text, event) {
      this.formData.icon = text
    },
    // 新增菜单按钮
    addInfo() {
      this.formData = {
        name: '',
        url: '',
        orderNum: ''
      }
      this.dialogEditTitle = '新增菜单'
      this.dialogEditVisible = true
    },
    // 新增编辑: 菜单列表
    menuListAllTree() {
      listAll().then((response) => {
        this.treeDatas = response.data.menuList
      }).catch(error => {
        console.log(error)
      })
    },
    // 添加菜单信息
    addMenuInfo(index, row) {
      this.formData = {
        parentId: 1,
        menuType: '',
        menuName: '',
        url: '',
        orderNum: '',
        icon: ''
      }
      this.formData.parentId = row.parentId
      this.formData.menuId = row.menuId
      this.higherMenuName = row.menuName
    },
    // 编辑菜单按钮
    changeInfo(index, row) {
      this.menuIdInfo = row.id
      this.formData.name = row.name
      this.formData.url = row.url
      this.formData.orderNum = row.orderNum
      this.dialogEditTitle = '编辑菜单'
      this.dialogEditVisible = true
    },
    hidePageLeft() { // 隐藏左边tree
      this.pageLeftIsShow === true ? this.pageLeftIsShow = false : this.pageLeftIsShow = true
    },
    // 设置页面高度
    getWindowHeight() {
      this.windowHeight.height = window.innerHeight - 132 + 'px'
      setTimeout(() => {
        this.pageRightContent.height = document.getElementById('rightContentId').offsetHeight - 91 + 'px'
      }, 300)
    },
    // 提交新增菜单 编辑菜单
    onSubmit(formName) {
      if (this.dialogEditTitle === '新增菜单') {
        this.$refs[formName].validate(valid => {
          if (valid) {
            const formData = new FormData()
            Object.keys(this.formData).forEach((key) => {
              formData.append(key, this.formData[key])
            })
            if (this.checkMenuUrlIsTrue !== true) {
              addMenu(formData).then((response) => {
                if (response.code === 200) {
                  this.$swal.success(response.msg)
                } else {
                  this.$swal.error(response.msg)
                }
                this.dialogEditVisible = false
                this.menuListAll()
              })
                .catch(error => {
                  console.log(error)
                })
            } else {
              this.$message.error('请求地址已存在，请重新填写！')
            }
          } else {
            return false
          }
        })
      } else if (this.dialogEditTitle === '编辑菜单') {
        this.$refs[formName].validate(valid => {
          if (valid) {
            const formData = new FormData()
            Object.keys(this.formData).forEach((key) => {
              formData.append(key, this.formData[key])
            })
            formData.append('id', this.menuIdInfo)
            editMenu(formData).then((response) => {
              if (response.code === 200) {
                this.$swal.success(response.msg)
              } else {
                this.$swal.error(response.msg)
              }
              this.menuListAll()
              this.dialogEditVisible = false
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
    // 删除菜单信息
    deleteData(index, row) {
      console.log(row)
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
          remove(row.id).then((response) => {
            if (response.code === 200) {
              this.$swal.success(response.msg)
            } else {
              this.$swal.error(response.msg)
            }
            this.menuListAll()
          }).catch(error => {
            console.log(error)
          })
        }
      })
    },
    // 页面: 搜索菜单列表
    searchMenuch(searchMenuInfo) {
      const formData = new FormData()
      formData.append('menuName', searchMenuInfo)
      listAll(formData).then((response) => {
        this.menuAllList = response.data.menuList
      }).catch(error => {
        console.log(error)
      })
    },
    // 弹出框: 搜索菜单信息
    searchAddMenuch(searchMenuInfo) {
      const formData = new FormData()
      formData.append('menuName', searchMenuInfo)
      listAll(formData).then((response) => {
        this.treeDatas = response.data.menuList
      }).catch(error => {
        console.log(error)
      })
    },
    // 重置输入框
    resetPageInfo() {
      this.searchMenuInfo = ''
    },
    changeRadio() {
      this.formData.menuName = ''
    }
  }
}
