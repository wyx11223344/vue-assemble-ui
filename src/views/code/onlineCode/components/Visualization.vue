<template>
    <div class="vis-box f-all100" :class="{'show-hide': hideBox}" v-if="Object.keys(canDealObj.visualizationObj).length > 0">
        <p>可视化编辑窗口（点击右边可以缩小和展开哦）<i class="iconfont iconyoujiantou rt f-csp" @click="hideBox = !hideBox" v-title="hideBox ? '点我可以展开可视化编辑哦' : '点我隐藏可视化编辑'"></i></p>
        <mate-input v-for="item in Object.keys(canDealObj.visualizationObj)" :label="canDealObj.checkJson[item]?.label" :key="item" v-model="canDealObj.visualizationObj[item]" @change="reback" ></mate-input>
    </div>
</template>

<script>
import { reactive, watch, ref } from 'vue';
import MateInput from '@/components/input/MateInput';
import visualCheckJson from './visualCheck.json';

export default {
    name: 'Visualization',
    components: { MateInput },
    props: {
        showCode: {
            type: Object,
            default: null
        }
    },
    setup(props, { emit }) {

        /** *************************************************************************************************/
        /** ***************************************显示控制***************************************************/
        /** *************************************************************************************************/
        const hideBox = ref(false);

        /** *************************************************************************************************/
        /** ***************************************数据控制***************************************************/
        /** *************************************************************************************************/
        const canDealObj = reactive({
            visualizationObj: {},
            checkJson: visualCheckJson
        });

        watch(props.showCode, () => {
            if (!props.showCode.html) return;
            const script = getSource(props.showCode.html, 'script').replace(/export default/, 'return');
            const getObj = script && new Function(script)().data ? new Function(script)().data().visualizationObj : {};
            if (Object.keys(canDealObj.visualizationObj).length > 0) {
                Object.keys(getObj).forEach((item) => {
                    if (getObj[item] !== canDealObj.visualizationObj[item]) {
                        canDealObj.visualizationObj[item] = getObj[item];
                    }
                });
            } else {
                canDealObj.visualizationObj = getObj;
            }
        }, { immediate: true });

        /** *************************************************************************************************/
        /** ***************************************辅助方法***************************************************/
        /** *************************************************************************************************/

        function getSource(source, type) {
            const regex = new RegExp(`<${type}[^>]*>`);
            let openingTag = source.match(regex);

            if (!openingTag) { return ''; } else { openingTag = openingTag[0]; }

            return source.slice(source.indexOf(openingTag) + openingTag.length, source.lastIndexOf(`</${type}>`));
        }

        function reback() {
            const reg = /visualizationObj:([^}]*)}/;
            emit('changecode', props.showCode.html.replace(props.showCode.html.match(reg)[0], 'visualizationObj:' + JSON.stringify(canDealObj.visualizationObj)));
        }

        return {
            canDealObj,
            hideBox,
            reback
        };
    }
};
</script>

<style scoped lang="less">
.vis-box{
	position: absolute;
	left: 0;
	top: 0;
	background-color: #fff;
	transition: .5s;
	z-index: 10;
	p{
		padding: 10px 20px;
		border-bottom: 1px solid #f2f2f2;
		margin-bottom: 10px;
	}
	.iconfont{
		display: inline-block;
		padding: 5px;
		background-color: #f2f2f2;
		transform: rotate(90deg);
		transition: .3s;
	}
}
.show-hide{
	transform: translateY(100%);
	.iconfont{
		transform: translateY(-40px) rotate(-90deg);
	}
}
</style>
