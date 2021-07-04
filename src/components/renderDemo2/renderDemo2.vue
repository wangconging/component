
<template>
    <h1>
        {{ title }}
    </h1>
</template>
<script>
export default {
  name: 'RenderDemo2',
 props: {
     title: {
         type: String,
         default: '默认标题'
     }
 },
 mounted(){
     this.$nextTick(()=>{
         this.changeTitle()
     })
 },
 methods: {
     changeTitle() {
         this.$emit('changeThisTitle', '这是renderDemo2传过来的值')
     }
 }
}
</script>
<style scoped>
#box{
  margin: 20px 0 0 20px;
  text-align: center;
  background-color: #888;
  width: 200px;
  height: 80px;
  line-height: 80px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
