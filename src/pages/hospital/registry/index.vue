<template>
  <div class="hospital-home">
    <div class="hoscard">
      <div class="hosname">{{ regisStore.hospitalInfo.hospital?.hosname }}</div>
      <svg
        t="1719651084035"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="899"
        width="14"
        height="14"
      >
        <path
          d="M511.7 170.5c13.1 0 24.9 5.1 34.1 14.6l295.4 307.3c8.6 8.9 11 15.5 11.4 18.5-0.9 0.3-2.7 0.8-5.5 0.8h-6.7c-47 0-85.1 38.1-85.1 85.1v199.6c0 30.3-20.5 55.9-44.8 55.9h-77.1V646.9c0.4-22.8-8.4-44.8-24.4-61.1-16-16.3-37.9-25.4-60.7-25.4h-73c-22.7 0-44.5 9.9-60.4 26-16 16.1-24.9 38.8-24.7 61.5v204.5h-77.1c-24.3 0-44.8-25.6-44.8-55.8V596.8c0-47-38.1-85.1-85.1-85.1h-6.7c-2.7 0-4.4-0.4-5.4-1 0.5-3.1 3-9.6 11.4-18.3l295.3-307.2c9-9.6 20.8-14.7 33.9-14.7m0-85.1c-36.2 0-70.1 14.5-95.4 40.8L120.9 433.4c-39.2 40.8-40.5 84.1-28.6 111.1 14.5 32.8 45.9 52.3 84 52.3h6.7v199.6c0 77.7 58.3 141 129.9 141h125.7c20.2 0 36.5-16.5 36.5-36.8V650.5v-5h73v255.1c0 20.3 16.4 36.8 36.5 36.8h125.7c71.6 0 129.9-63.2 129.9-141V596.8h6.7c38.2 0 69.6-19.6 84-52.2 12-26.9 10.8-70.3-28.6-111.2L607.1 126.1c-25.3-26.3-59.2-40.7-95.4-40.7z"
          fill="#272636"
          p-id="900"
        ></path>
      </svg>
      <div class="hoslevel">{{ regisStore.hospitalInfo.hospital?.param.hostypeString }}</div>
    </div>
    <div class="content">
      <img
        :src="`data:image/jpeg;base64,${regisStore.hospitalInfo.hospital?.logoData}`"
        alt=""
        style="width: 80px; height: 80px; border-radius: 50%"
      />
      <div class="info">
        <div style="color: black; margin-bottom: 10px">挂号规则</div>
        <span style="margin-right: 50px"
          >预约周期:{{ regisStore.hospitalInfo.bookingRule?.cycle }}</span
        >
        <span style="margin-right: 50px"
          >放号时间:{{ regisStore.hospitalInfo.bookingRule?.releaseTime }}</span
        >
        <span>停挂时间:{{ regisStore.hospitalInfo.bookingRule?.stopTime }}</span>
        <div style="margin-top: 10px">
          退号时间： 就诊前一工作日{{ regisStore.hospitalInfo.bookingRule?.quitTime }}前取消
        </div>
        <div style="margin: 20px 0; color: black">医院预约规则</div>
        <ul>
          <li v-for="(r, index) in regisStore.hospitalInfo.bookingRule?.rule" :key="index">
            {{ index + 1 }} .{{ r }}
          </li>
        </ul>
      </div>
    </div>
    <div style="margin: 35px 0">选择科室</div>
    <div class="buttom">
      <div class="left">
        <ul>
          <li
            v-for="(depart, index) in regisStore.departInfo"
            :key="index"
            :class="{ active: index == currentIndex }"
            @click="changeActive(index)"
          >
            {{ depart.depname }}
          </li>
        </ul>
      </div>
      <div class="right">
        <div v-for="depart in regisStore.departInfo" :key="depart.depcode">
          <h1 class="cur">{{ depart.depname }}</h1>
          <ul>
            <li v-for="item in depart.children" :key="item.depcode" @click="login(item)">{{ item.depname }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import useRegistryStore from '@/store/modules/registry'
import { useRoute,useRouter } from 'vue-router';
// import useUserStore from '@/store/modules/use';
import { ref } from 'vue'

// const userStore=useUserStore()
const $route=useRoute()
const $router=useRouter()
let regisStore = useRegistryStore()
let currentIndex = ref(0)
// 使用scrollIntoView控制点击元素滚轮滑倒最顶端
let changeActive = (index) => {
  // 控制高亮
  currentIndex.value = index
  let ArrH1= document.querySelectorAll('.cur')
  ArrH1[currentIndex.value].scrollIntoView({behavior:'smooth'})
}
// onMounted(()=>{
//   regisStore.getDepart($route.query.hoscode)
// })
// 登录后通过路由跳转到点击的科室页面
const login=((item)=>{
// 通过控制userStore.visiable的值实现登录对话框显示与隐藏
  // userStore.visiable=true
  // console.log(item)
  // console.log(item.depcode)
  $router.push({path:'/hospital/registry_item',query:{hoscode:$route.query.hoscode,depcode:item.depcode}})
})
// console.log(regisStore.hospitalInfo.hospital)
</script>

<style scoped>
.hospital-home:hover{
  cursor: default
}
.hoscard {
  display: flex;
  align-items: center;
}
.hosname {
  color: #333;
  font-weight: 900;
  font-size: 20px;
  margin: 0 15px 0 0;
}
.hoscard .icon {
  line-height: 14px;
  margin-right: 2px;
}
.hoslevel {
  color: #999;
  font-size: 15px;
}
.content {
  margin-top: 50px;
  display: flex;
}
.content .info {
  flex: 1;
  margin-left: 35px;
  /* display: flex; */
  flex-wrap: wrap;
  color: #999;
}
/* 向下顶了低部组件50px */
.buttom {
  display: flex;
  margin-bottom: 50px；/* 向下顶了低部组件50px */
}
.left {
  width: 80px;
  background-color: rgb(248, 248, 248);
}
.right {
  margin-left: 35px;
  width: 100%;
  height: 650px;
  overflow: auto;
}
.left ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.left li {
  width: 80px;
  text-align: center;
  font-size: 14px;
  height: 35px;
  line-height: 35px;
}
.left li:hover {
  cursor: pointer;
}
.left li.active {
  color: black;
  background-color: white;
  border-left: 1px solid red;
  font-size: 15px;
  font-weight: 800;
}
.right h1 {
  background-color: rgb(248, 248, 248);
  width: 100%;
  flex: 1;
  font-size: 15px;
  font-weight: 800;
  height: 35px;
  line-height: 35px;
}
.right ul {
  display: flex;
  flex-wrap: wrap;
}
.right li {
  width: 33%;
  margin: 8px 0;
  color: #666;
  font-size: 14px;
}
.right::-webkit-scrollbar {
  display: none;
}
.right li:hover{
  cursor: pointer;
  color: skyblue
}
.right h1:hover{
  cursor: pointer;
}
</style>
