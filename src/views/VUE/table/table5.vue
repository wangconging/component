<template>
  <div class="page-info">
    <el-calendar v-model="value" />
    <el-dialog :visible.sync="dialogEditVisible" :close-on-click-modal="false" :title="dialogEditTitle" width="600px">
      <el-form ref="form" :model="formData" label-width="160px" label-position="right" size="mini" :rules="rules">
        <el-form-item label="产品名称：" prop="productName">
          <el-input v-model="formData.productName" size="mini" />
        </el-form-item>
        <el-form-item label="产品编码：" prop="productCode">
          <el-input v-model="formData.productCode" size="mini" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button :loading="formLoading" type="primary" size="mini" @click="handlesave">保存</el-button>
        <el-button size="mini" @click="dialogEditVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <el-table :data="tableData" :span-method="objectSpanMethod" border style="width: 100%; margin-top: 20px" :header-cell-class-name="theadSpan" @cell-click="getNowCell">
      <el-table-column prop="id" label="工序 / 日期" width="180" align="center" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="amount1" label="1">
        <template slot-scope="{row}">
          <div v-if="row.amount1.length > 0">
            <div v-for="(item, index) in row.amount1" :key="index">
              <div> {{ item.productName }}</div>
              <div> {{ item.productCode }}</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="amount2" label="2" />
      <el-table-column prop="amount3" label="3" />
      <el-table-column prop="amount4" label="4" />
      <el-table-column prop="amount5" label="5" />
      <el-table-column prop="amount6" label="6" />
      <el-table-column prop="amount7" label="7" />
      <el-table-column prop="amount8" label="8" />
      <el-table-column prop="amount9" label="9" />
      <el-table-column prop="amount10" label="10" />
      <el-table-column prop="amount11" label="11" />
      <el-table-column prop="amount12" label="12" />
      <el-table-column prop="amount13" label="13" />
      <el-table-column prop="amount14" label="14" />
      <el-table-column prop="amount15" label="15" />
      <el-table-column prop="amount16" label="16" />
      <el-table-column prop="amount17" label="17" />
      <el-table-column prop="amount18" label="18" />
      <el-table-column prop="amount19" label="19" />
      <el-table-column prop="amount20" label="20" />
      <el-table-column prop="amount21" label="21" />
      <el-table-column prop="amount22" label="22" />
      <el-table-column prop="amount23" label="23" />
      <el-table-column prop="amount24" label="24" />
      <el-table-column prop="amount25" label="25" />
      <el-table-column prop="amount26" label="26" />
      <el-table-column prop="amount27" label="27" />
      <el-table-column prop="amount28" label="28" />
      <el-table-column prop="amount29" label="29" />
      <el-table-column prop="amount30" label="30" />
      <el-table-column prop="amount30" label="31" />
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: new Date(),
      formLoading: false,
      dialogEditTitle: '新增产品',
      formData: {
        productName: '',
        productCode: ''
      },
      rules: {
        productCode: [
          { required: true, message: '请输入产品编码', trigger: 'blur' }
        ],
        productName: [
          { required: true, message: '请输入产品名称', trigger: 'blur' }
        ]
      },
      dialogEditVisible: false,
      rowList: [],
      spanArr: [],
      position: 0,
      tableData: []
    }
  },
  mounted() {
    this.queryData()
    // dom渲染完成后 操作表头合并
    this.$nextTick(() => {
      this.setColSpan()
      // 点击前一个月
      const prevBtn = document.querySelector(
        '.page-info .el-calendar__button-group .el-button-group>button:nth-child(1)'
      )
      console.log(prevBtn)
      if (prevBtn) {
        prevBtn.addEventListener('click', e => {
          console.log('点击前一个月')
          // this.getJobSchList(this.getCurrentMonthFirst(this.value2), this.pageParameter.pageNum, this.pageParameter.jobName)
        })
        // 点击下一个月
        const nextBtn = document.querySelector(
          '.page-info .el-calendar__button-group .el-button-group>button:nth-child(3)'
        )
        nextBtn.addEventListener('click', () => {
          console.log('点击下一个月')
          // this.getJobSchList(this.getCurrentMonthFirst(this.value2), this.pageParameter.pageNum, this.pageParameter.jobName)
        })
        // 点击今天
        const todayBtn = document.querySelector(
          '.page-info .el-calendar__button-group .el-button-group>button:nth-child(2)'
        )
        todayBtn.addEventListener('click', () => {
          console.log('点击今天')
          // this.getJobSchList(this.getCurrentMonthFirst(this.value2), this.pageParameter.pageNum, this.pageParameter.jobName)
        })
      }
    })
  },
  methods: {
    handlesave() {
      this.dialogEditVisible = false
      this.tableData[0].amount1 = [
        {
          productName: '产线1产线1',
          productCode: '111'
        }, {
          productName: '产线2产线1产线1',
          productCode: '222'
        }, {
          productName: '产线3',
          productCode: '333'
        }, {
          productName: '产线4',
          productCode: '444'
        }
      ]
      console.log('save')
    },
    getNowCell(row, column, cell, event) {
      if (column.property === 'id' || column.property === 'name') {
        return
      }
      this.dialogEditVisible = true
      console.log(row)
      console.log(column)
      console.log(cell)
    },
    queryData() { // 查询操作
      this.tableData = [{
        id: '工序1',
        name: '设备1',
        amount1: [{
          productName: '产线1',
          productCode: 'ND221'
        }, {
          productName: '产线2',
          productCode: 'NC222'
        }, {
          productName: '产线3',
          productCode: 'NF223'
        }, {
          productName: '产线4',
          productCode: 'NA22'
        }],
        amount2: '3.2',
        amount3: 10,
        amount4: '234',
        amount5: '3.2',
        amount6: 10,
        amount7: '234',
        amount8: '3.2',
        amount9: 10,
        amount10: '234',
        amount11: '3.2',
        amount12: 10,
        amount13: '234',
        amount14: '3.2',
        amount15: 10,
        amount16: '234',
        amount17: '3.2',
        amount18: 10,
        amount19: '234',
        amount20: '3.2',
        amount21: 10,
        amount22: '234',
        amount23: '3.2',
        amount24: 10,
        amount25: '234',
        amount26: '3.2',
        amount27: 10,
        amount28: '234',
        amount29: '3.2',
        amount30: 10,
        amount31: 10
      }, {
        id: '工序1',
        name: '设备2',
        amount1: [{
          productName: '产线1',
          productCode: 'N221'
        }],
        amount2: '3.2',
        amount3: 10,
        amount4: '234',
        amount5: '3.2',
        amount6: 10,
        amount7: '234',
        amount8: '3.2',
        amount9: 10,
        amount10: '234',
        amount11: '3.2',
        amount12: 10,
        amount13: '234',
        amount14: '3.2',
        amount15: 10,
        amount16: '234',
        amount17: '3.2',
        amount18: 10,
        amount19: '234',
        amount20: '3.2',
        amount21: 10,
        amount22: '234',
        amount23: '3.2',
        amount24: 10,
        amount25: '234',
        amount26: '3.2',
        amount27: 10,
        amount28: '234',
        amount29: '3.2',
        amount30: 10,
        amount31: 10
      }, {
        id: '工序1',
        name: '设备3',
        amount1: [{
          productName: '产线1',
          productCode: 'N221'
        }],
        amount2: '3.2',
        amount3: 10,
        amount4: '234',
        amount5: '3.2',
        amount6: 10,
        amount7: '234',
        amount8: '3.2',
        amount9: 10,
        amount10: '234',
        amount11: '3.2',
        amount12: 10,
        amount13: '234',
        amount14: '3.2',
        amount15: 10,
        amount16: '234',
        amount17: '3.2',
        amount18: 10,
        amount19: '234',
        amount20: '3.2',
        amount21: 10,
        amount22: '234',
        amount23: '3.2',
        amount24: 10,
        amount25: '234',
        amount26: '3.2',
        amount27: 10,
        amount28: '234',
        amount29: '3.2',
        amount30: 10,
        amount31: 10
      }, {
        id: '工序2',
        name: '设备4',
        amount1: [{
          productName: '产线1',
          productCode: 'N221'
        }],
        amount2: '3.2',
        amount3: 10,
        amount4: '234',
        amount5: '3.2',
        amount6: 10,
        amount7: '234',
        amount8: '3.2',
        amount9: 10,
        amount10: '234',
        amount11: '3.2',
        amount12: 10,
        amount13: '234',
        amount14: '3.2',
        amount15: 10,
        amount16: '234',
        amount17: '3.2',
        amount18: 10,
        amount19: '234',
        amount20: '3.2',
        amount21: 10,
        amount22: '234',
        amount23: '3.2',
        amount24: 10,
        amount25: '234',
        amount26: '3.2',
        amount27: 10,
        amount28: '234',
        amount29: '3.2',
        amount30: 10,
        amount31: 10
      }, {
        id: '工序2',
        name: '设备5',
        amount1: [{
          productName: '产线1',
          productCode: 'N221'
        }],
        amount2: '3.2',
        amount3: 10,
        amount4: '234',
        amount5: '3.2',
        amount6: 10,
        amount7: '234',
        amount8: '3.2',
        amount9: 10,
        amount10: '234',
        amount11: '3.2',
        amount12: 10,
        amount13: '234',
        amount14: '3.2',
        amount15: 10,
        amount16: '234',
        amount17: '3.2',
        amount18: 10,
        amount19: '234',
        amount20: '3.2',
        amount21: 10,
        amount22: '234',
        amount23: '3.2',
        amount24: 10,
        amount25: '234',
        amount26: '3.2',
        amount27: 10,
        amount28: '234',
        amount29: '3.2',
        amount30: 10,
        amount31: 10
      }]
      this.rowspan()
    },
    rowspan() {
      this.tableData.forEach((item, index) => {
        if (index === 0) {
          this.spanArr.push(1)
          this.position = 0
        } else {
          if (this.tableData[index].id === this.tableData[index - 1].id) {
            this.spanArr[this.position] += 1
            this.spanArr.push(0)
          } else {
            this.spanArr.push(1)
            this.position = index
          }
        }
      })
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) { // 表格合并行
      if (columnIndex === 0) {
        console.log(this.spanArr[rowIndex])
        console.log(this.spanArr)
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    setColSpan() {
      var x = document.querySelector('.colSpan')
      var x1 = document.querySelector('.hideTh')
      // 将第一列表头单元格的colSpan设为2
      x.colSpan = 2
      // 将第二列表头单元格的隐藏
      x1.style.display = 'none'
    },
    theadSpan({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        // 给第一列表头的dom添加class='colSpan'
        if (columnIndex === 0) {
          return 'colSpan'
        }
        // 给第二列表头的dom添加class='hideTh'
        if (columnIndex === 1) {
          return 'hideTh'
        }
      }
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
          return [1, 2]
        } else if (columnIndex === 1) {
          return [0, 0]
        }
      }
    }
  }
}
</script>

<style>
.el-calendar__body {
  display: none;
}
</style>
