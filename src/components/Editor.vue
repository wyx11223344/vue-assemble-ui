<template>
    <div class="editor" id="editor"></div>
</template>

<script>
import { onMounted } from 'vue';

export default {
    setup(props, { emit }) {
        let editor;
        const baseHtml = '<template>\n' +
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
            '        background-color: rgb(254, 67, 101);\n' +
            '        .ceshi{\n' +
            '            color: rgb(182, 194, 154);\n' +
            '        }\n' +
            '    }\n' +
            '</style>';

        onMounted(() => {
            editor = ace.edit('editor');
            editor.session.setMode('ace/mode/html'); // 设置语言
            editor.setTheme('ace/theme/tomorrow');// 设置主题
            editor.setOptions({
                enableBasicAutocompletion: true,
                enableSnippets: true,
                enableLiveAutocompletion: true// 设置自动提示
            });
            editor.setValue(baseHtml);
            emit('changehtml', baseHtml);
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
