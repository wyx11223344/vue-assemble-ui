<template>
    <div class="f-all100 editor-main">
        <Header></Header>
        <div class="editor-page">
            <section v-for="(item, index) in 2" :key="index" :style="{'width': `${codeWidth[index]}%`}">
                <editor class="f-all100 each-editor" :value="baseHtml" @changehtml="e => editorObj.sendHtml = e"></editor>
                <section class="move-box" ref="moveLine" @mousedown="e => moveBegin(e, index)" @mouseup="moveOver">
                    <div class="f-all100 move-line">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#iconmove2" />
                        </svg>
                    </div>
                </section>
            </section>
            <section :style="{'width': `${codeWidth[2]}%`}">
                <iframe class="f-all100 rewrite-iframe" :src="`http://localhost:9988/index.html?findId=${editorObj.id}`"></iframe>
                <div v-show="moveCheck" class="f-all100 hide-window"></div>
            </section>
            <button style="position: absolute;right: 0;top: 0; z-index: 100" @click="buttonClick">提交</button>
        </div>
    </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
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
        /** ***************************************代码提交***************************************************/
        /** *************************************************************************************************/
        const editorObj = reactive({
            sendHtml: '',
            id: ''
        });

        async function buttonClick() {
            const sendId = RandomWord.getSign();
            await Code.setHtml({
                findId: sendId,
                sendHtml: editorObj.sendHtml
            });
            editorObj.id = sendId;
        }

        /** *************************************************************************************************/
        /** ***************************************布局控制***************************************************/
        /** *************************************************************************************************/
        const codeWidth = reactive([33.3, 33.3, 33.3]);
        const moveLine = ref(null);
        const moveCheck = ref(false);
        let movePoint = 0;
        let checkWidth;
        let moveLineNum = 0;

        function moveBegin(e, index) {
            moveCheck.value = true;
            movePoint = e.clientX;
            checkWidth = JSON.parse(JSON.stringify(codeWidth));
            moveLineNum = index;
        }

        function moveOver() {
            moveCheck.value = false;
        }

        window.addEventListener('mousemove', lineMove);
        window.addEventListener('mouseup', () => { moveCheck.value = false; });

        function lineMove(e) {
            if (moveCheck.value) {
                if (checkWidth[moveLineNum] - (movePoint - e.clientX) * 100 / document.body.clientWidth < 10 || checkWidth[moveLineNum + 1] + (movePoint - e.clientX) * 100 / document.body.clientWidth < 10) {
                    return;
                }
                codeWidth[moveLineNum] = checkWidth[moveLineNum] - (movePoint - e.clientX) * 100 / document.body.clientWidth;
                codeWidth[moveLineNum + 1] = checkWidth[moveLineNum + 1] + (movePoint - e.clientX) * 100 / document.body.clientWidth;
            }
        }

        /** *************************************************************************************************/
        /** ***************************************返回对象***************************************************/
        /** *************************************************************************************************/
        return {
            baseHtml,
            editorObj,
            codeWidth,
            buttonClick,
            moveLine,
            moveBegin,
            moveOver,
            moveCheck
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
