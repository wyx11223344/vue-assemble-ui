// 校验规则对象
export interface ValidaRule {
    validate?: (string | ValidateS)[];
    message?: string;
    trigger?: string[];
}

// 输入
export interface ValidateS {
    validateName: string;
    message?: string;
    trigger?: string[];
}

export interface Validated {
    validateName: string;
    check: boolean;
    message?: string;
    trigger: string[];
}
