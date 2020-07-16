<template>
    <div class="home-box">
        <section class="top-content">
            <p>个人制作的小网站，欢迎你的使用~</p>
            <span class="f-csp" :style="{opacity: selectObj.inputText.length > 0 ? 1 : 0}"><i class="iconfont iconidea_icon"></i>点我进行搜索{{ selectObj.inputText }}组件</span>
            <input class="top-select" v-model="selectObj.inputText" type="text" placeholder="快开始搜索你喜欢的组件吧！"/>
            <div class="show-logo"></div>
        </section>
        <main class="baseList" v-clickoutside="() => {showObj.list.forEach((item, index) => item.showBig === true && showBigHtml(index) )}">
            <div class="each-code-box" :class="{'swing-out-top-bck': showObj.showClose, 'swing-in-top-fwd': !showObj.showClose}" v-for="(item, index) in showObj.list" :key="index">
                <div class="show-box code-open-iframe">
                    <iframe class="f-all100 rewrite-iframe" :src="`http://localhost:9988/code/codeOnline/index.html?findId=${item.htmlId}`"></iframe>
                    <div v-show="!item.showBig" class="cover-box f-csp"  @click="changeRouter(item.id)">
                        <div class="right-all-screen" @click.stop="showBigHtml(index)">
                            <span>
                                <svg>
                                    <use xlink:href="#iconfull-screen" fill="#fff"/>
                                </svg>
                            </span>
                        </div>
                    </div>
                    <span class="close-span" v-show="item.showBig" @click="showBigHtml(index)">
                        <svg>
                            <use xlink:href="#iconsuoxiao" fill="#fff"/>
                        </svg>
                    </span>
                    <span class="close-font" v-show="item.showBig">组件预览，点右侧进行关闭</span>
                </div>
                <div class="show-message">
                    <p>
                        <span class="f-csp" @click="changeRouter(item.id)">{{ item.name }}</span>
                        <i @click="addCart(item)" class="iconfont icongouwuche1 rt f-csp" :class="{'jello-horizontal': item.cartMove, 'cart-choose': cartList.findIndex(choose => item.id === choose.id) !== -1}"></i>
                    </p>
                </div>
            </div>
        </main>
        <p class="button-font">什么！没有你喜欢的组件，<a href="">点我进入组件库</a>搜索！</p>
        <div class="left-float-box">
            <sao-select :options="selectObj.classifyList" v-model="selectObj.chooseClassify" @change="getComponentsByClassify"></sao-select>
            <transition name="slide-top">
                <div class="right-button" v-show="scrollTop > 55">
                    <span class="show-content f-csp" @click="openCartDia">
                        <i class="iconfont icongouwuche"></i>
                        <span>{{cartList.length}}</span>
                    </span>
                </div>
            </transition>
            <transition name="slide-top">
                <div class="right-button" v-show="scrollTop > 55">
                    <span class="show-content f-csp" @click="backToTop">
                        <i class="iconfont icondingbu"></i>
                    </span>
                </div>
            </transition>
        </div>
        <message-box ref="messageDia"></message-box>
    </div>
</template>

<script>
import { computed, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import router from '@/router/index';
import MessageBox from '../../../components/popUps/MessageBox';
import Show from '../../../api/Show';
import SaoSelect from '../../../components/select/SaoSelect';

export default {
    name: 'Home',
    components: { SaoSelect, MessageBox },
    props: {
        scrollTop: {
            type: Number,
            default: null
        }
    },
    setup(props, { emit }) {
        const store = useStore();
        const messageDia = ref(null);

        /** *************************************************************************************************/
        /** ***************************************代码块控制***************************************************/
        /** *************************************************************************************************/
        const cartList = computed(() => store.state.cart.cartList);
        const showObj = reactive({
            showClose: false,
            list: []
        });

        // 获取基础数据
        function getComponentsByClassify(classify) {
            let dueFn = '';
            if (classify) {
                dueFn = 'getComponentsByClassifyWithHtml';
            } else {
                dueFn = 'getAllComponentsWithHtml';
            }
            Show[dueFn]({
                classify: classify
            }).then((response) => {
                showObj.showClose = true;
                setTimeout(() => {
                    showObj.list = response;
                    showObj.showClose = false;
                }, 1200);
            });
        }

        getComponentsByClassify();

        function showBigHtml(index) {
            const changeDom = document.getElementsByClassName('code-open-iframe')[index];
            if (showObj.list[index].showBig) {
                showObj.list[index].showBig = false;
                changeDom.style.position = '';
                changeDom.style.left = '';
                changeDom.style.top = '';
                changeDom.style.width = '';
                changeDom.style.height = '';
                changeDom.style.zIndex = '';
            } else {
                showObj.list[index].showBig = true;
                changeDom.style.position = 'fixed';
                changeDom.style.left = '0';
                changeDom.style.top = '0';
                changeDom.style.width = '100%';
                changeDom.style.height = '100%';
                changeDom.style.zIndex = '1';
            }
        }

        function changeRouter(id) {
            const openUrl = router.resolve({ path: `/Code/index`, query: { id: id }});
            window.open(openUrl.href, '_blank');
        }

        function addCart(item) {
            if (!item.cartMove) {
                item.cartMove = true;
                store.commit('changeCartList', item);
                setTimeout(() => {
                    item.cartMove = false;
                }, 900);
            } else {
                messageDia.value.showMessage('error', '请不要频繁操作哦');
            }
        }

        /** *************************************************************************************************/
        /** ***************************************搜索控制***************************************************/
        /** *************************************************************************************************/
        const selectObj = reactive({
            inputText: '',
            classifyList: [],
            chooseClassify: null
        });

        // 获取类别
        Show.getAllClassify().then((response) => {
            selectObj.classifyList = response.map((item) => ({
                value: item.id,
                name: item.name
            }));
            selectObj.classifyList.unshift({ value: null, name: '全部' });
        });

        /** *************************************************************************************************/
        /** ***************************************右侧功能***************************************************/
        /** *************************************************************************************************/

        function openCartDia() {
            store.commit('changeCartDiaShow');
        }

        function backToTop() {
            emit('backtop');
        }

        return {
            selectObj,
            showObj,
            messageDia,
            cartList,
            showBigHtml,
            changeRouter,
            addCart,
            getComponentsByClassify,
            openCartDia,
            backToTop
        };
    }
};
</script>

<style scoped lang="less">
.home-box{
    .top-content{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column-reverse;
        margin-top: 60px;
        span{
            display: inline-block;
            padding: 6px 25px;
            background: rgba(33, 36, 73, 0.71);
            color: #ff7575;
            box-sizing: border-box;
            border-radius: 40px;
            font-size: 14px;
            height: 50px;
            line-height: 35px;
            margin: 20px 0;
            border: 1px solid #6974b3;
            transition: 0.3s;
            &:hover{
                filter: brightness(120%);
            }
            .iconfont{
                margin: 0 10px 0 0;
            }
        }
        p{
            margin: 5px 0 60px 0;
            font-size: 14px;
            color: #fff;
            letter-spacing: 1px;
            animation: home-fade .6s cubic-bezier(.7,.3,.1,1) .4s;
            animation-fill-mode: backwards;
        }
        .show-logo{
            width: 200px;
            height: 200px;
            transition: 0.3s;
            background: url("../../../assets/images/top-logo.png") no-repeat;
            background-size: 100% 100%;
            animation: home-fade .6s cubic-bezier(.7,.3,.1,1);
            animation-fill-mode: backwards;
        }
        .top-select{
            display: inline-block;
            position: relative;
            text-align: center;
            width: 766px;
            margin: 40px auto 0;
            animation: home-fade .6s cubic-bezier(.7,.3,.1,1) .2s;
            animation-fill-mode: backwards;
            height: 50px;
            line-height: 50px;
            border: 1px solid rgba(34,43,95,.79);
            background: rgba(33, 36, 73, 0.71);
            color: #fff;
            box-sizing: border-box;
            border-radius: 40px;
            font-size: 18px;
            transition: all .4s;
            &:focus+.show-logo{
                background: url("../../../assets/images/top-logo-choose.png") no-repeat;
                background-size: 100% 100%;
            }
            &::placeholder {
                color: #a6a5ad;
                font-size: 14px;
                text-align: center;
            }
            &:hover{
                border-color: #6974b3;
            }
        }
        @keyframes home-fade {
            0% {
                transform: translateY(30px);
                opacity: 0;
            }
            100% {
                transform: translateY(0);
                opacity: 1;
            }
        }
    }
    .baseList{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        height: 700px;
        padding: 0 20px;
        margin-bottom: 60px;
        perspective: 1000px;
        .loopBox(6);
        .loopBox(@count) when (@count >= 0) {
            .each-code-box:nth-child(@{count}) {
                animation-delay: 0.1s * @count;
            }
            .loopBox(@count - 1);
        }
        .each-code-box{
            position: relative;
            width: 370px;
            height: 270px;
            padding: 10px;
            margin-top: 60px;
            border-radius: 10px;
            background-color: #211f36;
            transition: .3s;
            &:hover{
                box-shadow: #3a3f57 0 2px 5px 2px;
            }
            .show-box{
                position: relative;
                width: 350px;
                height: 196.9px;
                border-radius: 10px;
                overflow: hidden;
                transition: .3s cubic-bezier(.7,.3,.1,1);
                .rewrite-iframe{
                    width: 100%;
                    height: 100%;
                    border: 1px solid #6974b3;
                    border-radius: 10px;
                    background-color: #fff;
                    transition: 1.5s;
                    &::selection {
                        background: none;
                    }
                }
                img{
                    width: 100%;
                    height: 100%;
                }
                .cover-box{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    .right-all-screen{
                        position: absolute;
                        right: 0;
                        top: 0;
                        width: 120px;
                        height: 100%;
                        text-align: center;
                        color: white;
                        background-image: linear-gradient(65deg, rgba(0,0,0,0) 90px, rgba(0,0,0,0.6));
                        opacity: 0;
                        transition: 0.3s;
                        span{
                            position: absolute;
                            top: 10px;
                            right: 10px;
                            width: 30px;
                            height: 30px;
                            border-radius: 5px;
                            background-color: #5a5f73;
                            margin: auto;
                            transition: 0.3s;
                            svg{
                                position: absolute;
                                left: 0;
                                right: 0;
                                top: 0;
                                bottom: 0;
                                margin: auto;
                                width: 20px;
                                height: 20px;
                            }
                        }
                        &:hover{
                            transform: scale(1.2);
                            span{
                                top: 25px;
                                right: 20px;
                            }
                        }
                    }
                    &:hover .right-all-screen{
                        opacity: 1;
                    }
                }
                .close-span{
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    width: 30px;
                    height: 30px;
                    border-radius: 5px;
                    background-color: #5a5f73;
                    cursor: pointer;
                    transition: 0.3s;
                    svg{
                        position: absolute;
                        left: 0;
                        right: 0;
                        top: 0;
                        bottom: 0;
                        margin: auto;
                        width: 20px;
                        height: 20px;
                    }
                    &:hover{
                        transform: scale(1.2);
                    }
                }
                .close-font{
                    position: absolute;
                    left: 20px;
                    top: 20px;
                    font-size: 18px;
                    font-weight: bold;
                }
            }
            .show-message{
                position: absolute;
                width: 100%;
                bottom: 0;
                left: 0;
                padding: 0 20px;
                text-align: left;
                color: #f2f2f2;
                line-height: 60px;
                font-size: 16px;
                font-weight: bold;
                .iconfont{
                    font-size: 22px;
                }
                .cart-choose{
                    color: #ff369d;
                }
            }
        }
        .swing-in-top-fwd {
            animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) backwards;
        }
        .swing-out-top-bck {
            animation: swing-out-top-bck 0.45s cubic-bezier(0.600, -0.280, 0.735, 0.045) both;
        }
    }
    .left-float-box{
        position: absolute;
        margin-left: 1250px;
        top: 60vh;
        .right-button{
            position: relative;
            width: 60px;
            height: 60px;
            margin-top: 20px;
            .show-content{
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                right: 0;
                margin: auto;
                width: 50px;
                height: 50px;
                line-height: 50px;
                border-radius: 25px;
                background-color: rgba(204,204,204,.5);
                transition: .3s;
                .iconfont{
                    color: #131417;
                    font-size: 32px;
                    font-weight: bold;
                }
                &:hover{
                    width: 60px;
                    height: 60px;
                    line-height: 60px;
                    border-radius: 30px;
                    .iconfont{
                        font-size: 38px;
                    }
                }
                span{
                    position: absolute;
                    right: -6px;
                    top: 0;
                    width: 26px;
                    height: 26px;
                    border-radius: 13px;
                    background-color: #ff7575;
                    color: #f2f2f2;
                    line-height: 26px;
                    font-size: 14px;
                }
            }
        }
    }
    .button-font{
        margin: 5px 0 60px 0;
        font-size: 14px;
        color: #fff;
        letter-spacing: 1px;
        a{
            color: #ff7575;
        }
    }
}
.jello-horizontal {
    animation: jello-horizontal 0.9s both;
}
@keyframes jello-horizontal {
    0% {
        transform: scale3d(1, 1, 1);
    }
    30% {
        transform: scale3d(1.25, 0.75, 1);
    }
    40% {
        transform: scale3d(0.75, 1.25, 1);
    }
    50% {
        transform: scale3d(1.15, 0.85, 1);
    }
    65% {
        transform: scale3d(0.95, 1.05, 1);
    }
    75% {
        transform: scale3d(1.05, 0.95, 1);
    }
    100% {
        transform: scale3d(1, 1, 1);
    }
}
@keyframes swing-in-top-fwd {
    0% {
        transform: rotateX(-100deg);
        transform-origin: top;
        opacity: 0;
    }
    100% {
        transform: rotateX(0deg);
        transform-origin: top;
        opacity: 1;
    }
}
@keyframes swing-out-top-bck {
    0% {
        transform: rotateX(0deg);
        transform-origin: top;
        opacity: 1;
    }
    100% {
        transform: rotateX(-100deg);
        transform-origin: top;
        opacity: 0;
    }
}
</style>
