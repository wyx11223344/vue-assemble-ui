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
        <div class="header-more-config">
            <section>

            </section>
            <section>
                <button @click="controlThreePack">管理三方包</button>
                <button @click="addCodeTemplate">添加代码模板</button>
            </section>
        </div>
        <three-pack-control ref="ThreePackControl" :threePacks="modelValue" @valuechange="threeChangeCallback"></three-pack-control>
        <code-template ref="CodeTemplate"></code-template>
    </div>
</template>

<script>
import { reactive, ref } from 'vue';
import router from '@/router/index';
import ThreePackControl from '@/views/code/onlineCode/components/ThreePackControl';
import CodeTemplate from '@/views/code/onlineCode/components/CodeTemplate';

export default {
    components: { CodeTemplate, ThreePackControl },
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
        const CodeTemplate = ref(null);
        const expandObj = reactive({
            viCode: false
        });

        // 控制三方包
        async function controlThreePack() {
            ThreePackControl.value.changeShow();
        }

        async function addCodeTemplate() {
            try {
                const templateId = await CodeTemplate.value.openCodeTemplate();
                emit('addtemplate', templateId);
            } catch (e) {
                console.log('关闭了弹窗');
            }
        }

        function threeChangeCallback(value) {
            emit('update:modelValue', value);
            emit('threepackschange');
        }

        return {
            buttonList,
            buttonFuns,
            buttonReactive,
            expandObj,
            CodeTemplate,
            ThreePackControl,
            controlThreePack,
            addCodeTemplate,
            threeChangeCallback
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
            padding: 5px 12px;
			border-radius: 5px;
			cursor: pointer;
			outline: none;
			margin-right: 5px;
			transition: .3s;
			.mixin-background-color('base-symbol-color');
			.mixin-font-color('base-backgroud-color');
			&:hover{
				filter: brightness(110%);
			}
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
