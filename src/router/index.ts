import { RouteRecordRaw, createRouter, createWebHashHistory, Router } from 'vue-router';

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
    }
];

const router: Router = createRouter({
    history: createWebHashHistory('assemble'),
    routes
});

export default router;
