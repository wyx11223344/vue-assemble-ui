export class ValidateRule {
    static required(value: any): boolean {
        return !!value;
    }

    static HtmlTag(value: any): boolean {
        const reg = /^[a-zA-Z](\w)*$/;
        return reg.test(value);
    }

    static NpmName(value: any): boolean {
        const reg = /^[a-z]*$/g;
        return reg.test(value);
    }

    static FontSizeNumber(value: any): boolean {
        // const reg = /^[0-9]*$/;
        const reg = /^(1[2-9]|2\d|30)$/;
        return reg.test(value);
    }
}

export class DefaultMsg {
    static required = {
        false: '这是必填项',
        true: 'OK!'
    }
    static HtmlTag = {
        false: '请填写符合标准的html标签（开头为字母后段由字母、数字、下划线组成）',
        true: 'OK!'
    }
    static NpmName = {
        false: 'npm发布包名称只能使用小写英文字母',
        true: 'OK!'
    }
    static FontSizeNumber = {
        false: '请填写12-30之间的数字',
        true: 'OK!'
    }
}
