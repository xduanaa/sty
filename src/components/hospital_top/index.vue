<template>
  <div class="top">
    <div class="content">
      <div class="left" @click="goHome">
        <img src="../../assets/images/logo.jpg" alt="meimv" />
        <span>尚医通 预约挂号平台</span>
      </div>
      <div class="right">
        <span class="help">帮助中心</span>
        <span @click="login" v-if="!userStore.userData.name" class="login">登录注册</span>
        <div v-else>
         <span> <el-dropdown  calss="cs">
            <span class="el-dropdown-link"  >
              {{ userStore.userData.name }}
              <svg
                t="1719891072472"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="11054"
                width="16"
                height="16"
                style="line-height: 16px;"

              >
                <path
                  d="M853.333333 341.333333H170.666667l341.333333 341.333334 341.333333-341.333334z"
                  fill="#B8B8B8"
                  p-id="11055"
                ></path>
              </svg>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="goUser('/user/certification')">实名认证</el-dropdown-item>
                <el-dropdown-item @click="goUser('/user/order')">挂号订单</el-dropdown-item>
                <el-dropdown-item @click="goUser('/user/patient')">就诊人管理</el-dropdown-item>
                <el-dropdown-item style="border-top: 1px solid #666" @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import useUserStore from '@/store/modules/use'
const userStore = useUserStore()
const $router = useRouter()
const goHome = () => {
  $router.push({ path: '/home' })
}
// 弹出登录对话框
const login = () => {
  userStore.visiable = true
}
// 退出登录
const logout=(()=>{
  userStore.logout()
  // 编程式路由跳转
  $router.push({path:'/home'})
})
// 跳往user页面
const goUser=(path)=>{
    $router.push(path)
}
</script>

<style scoped>
.top {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  background-color: #fff;
  position: fixed;
	top: 0;
	left: 0;
  z-index: 2;
}
.content {
  width: 1200px;
  height: 70px;
  display: flex;
  justify-content: space-between;
}
.left {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left :hover {
  cursor: pointer;
}
.left img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.left span {
  color: skyblue;
  font-size: 20px;
}
.right {
  display: flex;
  align-items: center;
}
.right .help {
  font-size: 15px;
  color: #666;
  text-decoration: none;
}
.right .login {
  font-size: 15px;
  color: #666;
  text-decoration: none;
}
.right .help {
  margin-right: 5px;
}
.right .login {
  margin-left: 5px;
}
.right .help:hover {
  cursor: pointer;
}
.right .help:active {
  color: skyblue;
} 
.right .login:hover {
  cursor: pointer;
}
.right .login:active {
  color: skyblue;
} 
.el-dropdown-link .example-showcase{
  cursor: pointer;
  /* color: var(--el-color-primary); */
  display: flex;
  align-items: center;
  line-height: 18px
}
.el-dropdown-link:hover {
cursor: pointer;
}
</style>
