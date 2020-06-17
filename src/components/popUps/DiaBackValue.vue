<template>
    <div>
        <dia-log v-model="DiaShow" :title="title" :width="width" :enter="DiaBackApi.submit" @close="DiaBackApi.close">
            <new-type-form ref="typeForm">
                <slot :DiaBackApi="DiaBackApi"></slot>
            </new-type-form>
        </dia-log>
    </div>
</template>

<script>
import { ref, watchEffect } from 'vue';
import DiaLog from './DiaLog';
import NewTypeForm from '../form/newTypeForm';

export default {
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
        modelValue: {
            type: Object,
            default: null
        }
    },
    setup() {
        const typeForm = ref(null);

        /** *************************************************************************************************/
        /** ***************************************显示控制***************************************************/
        /** *************************************************************************************************/
        const DiaShow = ref(false);

        watchEffect(() => {
            if (DiaShow.value && typeForm.value.TypeFormApi) {
                typeForm.value.TypeFormApi.resetForm();
            }
        });

        /** *************************************************************************************************/
        /** ***************************************主要调用***************************************************/
        /** *************************************************************************************************/
        // 注册promise对象保证回调
        const stepPromise = {
            resolve: null,
            reject: null
        };

        function diaPromise() {
            DiaShow.value = true;
            return new Promise((resolve, reject) => {
                stepPromise.resolve = resolve;
                stepPromise.reject = reject;
            });
        }

        /** *************************************************************************************************/
        /** ***************************************开放api***************************************************/
        /** *************************************************************************************************/
        const DiaBackApi = {
            close() {
                stepPromise.reject && stepPromise.reject();
                DiaShow.value = false;
            },
            async submit() {
                const backList = await typeForm.value.TypeFormApi.validate();
                if (backList.length > 0) return;
                stepPromise.resolve && stepPromise.resolve();
                DiaShow.value = false;
            }
        };

        return {
            diaPromise,
            DiaShow,
            typeForm,
            DiaBackApi
        };
    }
};
</script>

<style scoped lang="less">

</style>
