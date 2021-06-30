<template>
  <div>
    <div>
      这是从vuex获取的值{{ value }}
    </div>
    <div>
      <el-button type="success" @click="changeVueXValue">通过getters改变VUEX的值</el-button>
    </div>
    <div>data: {{ data }}</div>
    <div>vueXData: {{ vueXData }}</div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  components: {},
  data() {
    return {
    }
  },
  computed: {
    ...mapState('user', {
      data: state => state.vueXData
    }),
    ...mapGetters([
      'vueXData'
    ]),
    value() {
      return this.$store.state.user.vueXData
    }
  },
  created() { },
  mounted() {
    console.log()
    this.getVueXData()
  },
  methods: {
    ...mapMutations('user', [
      'SET_VUEXDATA'
    ]),
    ...mapActions('user', [
      'changeVueXData'
    ]),
    getVueXData() {
      // 获取user模块中的vueXData
      // 通过getters获取
      console.log(this.$store.getters.vueXData)
    },
    changeVueXValue() {
      this.$store.dispatch('user/changeVueXData', 333) // Actions
      // this.changeVueXData(222) // mapActions

      // this.SET_VUEXDATA('666') // mapMutations
      // this.$store.commit('user/SET_VUEXDATA', '666') // Mutations

      // console.log(this.$store.state.user.vueXData)
    }
  }

}
</script>

<style>
</style>
