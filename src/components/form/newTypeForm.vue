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
                    });
                });
            },
            // 提交表单前的校验
            async validate() {
                const backList = [];
                const keys = Object.keys(form);
                for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    await form[key].validation('', true);
                    if (!form[key].check) backList.push(form[key]);
                }
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
