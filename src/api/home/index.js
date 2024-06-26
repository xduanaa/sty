import request from "@/utils/request";

const API = {
  HOSTITAL_URL: '/hosp/hospital/',
  HOSPTALLEVELANDREG_url:'/cmn/dict/findByDictCode/',
  HOSPTALREG_URL:'/cmn/dict/findByParentld/'

}


export const reqHospital = (page, limit,hostype,districtCode) => request.get(API.HOSTITAL_URL + `${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`)
export const reqHpspitalLeveAndRen=(dicCode)=> request.get(API.HOSPTALLEVELANDREG_url+`${dicCode}`)
export const reqHospitalParent=(parentld)=>request.get(API.HOSTITAL_URL+`${parentld}`)