<template>
    <div class="f-all100 home-box">
        <section></section>
        <main class="baseList">
            <div class="each-code-box f-csp" v-for="(item, index) in showObj.list" :key="index" @click="changeRouter(item.id)">
                <div class="show-box">
                    <!--                    <iframe class="f-all100 rewrite-iframe" :class="`ace-${CHOOSE_EDITOR_THEME.replace(/_/g, '-')}`" :src="`http://localhost:9988/code/codeOnline/index.html?findId=${a}`"></iframe>-->
                    <img :src="item.img" alt=""/>
                    <div class="cover-box"></div>
                </div>
                <div class="show-message">
                    <p>{{ item.name }}</p>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import { computed, reactive } from 'vue';
import { useStore } from 'vuex';
import router from '@/router/index';

export default {
    name: 'Home',
    setup() {
        const showObj = reactive({
            list: [{
                name: 'jellyButton',
                id: '17',
                img: require('../../../assets/images/jellyButton.jpg')
            }, {
                name: 'submitButton',
                id: '18',
                img: require('../../../assets/images/submitButton.jpg')
            }, {
                name: 'baseSwitch',
                id: '19',
                img: require('../../../assets/images/baseSwitch.jpg')
            }]
        });

        const store = useStore();

        const CHOOSE_EDITOR_THEME = computed(() => store.state.themes.CHOOSE_EDITOR_THEME);

        function changeRouter(id) {
            router.push({ path: `/Code/index`, query: { id: id }});
        }

        return {
            showObj,
            CHOOSE_EDITOR_THEME,
            changeRouter
        };
    }
};
</script>

<style scoped lang="less">
.home-box{
    height: 2000px;
    .baseList{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 0 20px;
        .each-code-box{
            width: 330px;
            height: 250px;
            padding: 10px;
            margin-top: 60px;
            border-radius: 10px;
            background-color: #1f2229;
            transition: .3s;
            &:hover{
                box-shadow: #717790 0 2px 5px 2px;
                transform: translateY(-10px);
            }
            .show-box{
                position: relative;
                width: 310px;
                height: 174px;
                border-radius: 10px;
                overflow: hidden;
                .rewrite-iframe{
                    border: none;
                    &::selection {
                        background: none;
                    }
                }
                img{
                    width: 100%;
                    height: 100%;
                }
                .cover-box{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                }
            }
            .show-message{
                line-height: 60px;
                font-size: 16px;
                font-weight: bold;
            }
        }
    }
}
</style>
