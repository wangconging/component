<template>
  <div>
    <!-- 当引入组件的地方没有写插槽内容，将显示子组件插槽中默认的值，如果没有默认值也没用写插槽内容，则插槽内容为空。 -->
    <div style="color: blue">
      <slot name="name" />
    </div>
    <div style="color: blueviolet">
      <slot name="age" />
    </div>

  </div>
</template>

<script>

export default {
}
</script>

<style>
div {
  color: blueviolet;
}
</style>
