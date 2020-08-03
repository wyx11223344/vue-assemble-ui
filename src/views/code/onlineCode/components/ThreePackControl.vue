<template>
    <section>
        <dia-log v-model="DiaShow" title="管理三方包" width="600px">
            <section class="dia-box-main" @click.stop>
                <section>
                    <label>新增三方包</label>
                    <div class="add-new-pack">
                        <mate-input v-model="baseObj.text" label="npm包名称"></mate-input>
                        <mate-input v-model="baseObj.text" label="在线地址"></mate-input>
                        <mate-input v-model="baseObj.text" label="注册代码"></mate-input>
                        <jelly-button>新增</jelly-button>
                    </div>
                </section>
                <section>
                    <label>选择已有三方包添加</label>
                    <div class="search-input">
                        <section>
                            <i class="iconfont iconsousuo"></i>
                            <input v-model="baseObj.searchInput" placeholder="请输入名称搜索三方包" />
                            <div class="search-list f-csp">
                                <ul>
                                    <li v-for="(item, index) in 5" :key="index" @click="changeChoose">vueCountUp</li>
                                </ul>
                            </div>
                        </section>
                    </div>
                </section>
                <section>
                    <label>正在使用的包</label>
                    <div class="using-pack">
                        <ul>
                            <li class="f-csp" v-for="(item, index) in 5" :key="index">
                                vueCountUp
                                <i class="close close-i"></i>
                            </li>
                        </ul>
                    </div>
                </section>
            </section>
        </dia-log>
    </section>
</template>

<script>
import DiaLog from '@/components/popUps/DiaLog';
import { ref, reactive } from 'vue';
import MateInput from '@/components/input/MateInput';
import JellyButton from '@/components/button/jellyButton';

export default {
    name: 'ThreePackControl',
    components: { JellyButton, MateInput, DiaLog },
    setup() {
        const DiaShow = ref(false);
        const baseObj = reactive({
            searchInput: '',
            nowPacks: [{
                name: 'vueCount',
                value: 1
            }],
            choosePack: ''
        });

        function changeShow() {
            DiaShow.value = !DiaShow.value;
        }

        function changeChoose() {
            console.log(baseObj.choosePack);
        }

        return {
            DiaShow,
            baseObj,
            changeShow,
            changeChoose
        };
    }
};
</script>

<style scoped lang="less">
.dia-box-main{
    display: flex;
    flex-direction: column;
    >section{
        display: flex;
        flex-direction: column;
        margin: 10px 0;
        border: 1px solid #f2f2f2;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        padding: 10px;
        >label{
            display: flex;
            align-items: center;
            flex-shrink: 0;
            width: 100%;
            border-bottom: 1px solid #f2f2f2;
            margin-bottom: 10px;
            line-height: 30px;
            font-weight: bold;
            font-size: 18px;
            font-family: 仿宋;
        }
        .add-new-pack{
            display: flex;
            flex-direction: column;
        }
        .search-input{
            position: relative;
            >section{
                display: flex;
                align-items: center;
                position: relative;
                width: 100%;
                height: 40px;
                border: 1px solid #f2f2f2;
                padding: 6px 15px;
                border-radius: 5px;
                input{
                    width: 100%;
                    height: 30px;
                    margin-left: 10px;
                    &:focus ~.search-list{
                        display: block;
                        animation: home-fade .6s cubic-bezier(.7,.3,.1,1) backwards;
                    }
                }
                .search-list{
                    display: none;
                    position: absolute;
                    left: 0;
                    top: 36px;
                    width: 100%;
                    border-radius: 0 0 5px 5px;
                    background-color: #fff;
                    border: 1px solid #f2f2f2;
                    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                    z-index: 1;
                    &:hover{
                        display: block;
                    }
                    li{
                        padding: 6px 15px;
                        &:hover{
                            background-color: #f6f6f6;
                        }
                    }
                }
            }
        }
        .using-pack{
            li{
                position: relative;
                display: inline-block;
                line-height: 30px;
                padding: 6px 15px;
                border: 1px solid #f2f2f2;
                border-radius: 5px;
                background-color: #fffdfd;
                margin: 0 5px 10px 5px;
                .close{
                    position: absolute;
                    right: -8px;
                    top: -8px;
                    width: 16px;
                    height: 16px;
                    border-radius: 8px;
                    opacity: 0;
                    transition: .3s;
                }
                &:hover{
                    .close{
                        opacity: 1;
                    }
                }
            }
        }
    }
}
</style>
