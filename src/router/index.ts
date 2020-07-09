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
        redirect: '/Code/index'
    },
    onlineCode
];

const router: Router = createRouter({
    history: createWebHashHistory(window.location.pathname),
    routes
});

export default router;
