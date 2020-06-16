import { reactive, ref, onMounted } from 'vue';
import { ValidaRule } from '@/types/validation';
import ValidateDec from '@/decorators/validateDec';

interface InputPorops {
	modelValue: string;
	inputObj: InputTools;
    rules?: ValidaRule;
}

// 需要移出到types里面
export interface BindingObj {
	value: any;
	rules?: ValidaRule;
    check: boolean;
    errorMsg: string;
	validation?: any;
}

interface RefDom {
    value: Element;
}

export default class InputTools {
    value: any
    inputObject: BindingObj

    @ValidateDec.validationFn
    static validation: Function

    @ValidateDec.registerTrigger
    static registerTrigger: Function

    /**
     * 构造函数
     * @param {InputPorops} props 传入传递对象
     * @param {Function} emit 回调函数
     * @param {Element} dom 传入监听dom
     */
    constructor(props: InputPorops, emit: Function, dom: RefDom) {
        this.value = ref(props.modelValue);

        this.inputObject = reactive({
            value: this.value,
            rules: props.rules,
            check: true,
            errorMsg: ''
        });

        this.inputObject.validation = InputTools.validation(this.inputObject);

        this.ObjBinding.bind(this.inputObject)(emit, this.value);

        onMounted(() => {
            InputTools.registerTrigger(dom.value, this);
        });
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
