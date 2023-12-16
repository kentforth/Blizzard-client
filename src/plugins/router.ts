import { createRouter, createWebHistory } from "vue-router";

import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '',
        name: 'home',
        redirect: { name: 'overwatch'}
    },
    {
        path: '/overwatch',
        name: 'overwatch',
        component: () => import('../views/Overwatch/Overwatch.vue')
    },
    {
        path: '/starcraft',
        name: 'starcraft',
        component: () => import('../views/Starcraft.vue')
    },
    {
        path: '/diablo',
        name: 'diablo',
        component: () => import('../views/Diablo.vue')
    },
    {
        path: '/heartstone',
        name: 'heartstone',
        component: () => import('../views/Heartstone.vue')
    },
    {
        path: '/wow',
        name: 'wow',
        component: () => import('../views/Wow.vue')
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router