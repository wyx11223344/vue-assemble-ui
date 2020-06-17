import { reactive, ref, onMounted, inject } from 'vue';
import { BindingObj, ValidaRule } from '@/types/validation';
import ValidateDec from '@/decorators/validateDec';

export interface ValidaPorops {
	modelValue: string;
    rules?: ValidaRule;
}

export interface RefDom {
    value: Element;
}

export default class ValidaDue {
    value: any
    ValidaObject: BindingObj

    @ValidateDec.validationFn
    private static validation: Function

    @ValidateDec.resetStatus
    private static resetStatus: Function

    @ValidateDec.registerTrigger
    private static registerTrigger: Function

    /**
     * 构造函数
     * @param {ValidaPorops} props 传入传递对象
     * @param {Function} emit 回调函数
     * @param {Element} dom 传入监听dom
     */
    constructor(props: ValidaPorops, emit: Function, dom: RefDom) {
        this.value = ref(props.modelValue);

        this.ValidaObject = reactive({
            value: this.value,
            rules: props.rules,
            check: true,
            errorMsg: ''
        });

        this.ValidaObject.validation = ValidaDue.validation(this.ValidaObject);

        this.ValidaObject.resetStatus = ValidaDue.resetStatus(this.ValidaObject);

        emit('update:modelValue', this.value);

        onMounted(() => {
            ValidaDue.registerTrigger(dom.value, this.ValidaObject);
        });

        const obj: any = inject('form');

        obj.push(this.ValidaObject);
    }

}
