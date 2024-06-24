import axios from 'axios'

const request=axios.create({
  baseURL:'/api',
  timeout:5000
});

//请求拦截器
request.interceptors.request.use((config)=>{
  console.log(config)
  return config
})

//响应拦截器
request.interceptors.response.use((response)=>{
   console.log(response)
   return response
},(error)=>{
  console.log(Promise)
  return Promise.reject(new Error(error.message))
})


export default request