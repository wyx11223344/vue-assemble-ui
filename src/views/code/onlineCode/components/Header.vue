<template>
    <div class="header-main" :style="{'height': buttonReactive.showMore ? '100px' : '50px'}">
        <div class="top-show">
            <section class="left-logo f-csp" @click="buttonFuns.goToHome()">
                <img src="../../../../assets/images/head-logo.png" />
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
    </div>
</template>

<script>
import { reactive } from 'vue';
import router from '@/router/index';

export default {
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
            name: '展开配置',
            name1: '收回配置',
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
        }, {
            name: 'Npm仓库',
            method: 'triggerFn',
            methodP: 'createTestNpm',
            icon: 'iconRectangleCopy'
        }];

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
                router.push(`/Show/index`);
            }
        };

        return {
            buttonList,
            buttonFuns,
            buttonReactive
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
}
</style>
