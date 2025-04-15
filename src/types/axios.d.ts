declare module 'axios' {
    export interface AxiosRequestConfig {
        url?: string;
        method?: string;
        baseURL?: string;
        headers?: any;
        params?: any;
        data?: any;
        timeout?: number;
        withCredentials?: boolean;
    }

    export interface AxiosResponse<T = any> {
        data: T;
        status: number;
        statusText: string;
        headers: any;
        config: AxiosRequestConfig;
    }

    export interface AxiosInstance {
        request<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;
        get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
        delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
        head<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
        post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
        put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
        patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    }

    const axios: AxiosInstance;
    export default axios;
} 