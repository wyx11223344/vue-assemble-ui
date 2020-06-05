<template>
    <teleport to="#popUps">
        <transition name="slide-center">
            <div class="dia-main" v-show="popUpsShow" @click.stop="close()"></div>
        </transition>
        <div class="base-content" :style="{'right': popUpsShow ? '0' : '-250px'}">
            <div class="f-csp click-button" :class="{'choose-click-button': popUpsShow}" @click="popUpsShow = !popUpsShow">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>
        </div>
    </teleport>
</template>

<script>
import PopUpstools from './popUpstools';
import { ref } from 'vue';

export default {
    setup(props, { emit }) {

        /** *************************************************************************************************/
        /** ***************************************显示控制***************************************************/
        /** *************************************************************************************************/
        const popUpsShow = ref(false);
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
    width: 250px;
    .mixin-background-color('base-backgroud-color');
    transition: 0.3s;
    z-index: 1000;
    .click-button{
        position: absolute;
        left: -48px;
        top: 250px;
        margin: auto;
        height: 48px;
        width: 48px;
        border-radius: 6px 0 0 6px;
        .mixin-background-color('base-symbol-color');
        .line {
            position: absolute;
            left: 25%;
            width: 50%;
            height: 3px;
            border-radius: 10px;
            overflow: hidden;
            transition: all 0.5s ease;
            .mixin-background-color('base-symbol-bcolor');
            &:nth-child(1) {
                top: 30%;
                &::after{
                    transition-delay: 0.05s;
                }
            }
            &:nth-child(2) {
                top: 50%;
                &::after{
                    transition-delay: 0.1s;
                }
            }
            &:nth-child(3) {
                top: 70%;
                &::after{
                    transition-delay: 0.15s;
                }
            }
            &::after {
                position: absolute;
                content: "";
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                transform: translateX(-100%);
                transition: all 0.25s ease;
                .mixin-background-color('base-symbol-ocolor');
            }
        }
        &:hover{
            .line::after {
                transform: translateX(0);
            }
        }
    }
    .choose-click-button{
        .line{
            &:nth-child(1) {
                transform: translateY(48px / 5) rotate(45deg);
            }
            &:nth-child(2) {
                transform: scaleX(0);
            }
            &:nth-child(3) {
                transform: translateY(48px / -5) rotate(-45deg);
            }
        }
    }
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
