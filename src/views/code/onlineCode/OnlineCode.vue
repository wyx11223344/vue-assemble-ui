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
                    <editor class="f-all100 each-editor" :value="baseHtml" @changehtml="e => item.html = e"></editor>
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
                <iframe class="f-all100 rewrite-iframe" :src="`http://localhost:9988/index.html?findId=${editorObj.id}`"></iframe>
                <div v-show="boxControl.moveCheck" class="f-all100 hide-window"></div>
            </section>
        </div>
        <dia-back-value title="新增组件" v-model:Fn="HeadData.backFn" width="500px">
            <template v-slot="scope">
                <mate-input :rules="{validate: [{validateName: 'aa' , message: '怎么肥四哦怎么肥四哦怎么肥四哦怎么肥四哦怎么肥四哦'},{validateName: 'aa' , message: '怎么肥四哦'},{validateName: 'aa' , message: '怎么肥四哦'}]}" v-model:inputObj="scope.form.name" v-model="HeadData.Addform.name" label="组件名称"></mate-input>
                <div class="foot-buttons f-mt20">
                    <submit-button type="info" @click="scope.api.close">关闭</submit-button>
                    <submit-button @click="scope.api.submit">确定</submit-button>
                </div>
            </template>
        </dia-back-value>
    </div>
</template>

<script>
import { ref, reactive, onMounted, watchEffect, onBeforeUnmount } from 'vue';
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

        /** *************************************************************************************************/
        /** ***************************************生命周期***************************************************/
        /** *************************************************************************************************/
        onMounted(() => {
            buttonClick();

            // 布局控制监听添加
            window.addEventListener('mousemove', lineMove);
            window.addEventListener('mouseup', moveOver);
        });

        onBeforeUnmount(() => {
            // 布局控制监听移除
            window.removeEventListener('mousemove', lineMove);
            window.removeEventListener('mouseup', moveOver);
        });

        /** *************************************************************************************************/
        /** ***************************************初始模板***************************************************/
        /** *************************************************************************************************/
        const baseHtml = ref('<template>\n' +
            '    <div class="ceshi" @click="ceshi()">\n' +
            '        123\n' +
            '    </div>\n' +
            '</template>\n' +
            '<script>\n' +
            '    export default {\n' +
            '        methods: {\n' +
            '            ceshi() {\n' +
            '                console.log(123);\n' +
            '            }\n' +
            '        }\n' +
            '    }\n' +
            '</scrip' +
            't>\n' +
            '<style>\n' +
            '    body{\n' +
            '        background-color: white;\n' +
            '        .ceshi{\n' +
            '            color: rgb(182, 194, 154);\n' +
            '        }\n' +
            '    }\n' +
            '</style>');

        /** *************************************************************************************************/
        /** ***************************************代码控制***************************************************/
        /** *************************************************************************************************/
        const editorObj = reactive({
            sendHtml: '',
            id: ''
        });

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
            backFn: null,
            Addform: { name: '' }
        });

        function triggerFn(name) {
            HeadFn[name]();
        }

        const HeadFn = {
            async addEditor() {
                try {
                    await HeadData.backFn();

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
            editorObj,
            boxControl,
            moveBegin,
            moveOver,
            removeEditor,
            HeadData,
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
