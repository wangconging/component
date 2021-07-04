<template>
  <div>
    <ul v-for="(item,index) in todo" :key="item.id">
      <li>姓名: {{ item.name }}</li>
      <li>年龄: {{ item.age }}</li>
      <!-- 如果是第二项,就使用作用域插槽,重新展示 -->
      <li v-if="index === 1">
        <!-- 定义了content把item传递到父组件,定义的名字可以随意取,需要传递的数据写在后面 -->
        <slot :content="item" />
      </li>
      <li v-else>爱好: {{ item.hobby }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>
