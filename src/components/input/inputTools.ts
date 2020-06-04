import { watchEffect, reactive } from 'vue';

interface InputPorops {
	modelValue: string;
	inputObj: BindingObj;
}

interface BindingObj {
	value: string;
	rules: string[];
	validation(value: string, rules: string[]): void;
}

export default class InputTools {

    /**
	 * 对象绑定
	 * @param {InputPorops} props 传递props
	 * @param {Function} emit 回调方法
	 * @returns {BindingObj} 返回绑定对象
	 */
    static ObjBinding(props: InputPorops, emit: Function): BindingObj {
        const inputObject: BindingObj = reactive({
            value: '',
            rules: [],
            validation() {
                console.log(123);
            }
        });

        // v-model：obj值改变
        watchEffect(() => {
            inputObject.value = props.inputObj.value;
        });

        // v-model值改变
        watchEffect(() => {
            inputObject.value = props.modelValue;
        });

        // 改变v-model值
        watchEffect(() => {
            if (inputObject.value !== props.modelValue) {
                emit('update:modelValue', inputObject.value);
            }
        });

        watchEffect(() => {
            if (inputObject.value !== props.inputObj.value) {
                emit('update:inputObj', inputObject);
            }
        });

        return inputObject;
    }

}
