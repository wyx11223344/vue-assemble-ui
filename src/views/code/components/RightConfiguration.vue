<template>
    <div class="show-main">
        <header>
            编辑页面配置
        </header>
        <main>
            <span>请选择编辑器主题：</span>
            <dia-select-e-theme></dia-select-e-theme>
            <span>请选择页面主题：</span>
            <dia-select-theme></dia-select-theme>
            <!-- <span>编辑器字号：</span> -->
            <!-- <input v-model="FONT_SIZE" /> -->
            <num-input></num-input>
            <span>是否开启热更新：</span>
            <base-switch v-model="HOT_HTML"></base-switch>
        </main>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import diaSelectETheme from '../../../components/editorThemeControl/diaSelectETheme';
import DiaSelectTheme from '../../../components/themeControl/diaSelectTheme';
import BaseSwitch from '../../../components/switch/BaseSwitch';
import numInput from '../../../components/input/NumInput';

export default {
    name: 'RightConfiguration',
    components: { BaseSwitch, DiaSelectTheme, diaSelectETheme, numInput },
    setup() {

        /** *************************************************************************************************/
        /** ***************************************判断热更新***************************************************/
        /** *************************************************************************************************/
        const store = useStore();

        const HOT_HTML = computed({
            get: () => store.state.themes.HOT_HTML,
            set: () => {
                store.commit('CHANGE_HOT_HTML');
            }
        });

        /** *************************************************************************************************/
        /** ***************************************字号调整***************************************************/
        /** *************************************************************************************************/
        const FONT_SIZE = computed({
            get: () => store.state.themes.FONT_SIZE,
            set: (value) => {
                store.commit('CHANGE_FONT_SIZE', Number(value));
            }
        });

        return {
            HOT_HTML,
            FONT_SIZE
        };
    }
};
</script>

<style scoped lang="less">
.show-main{
    padding: 20px 10%;
    header{
        padding: 5px 0;
        font-size: 18px;
        font-weight: bold;
        border-bottom: 2px dashed;
        .mixin-font-color('onlinecode-head-color');
        .mixin-border-color('base-border-color');
    }
    main{
        padding: 5px 0;
        .mixin-font-color('onlinecode-head-color');
        >span{
            display: inline-block;
            margin-top: 20px;
            margin-bottom: 10px;
        }
        >input{
            .mixin-font-color('base-font-color');
        }
    }
}
</style>
