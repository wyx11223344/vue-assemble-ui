<template>
    <section>
        <dia-log top="7vh" v-model="DiaShow" title="在线编辑" width="1200px">
            <online-code v-if="DiaShow" @getlist="getlist" class="online-dia-code" :isDia="true" :sendId="sendId"></online-code>
        </dia-log>
    </section>
</template>

<script>
import { ref } from 'vue';
import DiaLog from '../../../components/popUps/DiaLog';
import OnlineCode from '../../code/onlineCode/OnlineCode';
export default {
    name: 'DiaEditor',
    components: { OnlineCode, DiaLog },
    setup(props, { emit }) {
        const DiaShow = ref(false);
        const sendId = ref(null);

        function openDia(id) {
            DiaShow.value = true;
            sendId.value = id;
        }

        function getlist() {
            emit('getlist');
            DiaShow.value = false;
        }

        return {
            DiaShow,
            sendId,
            openDia,
            getlist
        };
    }
};
</script>

<style scoped lang="less">
.online-dia-code{
    height: 650px;
}
</style>
