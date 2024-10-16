import { defineStore } from 'pinia'
import { getHoscode, getDepartHoscode, reqHsoBooking, reqHosAuth } from '@/api/hospital'

const useRegistryStore = defineStore('Registry', {
  // 开启持久化
  persist: true,
  state: () => {
    return {
      hospitalInfo: [],
      departInfo: [],
      bookingScheduleInfo: {},
      hosDoctorInfo: {}
    }
  },
  actions: {
    // 获取医院详情
    async getHospital(hoscode) {
      let result = await getHoscode(hoscode)
      if (result.code == 200) {
        // console.log('医院详情信息',result.data)
        this.hospitalInfo = result.data
      }
    },
    async getDepart(hoscode) {
      let resultDepart = await getDepartHoscode(hoscode)
      // console.log('科室及门诊信息',resultDepart.data)
      if (resultDepart.code == 200) {
        this.departInfo = resultDepart.data
      }
    },
    // 获取科室排版数据
    async getHosBookScheduleRule(page, limit, hoscode, depcode) {
      let result = await reqHsoBooking(page, limit, hoscode, depcode)
      // console.log('科室数据',result.data)
      if (result.code == 200) {
        this.bookingScheduleInfo = result.data
      }
    },
    //获取排班医生数据
    async getHosAuth(hoscode, depcode, workDate) {
      let result = await reqHosAuth(hoscode, depcode, workDate)
      console.log('排版医生数据', result)
      this.hosDoctorInfo = result.data
    }
  },
  getters: {

  }
})
export default useRegistryStore
