<template>
  <!-- 医院信息区域 -->
  <div class="top">
    <span class="top_ntimee">{{ registryStore.bookingScheduleInfo.baseMap?.hosname }}</span>
    <span>|</span>
    <span>{{ registryStore.bookingScheduleInfo.baseMap?.bigname }}</span>
    <span class="top_dit">·</span>
    <span>{{ registryStore.bookingScheduleInfo.baseMap?.depname }}</span>
  </div>
  <!-- 挂号内容 -->
  <div class="registry_content">
    <div>{{ registryStore.bookingScheduleInfo.baseMap?.workDateString }}</div>
    <div class="big_box">
      <div
        v-for="(item, index) in registryStore.bookingScheduleInfo.bookingScheduleList"
        :key="index"
        class="small_box"
        :class="[
          { act: item.status == -1 || item.availableNumber == -1 },
          { active: changeFlag == index }
        ]"
        @click="getDoctor(item, index)"
      >
        <div class="small_box_top">{{ item.workDate }} -{{ item.dayOfWeek }}</div>
        <div class="small_box_buttom">
          <div v-if="item.status == -1">停止挂号</div>
          <div v-if="item.status == 0">
            {{ item.availableNumber == -1 ? '约满了' : `有号(${item.availableNumber})` }}
          </div>
          <div v-if="item.status == 1">即将放号</div>
        </div>
      </div>
    </div>
    <!-- 分页器 -->
    <div>
      <el-pagination
        v-model:current-page="page"
        @current-change="fentchWorkData"
        layout="prev, pager, next"
        :total="11"
      />
    </div>
  </div>
  <!-- 号源区域 -->
  <div class="buttom">
    <div v-if="doctordate?.status == -1" class="formerly"><span>以停止挂号</span></div>
    <div v-if="doctordate?.status == 0" class="now">
      <div class="button_top">
        <svg
          t="1720081731711"
          class="icon"
          viewBox="0 0 1195 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2620"
          width="32"
          height="32"
        >
          <path
            d="M335.591467 699.733333c-83.2-42.666667-142.933333-128-142.933334-230.4 0-140.8 115.2-256 256-256s256 115.2 256 256v23.466667c-29.866667-8.533333-59.733333-12.8-85.333333-8.533333V469.333333c0-93.866667-76.8-170.666667-170.666667-170.666666s-170.666667 76.8-170.666666 170.666666c0 66.133333 38.4 125.866667 96 153.6-14.933333 19.2-27.733333 42.666667-38.4 76.8z m-40.533334 66.133334l4.266667-10.666667c4.266667-12.8 14.933333-21.333333 25.6-25.6-2.133333 8.533333-4.266667 19.2-6.4 27.733333-8.533333 2.133333-14.933333 6.4-23.466667 8.533334zM452.9248 0c23.466667 0 42.666667 19.2 42.666667 42.666667v85.333333c0 23.466667-19.2 42.666667-42.666667 42.666667s-42.666667-19.2-42.666667-42.666667V42.666667c0-23.466667 19.2-42.666667 42.666667-42.666667zM747.3248 106.666667c17.066667 14.933333 21.333333 42.666667 4.266667 59.733333l-55.466667 66.133333c-14.933333 17.066667-42.666667 21.333333-59.733333 4.266667s-21.333333-42.666667-4.266667-59.733333l55.466667-66.133334c14.933333-17.066667 42.666667-19.2 59.733333-4.266666z m157.866667 273.066666c4.266667 23.466667-10.666667 44.8-34.133334 49.066667l-83.2 14.933333c-23.466667 4.266667-44.8-10.666667-49.066666-34.133333-4.266667-23.466667 10.666667-44.8 34.133333-49.066667l83.2-14.933333c21.333333-4.266667 44.8 10.666667 49.066667 34.133333zM56.1248 686.933333c-12.8-21.333333-4.266667-46.933333 14.933333-57.6l74.666667-42.666666c21.333333-12.8 46.933333-4.266667 57.6 14.933333s4.266667 46.933333-14.933333 57.6l-74.666667 42.666667c-19.2 12.8-46.933333 6.4-57.6-14.933334zM0.658133 379.733333c4.266667-23.466667 25.6-38.4 49.066667-34.133333l83.2 14.933333c23.466667 4.266667 38.4 25.6 34.133333 49.066667-4.266667 23.466667-25.6 38.4-49.066666 34.133333l-83.2-14.933333c-21.333333-4.266667-38.4-25.6-34.133334-49.066667zM158.5248 106.666667c17.066667-14.933333 44.8-12.8 59.733333 4.266666l55.466667 66.133334c14.933333 17.066667 12.8 44.8-4.266667 59.733333-17.066667 14.933333-44.8 12.8-59.733333-4.266667L154.258133 166.4c-17.066667-17.066667-14.933333-44.8 4.266667-59.733333z"
            fill="#20A0FF"
            p-id="2621"
          ></path>
          <path
            d="M939.3248 576c140.8 0 256 113.066667 256 253.866667 0 70.4-29.866667 136.533333-81.066667 183.466666l-12.8 10.666667H111.591467l-10.666667-25.6c-10.666667-23.466667-17.066667-51.2-17.066667-76.8 0-106.666667 85.333333-192 192-196.266667 32-157.866667 174.933333-277.333333 343.466667-277.333333 108.8 0 209.066667 49.066667 275.2 132.266667 17.066667-2.133333 29.866667-4.266667 44.8-4.266667z m-115.2 49.066667c-49.066667-57.6-123.733333-91.733333-202.666667-91.733334-138.666667 0-253.866667 106.666667-264.533333 241.066667l-4.266667 49.066667-46.933333-8.533334c-8.533333-2.133333-14.933333-2.133333-23.466667-2.133333-61.866667 0-113.066667 49.066667-113.066666 110.933333 0 6.4 0 12.8 2.133333 17.066667h896c27.733333-29.866667 42.666667-68.266667 42.666667-108.8 0-91.733333-76.8-166.4-170.666667-168.533333-40.533333 0-74.666667 34.133333-74.666667 74.666666s34.133333 74.666667 74.666667 74.666667h8.533333c4.266667 0 8.533333-2.133333 12.8-4.266667 2.133333-2.133333 6.4-4.266667 8.533334-6.4 17.066667-17.066667 42.666667-17.066667 59.733333 0 17.066667 17.066667 17.066667 42.666667 0 59.733334-8.533333 8.533333-19.2 17.066667-32 23.466666-14.933333 8.533333-32 12.8-51.2 12.8h-8.533333-2.133334c-87.466667 0-160-72.533333-160-160 4.266667-44.8 21.333333-85.333333 49.066667-113.066666z"
            fill="#9AD4FF"
            p-id="2622"
          ></path>
        </svg>
        <h1>上午号源</h1>
      </div>
      <div v-for="item in registryStore.hosDoctorInfo" :key="item.id">
        <div class="time" v-if="item.workTime == 0">
          <div class="time_left">
            <div>
              <span>{{ item.title }} | {{ item.docname }}</span>
            </div>
            <span class="time_left_info">{{ item.skill }}</span>
          </div>

          <div class="time_right">
            <span class="moeny">￥{{ item.amount }}</span>
            <el-button type="primary" class="time_buttom" @click="gotostep(item)">剩余22</el-button>
          </div>
        </div>
      </div>
      <div class="button_top">
        <svg
          t="1720082915462"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3878"
          width="32"
          height="32"
        >
          <path
            d="M198.5 599.4l-91.3 0c-20.9 0-37.8 16.9-37.8 37.8S86.3 675 107.2 675l90.2 0c-1.2-11.3-1.9-22.80000001-1.9-34.39999999 0.1-14 1.3-27.69999999 3-41.20000001zM223.6 356.4c-14.8-14.8-38.7-14.8-53.5 0-14.8 14.8-14.8 38.7 0 53.5l69.8 69.8c13.1-22 28.5-42.4 46.3-60.6l-62.6-62.7zM916.6 599.4l-91.3 0c1.8 13.5 3 27.2 3 41.2 0 11.6-0.7 23.1-1.9 34.4l90.2 0c20.9 0 37.8-16.9 37.8-37.8s-16.9-37.8-37.8-37.8zM777.29999999 468.7l58.80000001-58.8c14.8-14.8 14.8-38.7 0-53.5-14.8-14.8-38.7-14.8-53.5 0l-54.1 54.1c18.5 17.4 34.9 36.8 48.79999999 58.2zM549.7 326.70000001l0-97.00000001c0-20.9-16.9-37.8-37.8-37.8s-37.8 16.9-37.8 37.8l0 97c12.4-1.5 25-2.5 37.8-2.5 12.8 0 25.4 1 37.8 2.50000001zM101.6 756.5L922.2 756.5c20.9 0 37.8 16.9 37.8 37.8s-16.9 37.8-37.8 37.8l-820.6 0c-20.9 0-37.8-16.9-37.8-37.8s16.9-37.8 37.8-37.8zM261.4 674.9c-1-9.2-1.5-18.5-1.5-28 0-139.2 112.9-252.1 252.1-252.10000001S764 507.7 764 646.9c0 9.5-0.5 18.80000001-1.5 28l-501.1 0z"
            fill="#1296db"
            p-id="3879"
          ></path>
        </svg>
        <h1>下午号源</h1>
      </div>
      <div v-for="item in registryStore.hosDoctorInfo" :key="item.id">
        <div class="time" v-if="item.workTime == 1">
          <div class="time_left">
            <div>
              <span>{{ item.title }} | {{ item.docname }}</span>
            </div>
            <span class="time_left_info">{{ item.skill }}</span>
          </div>
          <div class="time_right">
            <span class="moeny">￥{{ item.amount }}</span>
            <el-button @click="gotostep(item)" type="primary" class="time_buttom">剩余22</el-button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="doctordate?.status == 1" class="future">
      <span>放号时间:{{ doctordate.workDate }} 08:30:30</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useRegistryStore from '@/store/modules/registry'
const $router = useRouter()
const $route = useRoute()
let registryStore = useRegistryStore()
let page = ref(1)
let limit = ref(6)
let doctordate = ref('')
let changeFlag = ref(100)
let doid = ref()

// console.log($route.query.depcode)
onMounted(() => {
  // 获取科室排版数据
  fentchWorkData()
})
//点击页码获取科室排版数据
const fentchWorkData = () => {
  console.log(page.value, limit.value, $route.query.hoscode, $route.query.depcode)
  registryStore.getHosBookScheduleRule(
    page.value,
    limit.value,
    $route.query.hoscode,
    $route.query.depcode
  )
}
//获取挂号医生的数据
const getDoctor = (item, index) => {
  // console.log('当天医生数据', item)
  changeFlag.value = index
  doctordate.value = item
  registryStore.getHosAuth($route.query.hoscode, $route.query.depcode, item.workDate)
  // console.log(index)
}
// 路由跳转到registration_step页面
const gotostep = (item) => {
  // 获取医生id
  doid.value = item.id
  $router.push({
    path: '/hospital/registry_step',
    query: { scheduleld: doid.value, hoscode: $route.query.hoscode }
  })
}
</script>

<style scope>
.top {
  color: #7f7f7f;
  height: 20px;
  font-size: 14px;
}
.top span {
  margin-right: 5px;
}
.top_ntimee {
  margin-left: 10px;
}
.top_dit {
  line-height: 20px;
}
.registry_content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}
.big_box {
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin: 25px 0;
}
.small_box {
  display: flex;
  flex-direction: column;
  margin: 5px 5px;
  width: 13%;
  border: 1px solid skyblue;
}
.small_box_top {
  width: 100%;
  text-align: center;
  height: 20px;
  line-height: 20px;
  background-color: rgb(182, 217, 231);
  font-size: 14px;
}
.small_box_buttom {
  text-align: center;
  height: 40px;
  line-height: 40px;
}
.big_box:hover {
  cursor: pointer;
}
.big_box .act {
  border: 1px solid #7f7f7f;
  /* color: #7f7f7f; */
}
.act .small_box_top {
  background-color: #7f7f7f;
  color: aliceblue;
}
.act .small_box_buttom {
  color: #7f7f7f;
}
.buttom {
  margin-top: 40px;
  margin-bottom: 70px;
}
.future {
  display: flex;
  justify-content: center;
}
.future span {
  color: skyblue;
  font-size: 30px;
}
.formerly {
  display: flex;
  justify-content: center;
}
.formerly span {
  font-size: 30px;
  color: #7f7f7f;
}
.button_top {
  display: flex;
  align-items: center;
  margin: 10px 20px;
}
.button_top h1 {
  margin-left: 10px;
  font-size: 20px;
  color: skyblue;
}
.time {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 20px;
  border-bottom: 1px solid #7f7f7f;
}
.time_left {
  margin: 10px;
}
.time_left div {
  color: skyblue;
  margin-bottom: 10px;
}
.time_left_info {
  font-size: 14px;
  color: #7f7f7f;
}
.moeny {
  font-size: 14px;
  color: #7f7f7f;
  margin-right: 30px;
}
.time_buttom {
  text-align: center;
  margin-right: 20px;
}
.small_box {
  transition: all 0.4s;
  cursor: pointer;
}
.small_box.active {
  transform: scale(1.1, 1.1);
  color: rgb(105, 201, 238);
}
.top:hover {
  cursor: default;
}
.registry_content {
  user-select: none;
}
</style>
