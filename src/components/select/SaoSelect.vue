<template>
    <div>
        <section class="hide-select">
            <select ref="selectDom" v-model="selectObject.value">
                <option v-for="item in options" :key="item.value + 'select'" :value="item.value"></option>
            </select>
        </section>
        <div class="sao-select-box" v-clickoutside="() => {isShowBox = false;}">
            <div class="show-box f-csp" :class="{'show-open': isShowBox}" @click="isShowBox = true">
                <i class="iconfont icondiandiandian"></i>
            </div>
            <transition name="slide-left1">
                <div class="select-box" v-show="isShowBox">
                    <ul @wheel="onScroll">
                        <li class="f-csp" v-for="(item, index) in options" :style="animateObj.styleList[dealIndex(index)]" :key="item.value" @click="chooseItem(item, index)">{{ item.name }}</li>
                    </ul>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import { ref, reactive, watchEffect } from 'vue';
import SelectTools from './selectTools';

export default {
    name: 'SaoSelect',
    props: {
        options: {
            type: Array,
            default: null
        },
        modelValue: {
            type: Number,
            default: null
        }
    },
    setup(props, { emit }) {
        const selectDom = ref(null);

        /** *************************************************************************************************/
        /** ***************************************数据控制***************************************************/
        /** *************************************************************************************************/
        const { selectObject } = new SelectTools(props, emit, selectDom);

        const isShowBox = ref(false);

        function chooseItem(item, index) {
            animateObj.chooseStyleIndex = index;
            selectObject.value = item.value;
            setTimeout(() => {
                isShowBox.value = false;
            }, 300);
        }

        /** *************************************************************************************************/
        /** ***************************************控制动画***************************************************/
        /** *************************************************************************************************/
        const animateObj = reactive({
            styleList: [],
            chooseStyleIndex: 0
        });

        function dealIndex(index) {
            if (index >= animateObj.chooseStyleIndex) {
                return index - animateObj.chooseStyleIndex;
            } else {
                return props.options.length - animateObj.chooseStyleIndex + index;
            }
        }

        function onScroll(event) {
            let delta = 0;
            if (!event) {
                event = window.event;
            }// 为没有event浏览器获取event
            if (event.wheelDelta) { // IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
                delta = event.wheelDelta / 120;
                if (window.opera) {
                    delta = -delta;
                }// 因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
            } else if (event.deltaY) { // FF浏览器使用的是detail,其值为“正负3”
                delta = -event.deltaY / 3;
            }
            if (delta < 0) { // 向下滚动
                animateObj.chooseStyleIndex = animateObj.chooseStyleIndex >= props.options.length - 1 ? 0 : animateObj.chooseStyleIndex + 1;
            } else { // 向上滚动
                animateObj.chooseStyleIndex = animateObj.chooseStyleIndex <= 0 ? props.options.length - 1 : animateObj.chooseStyleIndex - 1;
            }
        }

        watchEffect(() => {
            if (props.options.length === 0) return;
            animateObj.styleList = Array.from({ length: props.options.length }).map((item, index) => {
                let backObj = {};
                if (index === 0) {
                    backObj = {
                        top: '80px',
                        opacity: 1,
                        transform: 'none'
                    };
                } else if (index === 1) {
                    backObj = {
                        top: '120px',
                        opacity: 0.8,
                        transform: 'scale(0.9) translateX(6px)'
                    };
                } else if (index === props.options.length - 1) {
                    backObj = {
                        top: '40px',
                        opacity: 0.8,
                        transform: 'scale(0.9) translateX(6px)'
                    };
                } else if (index === 2) {
                    backObj = {
                        top: '160px',
                        opacity: 0.6,
                        transform: 'scale(0.8) translateX(12px)'
                    };
                } else if (index === props.options.length - 2) {
                    backObj = {
                        top: '0',
                        opacity: 0.6,
                        transform: 'scale(0.8) translateX(12px)'
                    };
                } else if (index === props.options.length - 3) {
                    backObj = {
                        top: '-40px',
                        opacity: 0,
                        transform: 'scale(0.6) translateX(24px)'
                    };
                } else {
                    backObj = {
                        top: '200px',
                        opacity: 0,
                        transform: 'scale(0.6) translateX(24px)'
                    };
                }
                return backObj;
            });
        });

        return {
            isShowBox,
            selectObject,
            animateObj,
            selectDom,
            chooseItem,
            dealIndex,
            onScroll
        };
    }
};
</script>

<style scoped lang="less">
.hide-select{
    display: none;
}
.sao-select-box{
    position: relative;
    .show-box{
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 50px;
        height: 50px;
        line-height: 50px;
        border-radius: 25px;
        background-color: rgba(204,204,204,.5);
        z-index: 1;
        transform: rotate(90deg);
        transition: .3s;
        .iconfont{
            color: #131417;
            font-size: 32px;
            font-weight: bold;
        }
        &:hover{
            width: 60px;
            height: 60px;
            line-height: 60px;
            border-radius: 30px;
            .iconfont{
                font-size: 38px;
            }
        }
    }
    .show-open{
        transform: rotate(0);
    }
    .select-box{
        position: absolute;
        left: -150px;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 150px;
        height: 200px;
        overflow: hidden;
        ul{
            li{
                position: absolute;
                right: 0;
                width: 100%;
                height: 40px;
                line-height: 40px;
                color: #f2f2f2;
                background-color: rgb(123, 122, 122);
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                transition: 0.3s;
                &:hover{
                    filter: brightness(120%);
                }
            }
        }
    }
}
</style>
