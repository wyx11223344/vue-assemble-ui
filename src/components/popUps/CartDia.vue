<template>
    <teleport to="#popUps">
        <transition name="slide-center">
            <div class="dia-main" v-show="popUpsShow" @click.stop="close()"></div>
        </transition>
        <div class="base-content" :style="{'right': popUpsShow ? '0' : '-300px'}">
            <slot></slot>
        </div>
    </teleport>
</template>

<script>
import PopUpstools from './popUpstools';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'CartDia',
    setup(props, { emit }) {
        const store = useStore();

        /** *************************************************************************************************/
        /** ***************************************显示控制***************************************************/
        /** *************************************************************************************************/
        const popUpsShow = computed({
            get: () => store.state.cart.cartDiaShow,
            set: () => {
                store.commit('changeCartDiaShow');
            }
        });
        const { close } = new PopUpstools(popUpsShow, emit, true);

        return {
            popUpsShow,
            close
        };
    }
};
</script>

<style scoped lang="less">
    .base-content{
        position: fixed;
        top: 0;
        height: 100%;
        width: 300px;
        background-color: #fcfcfc;
        transition: 0.3s cubic-bezier(.7,.3,.1,1);
        z-index: 1000;
    }
    .dia-main{
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        .mixin-background-color('base-dialog-bgc');
    }
</style>
