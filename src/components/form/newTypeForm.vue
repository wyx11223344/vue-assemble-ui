<template>
    <div>
        <slot :api="TypeFormApi"></slot>
    </div>
</template>

<script>
import { reactive, nextTick, provide } from 'vue';

export default {
    name: 'NewTypeForm',
    setup() {

        /** *************************************************************************************************/
        /** ***************************************注册provide***************************************************/
        /** *************************************************************************************************/
        const form = reactive([]);

        provide('form', form);

        /** *************************************************************************************************/
        /** ***************************************回调方法***************************************************/
        /** *************************************************************************************************/
        const TypeFormApi = reactive({
            // 重置表单
            resetForm() {
                nextTick(() => {
                    form.forEach((item) => {
                        item.resetStatus && item.resetStatus();
                    });
                });
            },
            // 提交表单前的校验
            async validate() {
                const backList = [];
                for (let i = 0; i < form.length; i++) {
                    form[i].validation && await form[i].validation('', true);
                    if (!form[i].check) backList.push(form[i]);
                }
                return backList;
            }
        });

        return {
            form,
            TypeFormApi
        };
    }
};
</script>

<style scoped lang="less">

</style>
