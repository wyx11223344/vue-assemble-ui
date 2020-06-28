<template>
    <div>
        <label class="switch-box green f-csp" :class="{'checked': modelValue}" @click="changeValue">
            <input @click.stop type="checkbox" class="check-box"/>
        </label>
    </div>
</template>

<script>
export default {
    name: 'BaseSwitch',
    emits: {
        'update:modelValue': true
    },
    props: {
        modelValue: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit }) {

        /** *************************************************************************************************/
        /** ***************************************数据控制***************************************************/
        /** *************************************************************************************************/

        function changeValue() {
            emit('update:modelValue', !props.modelValue);
        }

        return {
            changeValue
        };
    }
};
</script>

<style scoped lang="less">
    .check-box {
        display: none;
    }
    .switch-box {
        display: inline-block;
        width: 40px;
        height: 20px;
        position: relative;
        -webkit-transition: 0.3s;
        transition: 0.3s;
        box-sizing: border-box;
    }
    .switch-box:after {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 20px;
        height: 20px;
        -webkit-transition: 0.3s;
        transition: 0.3s;
    }
    .switch-box {
        background: #ddd;
        border-radius: 20px;
        box-shadow: 1px 1px 3px #aaa;
    }
    .switch-box:after {
        background: #fff;
        border-radius: 50%;
        box-shadow: 1px 1px 3px #aaa;
    }
    .checked{
        background: #AEDCAE;
    }
    .checked{
        background: #5CB85C;
    }
    .checked:after{
        left: calc(100% - 20px);
    }
</style>
