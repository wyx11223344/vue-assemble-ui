<template>
    <teleport to="#popUps">
        <transition name="slide-center">
            <div class="dia-main" v-show="modelValue" @click="close()">
                <transition name="slide-scale">
                    <div class="dialog-main" v-show="modelValue" :style="{'width': width, 'top': top}" @click.stop>
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
        top: {
            type: String,
            default: null
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
    overflow-y: auto;
    background-color: rgba(0, 0, 0, 0.1);
    .dialog-main{
        position: absolute;
        top: 15vh;
        left: 0;
        right: 0;
        margin: auto auto 100px auto;
        border-radius: 7px;
        overflow-x: hidden;
        background-color: #fff;
        header{
            height: 48px;
            padding: 0 20px;
            .header-main{
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 48px;
                border-bottom: 2px dashed #f2f2f2;
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
