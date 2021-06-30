<template>
  <div v-if="item.children">
    <template v-if="item.children.length == 0">
      <el-submenu :index="item.url">
        <template slot="title">
          <i :class="item.icon" />
          <span slot="title">{{ item.menuName }}</span>
        </template>
      </el-submenu>
    </template>
    <el-submenu v-else :index="item.url">
      <template slot="title">
        <i :class="item.icon" />
        <span slot="title">{{ item.menuName }}</span>
      </template>
      <template v-for="child in item.children">
        <sidebar-item v-if="child.children&&child.children.length>0" :key="child.menuId+'10000'" :item="child" />
        <el-menu-item v-else :key="child.menuId" :index="child.url" @click="getMunuId(child.menuId)">
          <span slot="title">{{ child.menuName }}</span>
        </el-menu-item>
      </template>
    </el-submenu>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    getMunuId(menuId) {
      Cookies.set('menuId_sidebar', menuId)
    }
  }
}

</script>
