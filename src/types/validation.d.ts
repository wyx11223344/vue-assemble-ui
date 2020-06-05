// 校验规则对象
export interface ValidaRule {
    validate?: (string | ValidateS)[];
    message?: string;
    trigger?: string[];
}

export interface ValidateS {
    validateName: string[];
    message?: string;
    trigger?: string[];
}

export interface Validated {
    check: boolean;
    message?: string;
}
