import request from '@/utils/request'


const API = {
  GETHOSPITALHOSCODE_URL: '/hosp/hospital/',
  GETHOSPITALDEPRTAMENT_URL: '/hosp/hospital/department/',
  GETUSERCODE_URL: '/sms/send/',
  GETUSERLOGIN_URL:'/user/login',
  GETWXLOGINPARA_URL:'/user/weixin/getLoginParam/',
  GETHOSBOOKING_URL:'/hosp/hospital/auth/getBookingScheduleRule/',
  // 获取排班数据
  GETHOSAUTH_URL:'/hosp/hospital/auth/findScheduleList/',
  // 获取就诊人列表
  GETPATIENT_URL:'/user/patient/auth/findAll',
  // 获取排版数据.
  GETSCHEDULE_URL:'/hosp/hospital/getSchedule/'
}

export const getHoscode = (hoscode) => request.get(API.GETHOSPITALHOSCODE_URL + `${hoscode}`)
export const getDepartHoscode = (hoscode) => request.get(API.GETHOSPITALDEPRTAMENT_URL + `${hoscode}`)
export const getUserCode = (phone) => request.get(API.GETUSERCODE_URL + `${phone}`)
export const reqUserLogin=(data)=>request.post(API.GETUSERLOGIN_URL,data)
export const reqWXLogin=(wxRedirectUrl)=>request.get(API.GETWXLOGINPARA_URL+`?wxRedirectUrl=${wxRedirectUrl}`)
// 获取医院可预约排版数据
export const reqHsoBooking=(page,limit,hoscode,depcode)=> request.get(API.GETHOSBOOKING_URL+`${page}/${limit}/${hoscode}/${depcode}`)
//根据医院code、科室code、时间获取排版数据
export const reqHosAuth=(hoscode,depcode,workDate)=>request.get(API.GETHOSAUTH_URL+`${hoscode}/${depcode}/${workDate}`)
//获取就诊人列表
export const reqPatient=()=>request.get(API.GETPATIENT_URL)
// 获取排版数据
export const reqSchedule=(scheduleld)=>request.get(API.GETSCHEDULE_URL+`${scheduleld}`)
