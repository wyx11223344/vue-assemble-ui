<template>
    <div>
        <dia-log v-model="DiaShow" :title="title" :width="width" :enter="api.submit">
            <new-type-form v-model:api="baseObj.formApi">
                <template v-slot="scope">
                    <slot :form="scope.form" :api="api"></slot>
                </template>
            </new-type-form>
        </dia-log>
    </div>
</template>

<script>
import { ref, reactive, onMounted, watchEffect } from 'vue';
import DiaLog from './DiaLog';
import NewTypeForm from '../form/newTypeForm';

export default {
    emits: {
        'update:Fn': true,
        'update:diaBackApi': true
    },
    components: { NewTypeForm, DiaLog },
    props: {
        title: {
            type: String,
            default: ''
        },
        width: {
            type: String,
            default: '50%'
        },
        Fn: {
            type: Function,
            default: null
        },
        diaBackApi: {
            type: Object,
            default: null
        },
        modelValue: {
            type: Object,
            default: null
        }
    },
    setup(props, { emit }) {
        const baseObj = reactive({
            formApi: null
        });

        /** *************************************************************************************************/
        /** ***************************************显示控制***************************************************/
        /** *************************************************************************************************/
        const DiaShow = ref(false);

        watchEffect(() => {
            if (!DiaShow.value && baseObj.formApi) {
                baseObj.formApi.resetForm();
            }
        });

        /** *************************************************************************************************/
        /** ***************************************生命周期***************************************************/
        /** *************************************************************************************************/
        // 注册promise对象保证回调
        const stepPromise = {
            resolve: null,
            reject: null
        };

        onMounted(() => {
            emit('update:Fn', () => {
                DiaShow.value = true;
                return new Promise((resolve, reject) => {
                    stepPromise.resolve = resolve;
                    stepPromise.reject = reject;
                });
            });
        });

        /** *************************************************************************************************/
        /** ***************************************开放api***************************************************/
        /** *************************************************************************************************/
        const api = reactive({
            close() {
                stepPromise.reject && stepPromise.reject();
                DiaShow.value = false;
            },
            submit() {
                const backList = baseObj.formApi.validate();
                if (backList.length > 0) return;
                stepPromise.resolve && stepPromise.resolve();
                DiaShow.value = false;
            }
        });

        emit('update:diaBackApi', api);

        return {
            DiaShow,
            api,
            baseObj
        };
    }
};
</script>

<style scoped lang="less">

</style>
