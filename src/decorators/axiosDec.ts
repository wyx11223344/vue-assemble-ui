import Request from '@/utils/axios';

export class AxiosDec {
    static Post(url: string): PropertyDecorator {
        return (target: any, propertyKey: string | symbol): void => {
            target[propertyKey] = (params: any, config?: object) => Request.post(url, params, config);
        };
    }

    static Get(url: string): PropertyDecorator {
        return (target: any, propertyKey: string | symbol): void => {
            target[propertyKey] = (params: any, config?: object) => Request.get(url, params, config);
        };
    }

    static Put(url: string): PropertyDecorator {
        return (target: any, propertyKey: string | symbol): void => {
            target[propertyKey] = (params: any, config?: object) => Request.put(url, params, config);
        };
    }

    static Delete(url: string): PropertyDecorator {
        return (target: any, propertyKey: string | symbol): void => {
            target[propertyKey] = (config?: object) => Request.delete(url, config);
        };
    }
}
