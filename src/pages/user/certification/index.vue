<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>实名信息</span>
        </div>
      </template>
      <div class="centent">
        <div class="jy">
          完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续操作，建议进行实名认证
        </div>
        <!-- 已实名认证 -->
        <el-descriptions v-if="userinfo.authStatus == 1" class="margin-top" :column="1" border>
          <el-descriptions-item label-align="center" class="left">
            <template #label>
              <div class="cell-item">用户姓名</div>
            </template>
            {{ userinfo.name }}
          </el-descriptions-item>
          <el-descriptions-item label-align="center">
            <template #label>
              <div class="cell-item">证件类型</div>
            </template>
            {{ (userinfo.certificatesType = '10' ? '身份证' : '户口本') }}
          </el-descriptions-item>
          <el-descriptions-item label-align="center">
            <template #label>
              <div class="cell-item">证件号</div>
            </template>
            {{ userinfo.certificatesNo }}
          </el-descriptions-item>
        </el-descriptions>
        <!-- 未实名认证 -->
        <div style="display: flex; justify-content: center" v-if="userinfo.authStatus == 0">
          <el-form
            ref="from"
            :model="userAuthVo"
            :rules="rules"
            label-width="auto"
            style="min-width: 400px"
          >
            <el-form-item label="姓名" prop="name">
              <el-input v-model="userAuthVo.name" placeholder="请输入姓名" />
            </el-form-item>
            <el-form-item label="证件类型" prop="certificatesType">
              <el-select v-model="userAuthVo.certificatesType" placeholder="请选择证件类型">
                <el-option label="身份证" value="10" />
                <el-option label="户口本" value="20" />
              </el-select>
            </el-form-item>
            <el-form-item label="身份证" prop="certificatesNo">
              <el-input v-model="userAuthVo.certificatesNo" placeholder="请输入身份证号" />
            </el-form-item>
            <el-form-item label="上传证件" required prop="certificatesUrl"
              ><el-upload
                ref="upload"
                action="/api/oss/file/fileUpload?fileHost=12346"
                list-type="picture-card"
                :limit="1"
                :on-exceed="ts"
                :on-success="handleSuccess"
                :on-preview="fd"
                :on-remove="handleRemove"
                ><img src="../../../assets/images/logo.jpg" alt="" width="145px" height="145px" />
              </el-upload>
              <el-dialog v-model="dialogVisible">
                <img
                  w-full
                  :src="userAuthVo.certificatesUrl"
                  alt=""
                  style="width: 100%; height: 100%"
                />
              </el-dialog>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="margin-left: 68px" @click="goto">提交</el-button>
              <el-button @click="resver">重写</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>
  </div>
  <el-button :plain="true" @click="open">Show message</el-button>
</template>

<script setup name="creas">
import { ref, reactive, onMounted } from 'vue'
import { reqUserInfo, reqUserAush } from '@/api/user'
import { ElMessage } from 'element-plus'
// let show = ref(false)
const upload = ref()
const from = ref()
const dialogVisible = ref(false)
const userinfo = ref('')
// 实名认证信息
const userAuthVo = reactive({
  certificatesNo: '',
  certificatesType: '',
  certificatesUrl: '',
  name: ''
})
const open = () => {
  ElMessage({
    message: 'This is a message.',
    grouping: true,
    type: 'success',
    duration:0,
  })
}
onMounted(() => {
  getUserInfo()
})
//获取用户实名信息
const getUserInfo = async () => {
  let result = await reqUserInfo()
  console.log('用户实名信息', result)
  if (result.code == 200) {
    userinfo.value = result.data
  }
}

//超出长传上限的回调
const ts = () => {
  alert('只可以上传1张图片')
}
// 放大图片
const fd = () => {
  console.log('发大图片')
  dialogVisible.value = true
}
// 上传成功的回调
const handleSuccess = (response) => {
  from.value.clearValidate('certificatesUrl')
  // console.log(response, uploadFile)
  userAuthVo.certificatesUrl = response.data
}
// 文件列表删除照片的回调
const handleRemove = () => {
  userAuthVo.certificatesUrl = ''
}
// 重写
const resver = () => {
  upload.value.clearFiles()
  Object.assign(userAuthVo, {
    certificatesNo: '',
    certificatesType: '',
    certificatesUrl: '',
    name: ''
  })
}
// 提交实名认证信息
const goto = async () => {
  await from.value.validate()
  try {
    let result = await reqUserAush(userAuthVo)
    console.log('实名认证', result)
    ElMessage({
      type: 'success',
      message: '认证成功'
    })
    getUserInfo()
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '认证失败'
    })
  }
}
// 名字校验规则
const validatorName = (rules, value, callback) => {
  const reg = /^([a-zA-Z0-9\u4e00-\u9fa5·]{1,10})$/
  if (reg.test(value)) {
    callback()
  } else {
    callback(new Error('请输入正确的人民'))
  }
}
const validatorCertificatesType = (rules, value, callback) => {
  console.log(value)
  if (value == '10' || value == '20') {
    callback()
  } else {
    callback(new Error('请选择证件类型'))
  }
}
const validatorertificatesNo = (rules, value, callback) => {
  const reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)?$/i
  const hkb = /^\d{9}/
  if (reg.test(value) || hkb.test(value)) {
    callback()
  } else {
    callback(new Error('请输入正确的身份证'))
  }
}
const validatorCertificatesurl = (rules, value, callback) => {
  console.log(value)
  if (value.length) {
    callback()
  } else {
    callback(new Error('请上传手持身份证照片'))
  }
}
// 表单校验
const rules = reactive({
  name: { required: true, validator: validatorName, trigger: 'change' },
  certificatesType: { required: true, trigger: 'change', validator: validatorCertificatesType },
  certificatesNo: { required: true, trigger: 'change', validator: validatorertificatesNo },
  certificatesUrl: { requird: true, validator: validatorCertificatesurl }
})
</script>

<style scoped>
.jy {
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  color: #777;
}
:deep(.el-descriptions__label) {
  width: 150px;
}
</style>
