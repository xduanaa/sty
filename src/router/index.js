import { createRouter, createWebHistory } from 'vue-router'
const routes = [
    { path: '/home', component: () => import('@/pages/home/index.vue') },
    { path: '/', redirect: '/home' },
    { path: '/hospital', component: () => import('@/pages/hospital/index.vue') }
]
export const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return {
            top: 0,
            letf: 0
        }
    }
})