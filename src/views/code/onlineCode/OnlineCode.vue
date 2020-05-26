<template>
    <div>
        <label>
            <textarea v-model="sendHtml" style="width: 300px; height: 300px"></textarea>
        </label>
        <button @click="buttonClick">提交</button>
        <iframe :src="`http://localhost:9988/index.html?findId=${id}`"></iframe>
    </div>
</template>

<script>
import { ref } from 'vue';
import RandomWord from '../../../utils/randomWord';
import Code from '../../../api/code';

export default {
    setup() {
        const sendHtml = ref('');
        const id = ref('');

        async function buttonClick() {
            const sendId = RandomWord.getSign();
            await Code.setHtml({
                findId: sendId,
                sendHtml: this.sendHtml
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

<style scoped>

</style>
