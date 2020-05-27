<template>
    <div class="editor-page">
        <editor class="editor" @changehtml="e => sendHtml = e"></editor>
        <button style="position: absolute;right: 0;top: 0" @click="buttonClick">提交</button>
        <iframe style="width: 100%; height: 100%" :src="`/index.html?findId=${id}`"></iframe>
    </div>
</template>

<script>
import { ref } from 'vue';
import RandomWord from '../../../utils/randomWord';
import Code from '../../../api/code';
import Editor from '@/components/Editor.vue';

export default {
    components: {
        editor: Editor
    },
    setup() {
        const sendHtml = ref('');
        const id = ref('');

        async function buttonClick() {
            const sendId = RandomWord.getSign();
            await Code.setHtml({
                findId: sendId,
                sendHtml: sendHtml.value
            });
            id.value = sendId;
        }

        return {
            sendHtml,
            id,
            buttonClick
        };
    }
};
</script>

<style scoped lang="less">
.editor-page{
    display: flex;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    .editor{
        width: 100%;
        height: 100%;
    }
}
</style>
