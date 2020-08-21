import { BindingObj } from '@/types/validation';
import ValidaDue, { RefDom, ValidaPorops } from '@/components/utils/ValidaDue';
import { watch } from 'vue';

interface SelectObj extends BindingObj{
    name?: string;
    index?: number;
    firstCheck?: boolean;
}

interface SelectOptions {
    name: string;
    value: string | number;
}

interface SelectProps extends ValidaPorops{
    options?: SelectOptions[];
}

export default class SelectTools extends ValidaDue {
    selectObject: SelectObj

    /**
     * 构造函数
     * @param {ValidaPorops} props 传入传递对象
     * @param {Function} emit 回调函数
     * @param {Element} dom 传入监听dom
     */
    constructor(props: SelectProps, emit: Function, dom: RefDom) {

        super(props, emit, dom);

        this.selectObject = this.ValidaObject;

        this.watchPropsValue(props, emit);
    }

    /**
     * 添加value值和name的绑定
     * @param {SelectProps} props 传参对象
     * @param {Function} emit 回调函数
     * @returns {void}
     */
    watchPropsValue(props: SelectProps, emit: Function): void {
        watch(props, () => {
            props.options?.forEach((item: SelectOptions, index: number) => {
                if (item.value === props.modelValue) {
                    this.changeSelect(item, index);
                    if (!this.selectObject.firstCheck) {
                        this.selectObject.firstCheck = true;
                        return;
                    }
                    emit('change', item.value);
                    return;
                }
            });
        }, { immediate: true });
    }

    /**
     * 选中改变后触发绑定
     * @param {SelectOptions} item 选中对象
     * @param {Number} index 选中数组位置
     * @returns {void}
     */
    private changeSelect(item: SelectOptions, index: number): void {
        this.selectObject.name = item.name;
        this.selectObject.value = item.value;
        this.selectObject.index = index;
    }
}
