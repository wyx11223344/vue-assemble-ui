<template>
    <div>
        <section class="hide-select">
            <select ref="select" v-model="selectObject.value">
                <option v-for="item in showArray" :key="item.value + 'select'" :value="item.value"></option>
            </select>
        </section>
        <section>
            <div class="show-control f-csp" @click="popUpsShow = true">
                <span>{{ selectObject.name }}</span>
                <slot>
                    <i class="iconfont iconbox-list rt"></i>
                </slot>
            </div>
            <teleport to="#popUps">
                <transition name="swing-top">
                    <div class="dia-main-box" v-show="popUpsShow" @click="popUpsShow = false">
                        <div class="choose-main custom-scroll">
                            <div class="each-choose f-csp move-animate" v-for="item in showArray" :key="item.value">
                                <section v-show="!item.isHide" @click="selectObject.value = item.value">
                                    <img src="http://img.newyx.net/game/201703/17/74eda6e210.jpg" alt=""/>
                                    <p>{{ item.name }}</p>
                                </section>
                            </div>
                        </div>
                    </div>
                </transition>
            </teleport>
        </section>
    </div>
</template>

<script>
import { ref, computed, onBeforeUnmount } from 'vue';
import PopUpstools from '../popUps/popUpstools';
import SelectTools from './selectTools';

export default {
    props: {
        options: {
            type: Array,
            default: null
        },
        modelValue: {
            type: String,
            default: null
        },
        rules: {
            type: Object,
            default: null
        }
    },
    setup(props, { emit }) {
        const selectDom = ref(null);

        /** *************************************************************************************************/
        /** ***************************************数据控制***************************************************/
        /** *************************************************************************************************/
        const { selectObject } = new SelectTools(props, emit, selectDom);

        /** *************************************************************************************************/
        /** ***************************************控制显示条数***************************************************/
        /** *************************************************************************************************/
        const domWidth = ref(document.body.clientWidth);

        function getWidth() {
            domWidth.value = document.body.clientWidth;
        }

        window.addEventListener('resize', getWidth);

        onBeforeUnmount(() => {
            window.removeEventListener('resize', getWidth);
        });

        const showArray = computed(() => {
            const eachNum = Math.floor(domWidth.value / 340);
            if (props.options.length % eachNum === 0) {
                return props.options;
            } else {
                const backList = JSON.parse(JSON.stringify(props.options));
                Array.from({ length: eachNum - props.options.length % eachNum }).forEach(() => {
                    backList.push({ isHide: true });
                });
                return backList;
            }
        });

        /** *************************************************************************************************/
        /** ***************************************显示控制***************************************************/
        /** *************************************************************************************************/
        const popUpsShow = ref(false);
        const { close } = new PopUpstools(popUpsShow, emit, true, { noBlur: true });

        return {
            selectDom,
            popUpsShow,
            selectObject,
            showArray,
            close
        };
    }
};
</script>

<style scoped lang="less">
.hide-select{
    display: none;
}
.dia-main-box{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1001;
    transform-origin: top;
    .mixin-background-color('theme-change-dia-bgc');
}
.choose-main{
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
    max-height: 100%;
    .move-animate{
        animation: slide-in-elliptic-top-fwd 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;

        @keyframes slide-in-elliptic-top-fwd {
            0% {
                transform: translateY(-600px) rotateX(-30deg) scale(0);
                transform-origin: 50% 100%;
                opacity: 0;
            }
            100% {
                transform: translateY(0) rotateX(0) scale(1);
                transform-origin: 50% 1400px;
                opacity: 1;
            }
        }
    }
    .each-choose{
        width: 300px;
        height: 210px;
        margin: 20px;
        section{
            border: 1px solid;
            border-radius: 10px;
            transition: .5s;
            .mixin-border-color('base-border-color');
            &:hover{
                .mixin-boxshadow-color('onlinecode-header-boxshac', 5px 5px 10px);
            }
        }
        img{
            width: 300px;
            height: 168.8px;
            border-radius: 10px 10px 0 0;
        }
        p{
            height: 41.2px;
            line-height: 41.2px;
            font-size: 18px;
            font-weight: bold;
            padding: 0 20px;
        }
    }
    .loopChoose(40);
    .loopChoose(@count) when (@count >= 0) {
        .each-choose:nth-child(@{count}) {
            animation-delay: 0.05s * @count;
        }
        .loopChoose(@count - 1);
    }
}
.show-control{
    display: inline-block;
    width: 100%;
    padding: 5px 12px;
    border: 1px solid;
    border-radius: 5px;
    line-height: 24px;
    .mixin-border-color('base-out-buttonborder-color');
}
</style>
