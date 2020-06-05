<template>
    <div>
        <slot :form="form" :api="Myapi"></slot>
    </div>
</template>

<script>
import { reactive, nextTick } from 'vue';

export default {
    emits: {
        'update:api': true
    },
    props: {
        api: {
            type: Object,
            default: null
        }
    },
    setup(props, { emit }) {
        const form = reactive({});

        /** *************************************************************************************************/
        /** ***************************************回调方法***************************************************/
        /** *************************************************************************************************/
        const Myapi = reactive({
            // 重置表单
            resetForm() {
                nextTick(() => {
                    Object.keys(form).forEach((key) => {
                        form[key].value = '';
                        form[key].check = true;
                        // delete form[key];
                    });
                });
            },
            // 提交表单前的校验
            validate() {
                const backList = [];
                Object.keys(form).forEach((key) => {
                    form[key].validation();
                    if (!form[key].check) backList.push(form[key]);
                });
                return backList;
            }
        });

        emit('update:api', Myapi);

        return {
            form,
            Myapi
        };
    }
};
</script>

<style scoped lang="less">

</style>
