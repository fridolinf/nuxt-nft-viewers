import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
/** --------------------------------------------------------------------------------- */
/** ================================= AXIOS ACTIONS ================================= */
/** --------------------------------------------------------------------------------- */
class HttpServices {
  async get<T = any, R = AxiosResponse<T>>(
    url: string,
    param?: AxiosRequestConfig
  ): Promise<R> {
    return await axios.get<any, R, any>(url, param);
  }
}

const httpServices = new HttpServices();
export default httpServices;
