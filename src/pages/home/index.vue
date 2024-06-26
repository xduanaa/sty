<template>
  <!-- 搜索框 -->
  <div>
    <div class="block text-center">
      <el-carousel height="350px">
        <el-carousel-item v-for="item in 4" :key="item">
          <img src="../../assets/images/cca.jpg" alt="" class="coa" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="search">
      <el-autocomplete
        v-model="state1"
        :fetch-suggestions="querySearch"
        clearable
        class="inline-input"
        placeholder="请输入要查询的医院"
        @select="handleSelect"
      />
      <el-button type="primary">搜索</el-button>
    </div>
  </div>
  <!-- 医院 -->
  <div>
    <el-row>
      <el-col :span="18">
        <div>
          <h1 style="color: black; margin: 20px 0">医院</h1>
          <!-- 等级 -->
          <div class="hospital">
            <h1>等级:</h1>
            <ul style="display: flex">
              <li :class="{active:activeFlag==''}" @click="changeleve('')"    style="margin-left: 18px">全部</li>
              <li v-for="hl in hospitalLevenArr" :key="hl" :class="{active:activeFlag==hl.value}" @click="changeleve(hl.value)">{{ hl.name }}</li>
            </ul>
          </div>
        </div>
        <!-- 地区 -->
        <div class="diqu">
          <h1 style="width: 60px; margin-top: 5px">地区:</h1>
          <ul style="display: flex; flex-wrap: wrap">
            <li :class="{active:activeflag==''}"  @click="changeactive('')">全部</li>
            <li v-for="hr in hospitalRegArr" :key="hr" :class="{active:activeflag==hr.id}" @click="changeactive(hr.id)">{{hr.name}}</li>
          </ul>
        </div>
        <!-- 医院卡片 -->
        <div class="yy">
          <el-card shadow="hover" v-for="(item, index) in hospitalArr" :key="index" class="yyxq">
            <div class="yyxq-content">
              <div class="yyxq-left">
                <h1>{{ item.hosname }}</h1>
                <div class="yyxq-buttom">
                  <span>{{ item.param.hostypeString }}</span>
                  <span>每天:{{ item.bookingRule?.releaseTime }}放号</span>
                </div>
              </div>
              <div class="yyxq-right"><img :src="`data:image/jpeg;base64,${item.logoData}`" alt="" /></div>
            </div>
          </el-card>
        </div>
        <!-- 分页 -->
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :background="true"
          layout=" prev, pager, next, jumper,->, sizes,total"
          :total="hostpitalTotal"
          @current-change="currentChange"
          @size-change="sizeChange"
        />
      </el-col>
      <el-col :span="6">456</el-col>
    </el-row>
  </div>
</template>
<script setup>
import { reqHospital,reqHpspitalLeveAndRen } from '@/api/home'
import { ref, onMounted } from 'vue'
let pageNo = ref(1)
let pageSize = ref(10)
let hospitalArr = ref([])
let hostpitalTotal = ref(0)
let hospitalLevenArr=ref([])
let activeFlag = ref('')
let hospitalRegArr=ref([])
let activeflag=ref('')
let hispitalType=ref('')
let districtCode=ref('')
onMounted(() => {
  getHospitalInfo()
  getHospitalLeven()
  getHospitalReg()
})
const changeactive = (hr)=>{
  activeflag.value=hr
  console.log(activeflag.value)
  districtCode.value=activeflag.value
  getHospitalInfo()
  console.log(11)
}

const changeleve=(hl)=>{
    activeFlag.value=hl
    // console.log(activeFlag.value)
    hispitalType.value=hl
    getHospitalInfo()
}
const getHospitalInfo = async () => {
  let resultInfo = await reqHospital(pageNo.value, pageSize.value,hispitalType.value,districtCode.value)
  // console.log(resultInfo)
  if (resultInfo.code === 200) {
    hospitalArr.value = resultInfo.data.content
    hostpitalTotal.value = resultInfo.data.totalElements
  }
}
const currentChange = () => {
  getHospitalInfo()
}
const sizeChange = () => {
  getHospitalInfo()
}
const getHospitalLeven= async ()=>{
  let hostpitalLeven = await reqHpspitalLeveAndRen('hostype')
  // console.log("医院等级",hostpitalLeven)
  if(hostpitalLeven.code==200){
    hospitalLevenArr.value=hostpitalLeven.data
    // console.log(hostpitalLeven.data)
  }
}
const getHospitalReg= async ()=>{
  let hospitalReg = await reqHpspitalLeveAndRen('beijin')
  console.log('diqu',hospitalReg)
  if(hospitalReg.code==200){
    hospitalRegArr.value=hospitalReg.data
  }
}

</script>

<style scoped>
.el-input__inner {
  width: 400px;
}
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 350px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.coa {
  width: 1200px;
  height: 350px;
}
.search {
  width: 500px;
  height: 150px;
  justify-content: center;
  display: flex;
  align-items: center;
  margin: auto;
}
.hospital {
  display: flex;
  color: #7f7f7f;
  margin: 10px 0;
}
.hospital li {
  margin: 0 10px;
}
.hospital li:hover {
  color: aqua;
  cursor: pointer;
}
.hospital li.active{
  color: aqua;
}
.diqu {
  color: #7f7f7f;
  display: flex;
  margin: 20px 0;
}
.diqu li {
  margin: 5px 10px;
}
.diqu li:hover {
  color: aqua;
  cursor: pointer;
}
.diqu li.active{
  color: aqua;
}
.yy {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.yyxq {
  width: 48%;
  margin: 15px 0;
  cursor: pointer;
}
.yyxq-content {
  display: flex;
  justify-content: space-between;
}
.yyxq img {
  width: 50px;
  height: 50px;
}
.yyxq-buttom {
  margin-top: 15px;
  color: #7f7f7f;
}
.yyxq-buttom span {
  margin-right: 50px;
}
</style>
