<template>
  <div>
    <div>
      <el-button @click="changeLanguage('en')">English</el-button>
      <el-button @click="changeLanguage('zh')">中文</el-button>
    </div>
    <section>
      <h3>{{ $t("handsome") }}</h3>
      <el-button type="primary">{{ $t("handsome") }}</el-button>

    </section>
    <div class="block">
      <span class="demonstration">默认</span>
      <el-date-picker v-model="value1" type="date" placeholder="选择日期" />

    </div>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" :label="$t('handsome')" width="180" />
        <el-table-column prop="name" :label="$t('handsome')" width="180" />
        <el-table-column prop="address" :label="$t('handsome')" />
      </el-table>
    </div>
  </div>
</template>

<script>
import { setup } from '../../../../src/locales'
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
      }],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      value1: '',
      value2: ''
    }
  },
  mounted() { },
  methods: {
    changeLanguage(lang) {
      this.$i18n.locale = lang
      setup(lang)
      location.reload() // 为了重新实例化vue-router对象，避免一些bug
    }
  }
}
</script>

<style>
</style>
