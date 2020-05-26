/**
 * @author WYX
 * @date 2020/5/26
 * @Description: code路由
*/
import { RouteRecordRaw } from 'vue-router';

const Code: RouteRecordRaw = {
    path: '/Code',
    name: 'Code',
    component: () => import('../views/code/Code.vue'),
    children: [{
        path: 'index',
        name: 'OnlineCode',
        component: () => import('../views/code/onlineCode/OnlineCode.vue')
    }]
};

export default Code;
