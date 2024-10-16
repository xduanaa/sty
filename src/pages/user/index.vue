<template>
  <div class="user">
    <!-- 左侧导航区 -->
    <div class="menu">
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo">
        <el-menu-item index="/user/certification" @click="changeRouter('/user/certification')">
          <el-icon><Location /></el-icon>
          <span>实名认证</span>
        </el-menu-item>
        <el-menu-item index="/user/order" @click="changeRouter('/user/order')">
          <el-icon><icon-menu /></el-icon>
          <span>订单挂号</span>
        </el-menu-item>
        <el-menu-item index="/user/patient" @click="changeRouter('/user/patient')">
          <el-icon><document /></el-icon>
          <span>就诊人管理</span>
        </el-menu-item>
        <el-menu-item index="/user/change" @click="changeRouter('/user/change')">
          <el-icon><setting /></el-icon>
          <span>修改账号信息</span>
        </el-menu-item>
        <el-menu-item index="/user/feelback" @click="changeRouter('/user/feelback')">
          <el-icon><setting /></el-icon>
          <span>意见反馈</span>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 展示中心主键 -->
    <div class="centent">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
const $route = useRoute()
const $router = useRouter()
// console.log($route.path)
// 跳转路由
const changeRouter = (path) => {
  $router.push(path)
}
</script>

<style scoped>
.user {
  margin-top: 80px;
  display: flex;
}
.menu {
  flex: 2;
}
.centent {
  flex: 8;
}
</style>
