<script>
import renderDemo2 from "@/components/renderDemo2/renderDemo2";
const handleClick = (event) =>{
              console.log(event)
              event.stopPropagation()
          }
let list = [{name: '张三'},{name: '李四'}]
const  getLiEleArr = (h) => {
  return list.map((item, index) => h('li', {
    on: {
      'click':handleClick
    },
    key: `list_${index}`
  },item.name))
}
export default {
  // components: {
  //   renderDemo2,
  // },
  name: "RenderDemo",
  methods: {},
    // ---- render中使用for循环 ----
    render(h) {
      return h('div', [
        h('ul', {
          on: {
            'click': handleClick
            }
        },getLiEleArr(h))
      ])
  }
  //  // ---- 添加子元素 ----
  //   render(h) {
  //     return h('div', [
  //       h('span', 111),
  //       h('h2', 'render study')
  //     ])
  // }
  // ----组件 ----
  // render(createElement) {
  //   return createElement(
  //     renderDemo2, {
  //     // 'class': ['page-content', true ?  'page-content2' : 'page-content3'],
  //     // 'class': 'page-content4',
  //     'class': {
  //       'page-content5': 1 === 1 
  //     },
  //     // domProps: {
  //     //   innerHTML: '123'
  //     // },
  //     props: {
  //       title: 'RENDER TITLE'
  //     },
  //     on: {
  //      'changeThisTitle': (val) =>{
  //        console.log(val)
  //      }  
  //     },
  //     nativeOn: { // 给组件添加一个点击事件
  //       'click': () =>{
  //         console.log('click')
  //       }
  //     },
  //     directives: [],
  //     slot: '',
  //     key: '', // 给组件设置一个独有的KEY
  //     ref: ''
  //     });
  // },
  // ---- div ----
  // render(h) {
  //   return createElement('div',{
  //     attrs: {
  //       id: 'box',
  //     },
  //     style: {
  //       color: '#fff'
  //     }
  //   }, 'render 创建的Div')
  // }
};
</script>
<style scoped>
#box {
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
