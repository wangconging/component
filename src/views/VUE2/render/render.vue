<template>
  <div>
    <Render />
    <ul @click="handleClick">
      <li v-for="item in dataList" :key="item" @click.stop="handleClick">{{item}}</li>
    </ul>
  </div>
</template>

<script>
import { Render } from "@/components/renderDemo";
export default {
  components: { Render },
  data() {
    return {
      dataList: [1111111, 2222222, 3333333, 4444444],
    };
  },
  methods: {
    handleClick(event) {
      console.log(event)
    }
  }
};
</script>

<style>
</style>
