import '@/style/reset.css'
import { createApp } from 'vue'
import App from './App.vue'
import HospitalTop from '@/components/hospital_top/index.vue'
import HospitalBottom from '@/components/hospital_bottom/index.vue'
import Login from '@/components/login/index.vue'
import Visitor from '@/components/visitor/index.vue'
import { router } from '@/router/index.js'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import "./permisstion"
import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/el-message.css";
import "element-plus/theme-chalk/el-notification.css";
import "element-plus/theme-chalk/el-message-box.css";
import "element-plus/theme-chalk/el-drawer.css";

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
pinia.use(piniaPluginPersistedstate)
app.use(ElementPlus, {
  locale: zhCn,
  zIndex: 3000
})
app.use(router)
app.component('HospitalTop', HospitalTop)
app.component('Login', Login)
app.component('HospitalBottom', HospitalBottom)
app.component('Visitor', Visitor)
app.mount('#app')
