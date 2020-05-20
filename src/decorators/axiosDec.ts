import Request from '@/utils/axios';

export enum MyType {
    'get' = 'get',
    'post' = 'post'
}

export class AxiosDec {
    static newRequest(type: MyType, url: string) {
        return (target: any, propertyKey: string): void => {
            target[propertyKey] = (params: any) => Request[type](url, params);
        };
    }
}
