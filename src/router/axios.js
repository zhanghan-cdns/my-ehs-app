/**
 * 全站http配置
 *
 * axios参数说明
 * isSerialize是否开启form表单提交
 * isToken是否需要token
 */
import axios from "axios";
import store from "@/store/";
import router from "@/router/router";
import { serialize } from "@/util/util";
import { getToken } from "@/util/auth";
import { Message } from "element-ui";
import website from "@/config/website";
// import { Base64 } from 'js-base64';
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// import qs from 'qs'
import config from "@/config/systemConfig/index";

export const baseUrl = config.BASE_URL;
export const imgUrl = config.IMG_URL;
export const appCompreprot = config.APP_COMPREPORT;
export const appConfig = config.APP_CONFIG;
// 默认超时时间
axios.defaults.timeout = 10000;
// 返回其他状态码
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500;
};
// 跨域请求，允许保存cookie
// axios.defaults.withCredentials = true;
// NProgress 配置
NProgress.configure({
  showSpinner: false,
});
// http request拦截
axios.interceptors.request.use(
  (config) => {
    // 开启 progress bar
    NProgress.start();
    const meta = config.meta || {};
    const isToken = meta.isToken === false;
    // config.headers['Authorization'] = `Basic ${Base64.encode(`${website.clientId}:${website.clientSecret}`)}`;
    // 让每个请求携带token
    if (getToken() && !isToken) {
      config.headers[website.tokenHeader] = getToken();
    }
    // headers中配置text请求
    if (config.text === true) {
      config.headers["Content-Type"] = "text/plain";
    }
    // headers中配置serialize为true开启序列化
    if (config.method === "post" && meta.isSerialize === true) {
      config.data = serialize(config.data);
    }
    // if (config.method === 'post') {
    //   if(config.headers["type"] && config.headers["type"] == 'upload'){
    //     config.headers["Content-Type"] = "multipart/form-data";
    //   }else{
    //     config.headers["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
    //     config.data = qs.stringify(config.data)
    //   }
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// http response 拦截
axios.interceptors.response.use(
  (res) => {
    // 关闭 progress bar
    NProgress.done();
    // 获取状态码
    const status = res.data.code || res.status;
    const statusWhiteList = website.statusWhiteList || [];
    const message = res.data.msg || res.data.error_description || "未知错误";
    // 如果在白名单里则自行catch逻辑处理
    if (statusWhiteList.includes(status)) return Promise.reject(res);
    // 如果是401则跳转到登录页面
    // 如果请求为非200否者默认统一处理
    if (status !== 200) {
      // if(status === 403) {
      //   return res.data
      // }
      if (status === 401) {
        store.dispatch("FedLogOut").then(() => {
          Message({
            message: "token过期请重新登录",
            type: "error",
          });
          return router.push({ path: "/login" });
        });
        // return Promise.reject(new Error('token过期请重新登录'))
      } else {
        Message({
          message: message,
          type: "error",
        });
        return Promise.reject(new Error(message));
      }
    } else {
      return res.data;
    }
  },
  (error) => {
    NProgress.done();
    return Promise.reject(new Error(error));
  }
);

export default axios;
