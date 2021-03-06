/**
 * @author WYX
 * @date 2020/5/26
 * @Description: 基础app创建
*/
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Directives from '@/utils/directives';
import { UtilsDec } from '@/decorators/utilsDec';
import '@/assets/styles/public.less';

class MyApp {
    @UtilsDec.newSelf
    static myapp: any
    app: any

    constructor() {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.app = createApp(App);

        this.app.use(router);

        this.app.use(store);

        this.useDirectives();

        this.app.mount('#app');
    }

    /**
     * 全局指令注册
     * @returns {void}
     */
    useDirectives(): void {
        Object.keys(Directives).forEach((key) => {
            this.app.directive(key, (Directives as { [key: string]: any })[key]);
        });
    }
}

export default MyApp.myapp;

