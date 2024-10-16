<template>
  <h1>确认挂号信息</h1>
  <div>
    <el-card style="max-width: 100%; margin: 20px 20px">
      <template #header>
        <div class="card-header">
          <span>请点击选择就诊人</span>
          <el-button type="success" class="header_click" @click="header_click">添加就趁人</el-button>
        </div>
      </template>
      <div class="topcard_body">
      <visitor @changeSence="changeSence(p)" @click="getShow(p)" v-for="p in parientArr" :key="p.id" :p="p" :patientId="patientId"/>
    </div>
    </el-card>
  </div>
  <!-- 底部信息 -->
  <div class="footer">
    <el-card style="width: 918.4px; margin: 20px 20px">
      <template #header>
        <div class="buttom_card-header">
          <span>挂号信息</span>
        </div>
      </template>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="就诊日期"
          >{{ schedule.workDate }} {{ schedule.param?.dayOfWeek }}</el-descriptions-item
        >
        <el-descriptions-item label="就诊医院">{{ schedule.param?.hosname }}</el-descriptions-item>
        <el-descriptions-item label="就诊科室">{{ schedule.param?.depname }}</el-descriptions-item>
        <el-descriptions-item label="医生名称">{{ schedule.docname }} </el-descriptions-item>
        <el-descriptions-item label="医生职称">{{ schedule.title }} </el-descriptions-item>
        <el-descriptions-item label="医生专科">{{ schedule.skill }} </el-descriptions-item>
        <el-descriptions-item label="医事服务费"> {{ schedule.amount }}</el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-button type="primary" class="tj" :disabled="que" @click="gotoUser">确认挂号</el-button>
  </div>
</template>

<script setup>
import Visitor from '@/components/visitor/index.vue'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { reqPatient, reqSchedule } from '@/api/hospital'
import { reqSumbitorder } from '@/api/user'
const $route = useRoute()
const $router = useRouter()
const parientArr = ref([])
let schedule = ref('')
let que = ref(true)
// const show = ref()
// 医生id
let scheduleId = ref('')
// 就诊人id
let patientId = ref('')
onMounted(() => {
  getPatient()
  getSchedule()
  // console.log('路由信息', $route)
})
// 就诊人列表
const getPatient = async () => {
  let result = await reqPatient()
  if (result.code == 200) {
    parientArr.value = result.data
    // console.log('就诊人列表',result.data)
  }
}
const getSchedule = async () => {
  let result = await reqSchedule($route.query.scheduleld)
  if (result.code == 200) {
    schedule.value = result.data
    scheduleId.value = result.data.id
    // console.log('排版医生数据', schedule.value)
  }
}
// 获取就诊人id及使用就诊人id控制是否以选择
const getShow = (p) => {
  // console.log('选择的就诊人信息', p)
  patientId.value = p.id
  que.value = false
  console.log(patientId.value,p)
}
// 跳转路由去user页面
const gotoUser = async () => {
  // console.log($route.query.hoscode,scheduleId.value,patientId.value)
  let result = await reqSumbitorder($route.query.hoscode, scheduleId.value, patientId.value)
  if (result.code == 200) {
    // console.log('订单id',result.data)
    $router.push({ path: '/user/order', query: { id: result.data } })
  }
}
// 添加就诊人
const header_click=()=>{
  $router.push({path:'/user/patient',query:{type:'add'}})
}
// 修改就诊人
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  margin-left: 10px;
  align-items: center;
}
.topcard_body {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tj {
  margin-bottom: 80px;
  width: 200px;
  height: 40px;
}
.topcard_body:hover {
  cursor: default;
}
.footer:hover {
  cursor: default;
}
h1:hover {
  cursor: default;
}
</style>
