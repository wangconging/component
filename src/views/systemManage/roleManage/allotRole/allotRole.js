import { mapGetters } from 'vuex'
import { allocatedList, unallocatedList, selectAll, cancelAll } from '@/api/allotRoleApi.js'
import Cookies from 'js-cookie'
import { Message } from 'element-ui'
export default {
  name: 'roleManage',
  data() {
    return {
      tableTrDataIsNull: true,
      dialogEditVisible: false,
      formData: {
        roleName: '',
        roleSort: '',
        menuIds: []
      },
      searchData: {
        roleName: '',
        status: ''
      },
      windowHeight: {
        height: ''
      },
      treeDatas: [],
      tableData: {
        data: [],
        Total: 0
      },
      tableDataAdd: {
        data: [],
        Total: 0
      },
      dataList: [],
      dataListAdd: [],
      pageParameter: {
        loginName: '',
        userName: '',
        roleId: '',
        pageNum: 1,
        pageSize: 10
      },
      pageParameterAdd: {
        loginName: '',
        userName: '',
        roleId: '',
        pageNum: 1,
        pageSize: 10
      },
      recordPageNum: 1,
      recordListLength: 0,
      addUser: {
        roleId: '',
        userIds: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  watch: {
  },
  created() {
    this.pageParameterAdd.roleId = Cookies.get('roleId')
    this.pageParameter.roleId = Cookies.get('roleId')
    this.addUser.roleId = Cookies.get('roleId')
    // this.pageParameter.roleId = this.$route.params.roleId
    this.getWindowHeight()
    const $this = this
    window.onresize = () => {
      $this.getWindowHeight()
    }
  },
  mounted() {
    this.getroleList(1)
  },
  methods: {
    // 获取页面列表
    getroleList(pageNum) {
      this.pageParameter.pageNum = pageNum
      const formData = new FormData()
      Object.keys(this.pageParameter).forEach((key) => {
        formData.append(key, this.pageParameter[key])
      })
      allocatedList(formData).then((response) => {
        this.tableData.data = response.rows
        this.recordListLength = response.rows.length
        this.tableData.Total = response.total
      }).catch(error => {
        console.log(error)
      })
    },
    addRoleInfo(pageNum) {
      this.dialogEditVisible = true
      this.pageParameterAdd.pageNum = pageNum
      const formData = new FormData()
      Object.keys(this.pageParameterAdd).forEach((key) => {
        formData.append(key, this.pageParameterAdd[key])
      })
      unallocatedList(formData).then((response) => {
        this.tableDataAdd.data = response.rows
        this.tableDataAdd.Total = response.total
      }).catch(error => {
        console.log(error)
      })
    },
    cancelUserInfo(index, row) {
      this.$swal({
        text: '确定要取消该用户角色吗？',
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
          formData.append('roleId', Cookies.get('roleId'))
          formData.append('userIds', row.userId)
          cancelAll(formData).then((response) => {
            if (response.code === 200) {
              this.$swal.success(response.msg)
            } else {
              this.$swal.error(response.msg)
            }
            this.getroleList()
          }).catch(error => {
            console.log(error)
          })
        }
      })
    },
    cancelUserInfoAll(index, row) {
      this.$swal({
        text: '确定要删除选中的数据吗？',
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
          let str = ''
          Object.keys(this.dataList).forEach((key) => {
            if (key > 0) {
              str += (',' + this.dataList[key].userId)
            } else {
              str += this.dataList[key].userId
            }
          })
          const formData = new FormData()
          formData.append('roleId', Cookies.get('roleId'))
          formData.append('userIds', str)
          cancelAll(formData).then((respose) => {
            if (respose.code === 200) {
              this.$swal.success(respose.msg)
            } else {
              this.$swal.error(respose.msg)
            }
            this.getroleList(this.recordPageNum)
          })
            .catch(error => {
              console.log(error)
            })
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
    handleSelectionChangeAdd(val) {
      this.dataListAdd = val
    },
    // 设置页面高度
    getWindowHeight() {
      this.windowHeight.height = window.innerHeight - 132 + 'px'
    },
    onSubmitAdd() {
      this.addUser.userIds = ''
      if (this.dataListAdd.length > 0) {
        Object.keys(this.dataListAdd).forEach((key) => {
          if (key > 0) {
            this.addUser.userIds += (',' + this.dataListAdd[key].userId)
          } else {
            this.addUser.userIds += this.dataListAdd[key].userId
          }
        })
        const formData = new FormData()
        Object.keys(this.addUser).forEach((key) => {
          formData.append(key, this.addUser[key])
        })
        selectAll(formData).then((respose) => {
          if (respose.code === 200) {
            this.$swal.success(respose.msg)
          } else {
            this.$swal.error(respose.msg)
          }
          this.getroleList(this.recordPageNum)
          this.dialogEditVisible = false
        })
          .catch(error => {
            console.log(error)
          })
      } else {
        Message({
          message: '请选择用户',
          type: 'error',
          duration: 5 * 1000
        })
      }
    },
    resetPageInfoAdd() {
      this.pageParameterAdd = {
        loginName: '',
        userName: '',
        roleId: '',
        pageNum: 1,
        pageSize: 10
      }
    },
    resetPageInfo() {
      this.pageParameter = {
        loginName: '',
        userName: '',
        roleId: '',
        pageNum: 1,
        pageSize: 10
      }
    },
    handleCurrentChange(val) {
      this.getroleList(val)
      this.recordPageNum = val
    },
    handleCurrentChangeAdd(val) {
      this.addRoleInfo(val)
    }
  }
}
