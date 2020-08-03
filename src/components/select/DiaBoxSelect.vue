<template>
    <div>
        <section class="hide-select">
            <select ref="selectDom" v-model="selectObject.value">
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
                    <div class="dia-main-box" v-show="popUpsShow">
                        <div ref="diaBox" class="choose-main custom-scroll" @click="close">
                            <div class="each-choose f-csp move-animate" v-for="item in showArray" :key="item.value">
                                <section v-show="!item.isHide" @click.stop="selectObject.value = item.value, chooseAfter()">
                                    <svg class="tick" :class="{'clicked': selectObject.value === item.value}" width="100px" height="80px" stroke="white" fill="none">
                                        <polyline points="4,45 40,79 96,5"></polyline>
                                    </svg>
                                    <img :src="item.url" alt=""/>
                                    <p>{{ item.name }}{{ item.info ? `(${item.info})` : '' }}</p>
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
import { ref, onBeforeUnmount, computed } from 'vue';
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
            const eachNum = Math.floor(domWidth.value / 440);
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
        const diaBox = ref(null);
        const { close } = new PopUpstools(popUpsShow, emit, true, { noBlur: true, CloseFn: () => {
            setTimeout(() => {
                diaBox.value.scrollTop = 0;
            }, 500);
        } });

        function chooseAfter() {
            setTimeout(() => {
                close();
            }, 500);
        }

        return {
            diaBox,
            selectDom,
            popUpsShow,
            selectObject,
            showArray,
            close,
            chooseAfter
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
    transition-duration:  0.5s;
    transition-property: opacity,background-color;
    .mixin-font-color('base-font-color');
    .mixin-background-color('theme-change-dia-bgc');
}
.choose-main{
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
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
        width: 400px;
        height: 270px;
        margin: 20px;
        section{
            border: 1px solid;
            transition: .3s;
            border-radius: 10px;
            .mixin-background-color('base-backgroud-color');
            .mixin-border-color('onlinecode-moveline-borc');
            &:hover{
                .mixin-boxshadow-color('onlinecode-header-boxshac', 5px 5px 10px);
                transform: translateY(-5px) scale(1.05);
            }
        }
        img{
            width: 398px;
            height: 225px;
            border-radius: 10px 10px 0 0;
        }
        p{
            height: 45px;
            line-height: 45px;
            font-size: 18px;
            font-weight: bold;
            padding: 0 20px;
        }
        .tick{
            position: absolute;
            left: 0;
            right: 0;
            bottom: 45px;
            top: 0;
            margin: auto;
            opacity: 0;
            stroke: rgb(131, 175, 155);
            stroke-width: 5px;
            stroke-dasharray: 150px;
            stroke-dashoffset: 150px;
            transition: opacity 0.3s;
        }
        .clicked{
            opacity: 1;
            animation: show-tick 0.5s forwards;
        }
        @keyframes show-tick {
            to {
                stroke-dashoffset: 0;
            }
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
