import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Directives from '@/utils/directives';
import { UtilsDec } from '@/decorators/utilsDec';

class MyApp {
    @UtilsDec.newSelf
    static myapp: any
    app: any

    constructor() {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.app = createApp(App);

        this.useDirectives();

        this.app.use(router);

        this.app.use(store);

        this.app.mount('#app');
    }

    /**
     * 全局指令注册
     * @returns {void}
     */
    useDirectives() {
        Object.keys(Directives).forEach((key) => {
            this.app.directive(key, (Directives as { [key: string]: any })[key]);
        });
    }
}

export default MyApp.myapp;

