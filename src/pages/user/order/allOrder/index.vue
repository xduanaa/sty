
<template>
  <el-card class="detail">
    <template #header>
      <div class="card-header">
        <span>挂号订单</span>
      </div>
    </template>
    <el-form class="form" :form="orderInfos" label-width="auto">
      <el-form-item label="就诊人" class="item">
        <el-select v-model="patientId" placeholder="请选择就诊人" @change="changePS">
          <el-option label="全部就诊人" :value="''"></el-option>
          <el-option v-for="item in patientArr" :key="item" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="订单状态" class="item">
        <el-select v-model="status" placeholder="请选择订单状态" @change="changePS">
          <el-option label="所有订单" :value="''"></el-option>
          <el-option
            v-for="item in orderAuah"
            :key="item"
            :label="item.comment"
            :value="item.status"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <el-table :data="orderInfos.records" style="width: 100%">
      <el-table-column prop="reserveDate" label="就诊时间" width="110" />
      <el-table-column prop="hosname" label="医院" />
      <el-table-column prop="depname" label="科室" width="150" />
      <el-table-column prop="title" label="医生" width="100" />
      <el-table-column prop="amount" label="医生服务费" width="100" />
      <el-table-column prop="patientName" label="就诊人" width="70" />
      <el-table-column prop="param.orderStatusString" label="订单状态" />
      <el-table-column label="操作" width="70">
        <!--  eslint-disable  -->
        <template #="{ row }">
          <div>
            <el-button link @click="xiangqing(row)">详情</el-button>
          </div>
        </template>
        <!--  eslint-enable -->
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pages"
      v-model:page-size="pageNo"
      :page-sizes="[10, 20, 30, 40]"
      :background="true"
      layout="prev, pager, next, jumper,->, sizes,total"
      :total="400"
      @current-change="handleChange"
      @size-change="handleSize"
    />
  </el-card>
</template>

<script setup>
import { reqOrderInfos, reqOrderAuth, reqOrderInfo } from '@/api/user'
import { reqPatient } from '@/api/hospital'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const $router = useRouter()
const status = ref('')
const pages = ref(1)
const pageNo = ref(10)
const orderInfos = ref('')
const orderAuah = ref('')
const patientArr = ref('')
let patientId = ref('')
onMounted(() => {
  getOrderInfos()
  getOrderAuth()
  getPatient()
})
//获取订单列表
const getOrderInfos = async () => {
  let result = await reqOrderInfos(pages.value, pageNo.value, patientId.value, status.value)
  console.log('订单列表', result)
  if (result.code == 200) {
    orderInfos.value = result.data
  }
}
// 获取订单状态
const getOrderAuth = async () => {
  const result = await reqOrderAuth()
  // console.log('订单状态列表', result)
  if (result.code == 200) {
    orderAuah.value = result.data
  }
}
// 获取就诊人列表
const getPatient = async () => {
  const result = await reqPatient()
  // console.log('就诊人列表',result)
  if (result.code == 200) {
    patientArr.value = result.data
  }
}
// 改变页码回调
const handleChange = () => {
  getOrderInfos()
}
const handleSize = () => {
  getOrderInfos()
}
// 选择就诊人或订单状态的回调
const changePS = async () => {
  await getOrderInfos()
}
const xiangqing = async (row) => {
  console.log(row.id)
  let result = await reqOrderInfo(row.id)
  console.log(result)
  if (result.code == 200) {
    $router.push({ path: '/user/order', query: { id: row.id } })
  }
}
</script>

<style scoped>
.detail {
  margin: 20px 20px;
  margin-bottom: 50px;
}
.detail:hover {
  cursor: default;
}
.form {
  display: flex;
  /* align-items: center; */
}
.form .item {
  width: 250px;
  margin-right: 50px;
}
el-table-column {
  font-size: 14px;
}
</style>
