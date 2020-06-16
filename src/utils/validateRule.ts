export class ValidateRule {
    static required(value: any): boolean {
        return !!value;
    }

    static HtmlTag(value: any): boolean {
        const reg = /^[a-zA-Z](\w)*$/;
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
}
