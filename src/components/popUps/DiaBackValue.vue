<template>
    <div>
        <dia-log v-model="DiaShow" :title="title" :width="width" :enter="api.submit">
            <slot :form="form" :api="api"></slot>
        </dia-log>
    </div>
</template>

<script>
import { ref, reactive, onMounted, watchEffect } from 'vue';
import DiaLog from './DiaLog';

export default {
    emits: {
        'update:Fn': true
    },
    components: { DiaLog },
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
        modelValue: {
            type: Object,
            default: null
        }
    },
    setup(props, { emit }) {
        const DiaShow = ref(false);
        const form = reactive({});

        watchEffect(() => {
            if (!DiaShow.value) {
                Object.keys(form).forEach((key) => {
                    delete form[key];
                });
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
                stepPromise.resolve && stepPromise.resolve(form);
                DiaShow.value = false;
            }
        });

        return {
            DiaShow,
            form,
            api
        };
    }
};
</script>

<style scoped lang="less">

</style>
