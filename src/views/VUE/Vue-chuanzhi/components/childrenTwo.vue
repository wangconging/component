<template>
  <div>子组件2: {{ value }}</div>
</template>

<script>
export default {
  data() {
    return {
      value: ''
    }
  },
  mounted() {
    this.$bus.on('parameter', (value) => {
      this.value = value
    })
  },
  methods: {
  }
}
</script>

<style>

</style>
