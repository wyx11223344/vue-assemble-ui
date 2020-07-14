<template>
    <div class="f-all100 home-box">
        <section class="top-content">
            <p>个人制作的小网站，欢迎你的使用~</p>
            <span class="f-csp" :style="{opacity: selectObj.inputText.length > 0 ? 1 : 0}"><i class="iconfont iconidea_icon"></i>点我进行搜索{{ selectObj.inputText }}组件</span>
            <input class="top-select" v-model="selectObj.inputText" type="text" placeholder="快开始搜索你喜欢的组件吧！"/>
            <div class="show-logo"></div>
        </section>
        <main class="baseList">
            <div class="each-code-box" :class="{'swing-out-top-bck': showObj.showClose}" v-for="(item, index) in showObj.list" :key="index">
                <div class="show-box">
                    <!--                    <iframe class="f-all100 rewrite-iframe" :class="`ace-${CHOOSE_EDITOR_THEME.replace(/_/g, '-')}`" :src="`http://localhost:9988/code/codeOnline/index.html?findId=${a}`"></iframe>-->
                    <img :src="item.img" alt=""/>
                    <div class="cover-box f-csp"  @click="changeRouter(item.id)">
                        <div class="right-all-screen" @click.stop>
                            <span>
                                <svg>
                                    <use xlink:href="#iconfull-screen" fill="#fff"/>
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="show-message">
                    <p>
                        <span class="f-csp" @click="changeRouter(item.id)">{{ item.name }}</span>
                        <i @click="addCart(item)" class="iconfont icongouwuche1 rt f-csp" :class="{'jello-horizontal': item.cartMove, 'cart-choose': true}"></i>
                    </p>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import { computed, reactive } from 'vue';
import { useStore } from 'vuex';
import router from '@/router/index';

export default {
    name: 'Home',
    setup() {
        const showObj = reactive({
            showClose: false,
            list: [{
                name: 'jellyButton',
                id: '17',
                img: require('../../../assets/images/jellyButton.jpg')
            }, {
                name: 'submitButton',
                id: '18',
                img: require('../../../assets/images/submitButton.jpg')
            }, {
                name: 'baseSwitch',
                id: '19',
                img: require('../../../assets/images/baseSwitch.jpg')
            }]
        });

        const store = useStore();

        const CHOOSE_EDITOR_THEME = computed(() => store.state.themes.CHOOSE_EDITOR_THEME);

        /** *************************************************************************************************/
        /** ***************************************代码块控制***************************************************/
        /** *************************************************************************************************/

        function changeRouter(id) {
            const openUrl = router.resolve({ path: `/Code/index`, query: { id: id }});
            window.open(openUrl.href, '_blank');
        }

        function addCart(item) {
            if (!item.cartMove) {
                item.cartMove = true;
                setTimeout(() => {
                    item.cartMove = false;
                }, 900);
            }
        }

        /** *************************************************************************************************/
        /** ***************************************搜索控制***************************************************/
        /** *************************************************************************************************/
        const selectObj = reactive({
            inputText: ''
        });

        return {
            selectObj,
            showObj,
            CHOOSE_EDITOR_THEME,
            changeRouter,
            addCart
        };
    }
};
</script>

<style scoped lang="less">
.home-box{
    perspective: 1000px;
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
                margin: 0 10px;
            }
        }
        p{
            margin: 5px 0 60px 0;
            font-size: 14px;
            color: #fff;
            letter-spacing: 1px;
        }
        .show-logo{
            width: 200px;
            height: 200px;
            transition: 0.3s;
            background: url("../../../assets/images/top-logo.png") no-repeat;
            background-size: 100% 100%;
        }
        .top-select{
            display: inline-block;
            position: relative;
            text-align: center;
            width: 766px;
            margin: 40px auto 0;
            animation: home-fade .6s ease-in-out;
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
                opacity: 0;
            }
            20% {
                opacity: .1;
            }
            70% {
                opacity: .7;
            }
            100% {
                opacity: 1;
            }
        }
    }
    .baseList{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 0 20px;
        .loopBox(6);
        .loopBox(@count) when (@count >= 0) {
            .each-code-box:nth-child(@{count}) {
                animation-delay:0.6s + 0.1s * @count;
            }
            .loopBox(@count - 1);
        }
        .each-code-box{
            width: 370px;
            height: 270px;
            padding: 10px;
            margin-top: 60px;
            border-radius: 10px;
            background-color: #1f2229;
            animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
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
                .rewrite-iframe{
                    border: none;
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
            }
            .show-message{
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
        .swing-out-top-bck {
            animation: swing-out-top-bck 0.45s cubic-bezier(0.600, -0.280, 0.735, 0.045) both;
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
