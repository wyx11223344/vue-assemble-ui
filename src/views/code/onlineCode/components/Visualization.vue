<template>
    <div class="vis-box f-all100" v-if="Object.keys(canDealObj.visualizationObj).length > 0">
        <input v-for="item in Object.keys(canDealObj.visualizationObj)" :key="item" v-model="canDealObj.visualizationObj[item]" @change="reback" />
    </div>
</template>

<script>
import { reactive, watchEffect } from 'vue';

export default {
    name: 'Visualization',
    props: {
        showCode: {
            type: Object,
            default: null
        }
    },
    setup(props, { emit }) {
        const canDealObj = reactive({
            visualizationObj: {}
        });

        watchEffect(() => {
            if (!props.showCode.html) return {};
            const script = getSource(props.showCode.html, 'script').replace(/export default/, 'return');
            canDealObj.visualizationObj = script && new Function(script)().data ? new Function(script)().data().visualizationObj : {};
        });

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
	z-index: 10;
}
</style>
