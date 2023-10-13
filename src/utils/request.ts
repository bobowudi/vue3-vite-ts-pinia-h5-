import baseAxios, { type AxiosResponse, type AxiosRequestConfig } from "axios";
import { ElLoading, ElMessage, ElMessageBox } from "element-plus";
import { encrypt, decrypt } from "@/utils/rsa";
// import { state } from '@/store/system';
let LoginOutMessageBoxLive = false;
const http = baseAxios.create();
http.defaults.baseURL = './api';
// state.cdn = baseUrl + "/service-apis"
http.defaults.timeout = Infinity;
let showCount = 0;
const showLoading = (isShow: boolean) => {
  const loading = ElLoading.service({
    lock: isShow,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)",
  });
  if (!isShow) {
    loading.close();
  }
};
http.interceptors.request.use((config) => {
  if (config.headers && config.headers['encrypt'] === 'true') {
    config.data = encrypt(JSON.stringify(config.data));
    config.headers['Content-Type'] = 'application/json; charset=utf-8';
  }
  if (sessionStorage.getItem('token')) {
    config.headers = Object.assign({}, config.headers, {
      [sessionStorage.getItem('tokenName') as string]: sessionStorage.getItem('token')
    });
  }
  let token = sessionStorage.getItem('SMT-ASS-CS')
  if (token) {
    config.headers = {
      'SMT-ASS-CS': token
    } as any
  }
  showCount += 1;
  showLoading(true);
  return config;
});
http.interceptors.response.use(
  function (response) {
    try {
      if (response.config.headers['encrypt'] === 'true') {
        response.data = JSON.parse(decrypt(response.data));
      }
    } catch (e) {
      console.log(e);
    }
    //登录异常处理
    if ((!isNaN(Number(response.data.code)) && [2001, '2001'].includes(response.data.code))) {
      if (!LoginOutMessageBoxLive) {
        LoginOutMessageBoxLive = true;
        localStorage.clear();
        sessionStorage.clear();
        ElMessageBox({
          title: "登录异常",
          message: response.data.message || response.data.error,
          showClose: false,
          lockScroll: true,
          boxType: "prompt",
          type: "error",
          customClass: "zIndexFixed zIndexMax",
          center: true,
          confirmButtonText: "退出系统",
          distinguishCancelAndClose: false,
          closeOnClickModal: false,
          closeOnHashChange: false,
          closeOnPressEscape: false,
          callback: () => location.reload()
        });
      }
    } else if (response.status !== 200 || (!isNaN(Number(response.data.code)) && ![0, '0', '200', 200].includes(response.data.code))) {
      ElMessage({
        message: response.data.message || response.data.msg,
        type: "error",
      });
      showCount = 0;
      showLoading(false);
      throw response.data.message || response.data.msg;
    }
    showCount -= 1;
    if (showCount <= 0) {
      showCount = 0;
      showLoading(false);
    }

    return response;
  },
  function (error) {
    let response: AxiosResponse = error.response;
    showCount -= 1;
    if (showCount <= 0) {
      showCount = 0;
      showLoading(false);
    }
    //登录异常处理
    if (response.data && (response.data.message || response.data.msg)) {
      if ((!isNaN(Number(response.data.code)) && [2001, '2001'].includes(response.data.code))) {
        if (!LoginOutMessageBoxLive) {
          LoginOutMessageBoxLive = true;
          localStorage.clear();
          sessionStorage.clear();
          ElMessageBox({
            title: "登录异常",
            message: response.data.message || response.data.error,
            showClose: false,
            lockScroll: true,
            boxType: "prompt",
            type: "error",
            customClass: "zIndexFixed zIndexMax",
            center: true,
            confirmButtonText: "退出系统",
            distinguishCancelAndClose: false,
            closeOnClickModal: false,
            closeOnHashChange: false,
            closeOnPressEscape: false,
            callback: () => location.reload()
          });
        }
      } else {
        ElMessage({
          type: "error",
          grouping: true,
          message: response.data.message || response.data.msg
        })
      }
    }
    return Promise.reject(error);
  }
);
export const getAction = <T = any>(
  url: string,
  params?: any,
  options?: AxiosRequestConfig<T>
) => {
  return http.get(
    url,
    Object.assign(options || {}, {
      params,
    })
  );
};
export const postAction = <T = any>(
  url: string,
  params: any,
  options?: AxiosRequestConfig<T>
) => {
  return http.post(url, params, options);
};

export const axios = http;
