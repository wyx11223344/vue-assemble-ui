<template>
    <div class="f-num-with-add-sub">
        <span class="f-num-icon f-num-sub" @click="sub">
            -
        </span>
        <div>
            <mate-input :rules="NumInput.AddRules.name" modelValue="FONT_SIZE" label="请输入字号"></mate-input>
        </div>
        <span class="f-num-icon f-num-add" @click="add">
            +
        </span>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, reactive } from 'vue';
import MateInput from '../input/MateInput';
export default {
    name: 'NumInput',
    components: {
        MateInput
    },
    setUp() {
        const store = useStore();

        const NumInput = reactive({
            Addform: { name: '' },
            // AddRules: { name: { validate: [{ validateName: 'required', trigger: ['input'] }, 'Number'], trigger: ['blur'] }}
            AddRules: {
                name: { validate: [{ validateName: 'required', trigger: ['input'] }, 'Number'], trigger: ['blur'] },
                version: { validate: ['required'], trigger: ['blur'] }
            }
        });

        console.log(NumInput);

        const FONT_SIZE = computed({
            get: () => store.state.themes.FONT_SIZE,
            set: (value) => {
                store.commit('CHANGE_FONT_SIZE', Number(value));
            }
        });

        function add() {
            console.log('+1');
        }

        function sub() {
            console.log('-1');
        }

        return {
            FONT_SIZE,
            NumInput,
            add,
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
    line-height: 38px;
    .f-num-icon{
        position: absolute;
        z-index: 1;
        top: 19px;
        width: 40px;
        height: auto;
        text-align: center;
        background: #f5f7fa;
        color: #606266;
        cursor: pointer;
        font-size: 20px;
        border-radius: 0 4px 4px 0;
        border-left: 1px solid #dcdfe6;
    }
    .f-num-with-sub{
        left: 1px;
    }
    .f-num-add{
        right: 1px;
    }
    /deep/ .mate-box {
        .mate-input{
            box-sizing: border-box;
            text-align: center;
        }
        label {
            top: 4px;
            left: 34px;
        }
    }
}
</style>
