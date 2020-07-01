<template>
    <div class="f-all100 editor-main">
        <Header @triggerfn="triggerFn"></Header>
        <div class="editor-page">
            <!--编辑器部分-->
            <section class="code-section" v-for="(item, index) in boxControl.codeList" :key="index" :style="{'width': `${boxControl.codeWidth[index]}%`}">
                <header :style="{'height': boxControl.codeList.length > 1 ? '24px' : '0'}">
                    {{ item.name }}
                    <i v-if="index !== 0" class="f-csp rt f-mr20 close-i" @click="removeEditor(index)"></i>
                </header>
                <div class="f-all100">
                    <editor class="f-all100 each-editor" :font-size="FONT_SIZE" :value="baseHtml" @changehtml="html => hotGet(item, html)" :theme="CHOOSE_EDITOR_THEME"></editor>
                    <section class="move-box" @mousedown="e => moveBegin(e, index)" @mouseup="moveOver">
                        <div class="f-all100 move-line">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#iconmove2" />
                            </svg>
                        </div>
                    </section>
                </div>
            </section>
            <!--iframe页面部分-->
            <section :style="{'width': `${boxControl.codeWidth[boxControl.codeList.length]}%`}">
                <iframe class="f-all100 rewrite-iframe" :class="`ace-${CHOOSE_EDITOR_THEME.replaceAll('_', '-')}`" :src="`http://localhost:9988/code/codeOnline/index.html?findId=${editorObj.id}`"></iframe>
                <div v-show="boxControl.moveCheck" class="f-all100 hide-window"></div>
            </section>
        </div>
        <!--头部新增组件弹窗-->
        <dia-back-value title="新增组件" ref="diaBack" width="500px">
            <mate-input :rules="HeadData.AddRules.name" v-model="HeadData.Addform.name" label="组件名称"></mate-input>
            <div class="foot-buttons f-mt20">
                <submit-button type="info" @click="diaBack.DiaBackApi.close">关闭</submit-button>
                <submit-button @click="diaBack.DiaBackApi.submit">确定</submit-button>
            </div>
        </dia-back-value>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref, reactive, onMounted, watchEffect, onBeforeUnmount, computed } from 'vue';
import RandomWord from '../../../utils/randomWord';
import Code from '../../../api/code';
import Editor from '@/components/Editor.vue';
import Header from './components/Header';
import MateInput from '../../../components/input/MateInput';
import DiaBackValue from '../../../components/popUps/DiaBackValue';
import SubmitButton from '../../../components/button/submitButton';

export default {
    components: {
        SubmitButton,
        DiaBackValue,
        MateInput,
        Header,
        Editor
    },
    setup() {
        const store = useStore();

        /** *************************************************************************************************/
        /** ***************************************键盘事件***************************************************/
        /** *************************************************************************************************/
        window._outObj_.buttonClick = buttonClick;

        onMounted(() => {
            // 添加键盘事件监听
            window.addEventListener('keydown', keyEvent);
        });

        onBeforeUnmount(() => {
            // 键盘事件监听删除
            window.removeEventListener('keydown', keyEvent);
        });

        // 重置保存事件
        function keyEvent(e) {
            if (e.keyCode === 83 && e.ctrlKey) {
                buttonClick();
                e.preventDefault();
            }
        }

        /** *************************************************************************************************/
        /** ***************************************初始模板***************************************************/
        /** *************************************************************************************************/
        const baseHtml = ref('');

        onMounted(async() => {
            baseHtml.value = (await Code.getTemplate())[0].html;
            setTimeout(() => {
                buttonClick();
            });
        });

        /** *************************************************************************************************/
        /** ***************************************热更新***************************************************/
        /** *************************************************************************************************/
        let timeOut;
        const HOT_HTML = computed(() => store.state.themes.HOT_HTML);

        function hotGet(item, html) {
            item.html = html;
            if (!HOT_HTML.value) return;
            if (timeOut) {
                clearTimeout(timeOut);
            }
            timeOut = setTimeout(() => {
                buttonClick();
                timeOut = null;
            }, 2000);
        }

        /** *************************************************************************************************/
        /** ***************************************代码控制(样式)***************************************************/
        /** *************************************************************************************************/
        const CHOOSE_EDITOR_THEME = computed(() => store.state.themes.CHOOSE_EDITOR_THEME);
        const FONT_SIZE = computed(() => store.state.themes.FONT_SIZE);

        // 编辑器操作对象
        const editorObj = reactive({
            sendHtml: '',
            id: ''
        });

        // 提交代码运行
        async function buttonClick() {
            const sendId = RandomWord.getSign();
            await Code.setHtml({
                findId: sendId,
                sendHtml: JSON.stringify(boxControl.codeList)
            });
            editorObj.id = sendId;
        }

        /** *************************************************************************************************/
        /** ***************************************布局控制***************************************************/
        /** *************************************************************************************************/

        onMounted(() => {
            // 布局控制监听添加
            window.addEventListener('mousemove', lineMove);
        });

        onBeforeUnmount(() => {
            // 布局控制监听移除
            window.removeEventListener('mousemove', lineMove);
        });

        // 布局控制参数
        const boxControl = reactive({
            codeWidth: [],
            moveCheck: false,
            codeList: [{
                name: 'index',
                disclose: true,
                html: ''
            }]
        });
        let movePoint = 0;
        let checkWidth;
        let moveLineNum = 0;

        // 计算codeWidth
        watchEffect(() => {
            boxControl.codeWidth = [];
            Array.from({ length: boxControl.codeList.length + 1 }).forEach((item, index) => {
                boxControl.codeWidth[index] = 100 / (boxControl.codeList.length + 1);
            });
        });

        // 移出当前编辑器
        function removeEditor(index) {
            boxControl.codeList.splice(index);
        }

        // 开始移动
        function moveBegin(e, index) {
            boxControl.moveCheck = true;
            movePoint = e.clientX;
            checkWidth = JSON.parse(JSON.stringify(boxControl.codeWidth));
            moveLineNum = index;
        }

        // 结束移动
        function moveOver() {
            boxControl.moveCheck = false;
        }

        // 移动操作
        function lineMove(e) {
            if (boxControl.moveCheck) {
                if (checkWidth[moveLineNum] - (movePoint - e.clientX) * 100 / document.body.clientWidth < 10 || checkWidth[moveLineNum + 1] + (movePoint - e.clientX) * 100 / document.body.clientWidth < 10) {
                    return;
                }
                boxControl.codeWidth[moveLineNum] = checkWidth[moveLineNum] - (movePoint - e.clientX) * 100 / document.body.clientWidth;
                boxControl.codeWidth[moveLineNum + 1] = checkWidth[moveLineNum + 1] + (movePoint - e.clientX) * 100 / document.body.clientWidth;
            }
        }

        /** *************************************************************************************************/
        /** ***************************************头部触发***************************************************/
        /** *************************************************************************************************/

        const HeadData = reactive({
            Addform: { name: '' },
            AddRules: { name: { validate: [{ validateName: 'required', trigger: ['input'] }, 'HtmlTag'], trigger: ['blur'] }}
        });
        const diaBack = ref(null);

        // 触发方法
        function triggerFn(name) {
            HeadFn[name]();
        }

        const HeadFn = {
            async addEditor() {
                try {
                    await diaBack.value.diaPromise();

                    // 判断重复
                    let check = false;
                    boxControl.codeList.forEach((item) => {
                        if (item.name === HeadData.Addform.name) {
                            check = true;
                        }
                    });
                    if (check) return;

                    boxControl.codeList.push({
                        name: HeadData.Addform.name
                    });
                } catch (e) {
                    console.log('%c刚刚关闭新增', `color: pink`);
                }
            },
            buttonClick
        };

        /** *************************************************************************************************/
        /** ***************************************返回对象***************************************************/
        /** *************************************************************************************************/
        return {
            baseHtml,
            CHOOSE_EDITOR_THEME,
            FONT_SIZE,
            hotGet,
            editorObj,
            boxControl,
            moveBegin,
            moveOver,
            removeEditor,
            HeadData,
            diaBack,
            triggerFn
        };
    }
};
</script>

<style scoped lang="less">
.editor-main{
    display: flex;
    flex-direction: column;
    .editor-page{
        flex: 1;
        display: flex;
        .code-section{
            display: flex;
            flex-direction: column;
            header{
                font-size: 14px;
                font-weight: bold;
                transition: height 0.3s;
                line-height: 22px;
                border: 1px solid;
                .mixin-font-color('onlinecode-head-color');
                .mixin-border-color('base-border-color');
                .mixin-background-color('base-backgroud-color');
                .mixin-boxshadow-color('onlinecode-head-boxshac', 0px 10px 10px 5px inset);
                i{
                    border-radius: 8px;
                    width: 16px;
                    height: 16px;
                    line-height: 16px;
                    margin-top: 3px;
                }
            }
        }
        .move-line{
            width: 6px;
            height: 100%;
            border-right: 1px solid ;
            border-left: 1px solid ;
            .mixin-border-color('onlinecode-moveline-borc');
            .mixin-background-color('onlinecode-moveline-bgc');
            cursor: col-resize;
            .icon{
                height: 100%;
                width: 4px;
            }
        }
        .move-box{
            position: absolute;
            right: 0;
            top: 0;
            height: 100%;
        }
        .each-editor{
            position: relative;
        }
        section{
            position: relative;
        }
        .hide-window{
            position: absolute;
            left: 0;
            top: 0;
        }
        .rewrite-iframe{
            border: none;
            &::selection {
                background: none;
            }
        }
    }
}
</style>
