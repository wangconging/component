<template>
  <div>
    <h2>默认插槽: </h2>
    <alertTips>床前明月光</alertTips>
    <h2>具名插槽: </h2>
    <alertTips2>
      <template v-slot:age>
        19岁
      </template>
      <template v-slot:name>
        张三
      </template>
    </alertTips2>
    <h2>作用域插槽: </h2>
    <alertTips3 :todo="list">
      <template slot-scope="scope">
        <!-- scope后接的就是你在子组件定义的传递值的名称,scope.content就拿到了传递过来的值,在这里可以直接使用 -->
        描述: {{ scope.content.text }}
      </template>
    </alertTips3>
  </div>
</template>

<script>
import alertTips from '@/components/alertTips/index.vue'
import alertTips2 from '@/components/alertTips/index2.vue'
import alertTips3 from '@/components/alertTips/index3.vue'
export default {
  components: { alertTips, alertTips2, alertTips3 },
  data() {
    return {
      list: [
        { name: '灵梦', age: 18, text: '热爱学习', hobby: '踢足球', id: 1 },
        { name: '李明', age: 13, text: '画画很棒', hobby: '画画', id: 2 },
        { name: '韩梅梅', age: 25, text: '性格文静', hobby: '做手工', id: 3 }
      ]
    }
  },
  mounted() { },
  methods: {}
}
</script>

<style>
</style>
