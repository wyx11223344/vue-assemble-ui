import { BindingObj, Validated, ValidateS } from '@/types/validation';
import { DefaultMsg, ValidateRule } from '@/utils/validateRule';
import { isRef } from 'vue';

enum Error {
    ValidateRule = '请确认校验规则是否存在！',
    DefaultMsg = '请确认校验返回信息是否存在！'
}

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

            const backFn = async function(name: string, isCheckAll: boolean) {
                let check = true;
                let otherMessage = '';

                for (let i = 0; i < checkList.length; i++) {
                    const item: Validated = checkList[i];
                    if (item.trigger.indexOf(name) === -1 && item.check && !isCheckAll) continue;
                    item.check = await ValidateDec.runValidFn(item, that);
                    if (!item.check) check = false;
                    if (!item.check && item.backMessage) otherMessage = otherMessage ? `${otherMessage}、${item.backMessage}` : item.backMessage;
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
        let check;

        try {
            check = await (ValidateRule as any)[validated.validateName](that.value);
        } catch (e) {
            throw Error.ValidateRule;
        }

        try {
            validated.backMessage = validated.message ? validated.message : (DefaultMsg as any)[validated.validateName][check];
        } catch (e) {
            throw Error.DefaultMsg;
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
        target[propertyKey] = (dom: Element, that: BindingObj): void => {
            const getAllTrigger: string[] = [];

            that.validation.checkList.forEach((item: Validated) => {
                if (item.trigger && item.trigger.length > 0) {
                    item.trigger.forEach((name: string) => {
                        if (getAllTrigger.indexOf(name) === -1) getAllTrigger.push(name);
                    });
                }
            });

            that.rules?.trigger?.forEach((name: string) => {
                if (getAllTrigger.indexOf(name) === -1) getAllTrigger.push(name);
            });

            getAllTrigger.forEach((name: string) => {
                dom.addEventListener(name, () => {
                    that.validation(name);
                });
            });
        };
    }

    static resetStatus(target: any, propertyKey: string | symbol): void {
        target[propertyKey] = (that: BindingObj): Function => {
            const setStatus = JSON.parse(JSON.stringify(that));

            function resetThat() {
                Object.keys(that).forEach((item: string) => {
                    if (typeof (that as any)[item] !== 'function') {
                        if (isRef((that as any)[item])) {
                            (that as any)[item].value = setStatus[item];
                        } else {
                            (that as any)[item] = setStatus[item];
                        }
                    }
                });
            }

            return resetThat;
        };
    }
}
