import type { AxiosRequestConfig, AxiosResponse } from "axios";

interface FYRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  // responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  responseInterceptor?: (res: any) => any;
  responseInterceptorCatch?: (error: any) => any;
}

interface FYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: FYRequestInterceptors<T>;
  showLoading?: boolean;
}

export { FYRequestConfig, FYRequestInterceptors };
