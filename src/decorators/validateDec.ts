import { Validated, ValidateS } from '@/types/validation';
import InputTools, { BindingObj } from '@/components/input/inputTools';

export default class ValidateDec {

    /**
     * 构建正则校验方法
     * @param {Object} target 执行class
     * @param {String} propertyKey 赋值的key
     * @returns {void}
     */
    static validationFn(target: any, propertyKey: string | symbol): void {
        target[propertyKey] = (that: any): Function => {
            const checkList = ValidateDec.dealValidates(that.rules.validate, that.rules.trigger);

            const backFn = async function(name: string) {
                let check = true;
                let otherMessage = '';

                for (let i = 0; i < checkList.length; i++) {
                    const item: Validated = checkList[i];
                    if (item.trigger.indexOf(name) === -1 && item.check) continue;
                    const localCheck = await ValidateDec.runValidFn(item, that);
                    if (!localCheck) check = false;
                    if (!localCheck && item.message) otherMessage = otherMessage ? `${otherMessage}、${item.message}` : item.message;
                }

                that.errorMsg = `${that.rules.message ? that.rules.message : '输入有误'}${otherMessage ? '：' + otherMessage : ''}`;
                that.check = check;
            };

            backFn.checkList = checkList;

            return backFn;
        };
    }

    /**
     * 执行数组处理
     * @param {Array} validates 校验规则
     * @param {Array} trigger 基础触发事件
     * @returns {Validated[]} 返回数组
     */
    private static dealValidates(validates: (string | ValidateS)[], trigger: string[]) {
        const FnList: Validated[] = [];

        validates.forEach((item: string | ValidateS) => {
            if (typeof item === 'string') {
                FnList.push({ validateName: item, check: true, trigger: trigger });
            } else {
                FnList.push({ validateName: item.validateName, check: true, trigger: item.trigger ? item.trigger : trigger, message: item.message });
            }
        });

        return FnList;
    }

    /**
     * 校验执行
     * @param {Validated} validated 执行对象
     * @param {Object} that 传递对象
     * @returns {{check: boolean}} 返回处理对象
     */
    private static async runValidFn(validated: Validated, that: BindingObj): Promise<boolean> {
        let check = true;
        if (!that.value) {
            check = await new Promise((resolve) => {
                setTimeout(() => {
                    validated.check = false;
                    resolve(false);
                });
            });
        } else {
            validated.check = true;
        }

        return check;
    }

    /**
     * 注册监听事件
     * @param {*} target des改变源
     * @param {String} propertyKey key值
     * @returns {void}
     */
    static registerTrigger(target: any, propertyKey: string | symbol): void {
        target[propertyKey] = (dom: Element, that: InputTools) => {
            const getAllTrigger: string[] = [];

            that.inputObject.validation.checkList.forEach((item: Validated) => {
                if (item.trigger && item.trigger.length > 0) {
                    item.trigger.forEach((name: string) => {
                        if (getAllTrigger.indexOf(name) === -1) getAllTrigger.push(name);
                    });
                }
            });

            that.inputObject.rules?.trigger?.forEach((name: string) => {
                if (getAllTrigger.indexOf(name) === -1) getAllTrigger.push(name);
            });

            getAllTrigger.forEach((name: string) => {
                dom.addEventListener(name, () => {
                    that.inputObject.validation(name);
                });
            });
        };
    }
}
