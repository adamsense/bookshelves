import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


import Layout from '@/components/layout/Layout'
import Home from '@/views/Home.vue'

export const constantRoutes = [

    {
        path: '/home',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/home/:path*',
                name: "home",
                component: Home
            }
        ]
    },
    {
        path: '/',
        component: Layout,
        hidden: true
    },
    {
        path: '/404',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/404',
                component: () => import('@/views/error-page/404'),
                hidden: true
            }
        ]
    },

]



const createRouter = () => new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()


export default router