<template>
    <div class="f-num-with-add-sub" :class="{'num-box-error': !inputObject.check}">
        <span class="f-num-icon f-num-sub" @click="sub()">
            -
        </span>
        <div class="input">
            <!-- <input :rules="NumInput.AddRules.name" v-model="FONT_SIZE" label="请输入字号" /> -->
            <input ref="input" class="mate-input" :type="type" placeholder=" " v-model="inputObject.value" @change="handlerChange"/>
            <span class="error-message f-otw" v-title="inputObject.errorMsg" v-show="!inputObject.check">{{ inputObject.errorMsg }}</span>
        </div>
        <span class="f-num-icon f-num-add" @click="sub(true)">
            +
        </span>
    </div>
</template>

<script>
import { ref } from 'vue';
import InputTools from './inputTools';
export default {
    name: 'NumInput',
    props: {
        type: {
            type: String,
            default: 'text'
        },
        rules: {
            type: Object,
            default: null
        },
        modelValue: {
            type: [String, Number],
            default: ''
        }
    },
    setup(props, { emit }) {
        const input = ref(null);

        /** *************************************************************************************************/
        /** ***************************************对象绑定***************************************************/
        /** *************************************************************************************************/
        const { inputObject } = new InputTools(props, emit, input);

        function handlerChange() {
            emit('change', inputObject.value);
        }

        function sub(bool) {
            bool ? inputObject.value++ : inputObject.value--;
            handlerChange();
            // 点击加减滑块时 需要触发一下失焦事件
            input.value.focus();
            input.value.blur();
        }
        return {
            inputObject,
            input,
            handlerChange,
            sub
        };
    }
};
</script>

<style scoped lang="less">
.f-num-with-add-sub{
    position: relative;
    display: inline-block;
    width: 200px;
    line-height: 24px;
    // margin-bottom:20px;
    border: 1px solid #cdcdcd;
    padding:5px 0;
    border-radius: 5px;
    .input input{
        box-sizing: border-box;
        text-align: center;
        padding: 0 45px;
        width:100%;
    }
    .error-message{
        position: absolute;
        left: 0;
        bottom: -1.2rem;
        width: 100%;
        font-size: 12px;
        color: #fd5d5d;
    }
    .f-num-icon{
        position: absolute;
        z-index: 1;
        top: 0;
        width: 40px;
        height: auto;
        text-align: center;
        background: #f5f7fa;
        color: #606266;
        cursor: pointer;
        font-size: 20px;
        height: 100%;
        line-height:32px;
    }
    .f-num-sub{
        left: 1px;
        border-right: 1px solid #cdcdcd;
        border-radius: 5px 0 0 5px;
    }
    .f-num-add{
        right: 1px;
        border-left: 1px solid #cdcdcd;
        border-radius: 0 5px 5px 0;
    }
}
.num-box-error {
    border: 1px solid #fd5d5d;
}
</style>
