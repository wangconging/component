<template>
  <div class="page-content">
    <basicsTable />
    <basicsRoll />
  </div>
</template>

<script>
import basicsTable from '@/components/myComponents/table/basicsTable'
import basicsRoll from '@/components/myComponents/table/tableRoll'
export default {
  components: {
    basicsTable,
    basicsRoll
  }
}
</script>

<style scope>
.page-content {
  padding-bottom: 70px;
  min-height: 1000px;
  padding-top: 20px;
  background: rgb(241, 241, 241);
}
</style>
