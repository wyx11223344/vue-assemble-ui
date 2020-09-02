<template>
    <section>
        <div class="list-bg f-all100">
            <header></header>
            <section></section>
            <main></main>
        </div>
        <div class="list-box">
            <header>{{searchName ? `"${searchName}"` : ''}} <span class="num">{{ showObj.total }}</span> <span class="symbol">Components</span></header>
            <section>
                <base-select class="type-choose" :options="selectObj.classifyList" v-model="selectObj.chooseClassify" @change="() => {if ( showObj.page === 1 ) {getAllComponentsWithHtml()} else {showObj.page = 1}}"></base-select>
                <div class="find-box">
                    <label>
                        <input v-model="searchName" />
                    </label>
                    <i class="iconfont iconsousuo"></i>
                </div>
            </section>
            <main>
                <div class="each-code-box" :class="{'swing-out-top-bck': showObj.showClose, 'swing-in-top-fwd': !showObj.showClose}" v-for="(item, index) in showObj.list" :key="index">
                    <div class="show-box code-open-iframe">
                        <iframe class="f-all100 rewrite-iframe" :src="`http://localhost:9988/code/codeOnline/index.html?findId=${item.htmlId}`"></iframe>
                        <div class="right-all-screen f-csp" @click.stop="showDiaEditor(item)">
                            <span>
                                <svg>
                                    <use xlink:href="#iconfull-screen" fill="#fff"/>
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div class="show-message">
                        <ul>
                            <li @click="changeRouter(item.id)" class="f-csp"><span>组件名：</span>{{ item.name }}</li>
                            <li><span>类&nbsp;&nbsp;&nbsp;&nbsp;型：</span>{{ selectObj.classifyList.find(type => type.value === item.classify).name }}</li>
                            <li><span>作&nbsp;&nbsp;&nbsp;&nbsp;者：</span>{{ item.showname }}</li>
                        </ul>
                        <section>
                            <i @click="addCart(item)" class="iconfont icongouwuche1 rt f-csp" :class="{'jello-horizontal': item.cartMove, 'cart-choose': cartList.findIndex(choose => item.id === choose.id) !== -1}"></i>
                        </section>
                    </div>
                </div>
                <base-pagination class="page-site" v-model:pageNum="showObj.page" v-model:page-size="showObj.pageSize" :total="showObj.total" @change="getAllComponentsWithHtml"></base-pagination>
            </main>
        </div>
        <div class="left-float-box">
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
        <dia-editor ref="diaEditorRef" @getlist="getAllComponentsWithHtml"></dia-editor>
    </section>
</template>

<script>
import { reactive, computed, ref, onMounted, watch } from 'vue';
import $message from '@/components/popUps/messageBox/index';
import { useStore } from 'vuex';
import router from '@/router/index';
import Show from '../../../api/Show';
import BaseSelect from '../../../components/select/BaseSelect';
import BasePagination from '../../../components/pagination/BasePagination';
import DiaEditor from './DiaEditor';

export default {
    name: 'List',
    components: { DiaEditor, BasePagination, BaseSelect },
    props: {
        scrollTop: {
            type: Number,
            default: null
        }
    },
    setup(props, { emit }) {
        const store = useStore();
        const cartList = computed(() => store.state.cart.cartList);
        const diaEditorRef = ref(null);

        /** *************************************************************************************************/
        /** ***************************************显示判断***************************************************/
        /** *************************************************************************************************/
        let timeout = null;
        const searchName = ref(router.currentRoute.value.query.name);

        watch(searchName, () => {
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => {
                timeout = null;
                showObj.page = 1;
                router.push({ path: '/Show/list', query: { name: searchName.value }});
                getAllComponentsWithHtml();
            }, 500);
        });

        /** *************************************************************************************************/
        /** ***************************************列表功能***************************************************/
        /** *************************************************************************************************/

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
                $message.showMessage('error', '请不要频繁操作哦');
            }
        }

        // 弹窗管理代码（重要！）
        function showDiaEditor(item) {
            diaEditorRef.value.openDia(item.id);
        }

        /** *************************************************************************************************/
        /** ***************************************列表展示***************************************************/
        /** *************************************************************************************************/
        const showObj = reactive({
            list: [],
            page: 1,
            pageSize: 12,
            total: 0,
            showClose: null
        });

        // 获取基础数据
        function getAllComponentsWithHtml() {
            Show.getAllComponentsWithHtml({
                classify: selectObj.chooseClassify,
                page: showObj.page,
                pageSize: showObj.pageSize,
                name: searchName.value
            }).then((response) => {
                showObj.showClose = true;
                setTimeout(() => {
                    showObj.list = response.list;
                    showObj.total = response.total;
                    showObj.showClose = false;
                }, 1200);
            });
        }

        onMounted(getAllComponentsWithHtml);

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
            selectObj.classifyList.unshift({ value: null, name: '所有类型' });
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
            diaEditorRef,
            showObj,
            cartList,
            searchName,
            selectObj,
            openCartDia,
            addCart,
            backToTop,
            changeRouter,
            getAllComponentsWithHtml,
            showDiaEditor
        };
    }
};
</script>

<style scoped lang="less">
.list-box{
    height: 1120px;
    header{
        display: flex;
        align-items: flex-end;
        height: 70px;
        font-size: 22px;
        color: #fff;
        padding: 10px 20px;
        animation: home-fade .6s cubic-bezier(.7,.3,.1,1) backwards;
        .num{
            font-size: 20px;
            color: red;
            margin-left: 10px;
        }
        .symbol{
            font-size: 12px;
            color: #fff;
            margin-left: 10px;
        }
    }
    >section{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        height: 80px;
        animation: home-fade .6s cubic-bezier(.7,.3,.1,1) 0.1s backwards;
        .type-choose{

        }
        .find-box{
            position: relative;
            width: 50px;
            height: 50px;
            border-radius: 25px;
            background-color: red;
            overflow: hidden;
            transition: .3s;
            .iconfont{
                position: absolute;
                right: 12px;
                color: white;
                font-size: 24px;
                line-height: 50px;
                cursor: pointer;
            }
            &:hover{
                width: 200px;
            }
            input{
                position: absolute;
                right: 50px;
                top: 5px;
                width: 130px;
                height: 40px;
                color: white;
            }
        }
    }
    main{
        position: relative;
        height: 970px;
        padding: 30px 0;
        animation: home-fade .6s cubic-bezier(.7,.3,.1,1) 0.2s backwards;
        perspective: 1000px;
        .loopBox(12);
        .loopBox(@count) when (@count >= 0) {
            .each-code-box:nth-child(@{count}) {
                animation-delay: 0.05s * @count;
            }
            .loopBox(@count - 1);
        }
        .each-code-box{
            float: left;
            width: 280px;
            height: 260px;
            margin: 10px;
            padding: 10px;
            border-radius: 10px;
            background-color: #f0f0f0;
            transition: .3s;
            .show-box {
                position: relative;
                border-radius: 10px;
                overflow: hidden;
                transition: .3s cubic-bezier(.7, .3, .1, 1);
                .rewrite-iframe {
                    width: 100%;
                    height: 100%;
                    border: 1px solid #d9ddea;
                    border-radius: 10px;
                    background-color: #fff;
                    transition: 1.5s;

                    &::selection {
                        background: none;
                    }
                }
                .right-all-screen{
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 100px;
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
                        width: 25px;
                        height: 25px;
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
                            width: 17px;
                            height: 17px;
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
            .show-message{
                display: flex;
                ul{
                    width: 200px;
                    padding: 0 10px;
                    li{
                        line-height: 30px;
                        font-size: 14px;
                        text-align: left;
                        color: #717171;
                        span{
                            font-weight: bold;
                        }
                    }
                }
                section{
                    display: flex;
                    align-items: flex-end;
                    width: 80px;
                    justify-content: flex-end;
                    padding: 10px;
                    .iconfont{
                        color: #717171;
                        font-size: 22px;
                    }
                    .cart-choose{
                        color: #ff369d;
                    }
                }
            }
        }
        .page-site{
            position: absolute;
            bottom: 30px;
            right: 0;
            width: 100%;
            padding: 0 20px;
            text-align: right;
        }
    }
}
.list-bg{
    position: absolute;
    left: 0;
    top: 0;
    height: 1120px;
    z-index: -1;
    header{
        height: 70px;
        animation: home-fade .6s cubic-bezier(.7,.3,.1,1) backwards;
    }
    section{
        height: 80px;
        background-color: #f0f0f0;
        animation: home-fade .6s cubic-bezier(.7,.3,.1,1) 0.1s backwards;
    }
    main{
        height: 970px;
        background-color: #fcfcfc;
        animation: home-fade .6s cubic-bezier(.7,.3,.1,1) 0.2s backwards;
    }
}
.left-float-box{
    position: fixed;
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
@media screen and (max-width: 1425px) {
    .left-float-box {
        right: 20px;
    }
}
</style>
