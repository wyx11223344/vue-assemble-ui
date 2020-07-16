<template>
    <div class="f-all100 right-box">
        <header>
            <svg width="100px" height="55" stroke="rgba(255,255,255,0.3)" fill="none">
                <polyline points="4,10 20,10 45,40 75,40 90,15" style="stroke-width:4"></polyline>
                <circle cx="50" cy="50" r="4" stroke-width="2" fill="rgba(255,255,255,0.3)"/>
                <circle cx="70" cy="50" r="4" stroke-width="2" fill="rgba(255,255,255,0.3)"/>
            </svg>
            <span>{{cartList.length}}</span>
            <div class="show-font">
                组件购物车
            </div>
            <div class="back-box f-csp" @click="store.commit('changeCartDiaShow')">
                <i class="iconfont iconyoujiantou"></i>
            </div>
        </header>
        <section class="carts-show custom-scroll">
            <div v-show="cartList.length === 0" class="f-all100 carts-no">
                <p>当前购物车里没有组件哦</p>
            </div>
            <div v-show="cartList.length > 0" class="f-all100 carts-have">
                <p>当前购物车内组件:</p>
                <ul>
                    <li v-for="(item, index) in cartList" :key="item.id" :class="{'slide-out-blurred-right': index === removeIndex}">
                        {{ item.name }}
                        <section class="buttons">
                            <span @click="changeRouter(item.id)">编辑</span>
                            <span @click="remove(item, index)">移出</span>
                        </section>
                    </li>
                </ul>
            </div>
        </section>
        <section class="operating">
            <span class="f-csp" @click="getAllNpm()"><i class="iconfont iconidea_icon"></i>添加至npm包</span>
            <transition name="slide-top">
                <div v-show="npmObject.showChooseList" class="npm-choose-box">
                    <header>加入项目</header>
                    <main class="custom-scroll">
                        <ul>
                            <li class="f-csp" v-for="(item, index) in npmObject.list" :key="item.id" @click="npmObject.chooseIndex = index" :class="{'chosen': index === npmObject.chooseIndex}">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#iconnpm" />
                                </svg>
                                {{ item.name }}
                            </li>
                        </ul>
                    </main>
                    <footer>
                        <span @click="npmObject.showChooseList = false">取消</span>
                        <span @click="addComponentsToNpm">确定</span>
                    </footer>
                </div>
            </transition>
        </section>
        <!--确认弹窗-->
        <dia-back-value width="500px" title="以下组件已经在npm包添加，所以以下组件将不会重复添加" ref="checkRepeatBack">
            <section v-if="checkRepeatBack">
                <ul class="dia-show-repeate">
                    <li v-for="item in npmObject.repeatComponents" :key="item.id">{{ item.name }}</li>
                </ul>
                <div class="foot-buttons f-mt15">
                    <jelly-button type="info" @click="checkRepeatBack.DiaBackApi.close">关闭</jelly-button>
                    <jelly-button @click="checkRepeatBack.DiaBackApi.submit">确定</jelly-button>
                </div>
            </section>
        </dia-back-value>
        <message-box ref="messageDia"></message-box>
    </div>
</template>

<script>
import { computed, ref, reactive } from 'vue';
import { useStore } from 'vuex';
import router from '@/router/index';
import Npm from '../../../api/Npm';
import MessageBox from '../../../components/popUps/MessageBox';
import JellyButton from '../../../components/button/jellyButton';
import DiaBackValue from '../../../components/popUps/DiaBackValue';

export default {
    name: 'CartControl',
    components: { DiaBackValue, JellyButton, MessageBox },
    setup() {
        const store = useStore();
        const messageDia = ref(null);

        /** *************************************************************************************************/
        /** ***************************************组件数据控制***************************************************/
        /** *************************************************************************************************/
        const cartList = computed({
            get: () => store.state.cart.cartList,
            set: (value) => {
                store.commit('changeCartList', value);
            }
        });
        const removeIndex = ref(-1);

        // 移出某一项
        function remove(item, index) {
            removeIndex.value = index;
            setTimeout(() => {
                cartList.value = item;
                removeIndex.value = -1;
            }, 500);
        }

        // 编辑组件
        function changeRouter(id) {
            const openUrl = router.resolve({ path: `/Code/index`, query: { id: id }});
            window.open(openUrl.href, '_blank');
        }

        /** *************************************************************************************************/
        /** ***************************************npm列表控制***************************************************/
        /** *************************************************************************************************/
        const npmObject = reactive({
            showChooseList: false,
            list: [],
            chooseIndex: -1,
            repeatComponents: []
        });
        const checkRepeatBack = ref(null);

        // 获取全部npm包数据
        function getAllNpm() {
            Npm.getAllNpm().then((response) => {
                npmObject.list = response;
                npmObject.showChooseList = true;
                npmObject.chooseIndex = -1;
            });
        }

        // 添加组件至npm包
        async function addComponentsToNpm() {
            if (npmObject.chooseIndex === -1) {
                messageDia.value.showMessage('error', '请选择添加至哪个npm包');
                return;
            }
            const chooseItem = npmObject.list[npmObject.chooseIndex];
            npmObject.repeatComponents = [];
            cartList.value.forEach((item) => {
                if (chooseItem.componentsIds.indexOf(item.id) !== -1) npmObject.repeatComponents.push(item);
            });

            try {
                if (npmObject.repeatComponents.length > 0) {
                    await checkRepeatBack.value.diaPromise();
                }

                const addList = cartList.value.map((item) => String(item.id));
                const originalList = chooseItem.componentsIds.split(',');
                const mergeList = [...new Set([...addList, ...originalList])];
                console.log(mergeList);
                messageDia.value.showMessage('primary', '组件添加成功');
            } catch (e) {
                console.log(e);
            }
        }

        return {
            messageDia,
            checkRepeatBack,
            cartList,
            store,
            removeIndex,
            npmObject,
            getAllNpm,
            remove,
            changeRouter,
            addComponentsToNpm
        };
    }
};
</script>

<style scoped lang="less">
.right-box{
    position: relative;
    background-color: #e6e6e6;
    >header{
        position: relative;
        height: 55px;
        font-size: 20px;
        font-weight: bold;
        padding-left: 30px;
        background-color: #07051c;
        >span{
            position: absolute;
            left: 83px;
            top: 7px;
            color: #ff7575;
        }
        .show-font{
            position: absolute;
            left: 130px;
            bottom: 10px;
            line-height: 20px;
            font-size: 18px;
            color: rgba(255,255,255,0.3);
        }
        .back-box{
            position: absolute;
            top: 0;
            left: 0;
            width: 25px;
            height: 100%;
            background-color: #ff7575;
            text-align: center;
            .iconfont{
                line-height: 55px;
                font-size: 20px;
                font-weight: bold;
                color: white;
            }
        }
    }
    .carts-show{
        width: 100%;
        min-height: 350px;
        max-height: calc(100vh - 355px);
        background-color: #fff;
        .carts-no{
            background: url("../../../assets/images/no-cart.png") no-repeat 50% 50%;
            background-size: 200px 200px;
            padding-top: 260px;
            p{
                font-size: 20px;
                font-weight: bold;
                color: #979797;
                text-align: center;
            }
        }
        .carts-have{
            padding: 10px 0;
            >p{
                font-weight: bold;
                line-height: 40px;
                padding: 0 20px;
            }
            ul{
                li{
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    height: 45px;
                    line-height: 45px;
                    padding: 0 20px;
                    &:hover{
                        background-color: #e6e6e6;
                    }
                    .buttons{
                        display: inline-block;
                        span{
                            font-size: 14px;
                            padding: 0 5px;
                            cursor: pointer;
                            color: #ff7575;
                            transition: .3s;
                            &:hover{
                                color: #fc3333;
                                text-decoration: underline;
                            }
                        }
                    }
                }
            }
        }
    }
    .operating{
        height: 300px;
        text-align: center;
        >span{
            display: inline-block;
            padding: 6px 25px;
            background: #cdcdcd;
            box-sizing: border-box;
            border-radius: 40px;
            font-size: 14px;
            height: 45px;
            line-height: 35px;
            margin: 20px 0;
            transition: 0.3s;
            &:hover{
                background-color: #ff7575;
                color: white;
                filter: brightness(120%);
            }
            .iconfont{
                margin: 0 10px 0 0;
            }
        }
        .npm-choose-box{
            position: absolute;
            left: 0;
            bottom: 0;
            height: 300px;
            width: 100%;
            background-color: #fafafa;
            header{
                height: 50px;
                line-height: 50px;
                padding: 0 20px;
                text-align: left;
            }
            main{
                height: 170px;
                ul{
                    li{
                        height: 34px;
                        line-height: 34px;
                        padding: 0 20px;
                        text-align: left;
                        transition: .3s;
                        svg{
                            width: 22px;
                            height: 22px;
                            transform: translateY(5px);
                            margin-right: 10px;
                        }
                        &:hover{
                            background-color: rgba(255, 151, 151, 0.4);
                        }
                    }
                    .chosen{
                        background-color: rgba(255, 151, 151, 0.5);
                    }
                }
            }
            footer{
                height: 80px;
                line-height: 80px;
                text-align: left;
                padding: 0 20px;
                background-color: #e6e6e6;
                span{
                    display: inline-block;
                    padding: 6px 10px;
                    width: 80px;
                    height: 30px;
                    line-height: 20px;
                    border-radius: 14px;
                    background-color: #cdcdcd;
                    margin-right: 10px;
                    text-align: center;
                    cursor: pointer;
                    transition: .3s;
                    &:hover{
                        filter: brightness(110%);
                    }
                }
            }
        }
    }
    .dia-show-repeate{
        li{
            width: 100%;
            height: 40px;
            text-align: left;
        }
    }
}
.slide-out-blurred-right {
    animation: slide-out-blurred-right 0.45s cubic-bezier(0.755, 0.050, 0.855, 0.060) both;
}
@keyframes slide-out-blurred-right {
    0% {
        transform: translateX(0) scaleY(1) scaleX(1);
        transform-origin: 50% 50%;
        filter: blur(0);
        opacity: 1;
    }
    100% {
        transform: translateX(1000px) scaleX(2) scaleY(0.2);
        transform-origin: 0% 50%;
        filter: blur(40px);
        opacity: 0;
    }
}
</style>
