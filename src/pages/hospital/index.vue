<template>
  <div class="hospital">
    <div class="menu">
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo">
        <el-menu-item index="/hospital/registry" @click="changeactive('/hospital/registry')">
          <el-icon><icon-menu /></el-icon>
          <span>预约挂号 </span>
        </el-menu-item>
        <el-menu-item index="/hospital/particular" @click="changeactive('/hospital/particular')">
          <el-icon><document /></el-icon>
          <span> 医院详情 </span>
        </el-menu-item>
        <el-menu-item index="/hospital/instruction" @click="changeactive('/hospital/instruction')">
          <el-icon><setting /></el-icon>
          <span> 预约须知 </span>
        </el-menu-item>
        <el-menu-item index="/hospital/suspend" @click="changeactive('/hospital/suspend')">
          <el-icon><InfoFilled /></el-icon>
          <span> 停诊信息 </span>
        </el-menu-item>
        <el-menu-item index="/hospital/search" @click="changeactive('/hospital/search')">
          <el-icon><Remove /></el-icon>
          <span> 查询/取消 </span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { Document, Menu as IconMenu, Setting, Remove, InfoFilled } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import { onMounted } from 'vue'
import useRegistryStore from '@/store/modules/registry'

let registryStore = useRegistryStore()
let $route = useRoute()
let $router = useRouter()
onMounted(() => {
  registryStore.getHospital($route.query.hoscode)
  registryStore.getDepart($route.query.hoscode)
})
const changeactive = (path) => {
  $router.push({ path ,query:{hoscode:$route.query.hoscode} })
  console.log($route.path)
}
</script>

<style scoped>
/* 向上顶了顶部组件80px */
.hospital {
  display: flex;
  margin-top: 80px;/* 向上顶了顶部组件80px */
}
.menu {
  flex: 2;
}
.content {
  flex: 8;
}
</style>
