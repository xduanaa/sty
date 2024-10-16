import { defineStore } from 'pinia'
import { reqUserLogin } from '@/api/hospital'


const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      visiable: false, //控制登陆组件显示于隐藏
      userData: JSON.parse(localStorage.getItem('userData')) || {},
    }
  },
  actions: {
    async userLogin(data) {
      // console.log(data)
      let result = await reqUserLogin(data)
      // console.log(result)
      if (result.code == 200) {
        this.userData = result.data
        // console.log('已登录的用户数据',this.userData)
        localStorage.setItem('userData', JSON.stringify(this.userData))
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 退出登录
    async logout() {
      this.userData = { name: '', token: '' }
      localStorage.removeItem('userData')
    },
    // 查询微信扫码是否将用户数据存入本地
    queryState() {
      let timer = setInterval(() => {
        if (localStorage.getItem(JSON.parse('userlogin'))) {
          this.visiable = false
          this.data = JSON.parse(localStorage.getItem('userlogin'))
          clearInterval(timer)
        }
      }, 1000)
    }
  },

  getters: {

  }
})
export default useUserStore