<template>
  <el-card style="max-width: 100%; margin: 20px 20px 55px 20px">
    <template #header v-if="scence == 1">
      <div class="card-header">
        <span>就诊人管理</span>
        <el-button type="success" class="header_click" @click="addPaitent">添加就趁人</el-button>
      </div>
    </template>
    <div class="topcard_body" v-if="scence == 1">
      <Visitor
        @changeSence="changeSence(p)"
        @getId="getId(p)"
        v-for="p in parientArr"
        :key="p.id"
        :p="p"
      />
    </div>
    <div v-if="scence == 2" class="cantarn">
      <div class="head">
        <h1>添加就诊人</h1>
      </div>
      <div>
        <h2>就诊人信息</h2>
        <el-form label-width="auto" class="demo-ruleForm">
          <el-form-item class="item" label="姓名">
            <el-input v-model="patient.name"></el-input>
          </el-form-item>
          <el-form-item class="item" label="证件类型">
            <el-select v-model="patient.certificatesType" placeholder="请选择证件类型">
              <el-option label="身份证" value="10" />
              <el-option label="户口本" value="20" />
            </el-select>
          </el-form-item>
          <el-form-item class="item" label="证件号码">
            <el-input v-model="patient.certificatesNo"></el-input>
          </el-form-item>
          <el-form-item class="item" label="用户性别">
            <el-radio-group v-model="patient.sex">
              <el-radio :value="0">男</el-radio>
              <el-radio :value="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="item" label="出生日期">
            <el-col>
              <el-date-picker
                type="date"
                placeholder="Pick a date"
                style="width: 100%"
                v-model="patient.birthdate"
                format="YYYY-MM-DD"
              />
            </el-col>
          </el-form-item>
          <el-form-item class="item" label="手机号码">
            <el-input v-model="patient.phone"></el-input>
          </el-form-item>

          <h2>建档信息</h2>

          <el-form-item class="item" label="婚姻状况">
            <el-radio-group v-model="patient.isMarry">
              <el-radio :value="0">已婚</el-radio>
              <el-radio :value="1">未婚</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="item" label="自费/医保">
            <el-radio-group v-model="patient.isInsure">
              <el-radio :value="0">自费</el-radio>
              <el-radio :value="1">医保</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="item" label="当前住址">
            <el-cascader :props="props" v-model="patient.cityCode"> </el-cascader>
          </el-form-item>
          <el-form-item class="item" label="详情地址">
            <el-input v-model="patient.address"></el-input>
          </el-form-item>

          <h2>联系人信息</h2>

          <el-form-item class="item" label="姓名">
            <el-input v-model="patient.contactsName"></el-input>
          </el-form-item>
          <el-form-item class="item" label="证件类型">
            <el-input v-model="patient.contactsCertificatesType"></el-input>
          </el-form-item>
          <el-form-item class="item" label="证件号码">
            <el-input v-model="patient.contactsCertificatesNo"></el-input>
          </el-form-item>
          <el-form-item class="item" label="手机号码">
            <el-input v-model="patient.contactsPhone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="getAddPatient"
              style="margin-left: 350px; margin-top: 50px; width: 120px"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import Visitor from '@/components/visitor/index.vue'
import { reqPatient } from '@/api/hospital'
import { reqAddPatien, reqRemovePatient } from '@/api/user'
import { reqDict } from '@/api/user'
import { onMounted, reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
const $route = useRoute()
const $router = useRouter()
const parientArr = ref('')
const patient = reactive({
  address: '',
  birthdate: '',
  cardNo: '',
  certificatesNo: '',
  certificatesType: '',
  cityCode: [],
  contactsCertificatesNo: '',
  contactsCertificatesType: '',
  contactsName: '',
  contactsPhone: '',
  isMarry: 0,
  isInsure: 0,
  name: '',
  phone: '',
  sex: 0
})
onMounted(() => {
  getPatient()
  if ($route.query.type == 'add') {
    scence.value = 2
  }
  if ($route.query.type == 200) {
    scence.value = 2
  }
})
let scence = ref(1)
// 获取就诊人列表
const getPatient = async () => {
  let result = await reqPatient()
  console.log('就诊人列表', result)
  if (result.code == 200) {
    parientArr.value = result.data
  }
}
// 修改就诊人
const changeSence = async (p) => {
  Object.assign(patient, p)
  console.log(patient)
  scence.value = 2
}
// 显示添加就诊人页面
const addPaitent = () => {
  Object.assign(patient, {
    address: '',
    birthdate: '',
    cardNo: '',
    certificatesNo: '',
    certificatesType: '',
    cityCode: [],
    contactsCertificatesNo: '',
    contactsCertificatesType: '',
    contactsName: '',
    contactsPhone: '',
    isMarry: 0,
    isInsure: 0,
    name: '',
    phone: '',
    sex: 0,
    id: null
  })
  scence.value = 2
}
// 获取地区信息
const props = {
  lazy: true,
  async lazyLoad(node, resolve) {
    const result = await reqDict(node.data.id || '86')
    // console.log('地区列表',result)
    let showData = result.data.map((item) => {
      return {
        id: item.id,
        label: item.name,
        value: item.value,
        leaf: !item.hasChildren
      }
    })
    resolve(showData)
  }
}
// 添加就诊人
const getAddPatient = async () => {
  let result = await reqAddPatien(patient)
  console.log(result)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: patient.id ? '修改成功' : '添加成功'
    })
    if ($route.query.type) {
      $router.back()
    } else {
      scence.value = 1
    }
    getPatient()
  } 
}

// 获取id删除就诊人
const getId = async (p) => {
  console.log(p)
  //  let result =  await reqRemovePatient(p.id)
  //  console.log(result)
  try {
    await reqRemovePatient(p.id)
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    getPatient()
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
    return Promise.reject(new Error(error.message))
  }
}
watch(
  () => parientArr.value,
  () => {
    if ($route.query.type == 200) {
      let user = parientArr.value.find((item) => {
        return item.id == $route.query.id
      })
      console.log(user)
      Object.assign(patient, user)
    }
  }
)
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
.cantarn {
  display: flex;
  flex-direction: column;
}
.cantarn h2 {
  margin: 40px 0;
  color: #999999;
}
.head {
  height: 40px;
  font-weight: 900;
  font-size: 20px;
}
.item {
  margin-left: 180px;
}
.demo-ruleForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 580px;
}
</style>
