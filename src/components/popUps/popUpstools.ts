import { watchEffect } from 'vue';

interface ShowControlProps {
    value?: boolean;
    modelValue?: boolean;
    enter?: Function;
}

export default class PopUpstools {
    close: Function
    props: ShowControlProps
    emit: Function
    type?: boolean

    /**
     * 构造对象
     * @param {Proxy} props 传入传递参数
     * @param {Function} emit 触发方法
     * @param {Boolean} type 判断类型(传递true代表组件自己处理显示)
     */
    constructor(props: ShowControlProps, emit: Function, type?: boolean) {
        this.close = this.closeFn.bind(this);

        this.props = props;

        this.emit = emit;

        this.type = type;

        this.addBody();

        this.addListen();
    }

    /**
     * 添加监听
     * @returns {void}
     */
    addListen() {
        watchEffect(() => {
            if (this.props.modelValue) {
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
        watchEffect(() => {
            const check = this.type ? this.props.value : this.props.modelValue;
            if (check) {
                (document.getElementById('app') as Element).classList.add('show-blur');
            } else {
                (document.getElementById('app') as Element).classList.remove('show-blur');
            }
        });
    }

    /**
     * 关闭方法
     * @returns {void}
     */
    private closeFn(): void {
        if (this.type) {
            this.props.value = false;
            return;
        }
        this.emit('update:modelValue', false);
    }

    /**
     * 注册监听事件
     * @param {KeyboardEvent} e 键盘事件
     * @returns {void}
     */
    private keyup(e: KeyboardEvent): void {
        if (e.keyCode === 27) {
            close();
        } else if (e.keyCode === 13) {
            this.props.enter && this.props.enter();
        }
    }
}
