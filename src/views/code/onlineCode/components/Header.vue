<template>
    <div class="header-main f-oh" :style="{'height': buttonReactive.showMore ? '100px' : '50px'}">
        <div class="top-show">
            <section class="left-logo f-csp" @click="buttonFuns.goToHome()">
                <img src="../../../../assets/images/head-logo.png"  alt=""/>
            </section>
            <section class="right-button">
                <div class="each-button f-csp" v-for="item in buttonList" :key="item.name" @click="buttonFuns[item.method](item.methodP)">
                    <div class="button-box">
                        <span class="button-content">{{ buttonReactive[item.status] ? item.name1 : item.name }}</span>
                        <i class="iconfont" :class="buttonReactive[item.status] ? item.icon1 : item.icon"></i>
                    </div>
                </div>
            </section>
        </div>
        <!--        <div class="header-more-config">-->
        <!--            <base-switch class="switch-center" v-model="expandObj.viCode">-->
        <!--                <span>开启可视化编辑</span>-->
        <!--            </base-switch>-->
        <!--            <section>-->
        <!--                <jelly-button @click="controlThreePack">管理三方包</jelly-button>-->
        <!--                <jelly-button>添加代码模板</jelly-button>-->
        <!--            </section>-->
        <!--        </div>-->
        <!--        <three-pack-control ref="ThreePackControl" :threePacks="modelValue"></three-pack-control>-->
    </div>
</template>

<script>
import { reactive, ref } from 'vue';
import router from '@/router/index';
// import JellyButton from '@/components/button/jellyButton';
// import BaseSwitch from '@/components/switch/BaseSwitch';
// import ThreePackControl from '@/views/code/onlineCode/components/ThreePackControl';

export default {
    // components: { ThreePackControl, BaseSwitch, JellyButton },
    props: {
        isDia: {
            type: Boolean,
            default: false
        },
        modelValue: {
            type: String,
            default: null
        }
    },
    setup(props, { emit }) {

        /** *************************************************************************************************/
        /** ***************************************按钮列表***************************************************/
        /** *************************************************************************************************/
        // 按钮列表（固定数据，后期考虑后端返回）
        const buttonList = [{
            name: '首页',
            method: 'goToHome',
            icon: 'iconshouye'
        }, {
            name: '代码运行',
            method: 'triggerFn',
            methodP: 'buttonClick',
            icon: 'iconyunhang'
        }, {
            name: '保存组件',
            method: 'triggerFn',
            methodP: 'setHtml',
            icon: 'iconbaocun'
        }, {
            name: '新增文件',
            method: 'triggerFn',
            methodP: 'addEditor',
            icon: 'iconzujian'
        }, {
            name: '展开功能',
            name1: '收回功能',
            status: 'showMore',
            method: 'changeShowMore',
            icon: 'iconxiala',
            icon1: 'iconxiala change-tans'
        // }, {
        //     name: '登录',
        //     method: '',
        //     icon: 'icondenglu'
        // }, {
        //     name: '注册',
        //     method: '',
        //     icon: 'iconjiaru'
        // }, {
        //     name: 'Npm仓库',
        //     method: 'triggerFn',
        //     methodP: 'createTestNpm',
        //     icon: 'iconRectangleCopy'
        }];

        if (props.isDia) {
            buttonList.splice(0, 1);
        }

        // 按钮需要相应数据
        const buttonReactive = reactive({
            showMore: false
        });

        // 按钮控制方法
        const buttonFuns = {
            changeShowMore() {
                buttonReactive.showMore = !buttonReactive.showMore;
            },
            triggerFn(name) {
                emit('triggerfn', name);
            },
            goToHome() {
                if (props.isDia) return;
                router.push(`/Show/index`);
            }
        };

        /** *************************************************************************************************/
        /** ***************************************拓展功能***************************************************/
        /** *************************************************************************************************/
        const ThreePackControl = ref(null);
        const expandObj = reactive({
            viCode: false
        });

        // 控制三方包
        function controlThreePack() {
            ThreePackControl.value.changeShow();
        }

        return {
            buttonList,
            buttonFuns,
            buttonReactive,
            expandObj,
            ThreePackControl,
            controlThreePack
        };
    }
};
</script>

<style scoped lang="less">
.editor-main{
    .header-main{
        border-bottom: 1px solid;
        transition: height 0.3s;
        z-index: 1;
        .mixin-border-color('onlinecode-moveline-bgc');
        .mixin-boxshadow-color('onlinecode-header-boxshac', 0 0 10px);
        .mixin-background-color('base-backgroud-color');
        .top-show{
            display: flex;
            justify-content: space-between;
            height: 50px;
            border-bottom: 1px solid;
            .mixin-border-color('base-border-color');
            .mixin-boxshadow-color('onlinecode-header-boxshac', 0 0 5px);
        }
        .left-logo{
            width: 280px;
            padding: 8px 20px;
            text-align: left;
            img{
                height: 34px;
                transform: translateX(-300px);
                .mixin-drop-shadow(300px 0 0 , 'base-font-color');
            }
        }
        .right-button{
            display: flex;
            height: 50px;
            .each-button{
                height: 50px;
                padding: 8px 0;
                transition: 0.3s;
                .button-box{
                    border-left: 1px solid;
                    padding: 0 10px;
                    .mixin-border-color('base-border-color');
                }
                .button-content{
                    display: inline-block;
                    height: 34px;
                    line-height: 34px;
                }
                &:hover{
                    .mixin-background-color('base-compared-bgc');
                }
                .iconfont{
                    display: inline-block;
                    padding: 0 2px;
                    transition: 0.3s;
                }
                .change-tans{
                    transform: rotate(180deg);
                }
            }
        }
    }
    .header-more-config{
		display: flex;
        justify-content: space-between;
        padding: 0 20px;
		height: 50px;
        line-height: 50px;
        button{
            height: 34px;
            margin-top: 6px;
        }
        .switch-center{
            display: flex;
            align-items: center;
            span{
                font-size: 14px;
                padding-right: 5px;
                font-weight: bold;
                .mixin-font-color('onlinecode-head-color');
            }
        }
    }
}
</style>
