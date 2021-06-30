import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import { buttonList } from '@/api/buttonJurisdictionApi.js'
import { selectSysSms } from '@/api/systeMessagesApi.js'
import { createTask } from '@/api/operationInfoApi.js'

import Cookies from 'js-cookie'
export default {
  name: 'FailureWarning',
  data() {
    return {
      pageStatus: true,
      pageRightContent: {
        height: ''
      },
      tableTrDataIsNull: true,
      dialogEditTitle: '添加角色',
      dialogEditVisible: false,
      dialogEditVisibleAudit: false,
      dialogAddEqweight: false,
      formData: {
        roleName: '',
        roleSort: '',
        menuIds: []
      },
      mochaItem: {
        miid: 0,
        eqid: 0,
        elid: 0,
        eq_code: '',
        eq_name: '',
        eq_type: '',
        el_code: '',
        mi_type: '',
        mi_status: '',
        work_desc: '',
        work_no: '',
        msm_source_id: '',
        reFlag: ''
      },
      isDisabled: true,
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
      tableTrData: [],
      parentMenuId: [],
      defaultExpandAll: false,
      pageLeftIsShow: true,
      windowHeight: {
        height: ''
      },
      infoItem: {
        reFlag: ''
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
      pageParameter: {
        smType: '',
        smContent: '',
        pageNum: 1,
        pageSize: 10
      },
      recordPageNum: 1,
      recordListLength: 0,
      jurisdictionData: {
      },
      eqweightRules: {
        reFlag: [
          { required: true, message: '必填', trigger: 'blur' }
        ]
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
    this.getroleList(1)
    const $this = this
    this.$nextTick(() => {
      this.getWindowHeight()
    })
    window.onresize = () => {
      $this.getWindowHeight()
    }
  },
  methods: {
    toDetailsPage(index, row) {
      const vm = this
      if (row.miType === '保养') {
        sessionStorage.setItem('repairInfo', JSON.stringify(row))
        this.$router.push({ name: 'repairDetail' })
      } else if (row.miType === '呼叫') {
        Cookies.set('eqCode', row.eqCode)
        sessionStorage.setItem('miid', row.miid)
        vm.$router.push({ name: 'callDetail' })
      } else if (row.miType === '点检') {
        Cookies.set('eqCode', row.eqCode)
        sessionStorage.setItem('miid', row.miid)
        vm.$router.push({ name: 'spotCheckDetail' })
      } else if (row.miType === '故障' && row.fixType === '维修') {
        sessionStorage.setItem('equFix', JSON.stringify(row))
        this.$router.push({ name: 'fixDetail' })
      } else if (row.miType === '故障' && row.fixType === '维保') {
        row.eqfid = row.frid
        sessionStorage.setItem('faInfo', JSON.stringify(row))
        this.$router.push({ name: 'factoryDetail' })
      }
    },
    clickPresentTr(val) {
      this.$emit('selectProdVer', val)
      this.isDisabled = false
      this.tableTrData = val
      Cookies.set('info', val)
    },
    addEqweight() {
      // this.mochaItem = JSON.parse(Cookies.get('info'))
      if (this.tableTrData.workNo !== '' && this.tableTrData.workNo !== null) {
        this.$swal('当前设备已存在任务单号,不能再次生成任务单号')
      } else if (this.tableTrData.workStatus !== '待处理') {
        this.$swal('任务状态为待处理时才可以生成任务单！')
      } else if (this.tableTrData.workStatus === '待处理' && this.tableTrData.smType === '故障消息') {
        this.dialogAddEqweight = true
      } else {
        const formData = new FormData()
        if (this.tableTrData.elid === null || this.tableTrData.elid === undefined) {
          this.tableTrData.elid = 0
        }
        if (this.tableTrData.eqid === null || this.tableTrData.eqid === undefined) {
          this.tableTrData.eqid = 0
        }
        Object.keys(this.tableTrData).forEach((key) => {
          formData.append(key, this.tableTrData[key])
        })
        createTask(formData).then((response) => {
          if (response.code === 200) {
            this.$swal.success(response.msg)
          } else {
            this.$swal.error(response.msg)
          }
          this.getroleList(1)
          this.dialogAddEqweight = false
        })
          .catch(error => {
            console.log(error)
          })
      }
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.mochaItem = JSON.parse(Cookies.get('info'))
          this.mochaItem.reFlag = this.infoItem.reFlag
          const formData = new FormData()
          if (this.mochaItem.elid === null || this.mochaItem.elid === undefined) {
            this.mochaItem.elid = 0
          }
          if (this.mochaItem.eqid === null || this.mochaItem.eqid === undefined) {
            this.mochaItem.eqid = 0
          }
          Object.keys(this.mochaItem).forEach((key) => {
            formData.append(key, this.mochaItem[key])
          })
          createTask(formData).then((response) => {
            if (response.code === 200) {
              this.$swal.success(response.msg)
            } else {
              this.$swal.error(response.msg)
            }
            this.getroleList(1)
            this.dialogAddEqweight = false
          })
            .catch(error => {
              console.log(error)
            })
        }
      })
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
    getroleList(pageNum) {
      this.pageStatus = true
      this.pageParameter.pageNum = pageNum
      const formData = new FormData()
      Object.keys(this.pageParameter).forEach((key) => {
        formData.append(key, this.pageParameter[key])
      })
      selectSysSms(formData).then((response) => {
        this.pageStatus = false
        this.tableData.data = response.rows
        this.recordListLength = response.rows.length
        this.tableData.Total = response.total
      }).catch(error => {
        console.log(error)
      })
    },
    addAuditInfo() {
      this.dialogEditVisibleAudit = true
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
    // 重置: 清空搜索表单
    resetPageInfo() {
      this.pageParameter = {
        roleName: '',
        status: '',
        pageNum: 1,
        pageSize: 10
      }
    },
    handleCurrentChange(val) {
      this.recordPageNum = val
      this.getroleList(val)
    }
  }
}
