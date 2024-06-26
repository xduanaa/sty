import axios from 'axios'

const request=axios.create({
  baseURL:'/api',
  timeout:50000
});

//请求拦截器
request.interceptors.request.use((config)=>{
  // console.log(11,config)
  return config
})

//响应拦截器
request.interceptors.response.use((response)=>{
  //  console.log(response)
   return response.data
},(error)=>{
  console.log(Promise)
  return Promise.reject(new Error(error.message))
})


export default request