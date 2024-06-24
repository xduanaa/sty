import '@/style/reset.css'
import { createApp } from 'vue'
import App from './App.vue'
import HospitalTop from '@/components/hospital_top/index.vue'
import HospitalBottom from '@/components/hospital_bottom/index.vue'
import { router } from '@/router/index.js'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(router)
app.component('HospitalTop', HospitalTop)
app.component('HospitalBottom', HospitalBottom)
app.mount('#app')
