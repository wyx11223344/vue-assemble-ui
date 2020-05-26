/**
 * @author WYX
 * @date 2020/5/26
 * @Description: 基础路由
*/
import { RouteRecordRaw, createRouter, createWebHashHistory, Router } from 'vue-router';
import onlineCode from './code';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
    },
    onlineCode
];

const router: Router = createRouter({
    history: createWebHashHistory(window.location.pathname),
    routes
});

export default router;
