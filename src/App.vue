<template>
    <router-view/>
</template>
<script>
import { useStore } from 'vuex';
import { computed, watchEffect } from 'vue';

export default {
    setup() {
        window._outObj_ = {};
        const store = useStore();

        // 在页面加载时读取sessionStorage里的状态信息
        if (sessionStorage.getItem('store')) {
            store.replaceState(Object.assign({}, store.state, JSON.parse(sessionStorage.getItem('store'))));
        }

        // 在页面刷新时将vuex里的信息保存到sessionStorage里
        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('store', JSON.stringify(store.state));
        });

        const THEME = computed(() => store.state.themes.CHOOSE_THEME);

        watchEffect(() => {
            document.documentElement.setAttribute('data-theme', THEME.value);
        });
    }
};

</script>
<style lang="less">
#app {
    position: absolute;
    width: 100%;
    height: 100%;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    transition: 0.3s;
}
body {
    .mixin-font-color('base-font-color');
    font-family: "Microsoft YaHei";
}
a{
    .mixin-font-color('base-font-color');
}
input{
    .mixin-font-color('base-font-color');
}
select{
    .mixin-font-color('base-font-color');
}
</style>
