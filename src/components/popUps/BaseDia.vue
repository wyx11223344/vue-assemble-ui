<template>
    <teleport to="#popUps">
        <transition name="slide-center">
            <div class="dia-main" v-show="modelValue" @click.stop="close()"></div>
        </transition>
        <div v-show="modelValue" class="base-content" @click.stop="close()">
            <slot></slot>
        </div>
    </teleport>
</template>

<script>
import PopUpstools from './popUpstools';

export default {
    name: 'BaseDia',
    emits: ['close', 'update:modelValue'],
    props: {
        modelValue: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit }) {

        /** *************************************************************************************************/
        /** ***************************************显示控制***************************************************/
        /** *************************************************************************************************/
        const { close } = new PopUpstools(props, emit);

        return {
            close
        };
    }
};
</script>

<style scoped lang="less">
.base-content{
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto auto 100px auto;
	transition: 0.3s cubic-bezier(.7,.3,.1,1);
	z-index: 1000;
}
.dia-main{
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(255, 255, 255, 0.5);
}
</style>
