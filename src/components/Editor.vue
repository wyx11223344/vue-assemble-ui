<template>
    <div class="editor" ref="Editor"></div>
</template>

<script>
import { onMounted, watchEffect, watch, ref, computed } from 'vue';

export default {
    props: {
        value: {
            type: String,
            default: ''
        },
        theme: {
            type: String,
            default: 'tomorrow'
        }
    },
    setup(props, { emit }) {
        const Editor = ref(null);
        let editor;

        onMounted(() => {
            editor = ace.edit(Editor.value);
            editor.session.setMode('ace/mode/html'); // 设置语言
            editor.setOptions({
                enableBasicAutocompletion: true,
                enableSnippets: true,
                enableLiveAutocompletion: true// 设置自动提示
            });

            // 主题设置
            watchEffect(() => {
                editor.setTheme(`ace/theme/${props.theme}`);
            });

            const getValue = computed(() => props.value);

            // 传递输入框字符
            watch(getValue, () => {
                editor.setValue(props.value);
                emit('changehtml', props.value);
            }, { immediate: true });

            editor.on('change', () => {
                const content = editor.getValue();
                emit('changehtml', content);
            });
        });

        return {
            Editor
        };
    }
};
</script>

<style scoped>

</style>
