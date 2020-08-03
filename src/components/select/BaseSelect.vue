<template>
    <div>
        <section class="hide-select">
            <select ref="selectDom" v-model="selectObject.value">
                <option v-for="item in options" :key="item.value + 'select'" :value="item.value"></option>
            </select>
        </section>
        <section class="sao-select-box f-csp" @click="isShowBox = !isShowBox" v-clickoutside="() => {isShowBox = false;}">
            <div class="show-box">{{ selectObject.name }} <i class="iconfont iconyoujiantou" :class="{'open': isShowBox}"></i></div>
            <transition name="swing-top">
                <ul v-show="isShowBox">
                    <li class="f-csp" :class="{'chosen': selectObject.value === item.value}" v-for="item in options" :key="item.value + 'li'" @click="chooseItem(item)">{{ item.name }}</li>
                </ul>
            </transition>
        </section>
    </div>
</template>

<script>
import { ref } from 'vue';
import SelectTools from './selectTools';

export default {
    name: 'BaseSelect',
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

        function chooseItem(item) {
            selectObject.value = item.value;
            setTimeout(() => {
                isShowBox.value = false;
            }, 300);
        }

        return {
            selectObject,
            isShowBox,
            chooseItem
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
    width: 160px;
    height: 32px;
    .show-box{
        position: absolute;
        left: 0;
        top: 0;
        width: 160px;
        height: 32px;
        line-height: 32px;
        background-color: #fff;
        border: 1px solid #e6e6e6;
        border-radius: 20px;
        display: inline-block;
        vertical-align: middle;
        text-align: center;
        .iconfont{
            display: inline-block;
            font-size: 14px;
            float: right;
            transition: .3s;
            transform: translateX(-20px) rotate(90deg);
        }
        .open{
            transform: translateX(-20px) rotate(-90deg);
        }
    }
    ul {
        position: absolute;
        top: 100%;
        width: 160px;
        overflow-y: auto;
        overflow-x: hidden;
        max-height: 200px;
        padding: 4px 8px;
        margin-top: 5px;
        border-radius: 4px;
        border: 1px solid #e6e6e6;
        background-color: #fff;
        line-height: 24px;
        z-index: 10;
        li {
            padding: 0 4px;
            margin: 2px 0;
            border-radius: 5px;
            &:hover{
                color: #ffffff;
                background-color: #ff8787;
            }
        }
        .chosen{
            color: #fff;
            background-color: #ff7575;
        }
    }
}
</style>
