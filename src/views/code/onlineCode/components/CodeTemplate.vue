<template>
    <section>
        <base-dia v-model="templateShow" @close="diaClose">
            <div class="font-box" @click.stop>
                <ul>
                    <li class="header">选择需要添加的模板</li>
                    <li class="f-csp" v-for="item in showObj.getList" :key="item.id" @click="addTemplate(item.id)">{{ item.name }}</li>
                </ul>
            </div>
        </base-dia>
    </section>
</template>

<script>
import { ref, reactive } from 'vue';
import BaseDia from '@/components/popUps/BaseDia';
import Template from '@/api/template';

export default {
    name: 'CodeTemplate',
    components: { BaseDia },
    setup() {

        /** *************************************************************************************************/
        /** ***************************************选择控制***************************************************/
        /** *************************************************************************************************/
        const templateShow = ref(false);
        const showObj = reactive({
            isGet: false,
            getList: [],
            stepPromise: {}
        });

        async function openCodeTemplate() {
            templateShow.value = true;
            if (!showObj.isGet) {
                showObj.isGet = true;
                await getList();
            }
            return await new Promise((resolve, reject) => {
                showObj.stepPromise.resolve = resolve;
                showObj.stepPromise.reject = reject;
            });
        }

        function getList() {
            Template.getTemplateName().then((response) => {
                showObj.getList = response;
            });
        }

        function addTemplate(id) {
            showObj.stepPromise.resolve && showObj.stepPromise.resolve(id);
            templateShow.value = false;
            showObj.stepPromise = {};
        }

        function diaClose() {
            showObj.stepPromise.reject && showObj.stepPromise.reject();
            showObj.stepPromise = {};
        }

        return {
            templateShow,
            showObj,
            diaClose,
            addTemplate,
            openCodeTemplate
        };
    }
};
</script>

<style scoped lang="less">
.font-box{
	padding: 60px;
	border-radius: 20px;
	transition: .3s;
	&:hover{
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	}
	.header{
		margin-bottom: 10px;
		&:hover{
			background-color: rgba(0, 0, 0, 0);
		}
	}
	li{
		text-align: center;
		font-size: 18px;
		font-weight: bold;
		color: #797979;
		transition: .3s;
		&:hover{
			background-color: rgba(0, 0, 0, 0.1);
		}
	}
}
</style>
