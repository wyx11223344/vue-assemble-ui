<template>
    <section>
        <dia-log v-model="DiaShow" title="管理三方包" width="600px" @close="reDealForm">
            <section class="dia-box-main" @click.stop>
                <section>
                    <label class="f-csp" @click="isShowAdd = !isShowAdd">新增三方包(点我展开)<i :class="{'icon-open': isShowAdd}" class="iconfont iconyoujiantou"></i></label>
                    <transition name="swing-top">
                        <div class="add-new-pack" v-show="isShowAdd">
                            <new-type-form ref="typeForm">
                                <mate-input v-model="newPackObj.Addform.name" :rules="newPackObj.AddRules.name" label="npm包名称"></mate-input>
                                <mate-input v-model="newPackObj.Addform.url" :rules="newPackObj.AddRules.url" label="cdn引入标签"></mate-input>
                                <mate-input v-model="newPackObj.Addform.code" label="注册代码"></mate-input>
                            </new-type-form>
                            <jelly-button @click="addNewPack">新增</jelly-button>
                        </div>
                    </transition>
                </section>
                <section>
                    <label>选择已有三方包添加</label>
                    <div class="search-input">
                        <section>
                            <i class="iconfont iconsousuo"></i>
                            <input v-model="baseObj.searchInput" placeholder="请输入名称搜索三方包" />
                            <transition name="slide-bottom">
                                <div class="search-list f-csp" v-show="baseObj.searchInput">
                                    <ul>
                                        <li v-for="item in baseObj.searchList.filter((each) => baseObj.nowPacks.findIndex((chosen) => chosen.id === each.id) === -1)" :key="item.id" @click="changeChoose(item)">{{ item.name }}</li>
                                    </ul>
                                    <ul v-show="baseObj.searchList.filter((each) => baseObj.nowPacks.findIndex((chosen) => chosen.id === each.id) === -1).length === 0">
                                        <li class="no-data">没有搜索到组件哦，请尝试手动添加</li>
                                    </ul>
                                </div>
                            </transition>
                        </section>
                    </div>
                </section>
                <section>
                    <label>正在使用的包</label>
                    <div class="using-pack">
                        <ul>
                            <li class="f-csp" v-for="(item, index) in baseObj.nowPacks" :key="item.id">
                                {{ item.name }}
                                <i class="close close-i" @click="baseObj.nowPacks.splice(index, 1)"></i>
                            </li>
                        </ul>
                        <span v-show="baseObj.nowPacks.length === 0">啊，一个三方包都没有</span>
                    </div>
                </section>
            </section>
        </dia-log>
        <!--消息提示-->
        <message-box ref="messageDia"></message-box>
    </section>
</template>

<script>
import DiaLog from '@/components/popUps/DiaLog';
import { ref, reactive, watch } from 'vue';
import MateInput from '@/components/input/MateInput';
import JellyButton from '@/components/button/jellyButton';
import ThreePacksApi from '@/api/threePacks';
import NewTypeForm from '@/components/form/newTypeForm';
import MessageBox from '@/components/popUps/MessageBox';

export default {
    name: 'ThreePackControl',
    components: { MessageBox, NewTypeForm, JellyButton, MateInput, DiaLog },
    props: {
        threePacks: {
            type: String,
            default: null
        }
    },
    setup(props, { emit }) {

        const messageDia = ref(null);

        /** *************************************************************************************************/
        /** ***************************************初始化控制***************************************************/
        /** *************************************************************************************************/
        let checkPropsChange = false;
        watch(props, () => {
            if (baseObj.nowPacks.reduce((all, item) => all ? `${all},${item.id}` : `${item.id}`, '') !== props.threePacks) {
                ThreePacksApi.getPacksByIds({
                    ids: props.threePacks
                }).then((response) => {
                    baseObj.nowPacks.splice(0);
                    baseObj.nowPacks.push(...response);
                    checkPropsChange = true;
                });
            }
        });

        /** *************************************************************************************************/
        /** ***************************************新增三方***************************************************/
        /** *************************************************************************************************/
        const typeForm = ref(null);
        const newPackObj = reactive({
            Addform: {
                name: '',
                url: '',
                code: ''
            },
            AddRules: {
                name: { validate: ['required'], trigger: ['blur'] },
                url: { validate: ['required'], trigger: ['blur'] }
            }
        });

        async function addNewPack() {
            const backList = await typeForm.value.TypeFormApi.validate();
            if (backList.length > 0) {
                messageDia.value.showMessage('error', '请检查填写信息有误');
                return;
            }

            const response = await ThreePacksApi.savePacks({
                id: '',
                name: newPackObj.Addform.name,
                version: '',
                url: newPackObj.Addform.url,
                code: newPackObj.Addform.code
            });

            if (response) {
                messageDia.value.showMessage('primary', '第三方包保存成功');
            } else {
                messageDia.value.showMessage('error', '第三方包失败，请重试');
            }
        }

        function reDealForm() {
            typeForm.value.TypeFormApi.resetForm();
        }

        /** *************************************************************************************************/
        /** ***************************************搜索控制***************************************************/
        /** *************************************************************************************************/
        const searchName = ref('');
        const baseObj = reactive({
            searchInput: searchName,
            searchList: [],
            nowPacks: []
        });

        let timeout;
        watch(searchName, () => {
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => {
                timeout = null;
                if (!searchName.value) return;
                ThreePacksApi.getPacks({
                    name: searchName.value
                }).then((response) => {
                    baseObj.searchList = response;
                });
            }, 500);
        });

        function changeChoose(item) {
            baseObj.nowPacks.push(item);
        }

        watch(baseObj.nowPacks, () => {
            if (checkPropsChange) {
                checkPropsChange = !checkPropsChange;
                return;
            }
            emit('valuechange', baseObj.nowPacks.reduce((all, item) => all ? `${all},${item.id}` : `${item.id}`, ''));
        });

        /** *************************************************************************************************/
        /** ***************************************显示控制***************************************************/
        /** *************************************************************************************************/
        const DiaShow = ref(false);
        const isShowAdd = ref(false);
        function changeShow() {
            DiaShow.value = !DiaShow.value;
        }

        return {
            messageDia,
            DiaShow,
            isShowAdd,
            newPackObj,
            typeForm,
            reDealForm,
            addNewPack,
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
			justify-content: space-between;
            flex-shrink: 0;
            width: 100%;
            border-bottom: 1px solid #f2f2f2;
            margin-bottom: 10px;
            line-height: 30px;
            font-weight: bold;
            font-size: 18px;
            font-family: 仿宋;
			padding: 0 20px;
			.iconfont{
				display: inline-block;
				transform: rotate(-90deg);
				transition: .3s;
			}
			.icon-open{
				transform: rotate(90deg);
			}
        }
		>div{
			padding: 6px 15px;
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
					padding: 20px 0;
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
					.no-data{
						cursor: not-allowed;
						&:hover{
							background-color: #fff;
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
