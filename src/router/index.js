import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  { path: '/home', component: () => import('@/pages/home/index.vue') },
  { path: '/', redirect: '/home' },
  {
    path: '/hospital', component: () => import('@/pages/hospital/index.vue'),
    children: [
      { path: 'search', component: () => import('@/pages/hospital/search/index.vue') },
      { path: 'suspend', component: () => import('@/pages/hospital/suspend/index.vue') },
      { path: 'registry', component: () => import('@/pages/hospital/registry/index.vue') },
      { path: 'particular', component: () => import('@/pages/hospital/particular/index.vue') },
      { path: 'instruction', component: () => import('@/pages/hospital/instruction/index.vue') },
      {
        path: 'registry_item',
        component: () => import('@/pages/hospital/registry/registry_item.vue')
      },
      {
        path: 'registry_step', component: () => import
          ('@/pages/hospital/registry/registry_step.vue')
      },

    ]
  },
  { path: '/wxlogin', component: () => import('@/pages/wxlogin/index.vue') },
  {
    path: '/user', component: () => import('@/pages/user/index.vue'),
    children: [
      { path: 'certification', component: () => import('@/pages/user/certification/index.vue') },
      { path: 'change', component: () => import('@/pages/user/change/index.vue') },
      { path: 'feelback', component: () => import('@/pages/user/feelback/index.vue') },
      { path: 'order', component: () => import('@/pages/user/order/index.vue') },
      {
        path: 'patient', component: () => import('@/pages/user/patient/index.vue')
      },
    ]
  }
]
export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior () {
    return {
      top: 0,
      letf: 0
    }
  }
})



