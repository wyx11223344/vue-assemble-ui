<template>
    <div class="f-oh">
        <div class="mate-box">
            <input ref="input" class="mate-input" :type="type" placeholder=" " v-model="inputObject.value"/>
            <label @click="input.focus()">{{ label }}</label>
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
            default: () => ({
                value: ''
            })
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
        const inputObject = InputTools.ObjBinding(props, emit);

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
}
</style>
