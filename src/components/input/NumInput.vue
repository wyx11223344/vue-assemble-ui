<template>
    <div class="f-num-with-add-sub">
        <span class="f-num-icon f-num-sub" @click="sub()">
            -
        </span>
        <div class="input">
            <input :rules="NumInput.AddRules.name" v-model="FONT_SIZE" label="请输入字号" />
        </div>
        <span class="f-num-icon f-num-add" @click="sub(true)">
            +
        </span>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, reactive } from 'vue';
export default {
    name: 'NumInput',
    setup() {
        const store = useStore();

        const NumInput = reactive({
            Addform: { name: '' },
            // AddRules: { name: { validate: [{ validateName: 'required', trigger: ['input'] }, 'Number'], trigger: ['blur'] }}
            AddRules: {
                name: { validate: [{ validateName: 'required', trigger: ['input'] }, 'Number'], trigger: ['blur'] },
                version: { validate: ['required'], trigger: ['blur'] }
            }
        });

        const FONT_SIZE = computed({
            get: () => store.state.themes.FONT_SIZE,
            set: (value) => {
                store.commit('CHANGE_FONT_SIZE', Number(value));
            }
        });

        function sub(bool) {
            bool ? FONT_SIZE.value++ : FONT_SIZE.value--;
        }

        return {
            FONT_SIZE,
            NumInput,
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
</style>
