import { watchEffect, computed, watch } from 'vue';
import store from '@/store/index';

interface ShowControlProps {
    value?: boolean;
    modelValue?: boolean;
    enter?: Function;
}

interface PopOptions {
    noBlur?: boolean;
    CloseFn?: Function;
}

export default class PopUpstools {
    close: Function
    props: ShowControlProps
    emit: Function
    type?: boolean
    option?: PopOptions

    /**
     * 构造对象
     * @param {Proxy} props 传入传递参数
     * @param {Function} emit 触发方法
     * @param {Boolean} type 判断类型(传递true代表组件自己处理显示)
     * @param {PopOptions} option 传入其他配置类型
     */
    constructor(props: ShowControlProps, emit: Function, type?: boolean, option?: PopOptions) {
        this.close = this.closeFn.bind(this);

        this.props = props;

        this.emit = emit;

        this.type = type;

        this.option = option;

        if (!option || !option.noBlur) {
            this.addBody();
        }

        this.addListen();
    }

    /**
     * 添加监听
     * @returns {void}
     */
    addListen() {
        watchEffect(() => {
            if (this.props.modelValue || this.props.value) {
                document.addEventListener('keyup', this.keyup.bind(this));
            } else {
                document.removeEventListener('keyup', this.keyup.bind(this));
            }
        });
    }

    /**
     * 弹窗填入body逻辑
     * @returns {void}
     */
    private addBody(): void {
        const diaNum = computed(() => (store as any).state.baseCom.diaNum);
        const watchObj = computed(() => this.type ? this.props.value : this.props.modelValue);
        watch(watchObj, () => {
            if (watchObj.value) {
                store.commit('addDiaNum');
                if (diaNum.value === 1) (document.getElementById('app') as Element).classList.add('show-blur');
            } else {
                store.commit('lowDiaNum');
                if (diaNum.value === 0) (document.getElementById('app') as Element).classList.remove('show-blur');
            }
        });
    }

    /**
     * 关闭方法
     * @returns {void}
     */
    private closeFn(): void {
        this.option && this.option.CloseFn && this.option.CloseFn();
        if (this.type) {
            this.props.value = false;
            return;
        }
        this.emit('close');
        this.emit('update:modelValue', false);
    }

    /**
     * 注册监听事件
     * @param {KeyboardEvent} e 键盘事件
     * @returns {void}
     */
    private keyup(e: KeyboardEvent): void {
        if (e.keyCode === 27) {
            this.close();
        } else if (e.keyCode === 13) {
            this.props.enter && this.props.enter();
        }
    }
}
