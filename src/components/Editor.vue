<template>
    <div class="editor" id="editor"></div>
</template>

<script>
import { onMounted } from 'vue';

export default {
    setup(props, { emit }) {
        let editor;

        onMounted(() => {
            editor = ace.edit('editor');
            editor.session.setMode('ace/mode/html'); // 设置语言
            editor.setTheme('ace/theme/tomorrow');// 设置主题
            editor.setOptions({
                enableBasicAutocompletion: true,
                enableSnippets: true,
                enableLiveAutocompletion: true// 设置自动提示
            });
            editor.on('change', () => {
                const content = editor.getValue();
                emit('changehtml', content);
            });
        });
    }
};
</script>

<style scoped>

</style>
