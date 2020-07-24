<template>
    <section>
        <div class="npm-main-box">
            <section>
                <div class="find-box">
                    <label>
                        <input v-model="searchName" @keydown.enter="goSelect()" />
                    </label>
                    <i class="iconfont iconsousuo" @click="goSelect()"></i>
                </div>
                <div class="new-npm-box f-csp" v-title="'新增npm包'" @click="createNewNpm">
                    <i class="iconfont iconxinzengchanpin"></i>
                </div>
                <div v-if="npmObject.list[npmObject.chooseIndex] && npmObject.list[npmObject.chooseIndex].version === ''" class="delete-npm-box f-csp" v-title="'删除npm包'" @click="deleteNpm">
                    <i class="iconfont iconshanchu"></i>
                </div>
                <div class="release-npm-box f-csp" v-title="'发布npm包'" @click="releaseNpm">
                    <i class="iconfont iconfabu"></i>
                </div>
            </section>
            <section>
                <div class="left-list">
                    <ul>
                        <li><i class="iconfont iconRectangleCopy"></i>现有的npm项目</li>
                        <li v-for="(item, index) in npmObject.list" :key="item.id" @click="changeChooseNpm(item, index)">
                            {{ item.name }}
                        </li>
                    </ul>
                    <span class="move-line" :style="{top: `${35 * (npmObject.chooseIndex + 1) + 47.5}px`}"></span>
                </div>
                <div class="right-box">
                    <header>
                        <section>
                            <span class="head">项目名称：</span>
                            <span>{{ npmObject.list[npmObject.chooseIndex] ? npmObject.list[npmObject.chooseIndex].name : '' }}</span>
                        </section>
                        <section>
                            <span class="head">已发布版本：</span>
                            <span>{{ npmObject.list[npmObject.chooseIndex] ? npmObject.list[npmObject.chooseIndex].version || '暂未发布' : '' }}</span>
                        </section>
                        <p>安装npm语句：npm install @wyx962717593/{{ npmObject.list[npmObject.chooseIndex] ? npmObject.list[npmObject.chooseIndex].name : '' }} --save-dev</p>
                    </header>
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
                                </ul>
                                <section>
                                    <i @click="addCart(item)" class="iconfont icongouwuche1 rt f-csp" :class="{'jello-horizontal': item.cartMove, 'cart-choose': cartList.findIndex(choose => item.id === choose.id) !== -1}"></i>
                                    <i @click="deleteComponents(index)" class="iconfont iconshanchu rt f-csp"></i>
                                </section>
                            </div>
                        </div>
                        <div class="no-list" v-show="showObj.list.length === 0">
                            <p>没有组件哦，快去添加一个吧</p>
                        </div>
                    </main>
                </div>
            </section>
        </div>
        <div class="npm-bgc f-all100">
            <!--            <div class="left-bg"></div>-->
            <!--            <div class="right-bg"></div>-->
        </div>
        <dia-editor ref="diaEditorRef" @getlist="getNpmAllComponents"></dia-editor>
        <message-box ref="messageDia"></message-box>
        <!--发布npm包-->
        <dia-back-value width="400px" title="请输入组件信息" ref="addPublishNpmRef">
            <section v-if="addPublishNpmRef">
                <mate-input :rules="npmObj.AddRules.version" v-model="npmObj.Addform.version" label="发布版本"></mate-input>
                <div class="foot-buttons f-mt15">
                    <submit-button type="info" @click="addPublishNpmRef.DiaBackApi.close">关闭</submit-button>
                    <submit-button @click="addPublishNpmRef.DiaBackApi.submit">确定</submit-button>
                </div>
            </section>
        </dia-back-value>
        <!--新增npm包-->
        <dia-back-value width="400px" title="请输入组件信息" ref="createNewNpmRef">
            <section v-if="createNewNpmRef">
                <mate-input :rules="npmObj.AddRules.name" v-model="npmObj.Addform.name" label="npm包名称"></mate-input>
                <div class="foot-buttons f-mt15">
                    <submit-button type="info" @click="createNewNpmRef.DiaBackApi.close">关闭</submit-button>
                    <submit-button @click="createNewNpmRef.DiaBackApi.submit">确定</submit-button>
                </div>
            </section>
        </dia-back-value>
        <!--确认弹窗-->
        <dia-back-value width="400px" :title="checkTitle" ref="checkCloseBack">
            <section v-if="checkCloseBack">
                <div class="foot-buttons f-mt15">
                    <submit-button type="info" @click="checkCloseBack.DiaBackApi.close">关闭</submit-button>
                    <submit-button @click="checkCloseBack.DiaBackApi.submit">确定</submit-button>
                </div>
            </section>
        </dia-back-value>
    </section>
</template>

<script>
import Npm from '../../../api/Npm';
import { reactive, ref, computed } from 'vue';
import DiaEditor from '../list/DiaEditor';
import router from '@/router/index';
import Show from '../../../api/Show';
import { useStore } from 'vuex';
import MessageBox from '../../../components/popUps/MessageBox';
import DiaBackValue from '../../../components/popUps/DiaBackValue';
import SubmitButton from '../../../components/button/submitButton';
import MateInput from '../../../components/input/MateInput';

export default {
    name: 'Npm',
    components: { MateInput, SubmitButton, DiaBackValue, MessageBox, DiaEditor },
    setup() {
        const diaEditorRef = ref(null);
        const messageDia = ref(null);
        const checkCloseBack = ref(null);
        const createNewNpmRef = ref(null);
        const addPublishNpmRef = ref(null);
        const store = useStore();
        const cartList = computed(() => store.state.cart.cartList);
        const checkTitle = ref('');

        /** *************************************************************************************************/
        /** ***************************************头部按钮***************************************************/
        /** *************************************************************************************************/
        const searchName = ref('');
        const npmObj = reactive({
            AddRules: {
                name: { validate: [{ validateName: 'required', trigger: ['input'] }, 'NpmName'], trigger: ['blur'] },
                version: { validate: ['required'], trigger: ['blur'] }
            },
            Addform: {
                name: '',
                version: ''
            }
        });

        function goSelect() {
            const openUrl = router.resolve({ path: '/Show/list', query: { name: searchName.value }});
            window.open(openUrl.href, '_blank');
        }

        async function createNewNpm() {
            try {
                await createNewNpmRef.value.diaPromise();

                await Npm.setNpm({
                    name: npmObj.Addform.name
                });

                messageDia.value.showMessage('primary', '新建npm包成功');

                getNpm();
            } catch (e) {
                console.log(e);
            }
        }

        async function deleteNpm() {
            try {
                checkTitle.value = '警告！这步操作将删除并清除线上npm包！';
                await checkCloseBack.value.diaPromise();

                Npm.delectNpmById({
                    id: npmObject.list[npmObject.chooseIndex].id
                }).then((response) => {
                    if (response) {
                        getNpm();
                        messageDia.value.showMessage('primary', 'npm包删除成功');
                    } else messageDia.value.showMessage('error', '删除失败请重试');
                });
            } catch (e) {
                console.log(e);
            }
        }

        async function releaseNpm() {
            if (showObj.list.length === 0) {
                messageDia.value.showMessage('error', '请先添加一个组件');
                return;
            }

            try {
                await addPublishNpmRef.value.diaPromise();

                const response = await Npm.addNpmPublish({
                    id: npmObject.list[npmObject.chooseIndex].id,
                    version: npmObj.Addform.version
                });

                if (response.codes === 200) {
                    messageDia.value.showMessage('primary', 'npm包已在发布中，请稍后查看');
                } else {
                    messageDia.value.showMessage('error', '发布失败，请检查发布版本信息是否大于当前');
                }
            } catch (e) {
                console.log(e);
            }

        }

        /** *************************************************************************************************/
        /** ***************************************左侧列表***************************************************/
        /** *************************************************************************************************/
        const npmObject = reactive({
            list: [],
            chooseIndex: 0
        });

        function getNpm() {
            Npm.getAllNpm().then((response) => {
                npmObject.list = response;
                npmObject.chooseIndex = 0;
                getNpmAllComponents();
            });
        }

        getNpm();

        /** *************************************************************************************************/
        /** ***************************************右侧详情***************************************************/
        /** *************************************************************************************************/

        const showObj = reactive({
            list: [],
            showClose: null
        });

        const selectObj = reactive({
            classifyList: []
        });

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

        // 获取类别
        Show.getAllClassify().then((response) => {
            selectObj.classifyList = response.map((item) => ({
                value: item.id,
                name: item.name
            }));
            selectObj.classifyList.unshift({ value: null, name: '所有类型' });
        });

        function getNpmAllComponents() {
            Show.getComponentsByIds({
                ids: npmObject.list[npmObject.chooseIndex].componentsIds
            }).then((response) => {
                showObj.showClose = true;
                setTimeout(() => {
                    showObj.list = response;
                    showObj.showClose = false;
                }, 1200);
            });
        }

        function changeChooseNpm(item, index) {
            if (npmObject.chooseIndex === index) return;
            npmObject.chooseIndex = index;
            getNpmAllComponents();
        }

        // 弹窗管理代码（重要！）
        function showDiaEditor(item) {
            diaEditorRef.value.openDia(item.id);
        }

        function changeRouter(id) {
            const openUrl = router.resolve({ path: `/Code/index`, query: { id: id }});
            window.open(openUrl.href, '_blank');
        }

        async function deleteComponents(index) {
            try {
                checkTitle.value = '是否确定删除该组件！';
                await checkCloseBack.value.diaPromise();

                showObj.list.splice(index, 1);

                await Npm.setNpm({
                    id: npmObject.list[npmObject.chooseIndex].id,
                    componentsId: showObj.list.map((item) => item.id).toString()
                });

                getNpm();

                messageDia.value.showMessage('primary', '组件删除成功');
            } catch (e) {
                console.log(e);
            }
        }

        return {
            showDiaEditor,
            diaEditorRef,
            messageDia,
            createNewNpmRef,
            addPublishNpmRef,
            createNewNpm,
            checkCloseBack,
            checkTitle,
            npmObject,
            npmObj,
            showObj,
            searchName,
            selectObj,
            changeChooseNpm,
            changeRouter,
            getNpmAllComponents,
            cartList,
            addCart,
            deleteComponents,
            goSelect,
            deleteNpm,
            releaseNpm
        };
    }
};
</script>

<style scoped lang="less">
.npm-main-box{
    animation: home-fade .6s cubic-bezier(.7,.3,.1,1) backwards;
    >section:nth-child(1) {
        display: flex;
        justify-content: flex-end;
        height: 50px;
        >div{
            transform: translateY(25px);
            width: 50px;
            height: 50px;
            margin-left: 20px;
            border-radius: 25px;
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
        }
        .release-npm-box{
            background-color: rgb(229, 131, 8);
        }
        .new-npm-box{
            background-color: #9266f9;
        }
        .delete-npm-box{
            background-color: #16c2c2;
        }
        .find-box{
            background-color: red;
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
    >section:nth-child(2){
        display: flex;
        min-height: calc(100vh - 185px);
        padding: 0 40px;
        .left-list{
            position: relative;
            flex-shrink: 0;
            max-height: 100%;
            width: 150px;
            border-right: 1px solid #f2f2f2;
            .move-line{
                display: inline-block;
                position: absolute;
                left: 15px;
                width: 4px;
                height: 20px;
                background-color: #ff7575;
                transition: .3s;
            }
            ul{
                position: relative;
                margin-top: 40px;
                li:nth-child(1) {
                    font-size: 14px;
                    font-weight: bold;
                    padding-left: 0;
                    width: 140px;
                    cursor: default;
                    i{
                        display: inline-block;
                        width: 30px;
                    }
                }
                li{
                    font-size: 14px;
                    height: 35px;
                    line-height: 35px;
                    width: 110px;
                    color: #999;
                    cursor: pointer;
                    padding-left: 30px;
                    text-align: left;
                }
            }
        }
        .right-box{
            width: 970px;
            padding: 20px;
            header{
                display: flex;
                flex-wrap: wrap;
                color: #999;
                font-size: 16px;
                section{
                    .head{
                        font-weight: bold;
                        margin-left: 30px;
                    }
                }
                p{
                    width: 100%;
                    margin-top: 20px;
                    padding-left: 30px;
                    text-align: left;
                }
            }
            main{
                position: relative;
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
                    height: 230px;
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
                            .iconfont:nth-child(2) {
                                font-size: 20px;
                                margin-left: 15px;
                            }
                        }
                    }
                }
                .no-list{
                    position: relative;
                    height: 550px;
                    background: url("../../../assets/images/no-cart.png") no-repeat 50% 50%;
                    background-size: 200px 200px;
                    p{
                        position: absolute;
                        bottom: 120px;
                        width: 100%;
                        text-align: center;
                        font-size: 22px;
                        font-weight: bold;
                        color: #999;
                    }
                }
            }
        }
    }
}
.npm-bgc{
    position: absolute;
    left: 0;
    top: 50px;
    height: calc(100% - 50px);
    animation: home-fade .6s cubic-bezier(.7,.3,.1,1) backwards;
    z-index: -1;
    background-color: #fff;
    /*.left-bg{*/
    /*    position: absolute;*/
    /*    left: 0;*/
    /*    width: calc(50% - 410px);*/
    /*    height: 100%;*/
    /*    background-color: #f2f2f2;*/
    /*}*/
    /*.right-bg{*/
    /*    position: absolute;*/
    /*    right: 0;*/
    /*    width: calc(50% + 410px);*/
    /*    height: 100%;*/
    /*    background-color: #fff;*/
    /*}*/
}
</style>
