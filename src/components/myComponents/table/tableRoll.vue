<template>
  <div>
    <div class="table-content">
      <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
        <el-table-column prop="date" label="日期" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="address" label="地址" />
        <el-table-column header-align="center" align="center" label="操作" width="280">
          <template slot-scope="scope">
            <el-button type="success" size="mini" icon="el-icon-edit">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-close">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <codeShow :code1="code1" :code2="code2" :code3="code3" />
  </div>
</template>

<script>
import codeShow from '@/components/myComponents/codeShow/codeShow'
export default {
  components: {
    codeShow
  },
  data() {
    return {
      code1: ` 
<div class="table-content">
  <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#eef1f6',color:'#606266'}" >
    <el-table-column prop="date" label="日期" />
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="address" label="地址" />
    <el-table-column header-align="center" align="center" label="操作" width="280">
      <template slot-scope="scope">
        <el-button type="success" size="mini" icon="el-icon-edit">编辑</el-button>
        <el-button type="danger" size="mini" icon="el-icon-close">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
    `,
      code2: `
export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
  }
}
`,
      code3: `<style>
.el-table--medium th,
.el-table--medium td {
  padding: 5px 0 !important;
}
</style>
<style scoped>
.table-content {
  padding: 20px;
  margin-left: 1%;
  width: 98%;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  background: #fff;
}
</style>`,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
  }
}
</script>
<style>
.el-table--medium th,
.el-table--medium td {
  padding: 5px 0 !important;
}
</style>
<style scoped>
.table-content {
  padding: 20px;
  margin-left: 1%;
  width: 98%;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  background: #fff;
}
</style>
