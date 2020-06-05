import { reactive, ref } from 'vue';
import { ValidaRule } from '@/types/validation';
import ValidateDec from '@/decorators/validateDec';

interface InputPorops {
	modelValue: string;
	inputObj: InputTools;
    rules?: ValidaRule;
}

interface BindingObj {
	value: any;
	rules?: ValidaRule;
    check: boolean;
    errorMsg: string;
	validation?: Function;
}

export default class InputTools {
    value: any
    inputObject: BindingObj

    @ValidateDec.validationFn
    static validation: Function

    /**
     * 构造函数
     * @param {InputPorops} props 传入传递对象
     * @param {Function} emit 回调函数
     */
    constructor(props: InputPorops, emit: Function) {
        this.value = ref(props.modelValue);

        this.inputObject = reactive({
            value: this.value,
            rules: props.rules,
            check: true,
            errorMsg: ''
        });

        this.inputObject.validation = InputTools.validation(this.inputObject);

        this.ObjBinding.bind(this.inputObject)(emit, this.value);
    }

    /**
     * 对象绑定
     * @param {Function} emit 回调方法
     * @param {*} refValue refvalue值
     * @returns {void}
     */
    ObjBinding(emit: Function, refValue: any): void {
        // 初始化的时候给返回绑定对象
        emit('update:modelValue', refValue);
        emit('update:inputObj', this);
    }

}
