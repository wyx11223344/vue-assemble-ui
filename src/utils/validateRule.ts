export class ValidateRule {
    static required(value: any): boolean {
        return !!value;
    }
}

export class DefaultMsg {
    static required = {
        false: '这是必填项',
        true: 'OK!'
    }
}
