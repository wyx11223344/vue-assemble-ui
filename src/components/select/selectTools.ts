import { BindingObj } from '@/types/validation';
import ValidaDue, { RefDom, ValidaPorops } from '@/components/utils/ValidaDue';
import { watchEffect } from 'vue';

interface SelectObj extends BindingObj{
    name?: string;
    index?: number;
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

        this.watchPropsValue(props);
    }

    /**
     * 添加value值和name的绑定
     * @param {SelectProps} props 传参对象
     * @returns {void}
     */
    watchPropsValue(props: SelectProps): void {
        watchEffect(() => {
            props.options?.forEach((item: SelectOptions, index: number) => {
                if (item.value === props.modelValue) {
                    this.changeSelect(item, index);
                    return;
                }
            });
        });
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
