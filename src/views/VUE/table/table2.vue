<template>
  <div>
    <el-table :data="tableData" style="width: 100%" :header-cell-class-name="theadSpan">
      <el-table-column prop="date" label="工序" width="150" />
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="province" label="省份" width="120" />
      <el-table-column prop="city" label="市区" width="120" />
      <el-table-column prop="address" label="地址" width="300" />
      <el-table-column prop="zip" label="邮编" width="120" />
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
    }
  },
  created() {
  },
  mounted() {
    // dom渲染完成后 操作表头合并
    this.$nextTick(() => {
      this.setColSpan()
    })
  },
  methods: {
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
    }
  }
}
</script>
