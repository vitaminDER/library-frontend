import type { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";

import { Interceptor } from "@/utils/api/api.type";
// import type { Interceptor } from "./api.type.ts";

type APIInstance = AxiosInstance;

class API {
  instance: APIInstance;

  private interceptors: Interceptor[] = [];

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
  }

  // setRequestInterceptor(
  //   success?: (
  //     value: AxiosRequestConfig
  //   ) => AxiosRequestConfig | Promise<AxiosRequestConfig>,
  //   error?: (error: any) => any
  // ) {
  //   const id = this.instance.interceptors.request.use(success, error);
  //   this.interceptors.push({ type: "request", id });
  //   return id;
  // }

  // setResponseInterceptor(
  //   success?: (value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>,
  //   error?: (error: any) => any
  // ) {
  //   const id = this.instance.interceptors.request.use(success, error);
  //   this.interceptors.push({ type: "request", id });
  //   return id;
  // }

  private setResponseEject({ type, id }: Interceptor) {
    this.instance.interceptors[type].eject(id);
  }

  clearInterceptors() {
    this.interceptors.forEach(interceptor => {
      this.setResponseEject(interceptor);
    });
  }

  get<T = unknown>(url: string, config?: AxiosRequestConfig | any) {
    return this.instance.get<T>(url, config);
  }

  post<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig | any
  ) {
    return this.instance.post<T>(url, data, config);
  }

  put<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig | any
  ) {
    return this.instance.put<T>(url, data, config);
  }

  delete<T = unknown>(url: string, config?: AxiosRequestConfig | any) {
    return this.instance.delete<T>(url, config);
  }

  upload<T = unknown>(
    url: string,
    data: FormData,
    config?: AxiosRequestConfig | any
  ) {
    const mergedConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        ...config?.headers,
        "Content-Type": "multipart/form-data",
      },
    };
    return this.instance.post<T>(url, data, mergedConfig);
  }

  download<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig | any
  ) {
    const mergedConfig: AxiosRequestConfig = {
      ...config,
      responseType: "blob",
    };
    return this.instance.post<T>(url, data, mergedConfig);
  }
}

export default API;
