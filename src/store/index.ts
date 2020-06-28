/**
 * @author WYX
 * @date 2020/5/26
 * @Description: vuex注册
*/
import { createStore } from 'vuex';

const files = require.context('', false, /\.ts$/);
const modules: any = {};

files.keys().forEach((key) => {
    if (key !== './index.ts') {
        modules[key.replace(/(\.\/|\.ts)/g, '')] = files(key).default;
    }
});

export default createStore({
    modules
});
