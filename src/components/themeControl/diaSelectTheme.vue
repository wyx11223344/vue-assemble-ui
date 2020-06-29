<template>
    <dia-box-select class="theme-select" v-model="ThemeObj.themeValue" :options="ThemeObj.themeList"></dia-box-select>
</template>

<script>
import { useStore } from 'vuex';
import { reactive, watchEffect, watch, computed } from 'vue';
import Themes from './themes.json';
import DiaBoxSelect from '../select/DiaBoxSelect';

export default {
    name: 'DiaSelectTheme',
    components: { DiaBoxSelect },
    setup() {
        const store = useStore();

        /** *************************************************************************************************/
        /** ***************************************主题控制***************************************************/
        /** *************************************************************************************************/
        const THEME = computed(() => store.state.themes.CHOOSE_THEME);

        Themes.forEach((item) => {
            item.url = item.url ? require(`../../assets/images/code/${item.url}`) : '';
        });

        const ThemeObj = reactive({
            themeValue: THEME.value,
            themeList: Themes
        });

        /** *************************************************************************************************/
        /** ***************************************双向绑定（有疑问）***************************************************/
        /** *************************************************************************************************/
        watchEffect(() => {
            store.commit('CHANGE_THEME', ThemeObj.themeValue);
        });

        watch(THEME, () => {
            if (THEME.value !== ThemeObj.themeValue) {
                ThemeObj.themeValue = THEME.value;
            }
        });

        return {
            ThemeObj
        };
    }
};
</script>

<style scoped lang="less">

</style>
