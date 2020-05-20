import axios, { AxiosResponse, AxiosRequestConfig, CancelTokenStatic } from 'axios';
import qs from 'qs';

class Request {
    // protected baseURL: any
    protected service: any = axios
    protected pending: Array<{
        url: string;
        cancel: Function;
    }> = []
    protected CancelToken: CancelTokenStatic = axios.CancelToken
    protected axiosRequestConfig: AxiosRequestConfig = {}
    protected successCode: Array<number> = [200, 201, 204]
    private static _instance: Request;

    constructor() {
        this.requestConfig();
        this.service = axios.create(this.axiosRequestConfig);
        this.interceptorsRequest();
        this.interceptorsResponse();
    }

    public static getInstance(): Request {
        // 如果 instance 是一个实例 直接返回，  如果不是 实例化后返回
        this._instance || (this._instance = new Request());
        return this._instance;
    }

    protected requestConfig(): void {
        this.axiosRequestConfig = {
            // baseURL: this.baseURL,
            headers: {
                timestamp: new Date().getTime(),
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            transformRequest: [(obj) => qs.stringify(obj)],
            transformResponse: [function(data: AxiosResponse) {
                return data;
            }],
            paramsSerializer: function(params: any) {
                return qs.stringify(params, { arrayFormat: 'brackets' });
            },
            timeout: 30000,
            withCredentials: false,
            responseType: 'json',
            xsrfCookieName: 'XSRF-TOKEN',
            xsrfHeaderName: 'X-XSRF-TOKEN',
            maxRedirects: 5,
            maxContentLength: 2000,
            validateStatus: function(status: number) {
                return status >= 200 && status < 500;
            }
        };
    }

    protected interceptorsRequest() {
        this.service.interceptors.request.use(
            (config: any) => {
                this.removePending(config);
                config.CancelToken = new this.CancelToken((c: any) => {
                    this.pending.push({ url: `${config.url}/${JSON.stringify(config.data)}&request_type=${config.method}`, cancel: c });
                });
                this.requestLog(config);
                return config;
            },
            (error: any) => Promise.reject(error)
        );
    }

    protected interceptorsResponse(): void {
        this.service.interceptors.response.use(
            (response: any) => {
                this.responseLog(response);
                this.removePending(response.config);
                if (this.successCode.indexOf(response.status) === -1) {
                    return Promise.reject(new Error(response.message || 'Error'));
                } else {
                    return response.data;
                }
            },
            (error: any) => Promise.reject(error)
        );
    }

    protected removePending(config: any): void {
        for (const p in this.pending) {
            const item: any = p;
            const list: any = this.pending[p];
            if (list.url === `${config.url}/${JSON.stringify(config.data)}&request_type=${config.method}`) {
                list.cancel();
                console.log('=====', this.pending);
                this.pending.splice(item, 1);
                console.log('+++++', this.pending);
            }
        }
    }

    public async post(url: string, data: any = {}, config: object = {}) {
        try {
            const result = await this.service.post(url, qs.stringify(data), config);
            return result.data;
        } catch (error) {
            console.error(error);
        }
    }

    public async delete(url: string, config: object = {}) {
        try {
            await this.service.delete(url, config);
        } catch (error) {
            console.error(error);
        }
    }

    public async put(url: string, data: any = {}, config: object = {}) {
        try {
            await this.service.put(url, qs.stringify(data), config);
        } catch (error) {
            console.error(error);
        }
    }

    public async get(url: string, parmas: any = {}, config: object = {}) {
        try {
            const result = await this.service.get(url, parmas, config);
            return result.data;
        } catch (error) {
            console.error(error);
        }
    }

    protected requestLog(request: any): void {
        console.log(request);
    }

    protected responseLog(response: any): void {
        if (process.env.NODE_ENV === 'development') {
            const randomColor = `rgba(${Math.round(Math.random() * 255)},${Math.round(
                Math.random() * 255
            )},${Math.round(Math.random() * 255)})`;
            console.log(
                '%c┍------------------------------------------------------------------┑',
                `color:${randomColor};`
            );
            console.log('| 请求地址：', response.config.url);
            console.log('| 请求参数：', qs.parse(response.config.data));
            console.log('| 返回数据：', response.data);
            console.log(
                '%c┕------------------------------------------------------------------┙',
                `color:${randomColor};`
            );
        }
    }
}

export default Request.getInstance();
