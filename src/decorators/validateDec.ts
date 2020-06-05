import { Validated, ValidateS } from '@/types/validation';

export default class ValidateDec {
    static validationFn(target: any, propertyKey: string | symbol): void {
        target[propertyKey] = (that: any): Function => function() {
            const checkList = ValidateDec.dealValidates(that.rules.validate, that);

            let check = true;
            let otherMessage = '';
            checkList.forEach((item: Validated) => {
                if (!item.check) check = false;
                if (item.message) otherMessage = otherMessage ? `${otherMessage}、${item.message}` : item.message;
            });
            that.errorMsg = `${that.rules.message ? that.rules.message : '输入有误'}${otherMessage ? '：' + otherMessage : ''}`;
            that.check = check;
        };
    }

    private static dealValidates(validates: (string | ValidateS)[], that: any) {
        const FnList: Validated[] = [];

        validates.forEach((item) => {
            if (typeof item === 'string') {
                FnList.push(ValidateDec.runSingleFn(item, that));
            } else {
                FnList.push(ValidateDec.runObjFn(item, that));
            }
        });

        return FnList;
    }

    private static runSingleFn(name: string, that: any) {
        let check = true;
        if (!that.value) {
            check = false;
        }

        return {
            check: check
        };
    }

    private static runObjFn(validate: ValidateS, that: any) {
        let check = true;
        if (!that.value) {
            check = false;
        }

        return {
            check: check,
            message: validate.message
        };
    }
}
