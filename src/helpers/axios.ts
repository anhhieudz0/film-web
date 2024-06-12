import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
type ErrorResponse = {
  errors: string | Array<string>;
};
axios.defaults.timeout = 60000;
axios.defaults.baseURL =
  "https://test.cors.workers.dev/https://ophim16.cc/_next/data/Y8LCjUe8gNGFgL03cKgEY";

console.log(process.env);
axios.interceptors.request.use(
  function (config: any) {
    config.headers["accept"] = "*/*";
    config.headers["accept-language"] = "vi,ja;q=0.9,en;q=0.8,en-US;q=0.7";
    config.headers["sec-ch-ua"] =
      '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"';
    config.headers["sec-ch-ua-mobile"] = "?0";
    config.headers["sec-ch-ua-platform"] = '"Linux"';
    config.headers["sec-fetch-dest"] = "empty";
    config.headers["sec-fetch-mode"] = "cors";
    config.headers["sec-fetch-site"] = "same-origin";
    config.referrer = "https://ophim16.cc/";
    config.referrerPolicy = "strict-origin-when-cross-origin";
    config.withCredentials = true;
    return config;
  },
  function (error: AxiosError) {
    console.error(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response: AxiosResponse) {
    return response;
  },
  function (error: AxiosError<ErrorResponse>) {
    error.message = "da co loi xay ra";
    return Promise.reject(error);
  }
);
