<template>
    <teleport to="#popUps">
        <transition name="slide-bottom">
            <div class="dialog-main" v-show="popUpsShow" :class="showTheme" :style="{'width': width}" @click.stop>
                <header>
                    <div class="header-main">
                        <span>消息提示</span>
                        <i class="close-i f-csp" @click="close()"></i>
                    </div>
                </header>
                <main>
                    <slot>
                        <p>{{ Message }}</p>
                    </slot>
                </main>
            </div>
        </transition>
    </teleport>
</template>

<script>
import { ref } from 'vue';
import PopUpstools from './popUpstools';

export default {
    name: 'MessageBox',
    emits: {
        'update:modelValue': true,
        'close': true
    },
    props: {
        width: {
            type: String,
            default: '250px'
        }
    },
    setup(props, { emit }) {

        /** *************************************************************************************************/
        /** ***************************************显示控制***************************************************/
        /** *************************************************************************************************/
        const popUpsShow = ref(false);
        const { close } = new PopUpstools(popUpsShow, emit, true, { noBlur: true });
        const showTheme = ref('');
        const Message = ref('');

        function showMessage(type, meesage) {
            showTheme.value = type || 'info';
            Message.value = meesage;
            popUpsShow.value = true;
            setTimeout(() => {
                close();
            }, 3000);
        }

        return {
            showMessage,
            showTheme,
            Message,
            popUpsShow,
            close
        };
    }
};
</script>

<style scoped lang="less">
.dialog-main{
    position: fixed;
    right: 0;
    bottom: 0;
    margin: auto;
    border-radius: 7px;
    z-index: 1001;
    .mixin-font-color('base-backgroud-color');
    header{
        height: 28px;
        padding: 0 20px;
        .header-main{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 28px;
            span{
                display: inline-block;
                line-height: 28px;
                font-size: 14px;
                font-weight: bold;
            }
            i{
                border-radius: 9px;
                width: 18px;
                height: 18px;
                line-height: 18px;
            }
        }
    }
    main{
        padding: 20px;
    }
}
.info{
    .mixin-background-color('base-button-info-color');
}
.primary{
    .mixin-background-color('base-symbol-color');
}
.error{
    .mixin-background-color('base-out-button');
}
</style>
