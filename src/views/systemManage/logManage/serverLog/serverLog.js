import { list } from '@/api/serverLogApi.js'
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
        ssName: '',
        pageNum: 1,
        pageSize: 10
      },
      windowHeight: {
        height: ''
      },
      tableData: {
        data: [],
        Total: 0
      }
    }
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
        this.tableData.Total = response.total
      }).catch(error => {
        console.log(error)
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
        ssName: '',
        pageNum: 1,
        pageSize: 10
      }
    },
    handleCurrentChange(val) {
      this.getList(val)
    }
  }
}
