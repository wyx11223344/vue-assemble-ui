<template>
    <div class="editor" ref="Editor" :style="{fontSize: `${fontSize}px`}"></div>
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
        },
        fontSize: {
            type: Number,
            default: 12
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

            const observer = new ResizeObserver(resize);
            observer.observe(Editor.value); // 观测DOM元素
        });

        function resize() {
            editor && editor.resize();
        }

        return {
            Editor,
            resize
        };
    }
};
</script>

<style scoped>

</style>
