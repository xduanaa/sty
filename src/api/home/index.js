import request from "@/utils/request";

const API = {
  HOSTITAL_URL: '/hosp/hospital/',
  HOSPTALLEVELANDREG_url: '/cmn/dict/findByDictCode/',
  HOSPITALINFO_URL:'/hosp/hospital/findByHosname/'

}


export const reqHospital = (page, limit, hostype, districtCode) => request.get(API.HOSTITAL_URL + `${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`)
export const reqHpspitalLeveAndRen = (dicCode) => request.get(API.HOSPTALLEVELANDREG_url + `${dicCode}`)
export const reqHosInfo= (housname)=>request.get(API.HOSPITALINFO_URL+`${housname}`)