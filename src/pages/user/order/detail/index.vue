<template>
  <el-card class="detail">
    <template #header>
      <div class="card-header">
        <h1>挂号详情</h1>
      </div>
    </template>
    <div class="centre">
      <el-tag type="success" class="success">{{ patientInfo.param?.orderStatusString }}</el-tag>
      <div class="centre_right">
        <img src="../../../../assets/images/logo.jpg" alt="" />
        <div>
          <p>微信关注"北京114预约挂号"</p>
          <p>"快速预约挂号"</p>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="footer">
        <div class="footer_left">
          <el-descriptions class="margin-top" :column="1" border>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item" style="width: 100px">就诊人信息</div>
              </template>
              {{ patientInfo.patientName }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">就诊日期</div>
              </template>
              {{ patientInfo.reserveDate }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">就诊医院</div>
              </template>
              {{ patientInfo.hosname }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">就诊科室</div>
              </template>
              {{ patientInfo.depname }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">医生职称</div>
              </template>
              {{ patientInfo.title }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">医事服务费</div>
              </template>
              {{ patientInfo.amount }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">挂号单子</div>
              </template>
              {{ patientInfo.outTradeNo }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">挂号时间</div>
              </template>
              {{ patientInfo.createTime }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <div class="footer_right">
          <div class="footer_right_top">注意事项</div>
          <div class="footer_right_buttom">
            <ul>
              <li>1.请确认就诊人信恩是否准确,若慎写错误将无法取号就诊,损失由本人承担</li>
              <li class="im">
                2.【取号】就诊当天需在{{
                  patientInfo.fetchTime
                }}在医院取号,未取号规为爽约,该号不退不换
              </li>
              <li>3.【退号】在{{ patientInfo.quitTime }}前可在线退号 ,逾期将不可办理退号退费</li>
              <li>
                4.北京114预约挂号支持自费患者使用身份证预约,同时支持北京市医保患者使用北京社保卡在平台预约挂号。请于就诊当日,携带预约挂得所使用的有效身份证件到院取号
              </li>
              <li>5.请注意北京市医保患者在住院期间不能偿用社保卡在门诊取号</li>
            </ul>
          </div>
        </div>
      </div>
      <div v-if="patientInfo.orderStatus !== -1">
        <el-popconfirm @confirm="deleteOrder" title="Are you sure to delete this?">
          <template #reference>
            <el-button class="delete">取消预约</el-button>
          </template>
        </el-popconfirm>
        <el-button
          type="primary"
          class="pay"
          v-if="patientInfo.orderStatus != 1"
          @click="changeShow"
          >支付</el-button
        >
      </div>
    </template>
  </el-card>

  <el-dialog
    v-model="dialogVisible"
    title="微信支付"
    width="500"
    @close="closePay"
    center
  >
    <div class="wxcode">
      <img :src="imgUrl" alt=""  style="width: 250px; height: 250px" />
      <p>请使用微信扫一扫</p>
      <p>扫描二维码支付</p>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { reqOrderInfo, reqCanceOrder, reqwxNative, reqWXPayStatus } from '@/api/user'
import { useRoute } from 'vue-router'
import QRCode from 'qrcode'
import { ElMessage } from 'element-plus';
// import { ElMessage, ElMessageBox } from 'element-plus'
const $route = useRoute()
const patientInfo = ref('')
const show = ref('')
const dialogVisible = ref(false)
const imgUrl = ref('')
let timer = ref('')
onMounted(() => {
  getOrderInfo()
})
// 获取就诊人订单
const getOrderInfo = async () => {
  let result = await reqOrderInfo($route.query.id)
  if (result.code == 200) {
    console.log('就诊人订单', result)
    show.value = 1
    patientInfo.value = result.data
  }
}
// 取消预约
const deleteOrder = async () => {
  let result = await reqCanceOrder($route.query.id)
  console.log('取消预约', result)
  if (result.code == 200) {
    getOrderInfo()
  }
}
// 获取微信支付二维码
const changeShow = async () => {
  dialogVisible.value = true
  let result = await reqwxNative($route.query.id)
  if (result.code == 200) {
    console.log('微信支付二维码路径',result.data.codeUrl )
    imgUrl.value = await QRCode.toDataURL(result.data.codeUrl)
    // 设置定时器每隔2s询问支付状态
    timer.value = setInterval(async () => {
      let result = await reqWXPayStatus($route.query.id)
      console.log('待支付')
      if (result.data) {
        dialogVisible.value=false
        ElMessage({
          type:'success',
          message:'支付成功'
        })
        clearInterval(timer.value)
        getOrderInfo()
      }
    }, 2000)
  } else {
    console.log(result)
  }
}
// 关闭微信支付并清楚定时器
const closePay = ()=>{
  clearInterval(timer.value)
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
.card-header h1 {
  font-weight: 900;
  font-size: 20px;
}
.centre {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.centre .success {
  width: 130px;
  height: 30px;
  font-size: 14px;
}
.centre img {
  width: 50px;
  height: 50px;
}
.centre_right {
  display: flex;
  justify-content: center;
  align-items: center;
}
.centre_right p {
  margin: 2px 2px;
}
.footer {
  display: flex;
}
.footer_left {
  flex: 4;
  margin-right: 50px;
}
.footer_right {
  flex: 5;
  border: 1px solid #ebeef7;
}
.footer_right_top {
  height: 60px;
  line-height: 60px;
  font-size: 20px;
  padding-left: 20px;
  border-bottom: 1px solid #ebeef7;
}
.footer_right_buttom {
  margin-left: 20px;
  font-size: 14px;
  margin-top: 20px;
}
.footer_right_buttom li {
  line-height: 20px;
  margin: 5px;
}
.im {
  color: red;
}
.pay,
.delete {
  margin-top: 20px;
}
.wxcode {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid #ebeef7;
}
.wxcode img {
  margin-top: 20px;
}
.wxcode p {
  line-height: 16px;
  margin-top: 5px;
}
</style>
