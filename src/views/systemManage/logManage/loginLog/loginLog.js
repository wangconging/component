import { mapGetters } from 'vuex'
import { list, clean, remove } from '@/api/loginLogApi.js'
import { mapActions } from 'vuex'
import { buttonList } from '@/api/buttonJurisdictionApi.js'
import Cookies from 'js-cookie'
import { parseTime } from '@/utils'
export default {
  name: 'OperationLog',
  data() {
    return {
      pageRightContent: {
        height: ''
      },
      dialogEditVisible: false,
      searchData: {
        roleName: '',
        status: ''
      },
      pageParameter: {
        ipaddr: '',
        loginName: '',
        status: '',
        beginTime: '',
        endTime: '',
        pageNum: 1,
        pageSize: 10
      },
      exportExcelPageParameter: {
        ipaddr: '',
        loginName: '',
        status: '',
        beginTime: '',
        endTime: '',
        pageNum: 1,
        pageSize: 9999999999999
      },
      recordPageNum: 1,
      recordListLength: 0,
      windowHeight: {
        height: ''
      },
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
    ...mapActions('user', [
      'roleInfo'
    ]),
    searchRoleDetailInfo() { },
    // 获取页面列表
    getList(pageNum) {
      this.pageParameter.pageNum = pageNum
      const formData = new FormData()
      Object.keys(this.pageParameter).forEach((key) => {
        formData.append(key, this.pageParameter[key])
      })
      list(formData).then((response) => {
        this.recordListLength = response.rows.length
        this.tableData.data = response.rows
        this.tableData.Total = response.total
      }).catch(error => {
        console.log(error)
      })
    },
    deleteLoginLog(index, row) {
      this.$swal({
        text: '确定要删除该条登录日志吗？',
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
          formData.append('infoId', row.infoId)
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
        ipaddr: '',
        loginName: '',
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
            this.getList()
          }).catch(error => {
            console.log(error)
          })
        }
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
            const tHeader = ['访问编号', '登录名称', '登录地址', '登录地点', '浏览器', '操作系统', '登录状态', '操作信息', '登录时间']
            const filterVal = ['infoId', 'loginName', 'ipaddr', 'loginLocation', 'browser', 'os', 'status', 'msg', 'loginTime']
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
