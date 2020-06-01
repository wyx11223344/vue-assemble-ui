<template>
    <div class="f-all100 editor-main">
        <Header @triggerfn="triggerFn"></Header>
        <div class="editor-page">
            <section class="code-section" v-for="(item, index) in boxControl.codeList" :key="index" :style="{'width': `${boxControl.codeWidth[index]}%`}">
                <header :style="{'height': boxControl.codeList.length > 1 ? '24px' : '0'}">
                    {{ item.name }}
                    <span v-if="index !== 0" class="rt f-csp" style="margin-right: 30px" @click="removeEditor(index)">x</span>
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
            <section :style="{'width': `${boxControl.codeWidth[boxControl.codeList.length]}%`}">
                <iframe class="f-all100 rewrite-iframe" :src="`http://localhost:9988/index.html?findId=${editorObj.id}`"></iframe>
                <div v-show="boxControl.moveCheck" class="f-all100 hide-window"></div>
            </section>
        </div>
    </div>
</template>

<script>
import { ref, reactive, onMounted, watchEffect, onBeforeUnmount } from 'vue';
import RandomWord from '../../../utils/randomWord';
import Code from '../../../api/code';
import Editor from '@/components/Editor.vue';
import Header from './components/Header';

export default {
    components: {
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

        function triggerFn(name) {
            HeadFn[name]();
        }

        const HeadFn = {
            addEditor() {
                boxControl.codeList.push({
                    name: 'index2'
                });
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
                color: #7f7f7f;
                line-height: 22px;
                border: 1px solid #efefef;
                box-shadow: #f3f1f1 0px 10px 10px 5px inset;
                transition: 0.3s;
            }
        }
        .move-line{
            width: 6px;
            height: 100%;
            border-right: 1px solid #d0d0d0;
            border-left: 1px solid #d0d0d0;
            background-color: #eaecef;
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
