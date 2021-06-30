import { mapGetters } from 'vuex'
import { list, clean, remove, detail } from '@/api/operationLogApi.js'
import { mapActions } from 'vuex'
import { buttonList } from '@/api/buttonJurisdictionApi.js'
import Cookies from 'js-cookie'
import { parseTime } from '@/utils'
export default {
  name: 'OperationLog',
  data() {
    return {
      pageStatus: true,
      pageRightContent: {
        height: ''
      },
      dialogEditVisible: false,
      pageParameter: {
        title: '',
        businessType: '',
        operName: '',
        status: '',
        beginTime: '',
        endTime: '',
        pageNum: 1,
        pageSize: 10
      },
      exportExcelPageParameter: {
        title: '',
        businessType: '',
        operName: '',
        status: '',
        beginTime: '',
        endTime: '',
        pageNum: 1,
        pageSize: 99999999
      },
      recordPageNum: 1,
      recordListLength: 0,
      searchData: {
        roleName: '',
        status: ''
      },
      windowHeight: {
        height: ''
      },
      options: [{
        value: '0',
        label: '正常'
      }, {
        value: '1',
        label: '停用'
      }],
      options2: [{
        value: '0',
        label: '查询'
      }, {
        value: '1',
        label: '新增'
      }, {
        value: '2',
        label: '修改'
      }, {
        value: '3',
        label: '删除'
      }],
      tableData: {
        data: [],
        Total: 0
      },
      recordData: [],
      jurisdictionData: {
      },
      filename: '',
      autoWidth: true,
      bookType: 'xlsx',
      exportStatus: false
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },

  created() {
    this.getButtonJurisdiction()
  },
  mounted() {
    this.getList(1)
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
    businessType(type) {
      if (type === 1) {
        return '新增'
      } else if (type === 2) {
        return '修改'
      } else if (type === 3) {
        return '删除'
      } else if (type === 4) {
        return '查询'
      } else {
        return ''
      }
    },
    ...mapActions('user', [
      'roleInfo'
    ]),
    searchRoleDetailInfo() { },
    // 获取页面列表
    getList(pageNum) {
      this.pageStatus = true
      this.pageParameter.pageNum = pageNum
      const formData = new FormData()
      Object.keys(this.pageParameter).forEach((key) => {
        formData.append(key, this.pageParameter[key])
      })
      list(formData).then((response) => {
        this.pageStatus = false
        this.tableData.data = response.rows
        this.recordListLength = response.rows.length
        this.tableData.Total = response.total
      }).catch(error => {
        console.log(error)
      })
    },
    handleCheckChange() {
      const res = this.$refs.tree.getCheckedNodes()
      const arr = []
      res.forEach((item) => {
        arr.push(item.menuId)
      })
    },
    deleteOperationLog(index, row) {
      this.$swal({
        text: '确定要删除该条操作日志吗？',
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
          formData.append('operId', row.operId)
          remove(formData).then((response) => {
            if (response.code === 200) {
              this.$swal.success(response.msg)
            } else {
              this.$swal.error(response.msg)
            }
            if (this.recordListLength === 1) {
              this.getList(this.recordPageNum - 1)
            } else {
              this.getList(this.recordPageNum)
            }
          }).catch(error => {
            console.log(error)
          })
        }
      })
    },
    // 设置页面高度
    getWindowHeight() {
      this.windowHeight.height = window.innerHeight - 132 + 'px'
      setTimeout(() => {
        this.pageRightContent.height = document.getElementById('rightContentId').offsetHeight - 81 + 'px'
      }, 100)
    },
    resetPageInfo() {
      this.pageParameter = {
        title: '',
        businessType: '',
        operName: '',
        status: '',
        beginTime: '',
        endTime: '',
        pageNum: 1,
        pageSize: 10
      }
    },
    // 清空
    emptyBtn() {
      this.$swal({
        text: '确定要清空所有操作日志吗？',
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
          clean().then((response) => {
            if (response.code === 200) {
              this.$swal.success(response.msg)
            } else {
              this.$swal.error(response.msg)
            }
            this.getList(1)
          }).catch(error => {
            console.log(error)
          })
        }
      })
    },
    // 详细
    logDetail(index, row) {
      this.dialogEditVisible = true
      const formData = new FormData()
      formData.append('operId', row.operId)
      detail(row.operId).then((response) => {
        this.recordData = response.data.operLog
      }).catch(error => {
        console.log(error)
      })
    },
    handleCurrentChange(val) {
      this.getList(val)
      this.recordPageNum = val
    },
    // 导出Excel
    exportExcel() {
      this.exportStatus = true
      const formData = new FormData()
      Object.keys(this.exportExcelPageParameter).forEach((key) => {
        formData.append(key, this.exportExcelPageParameter[key])
      })
      list(formData).then((response) => {
        setTimeout(() => {
          this.exportStatus = false
          import('@/vendor/Export2Excel').then(excel => {
            const tHeader = ['日志编号', '系统模块', '操作类型', '操作人员', '部门名称', '主机', '操作地点', '操作状态', '操作时间']
            const filterVal = ['operId', 'title', 'businessType', 'operName', 'deptName', 'operIp', 'operLocation', 'status', 'operTime']
            const list = response.rows
            const data = this.formatJson(filterVal, list)
            excel.export_json_to_excel({
              header: tHeader,
              data,
              filename: this.filename,
              autoWidth: this.autoWidth,
              bookType: this.bookType
            })
          })
        }, 600)
      }).catch(error => {
        console.log(error)
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
