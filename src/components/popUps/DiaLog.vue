<template>
    <teleport to="#popUps">
        <transition name="slide-center">
            <div class="dia-main" v-show="modelValue" @click="close()">
                <transition name="slide-scale">
                    <div class="dialog-main" v-show="modelValue" :style="{'width': width}" @click.stop>
                        <header>
                            <div class="header-main">
                                <span>{{title}}</span>
                                <i class="close-i f-csp" @click="close()"></i>
                            </div>
                        </header>
                        <main>
                            <slot></slot>
                        </main>
                    </div>
                </transition>
            </div>
        </transition>
    </teleport>
</template>

<script>
import PopUpstools from './popUpstools';

export default {
    emits: {
        'update:modelValue': true,
        'close': true
    },
    props: {
        modelValue: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        },
        width: {
            type: String,
            default: '50%'
        },
        enter: {
            type: Function,
            default: null
        }
    },
    setup(props, { emit }) {

        /** *************************************************************************************************/
        /** ***************************************显示控制***************************************************/
        /** *************************************************************************************************/
        const { close } = new PopUpstools(props, emit);

        return {
            close
        };
    }
};
</script>
<style scoped lang="less">
.dia-main{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1001;
    .mixin-background-color('base-dialog-bgc');
    .dialog-main{
        position: absolute;
        top: 15vh;
        left: 0;
        right: 0;
        margin: auto;
        border-radius: 7px;
        .mixin-background-color('base-backgroud-color');
        header{
            height: 48px;
            padding: 0 20px;
            .header-main{
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 48px;
                border-bottom: 2px dashed;
                .mixin-border-color('base-border-color');
                span{
                    display: inline-block;
                    line-height: 48px;
                    font-size: 16px;
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
}
</style>
