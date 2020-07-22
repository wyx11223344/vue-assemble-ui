<template>
    <header>
        <section class="left">
            <img src="../../../assets/images/head-logo.png" />
            <ul>
                <li v-for="(item, index) in leftButtonObj.buttonList" :key="item.name" :class="{'choose': leftButtonObj.chooseIndex === index}" @click="leftButtonObj.chooseIndex = index, item.method(index)">{{ item.name }}</li>
            </ul>
        </section>
        <section class="right">
            <ul>
                <!--<li><input /></li>-->
                <li @click="openCartDia">
                    <i class="iconfont icongouwuche"></i>
                    <span>{{cartList.length}}</span>
                </li>
            </ul>
        </section>
    </header>
</template>

<script>
import { reactive, computed } from 'vue';
import router from '@/router/index';
import { useStore } from 'vuex';

export default {
    name: 'ShowHeader',
    setup() {
        const store = useStore();

        /** *************************************************************************************************/
        /** ***************************************左侧按钮***************************************************/
        /** *************************************************************************************************/
        const cartList = computed(() => store.state.cart.cartList);

        const leftButtonObj = reactive({
            chooseIndex: computed(() => leftButtonObj.buttonList.findIndex((item) => item.url === router.currentRoute.value.path)),
            buttonList: [{
                name: '首页',
                url: '/Show/index',
                method() {
                    router.push(`/Show/index`);
                }
            }, {
                name: '新组件',
                url: '/Code/index',
                method() {
                    router.push(`/Code/index`);
                }
            }, {
                name: '组件管理',
                url: '/Show/index',
                method() {
                    console.log(123);
                }
            }, {
                name: '组件库',
                url: '/Show/list',
                method() {
                    router.push(`/Show/list`);
                }
            }]
        });

        function openCartDia() {
            store.commit('changeCartDiaShow');
        }

        return {
            leftButtonObj,
            cartList,
            openCartDia
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
            height: 30px;
            margin: auto;
            filter: brightness(10);
        }
        ul{
            margin-left: 60px;
            li{
                font-size: 14px;
                display: inline-block;
                padding: 0 20px;
                cursor: pointer;
                color: #9c9c9c;
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
    .right{
        ul{
            li{
                display: inline-block;
                position: relative;
                cursor: pointer;
                margin-right: 30px;
                span{
                    position: absolute;
                    right: -8px;
                    top: 8px;
                    width: 20px;
                    height: 20px;
                    border-radius: 10px;
                    background-color: #ff7575;
                    color: #f2f2f2;
                    line-height: 22px;
                    font-size: 12px;
                }
                .iconfont{
                    color: #f2f2f2;
                    font-size: 24px;
                }
            }
        }
    }
}
</style>
