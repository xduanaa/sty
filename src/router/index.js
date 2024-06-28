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
        ]
    }
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