<template>
  <div class="container">
    <!-- top区域 -->
    <HospitalTop />
    <!-- 主要内容 -->
    <div class="conter1">
      <div class="conter">
        <router-view></router-view>
      </div>
    </div>
    <!-- bottom区域 -->
    <HospitalBottom />
    <!-- 登录组件 -->
    <Login/>
  </div>
</template>

<script setup>
</script>

<style scoped>
.conter1 {
  width: 100%;
  display: flex;
  justify-content: center;
}
.conter {
  width: 1200px;
}
</style>
