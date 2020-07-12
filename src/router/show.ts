/**
 * @author WYX
 * @date 2020/7/12
 * @Description: 展示页
*/
import { RouteRecordRaw } from 'vue-router';

const Show: RouteRecordRaw = {
    path: '/Show',
    name: 'Show',
    component: () => import('../views/show/Show.vue'),
    children: [{
        path: 'index',
        name: 'Home',
        component: () => import('../views/show/home/Home.vue')
    }]
};

export default Show;
