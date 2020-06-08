<template>
    <div class="f-oh">
        <div class="mate-box" :class="{'mate-box-error': !inputObject.check}">
            <input ref="input" class="mate-input" :type="type" placeholder=" " v-model="inputObject.value"/>
            <label @click="input.focus()">{{ label }}</label>
            <span class="error-message f-otw" :title="inputObject.errorMsg" v-show="!inputObject.check">{{ inputObject.errorMsg }}</span>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import InputTools from './inputTools';

export default {
    props: {
        type: {
            type: String,
            default: 'text'
        },
        label: {
            type: String,
            default: ''
        },
        inputObj: {
            type: Object,
            default: null
        },
        rules: {
            type: Object,
            default: null
        },
        modelValue: {
            type: String,
            default: ''
        }
    },
    setup(props, { emit }) {
        const input = ref(null);

        /** *************************************************************************************************/
        /** ***************************************对象绑定***************************************************/
        /** *************************************************************************************************/
        const { inputObject } = new InputTools(props, emit, input);

        return {
            inputObject,
            input
        };
    }
};
</script>

<style lang="less" scoped>
.mate-box{
    position: relative;
    margin: 1rem;
    border-bottom: 2px solid;
    .mixin-border-color('base-border-color');
    &:before{
        position: absolute;
        content: "";
        left: 0;
        bottom: -1px;
        width: 100%;
        height: 2px;
        transform: scaleX(0);
        transform-origin: left;
        transition: .3s;
        .mixin-background-color('base-symbol-color');
    }
    &:focus-within:before{
        transform: scaleX(1);
    }
    &:after{
        position: absolute;
        content: "";
        left: 0;
        bottom: -1px;
        width: 100%;
        height: 2px;
        transform: scaleX(0);
        transform-origin: left;
        transition: .3s;
        .mixin-background-color('base-out-button');
    }
    .mate-input{
        width: 100%;
        padding: 8px 0;
        font-size: inherit;
        font-weight: inherit;
        background: transparent;
        border: none;
        outline: none;
        &:focus~label, &:not(:placeholder-shown)~label {
            transform: translateY(-120%) scale(.75);
        }
    }
    label{
        position: absolute;
        top: 8px;
        left: 0;
        transition: .3s;
        transform-origin: left;
    }
    .error-message{
        position: absolute;
        left: 0;
        bottom: -1rem;
        width: 100%;
        font-size: 12px;
        .mixin-font-color('base-out-button');
    }
}
.mate-box-error{
    &:after{
        transform: scaleX(1);
    }
    &:focus-within:after{
        transform: scaleX(0);
    }
}
</style>
