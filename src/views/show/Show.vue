<template>
    <div class="f-all100 show-main custom-scroll" ref="showBox">
        <canvas ref="showMainDom"></canvas>
        <show-header></show-header>
        <div class="show-content">
            <router-view class="show-box" :scrollTop="scrollTop" @backtop="backtop" v-slot="{ Component }">
                <transition name="slide-center">
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>
        <show-footer></show-footer>
        <cart-dia>
            <cart-control></cart-control>
        </cart-dia>
    </div>
</template>

<script>
import ShowHeader from './components/ShowHeader';
import createBg from './createBg';
import { onMounted, ref, onBeforeUnmount } from 'vue';
import ShowFooter from './components/ShowFooter';
import CartDia from '../../components/popUps/CartDia';
import CartControl from './components/CartControl';

export default {
    name: 'Show',
    components: { CartControl, ShowFooter, ShowHeader, CartDia },
    setup() {
        const showMainDom = ref(null);
        const showBox = ref(null);
        const scrollTop = ref(0);

        /** *************************************************************************************************/
        /** ***************************************背景图绘制***************************************************/
        /** *************************************************************************************************/
        let backFn;
        onMounted(() => {
            backFn = createBg(showMainDom.value);
            showBox.value.addEventListener('scroll', () => {
                scrollTop.value = showBox.value.scrollTop;
            });
        });

        onBeforeUnmount(() => {
            backFn();
        });

        // 回到顶部
        function backtop() {
            let timer = null; // 定义一个定时器
            timer = setInterval(function() {
                // 获取滚动条的滚动高度
                var osTop = showBox.value.scrollTop;
                // 用于设置速度差，产生缓动的效果
                var speed = Math.floor(-osTop / 12);
                showBox.value.scrollTop = osTop + speed;
                if (osTop === 0) {
                    clearInterval(timer);
                }
            }, 16.7);
        }

        return {
            showMainDom,
            showBox,
            scrollTop,
            backtop
        };
    }
};
</script>

<style scoped lang="less">
.show-main{
    clear: both;
    .show-content{
        position: relative;
    }
    .show-box{
        width: 1200px;
        margin: auto;
    }
}
</style>
