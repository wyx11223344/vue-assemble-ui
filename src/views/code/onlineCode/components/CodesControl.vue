<template>
    <div class="code-control-box" :style="{'width': isShow ? '200px' : '20px'}">
        <p class="open-click f-csp" @click="isShow = !isShow">
            <span>MyComponents</span>
        </p>
        <transition name="slide-center">
            <div class="code-list f-all100" v-show="isShow">
                <header>组件列表 <i class="iconfont icontishi" v-title="'下列文件为当前组件的各个vue文件，index.vue为展示入口（不是组件入口），组件入口为后面有小星星的<br>右键组件即可设置组件入口，如不进行设置默认为第一个添加的组件<br><b>!!!请右键点击文件</b>'"></i></header>
                <ul class="show-list">
                    <li class="f-csp" v-for="(item, index) in modelValue" :key="item.name" @contextmenu.prevent="e => openChoose(index, e)" @click="changeShow(index)">{{ item.name }}.vue <i v-if="item.type === 1" class="iconfont iconxingxing"></i></li>
                </ul>
            </div>
        </transition>
        <transition name="slide-center">
            <section
                class="right-click-box"
                v-show="showRightBox.show"
                :style="{left: showRightBox.left + 'px',top: showRightBox.top + 'px'}"
                v-clickoutside="() => {showRightBox.show = false}">
                <ul class="click-list">
                    <li class="f-csp" @click="changeMainComponents()">设定为入口组件</li>
                    <li class="f-csp" @click="delectCodes()">删除</li>
                </ul>
            </section>
        </transition>
    </div>
</template>

<script>
import { ref, reactive } from 'vue';

export default {
    name: 'CodesControl',
    props: {
        modelValue: {
            type: Array,
            default: null
        }
    },
    setup(props, { emit }) {

        /** *************************************************************************************************/
        /** ***************************************数据控制***************************************************/
        /** *************************************************************************************************/
        let setIndex = 0;

        function openChoose(index, e) {
            if (props.modelValue[index].name === 'index') return;
            setIndex = index;
            showRightBox.show = true;
            showRightBox.left = e.clientX;
            showRightBox.top = e.clientY;
        }

        function changeMainComponents() {
            showRightBox.show = false;
            if (props.modelValue[setIndex].name === 'index') {
                console.log(123);
            } else {
                const setObj = JSON.parse(JSON.stringify(props.modelValue));
                setObj[setIndex].type = 1;
                emit('update:modelValue', setObj);
            }
        }

        function delectCodes() {
            const setObj = JSON.parse(JSON.stringify(props.modelValue));
            setObj.splice(setIndex, 1);
            emit('update:modelValue', setObj);
            showRightBox.show = false;
        }

        /** *************************************************************************************************/
        /** ***************************************显示控制***************************************************/
        /** *************************************************************************************************/
        const isShow = ref(false);
        const showRightBox = reactive({
            show: false,
            left: 0,
            top: 0
        });

        function changeShow(index) {
            const setObj = JSON.parse(JSON.stringify(props.modelValue));
            setObj[index].disclose = true;
            emit('update:modelValue', setObj);
        }

        return {
            isShow,
            showRightBox,
            openChoose,
            changeMainComponents,
            changeShow,
            delectCodes
        };
    }
};
</script>

<style scoped lang="less">
.code-control-box{
    flex-shrink: 0;
    position: relative;
    transition: 0.3s;
    border-right: 1px solid;
    .mixin-border-color('onlinecode-moveline-borc');
    .mixin-background-color('base-backgroud-color');
    .open-click{
        height: 100%;
        width: 20px;
        border-right: 1px solid;
        .mixin-border-color('onlinecode-moveline-borc');
        span{
            display: inline-block;
            padding: 10px 2px;
            font-size: 12px;
            writing-mode: vertical-rl;
            .mixin-background-color('onlinecode-moveline-bgc');
        }
    }
    .code-list{
        position: absolute;
        left: 20px;
        top: 0;
        width: 180px;
        header{
            font-size: 14px;
            font-weight: bold;
            transition: height 0.3s;
            line-height: 22px;
            border: 1px solid;
            text-align: left;
            text-indent: 2em;
            .mixin-font-color('onlinecode-head-color');
            .mixin-border-color('base-border-color');
            .mixin-background-color('base-backgroud-color');
            .mixin-boxshadow-color('onlinecode-head-boxshac', 0px 10px 10px 5px inset);
            .iconfont{
                float: right;
                transform: translateX(-20px);
                font-size: 12px;
            }
        }
        .show-list{
            li{
                font-size: 14px;
                padding: 5px;
                text-align: left;
                text-indent: 2em;
                &:hover{
                    .mixin-background-color('onlinecode-moveline-bgc');
                }
                .iconfont{
                    .mixin-font-color('base-out-button');
                }
            }
        }
    }
    .right-click-box{
        position: fixed;
        z-index: 10;
        border: 1px solid;
        border-radius: 5px;
        font-size: 14px;
        box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.3), 0 1px 4px rgba(0, 0, 0, 0.2);
        .mixin-border-color('base-border-color');
        .mixin-background-color('base-backgroud-color');
        .click-list{
            padding: 20px 0;
            li:nth-child(1) {
                border-top: 1px solid;
                .mixin-border-color('base-border-color');
            }
            li{
                padding: 10px 20px;
                border-bottom: 1px solid;
                .mixin-border-color('base-border-color');
                &:hover{
                    .mixin-background-color('onlinecode-moveline-bgc');
                }
            }
        }
    }
}
</style>
