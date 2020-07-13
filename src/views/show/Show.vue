<template>
    <div class="f-all100 show-main custom-scroll">
        <canvas ref="showMainDom"></canvas>
        <show-header></show-header>
        <router-view class="show-box"/>
    </div>
</template>

<script>
import ShowHeader from './components/ShowHeader';
import createBg from './createBg';
import { onMounted, ref, onBeforeUnmount } from 'vue';

export default {
    name: 'Show',
    components: { ShowHeader },
    setup() {
        const showMainDom = ref(null);
        let backFn;
        onMounted(() => {
            backFn = createBg(showMainDom.value);
        });

        onBeforeUnmount(() => {
            backFn();
        });

        return {
            showMainDom
        };
    }
};
</script>

<style scoped lang="less">
.show-main{
    .show-box{
        max-width: 1200px;
        margin: auto;
    }
}
</style>
