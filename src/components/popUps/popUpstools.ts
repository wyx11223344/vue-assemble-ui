import { watchEffect } from 'vue';

interface ShowControlProps {
	popUpsShow: boolean;
}

export default class PopUpstools {

    /**
     * 弹窗的显示控制逻辑
     * @param {Proxy} props 传入传递参数
     * @param {Function} emit 触发方法
     * @param {Boolean} type 判断类型(传递true代表组件自己处理显示)
     * @returns {Function} 返回关闭方法
     */
    static showControl(props: ShowControlProps | any, emit: Function, type?: boolean): Function {
        watchEffect(() => {
            const check = type ? props.value : props.modelValue;
            if (check) {
                (document.getElementById('app') as Element).classList.add('show-blur');
            } else {
                (document.getElementById('app') as Element).classList.remove('show-blur');
            }
        });

        // 关闭回调
        function close(): void {
            if (type) {
                props.value = false;
                return;
            }
            emit('update:modelValue', false);
        }

        return close;
    }
}
