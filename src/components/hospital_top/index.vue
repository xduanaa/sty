<template>
  <div class="top">
    <div class="content">
    <div class="left" @click="goHome">
      <img src="../../assets/images/logo.jpg" alt="meimv">
      <span>尚医通 预约挂号平台</span>
    </div>
    <div class="right">
      <a href="">帮助中心</a>
      <a href="">登录注册</a>
    </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const $router=useRouter()
const goHome=()=>{
  $router.push({path:'/home'})
}
</script>

<style scoped>
.top {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  background-color: #FFF
}
.content {
  width: 1200px;
  height: 70px;
  display: flex;
  justify-content: space-between;
}
.left{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left :hover{
  cursor: pointer;
}
.left img{
  width: 50px;
  height: 50px;
  margin-right: 10px; 
}
.left span{
   color: skyblue;
   font-size: 20px;
}
.right{
  display: flex;
  align-items: center;
}
.right a{
  font-size: 15px;
  color: #666;
  text-decoration: none;
}
.right :first-child{
  margin-right: 15px;
}
.right :last-child{
  margin-left: 15px;
}
</style>