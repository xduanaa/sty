import { router } from "./router"
import pinia from './store'
import useUserStore from "./store/modules/use"
const useStore = useUserStore(pinia)

let arr = ['/home',
  '/hospital/registry',
  '/hospital/suspend',
  '/hospital/particular',
  '/hospital/instruction',
  '/hospital/search']
router.beforeEach((to, from, next) => {

  // console.log(useStore.userData.token)
  if (useStore.userData.token) {
    next()
  } else {
    if (arr.includes(to.path)) {
      next()
    } else {
      useStore.visiable = true
      console.log(useStore.visiable)
      next({ path: '/home' })
    }
  }
  next()
})






