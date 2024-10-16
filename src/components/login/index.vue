<template>
  <div>
    <!-- title:对话框的内容 v-model:控制对话框显示于隐藏 -->
    <!-- 手机验证码登录 -->
    <el-dialog v-model="userStore.visiable" @close="close" width="800" style="height: 500px">
      <el-row class="row-bg">
        <el-col :span="12">
          <div class="left" v-show="show">
            <div style="display: flex; justify-content: center; flex-direction: column">
              <el-form
                :model="userData"
                :rules="rules"
                ref="form"
                class="demo-ruleForm form"
                status-icon
              >
                <el-form-item prop="phone"
                  ><el-input
                    v-model="userData.phone"
                    style="width: 240px"
                    placeholder="请输入手机号码"
                    class="input" /></el-form-item
                ><el-form-item prop="code">
                  <el-input v-model="userData.code" style="width: 240px" placeholder="请输入验证码"
                /></el-form-item>
              </el-form>

              <el-button class="yzm" :disabled="!isPhone" v-show="showCount" @click="getCode">
                获取验证码
              </el-button>
              <countdown v-show="!showCount" :showCount="showCount" @getshowCode="getshowCode" />
            </div>
            <div>
              <el-button
                type="primary"
                class="denglu"
                :disabled="!isPhone || userData.code.length < 6"
                @click="login"
                >用户登录</el-button
              >
            </div>
            <span @click="changeLogin">微信扫码登录</span>
            <svg
              t="1719799855468"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2732"
              width="30"
              height="30"
              @click="changeLogin"
            >
              <path
                d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                fill="#28C445"
                p-id="2733"
              ></path>
              <path
                d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                fill="#28C445"
                p-id="2734"
              ></path>
            </svg>
          </div>
          <!-- 微信登录 -->
          <div class="wxdl" v-show="!show">
            <div class="wxlg" id="login_container"></div>
            <!-- <p style="color: black">使用微信扫一扫登录</p> -->
            <!-- <p style="color: black">"尚硅谷"</p> -->
            <div
              style="margin-top: 90px; display: flex; flex-direction: column; align-items: center"
            >
              <svg
                t="1719802058232"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="8275"
                width="32"
                height="32"
                @click="changeLogin"
              >
                <path
                  d="M341.333333 896H298.666667V170.666667h469.333333v725.333333H341.333333z m0-42.666667h384V213.333333H341.333333v640z m128-42.666666v-42.666667h128v42.666667h-128z"
                  fill="#444444"
                  p-id="8276"
                ></path>
              </svg>
              <p>手机短信验证码登录</p>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="right">
            <div class="top">
              <img src="../../assets/images/logo.jpg" alt="" />
              <img src="../../assets/images/logo.jpg" alt="" />
            </div>
            <div class="icons">
              <svg
                t="1719799855468"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2732"
                width="30"
                height="30"
              >
                <path
                  d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                  fill="#28C445"
                  p-id="2733"
                ></path>
                <path
                  d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                  fill="#28C445"
                  p-id="2734"
                ></path>
              </svg>
              <svg
                t="1719800614936"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2847"
                width="30"
                height="30"
              >
                <path
                  d="M736.653061 929.959184H287.346939c-45.97551 0-83.591837-37.616327-83.591837-83.591837V177.632653c0-45.97551 37.616327-83.591837 83.591837-83.591837h449.306122c45.97551 0 83.591837 37.616327 83.591837 83.591837v668.734694c0 45.97551-37.616327 83.591837-83.591837 83.591837zM287.346939 135.836735c-22.987755 0-41.795918 18.808163-41.795919 41.795918v668.734694c0 22.987755 18.808163 41.795918 41.795919 41.795918h449.306122c22.987755 0 41.795918-18.808163 41.795919-41.795918V177.632653c0-22.987755-18.808163-41.795918-41.795919-41.795918H287.346939z"
                  fill="#333333"
                  p-id="2848"
                ></path>
                <path
                  d="M616.489796 815.020408H407.510204c-11.493878 0-20.897959-9.404082-20.897959-20.897959s9.404082-20.897959 20.897959-20.897959h208.979592c11.493878 0 20.897959 9.404082 20.897959 20.897959s-9.404082 20.897959-20.897959 20.897959z"
                  fill="#333333"
                  p-id="2849"
                ></path>
              </svg>
            </div>
            <div class="text">
              <div style="margin-left: 7px">
                <span>微信扫一扫关注</span> <span>"快速预约挂号"</span>
              </div>
              <div style="margin-left: 14px">
                <span>扫一扫下载</span><span>"预约挂号"APP下载</span>
              </div>
            </div>
            <div class="tital">
              <p>XXXX官方指定平台</p>
              <p>快速挂号 安全放心</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script setup>
import useUserStore from '@/store/modules/use'
import { ref, reactive, computed, watch } from 'vue'
import { getUserCode, reqWXLogin } from '@/api/hospital'
import countdown from '../countdown/index.vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const $router=useRouter()
// 接收子组件传过来的showCount
const getshowCode = (val) => {
  showCount.value = val
  // console.log(11111111, val)
}
// showCount控制验证码倒计时切换
let showCount = ref(true)
// 手机and验证码
let userData = reactive({
  phone: '',
  code: ''
})
let userStore = useUserStore()
// show控制登录方式
let show = ref(true)
//表单校验
const form = ref()
// 登录方式切换为微信登录
const changeLogin = async () => {
  show.value = !show.value
  // console.log(show)
  let redirect_Url = encodeURIComponent(window.location.origin + '/wxlogin')
  const result = await reqWXLogin(redirect_Url)
  console.log(result)
  // if (result.code == 200) {
  //   this.wxdata = result.data
  // }
  // eslint-disable-next-line
  new WxLogin({
    self_redirect: true,
    id: 'login_container', //显示二维码容器的元素id
    appid: result.data.appid,
    scope: 'snsapi_login',
    redirect_uri: result.data.redirectUri,
    state: result.data.state,
    style: 'black'
  })
}

// 判断是否为手机号
let isPhone = computed(() => {
  const reg = /^1[3,4,5,6,7,8,9][0-9]{9}$/
  return reg.test(userData.phone)
})
//点击获得验证码
const getCode = async () => {
  showCount.value = false
  let result = await getUserCode(userData.phone)
  // console.log(result)
  if (result.code == 200) {
    userData.code = result.data
  }
}
// 用户登录
const login = async () => {
  // console.log(userData)
  await form.value.validate()
  try {
    await userStore.userLogin(userData)
    userStore.visiable = false
    $router.push({path:'/home'})
  } catch (error) {
    ElMessage({
      type: 'error',
      message: error.message
    })
  }
}
// 关闭登录框是清空表单数据
const close = async () => {
  // 清空表单中的用户数据，如果重置了form表单可不写改代码
  Object.assign(userData, { phone: '', code: '' })
  // 重置form表单
  await form.value.resetFields()
}
// 自定义表单校验规则
const validatorCode = (rule, value, callback) => {
  if (/^\d{6}$/.test(value)) {
    callback()
  } else {
    callback(new Error('请输入正确的验证码'))
  }
}
const validatorPhone = (rule, value, callback) => {
  if (/^1[3,4,5,6,7,8,9][0-9]{9}$/.test(value)) {
    callback()
  } else {
    callback(new Error('请输入正确的手机号'))
  }
}
// 表单验证规则
const rules = {
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { trigger: 'blur', validator: validatorPhone }
  ],
  code: { trigger: 'change', validator: validatorCode }
}
// 通过监视控制登录方式的值：show来判断是否关闭对话框以及将微信返回的token存入本地
watch(() => show.value,(val)=>{
  if(val==false){
    userStore.queryState()
  }
})
</script>

<style scoped>
.left {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border: 1px solid #dad7d7;
  height: 344px;
  user-select: none;
}
.right {
  margin-top: 20px;
  user-select: none;
}
.yzm {
  width: 90px;
}

.denglu {
  width: 240px;
  margin-top: 10px;
}
.left span {
  margin: 15px auto;
}
.left span:hover {
  cursor: pointer;
}
.left .icon {
  margin: 0 auto;
}
.left .icon:hover {
  cursor: pointer;
}
.top {
  display: flex;
  justify-content: space-around;
}
.top img {
  width: 140px;
  height: 140px;
}
.icons {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
}
.text {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
}
.text div {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tital {
  font-size: 20px;
  font-weight: 900;
  margin-top: 50px;
  color: black;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.tital p {
  margin: 10px 0;
}
.tital p:hover {
  cursor: default;
}
.right span:hover {
  cursor: default;
}
.wxdl {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #dad7d7;
  user-select: none;
}
.wxdl span {
  font-size: 20px;
  color: black;
  /* margin: 20px 0; */
  font-weight: 600;
}
.wxdl img {
  width: 200px;
  height: 200px;
}
.wxdl p {
  margin: 5px 0;
}
.wxdl p:hover {
  cursor: default;
}
.wxdl span:hover {
  cursor: default;
}
.wxlg {
  width: 300px;
  height: 300px;
}
</style>
