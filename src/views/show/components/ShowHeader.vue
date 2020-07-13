<template>
    <header>
        <section class="left">
            <img src="../../../assets/images/head-logo.png" />
            <ul>
                <li v-for="(item, index) in leftButtonObj.buttonList" :key="item.name" :class="{'choose': leftButtonObj.chooseIndex === index}" @click="item.method(index)">{{ item.name }}</li>
            </ul>
        </section>
        <section class="right">
            <ul>
                <li>购物车</li>
            </ul>
        </section>
    </header>
</template>

<script>
import { reactive } from 'vue';
import router from '@/router/index';

export default {
    name: 'ShowHeader',
    setup() {

        /** *************************************************************************************************/
        /** ***************************************左侧按钮***************************************************/
        /** *************************************************************************************************/
        const leftButtonObj = reactive({
            chooseIndex: 0,
            buttonList: [{
                name: '首页',
                method() {
                    router.push(`/Show/index`);
                }
            }, {
                name: '新组件',
                method(index) {
                    leftButtonObj.chooseIndex = index;
                    router.push(`/Code/index`);
                }
            }]
        });

        return {
            leftButtonObj
        };
    }
};
</script>

<style scoped lang="less">
header{
    display: flex;
    justify-content: space-between;
    max-width: 1200px;
    height: 55px;
    line-height: 55px;
    margin: auto;
    .left{
        display: flex;
        img{
            height: 40px;
            margin: auto;
            filter: brightness(10);
        }
        ul{
            margin-left: 60px;
            li{
                display: inline-block;
                padding: 0 20px;
                cursor: pointer;
                color: #4d4d4d;
                transition: 0.3s;
                &:hover{
                    font-weight: bold;
                    color: #f2f2f2;
                }
            }
            .choose{
                font-weight: bold;
                color: #f2f2f2;
            }
        }
    }
}
</style>
