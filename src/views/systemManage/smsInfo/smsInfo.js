import { mapGetters } from 'vuex'
import { selectSmsList, updateStatus } from '@/api/smsUserApi.js'
import { mapActions } from 'vuex'
import { buttonList } from '@/api/buttonJurisdictionApi.js'
import Cookies from 'js-cookie'
export default {
  name: 'smsInfo',
  data() {
    return {
      pageRightContent: {
        height: ''
      },
      tableTrDataIsNull: true,
      windowHeight: {
        height: ''
      },
      tableData: {
        data: [],
        Total: 0
      },
      dataList: [],
      pageParameter: {
        pageNum: 1,
        pageSize: 10
      },
      recordPageNum: 1,
      recordListLength: 0,
      jurisdictionData: {
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
    this.getButtonJurisdiction()
  },
  mounted() {
    this.getSmsList(1)
    const $this = this
    this.$nextTick(() => {
      this.getWindowHeight()
    })
    window.onresize = () => {
      $this.getWindowHeight()
    }
  },
  methods: {
    editStatus(index, row) {
      const formData = new FormData()
      formData.append('smId', row.smId)
      updateStatus(formData).then((response) => {
        if (response.code === 200) {
          this.$swal.success(response.msg)
        } else {
          this.$swal.error(response.msg)
        }
        this.getSmsList(1)
      })
    },
    clickPresentTr(val) {
      this.$emit('selectProdVer', val)
    },
    inputFunction() {
      this.dialogExpress = true
    },
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
    // 获取页面列表
    getSmsList(pageNum) {
      this.pageParameter.pageNum = pageNum
      this.pageParameter.userId = JSON.parse(Cookies.get('userData')).user.userId
      const formData = new FormData()
      Object.keys(this.pageParameter).forEach((key) => {
        formData.append(key, this.pageParameter[key])
      })
      selectSmsList(formData).then((response) => {
        this.tableData.data = response.rows
        this.recordListLength = response.rows.length
        this.tableData.Total = response.total
      }).catch(error => {
        console.log(error)
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
        this.pageRightContent.height = document.getElementById('rightContentId').offsetHeight - 91 + 'px'
      }, 100)
    },
    // 重置: 清空搜索表单
    resetPageInfo() {
      this.pageParameter = {
        eqCode: '',
        pageNum: 1,
        pageSize: 10
      }
      this.getSmsList()
    },
    handleCurrentChange(val) {
      this.recordPageNum = val
      this.getSmsList(val)
    }
  }
}
