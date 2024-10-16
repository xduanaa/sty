import request from '@/utils/request'

const API = {
  // 创建订单
  GETSUBMIT: '/order/orderInfo/auth/submitOrder/',
  // 获取订单
  GETORDERINFO: '/order/orderInfo/auth/getOrderInfo/',
  // 取消预约
  GETCANCEORDER: '/order/orderInfo/auth/cancelOrder/',
  // 获取微信支付二维码
  GETWXNATIVE: '/order/weixin/createNative/',
  // 查询支付状态
  GETWXPAYSTATUS: '/order/weixin/queryPayStatus/',
  //获取用户信息（实名认证）
  GETUSERINFO_URL: '/user/auth/getUserInfo',
  // 会员认证
  GETUSERAUSH_URL: '/user/auth/userAuah',
  //获取订单列表
  GETORDERINFO_URL: '/order/orderInfo/auth/',
  // 获取订单状态
  GETORDERAUTH: '/order/orderInfo/auth/getStatusList',
  // 获取地区列表
  GETDICT_URL: '/cmn/dict/findByParentId/',
  // 添加就诊人
  GETADDPATIENT_UR: '/user/patient/auth/save',
  // 修改就诊人
  GETPATIRNTUPDATE_URL: '/user/patient/auth/update',
  // 删除就诊人
  GETREMOVEPATIENT_URL: '/user/patient/auth/remove/'
}


//创建就诊订单
export const reqSumbitorder = (hoscode, scheduleld, patientId) => request.post(API.GETSUBMIT + `${hoscode}/${scheduleld}/${patientId}`)
export const reqOrderInfo = (id) => request.get(API.GETORDERINFO + `${id}`)
export const reqCanceOrder = (ordeerId) => request.get(API.GETCANCEORDER + `${ordeerId}`)
export const reqwxNative = (orderId) => request.get(API.GETWXNATIVE + `${orderId}`)
export const reqWXPayStatus = (orderId) => request.get(API.GETWXPAYSTATUS + `${orderId}`)
export const reqUserInfo = () => request.get(API.GETUSERINFO_URL)
export const reqUserAush = (data) => request.post(API.GETUSERAUSH_URL, data)
export const reqOrderInfos = (page, limit, patientId, orderStatus) => request.get(API.GETORDERINFO_URL + `${page}/${limit}?&patientId=${patientId}&orderStatus=${orderStatus}`)
export const reqOrderAuth = () => request.get(API.GETORDERAUTH)
export const reqDict = (parentId) => request.get(API.GETDICT_URL + `${parentId}`)
export const reqRemovePatient = (data) => request.delete(API.GETREMOVEPATIENT_URL + data)
export const reqAddPatien = (data) => {
  if (data.id) {
    return request.put(API.GETPATIRNTUPDATE_URL, data)
  } else {
    return request.post(API.GETADDPATIENT_UR, data)
  }
}






