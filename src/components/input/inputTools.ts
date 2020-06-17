import { BindingObj } from '@/types/validation';
import ValidaDue, { RefDom, ValidaPorops } from '@/components/utils/ValidaDue';

export default class InputTools extends ValidaDue {
    inputObject: BindingObj

    /**
     * 构造函数
     * @param {ValidaPorops} props 传入传递对象
     * @param {Function} emit 回调函数
     * @param {Element} dom 传入监听dom
     */
    constructor(props: ValidaPorops, emit: Function, dom: RefDom) {

        super(props, emit, dom);

        this.inputObject = this.ValidaObject;
    }

}
