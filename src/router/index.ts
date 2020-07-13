/**
 * @author WYX
 * @date 2020/5/26
 * @Description: 基础路由
*/
import { RouteRecordRaw, createRouter, createWebHashHistory, Router } from 'vue-router';
import Code from './code';
import Show from './show';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/Show/index'
    },
    Code,
    Show
];

const router: Router = createRouter({
    history: createWebHashHistory(window.location.pathname),
    routes
});

export default router;
