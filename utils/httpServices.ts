import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
/** --------------------------------------------------------------------------------- */
/** ================================= AXIOS ACTIONS ================================= */
/** --------------------------------------------------------------------------------- */
/* The HttpServices class is a TypeScript class that provides an async function for sending GET
requests to a specified URL using the Axios library and returning a Promise with the response data. */
class HttpServices {
  /**
   * This is an async function that sends a GET request to a specified URL using Axios library and
   * returns a Promise with the response data.
   * @param {string} url - The URL of the API endpoint that the function will send a GET request to.
   * @param {AxiosRequestConfig} [param] - The `param` parameter is an optional object that can contain
   * additional configuration options for the Axios request. These options can include things like
   * headers, query parameters, and request data. The `param` object is of type `AxiosRequestConfig`,
   * which is an interface that defines all the possible configuration options
   * @returns The `get` function is returning a Promise that resolves to an AxiosResponse object with a
   * generic type of `R`. The AxiosResponse object contains the response data, status code, headers,
   * and other information related to the HTTP response.
   */
  async get<T = any, R = AxiosResponse<T>>(
    url: string,
    param?: AxiosRequestConfig
  ): Promise<R> {
    /* `axios.get<any, R, any>(url, param)` is making a GET request to the specified `url`
    with optional `param` configuration options using the Axios library. The first
    generic type parameter `any` represents the type of the response data, the second
    generic type parameter `R` represents the type of the AxiosResponse object, and the
    third generic type parameter `any` represents the type of the request data. The
    function returns a Promise that resolves to an AxiosResponse object with a generic
    type of `R`, which contains the response data, status code, headers, and other
    information related to the HTTP response. */
    return await axios.get<any, R, any>(url, param);
  }
}

const httpServices = new HttpServices();
export default httpServices;
