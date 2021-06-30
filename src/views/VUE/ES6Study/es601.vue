<template>
  <div>
    001
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  mounted() {
    this.test()
  },
  methods: {
    test() {
      const a1 = [1, 2]
      const a2 = a1.concat()
      a2[0] = 2
      console.log(a1)
    }
  }
}
</script>

<style>
</style>
