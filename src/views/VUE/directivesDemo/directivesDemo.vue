<template>
  <div class="hello">
    <div v-test="name" />
    <div v-red>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis magnam delectus odit neque dicta ipsa expedita! Magnam suscipit atque qui, quas doloremque saepe dolore quidem, similique, et debitis itaque a!</div>
  </div>
</template>
<script>
export default {
  directives: {
    test: {
      inserted(el, binding) { // 指令的定义
        // el为绑定元素，可以对其进行dom操作
        console.log(binding) // 一个对象，包含很多属性属性
      },
      bind(el, binding, vnode) {
        console.log(el)
        console.log(binding.value)
        el.innerHTML = binding.value
      }
    },
    red: {
      // el: 指令所绑定的元素，可以用来直接操作 DOM，就是放置指令的那个元素。
      // binding: 一个对象，里面包含了几个属性，这里不多展开说明，官方文档上都有很详细的描述。
      // vnode：Vue 编译生成的虚拟节点。
      // oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。
      inserted(el, binding) { // 指令的定义
      // el为绑定元素，可以对其进行dom操作
        console.log(binding) // 一个对象，包含很多属性属性
      },
      bind(el, binding, vnode) {
        console.log(el)
        console.log(binding)
        el.style.backgroundColor = 'red'
      }
    }
  },
  data() {
    return {
      name: '我是名字'
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
  }
}
</script>
